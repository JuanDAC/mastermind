""" """
import json
from flask import abort
from flask import Flask
from flask import request
import uuid
import random
from api.helper import make_response
from api.helper import get_start_args
from api.helper import get_move_args
from api.helper import st_get, st_save


db = {}
app = Flask(__name__)


@app.route('/start', strict_slashes=False)
def start():
    """ """
    # 1. validate parameters
    mode, rows, max_colors, player_name, max_rounds, session_id\
        = get_start_args(request)

    if rows > 7 or rows < 1 or max_rounds > 50 or max_colors < rows:
        abort(400, "Invalid Params")

    # 2. create id and validate player_name
    newId = str(uuid.uuid4())
    if player_name is None:
        player_name = 'Player-' + newId[0: 13]
    elif len(player_name) > 20:
        abort(400, "Player name too long")

    # 3. Create color list and color combination
    color_list = random.sample(range(0, max_colors), rows)

    combination = [color_list[random.randrange(
        0, rows, 1)] for i in color_list]
    print(combination)
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

    # 5. generate the response
    data = {'key': session_id, 'game_id': newId, 'use_colors': color_list}
    return make_response(data)


@app.route('/check', strict_slashes=False)
def check():
    """ """
    # 1. get parameters
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

    # 2. get session data
    game_data = st_get(key, db)
    if (game_data is None):
        abort(400, "Invalid key")

    game_data['round'] += 1

    # 5. save data in session
    st_save(key, game_data, db)

    # 3. check status of the game
    if len(game_data['combination']) != len(user_combination):
        abort(400, "Invalid Move")

    data = {'color_match': 0, 'position_match': 0, 'no_match': 0}

    # finished game
    if game_data['round'] > game_data['max_rounds']:
        data['combination'] = game_data['combination']
        return make_response(data)

    # 4. find the result
    clave = game_data['combination'][:]
    for i, color in enumerate(user_combination):
        if color == clave[i]:
            data['position_match'] += 1
            clave[clave.index(color)] = -1

    for i, color in enumerate(user_combination):
        if color in clave:
            data['color_match'] += 1
            clave[clave.index(color)] = -1

    data['no_match'] = len(user_combination)\
        - data['position_match'] - data['color_match']

    # 6. generate the response
    if data['position_match'] == len(user_combination)\
            or game_data['round'] == game_data['max_rounds']:
        data['combination'] = game_data['combination']
        return make_response(data)

    return make_response(data)


@app.errorhandler(404)
def not_found(error):
    """ Method to handle errors """
    data = {"error": "Not found"}
    return app.response_class(
        json.dumps(data),
        status=404,
        mimetype='application/json'
    )


@ app.errorhandler(400)
def handle_error(error):
    """ Method to handle errors """
    data = {"error": error.description}
    return app.response_class(
        json.dumps(data),
        status=400,
        mimetype='application/json'
    )
