""" This module creates an API for managing requests of a game. """
from api.helper import make_response
from api.helper import get_start_args
from api.helper import get_move_args
from api.helper import st_get, st_save
from flask import abort
from flask import Flask
from flask import request
from flask_cors import CORS
import json
import uuid
import random


db = {}
app = Flask(__name__)
CORS(app, resource='/*', origins='*')


@app.route('/start', strict_slashes=False)
def start():
    """ Gets, validates and stores param, and returns data about the game. """
    # 1. Get and validate parameters
    mode, rows, max_colors, player_name, max_rounds, session_id\
        = get_start_args(request)

    if rows > 7 or rows < 1 or max_rounds > 50 or max_colors < rows:
        abort(400, "Invalid Params")

    # 2. Create id and validate player_name
    newId = str(uuid.uuid4())
    if player_name is None:
        player_name = 'Player-' + newId[0: 13]
    elif len(player_name) > 20:
        abort(400, "Player name too long")

    # 3. Create color list and color combination
    color_list = random.sample(range(0, max_colors), rows)

    combination = [color_list[random.randrange(
        0, rows, 1)] for i in color_list]
    print("correct", combination)

    # 4. save id and color combination in the session
    if session_id is None:
        session_id = str(uuid.uuid4())
    game = {
        'game_id': newId,
        'combination': combination,
        'player_name': player_name,
        'mode': mode,
        'max_rounds': max_rounds,
        'round': 0
    }

    st_save(session_id, game, db)

    # 5. Generate the response
    data = {'key': session_id, 'game_id': newId, 'use_colors': color_list}
    return make_response(data)


@app.route('/check', strict_slashes=False)
def check():
    """ Checks the game played by the player and returns its status. """
    # 1. Get and validate parameters
    game_id, user_combination, key = get_move_args(request)

    if key is None:
        abort(400, "Missing key")
    if game_id is None:
        abort(400, "Missing game_id")
    if user_combination is None:
        abort(400, "Missing move")
    if len(game_id) > 36:
        abort(400, "Invalid game_id")

    user_combination = [int(i) for i in user_combination.split(',')]
    if len(user_combination) > 7:
        abort(400, "Invalid Move")

    if st_get(key, db) is None or st_get(key, db, 'game_id') != game_id:
        abort(400, "Invalid Move")

    # 2. Get session data
    game_data = st_get(key, db)
    if (game_data is None):
        abort(400, "Invalid key")

    game_data['round'] += 1

    # 3. Save data in session
    st_save(key, game_data, db)

    # 4. Check status of the game
    if len(game_data['combination']) != len(user_combination):
        abort(400, "Invalid Move")

    print("User Combination", user_combination)
    data = {'color_match': 0, 'position_match': 0, 'no_match': 0}

    # finished game
    if game_data['round'] > game_data['max_rounds']:
        data['combination'] = game_data['combination']
        return make_response(data)

    # 5. Find status of the game played
    secret_code = game_data['combination'][:]
    for i, color in enumerate(user_combination):
        if color == secret_code[i]:
            data['position_match'] += 1
            secret_code[i] = -1
            user_combination[i] = -2

    for i, color in enumerate(user_combination):
        print("error 5", i, color)
        if color in secret_code:
            data['color_match'] += 1
            secret_code[secret_code.index(color)] = -1
            user_combination[i] = -2

    for i, color in enumerate(secret_code):
        if color >= 0:
            data['no_match'] += 1

    # 6. Generate the response
    if data['position_match'] == len(user_combination)\
            or game_data['round'] == game_data['max_rounds']:
        data['combination'] = game_data['combination']
        return make_response(data)
    return make_response(data)


@app.errorhandler(404)
def not_found(error):
    """ Method to handle 404 errors """
    data = {"error": "Not found"}
    return app.response_class(
        json.dumps(data),
        status=404,
        mimetype='application/json'
    )


@ app.errorhandler(400)
def handle_error(error):
    """ Method to handle 400 errors """
    data = {"error": error.description}
    return app.response_class(
        json.dumps(data),
        status=400,
        mimetype='application/json'
    )
