""" """
from flask import Flask
from flask import request
import uuid
import random
from api.common import make_response
from api.common import get_start_args
from api.common import get_move_args
from api.common import st_get, st_save


db={}
app = Flask(__name__)


@app.route('/start', strict_slashes=False)
def start():
    """ """
    # 1. validate parameters
    mode, rows, max_colors, player_name, max_rounds, session_id = get_start_args(request)

    if rows > 7 or rows < 1 or max_rounds > 50 or max_colors < rows:
        return make_response()

    # 2. create id and validate player_name
    newId = str(uuid.uuid4())
    if player_name is None:
        player_name = 'Player-' + newId[0: 13]
    elif len(player_name) > 20:
        return make_response()

    # 3. Create color list and color combination
    color_list = random.sample(range(0, max_colors), rows)

    combination = [color_list[random.randrange(
        0, rows, 1)] for i in color_list]
    print(combination)
    # 4. save id and color combination in the session
    if session_id is None:
        session_id = str(uuid.uuid4())
    data = {
        'id': newId,
        'combination': combination,
        'player_name': player_name,
        'mode': mode,
        'max_rounds': max_rounds,
        'round': 0
    }

    st_save(session_id, data, db)

    # 5. generate the response
    data = {'id': newId, 'use_colors': color_list, 'key':session_id}
    return make_response(data)


@app.route('/check_move', strict_slashes=False)
def check():
    """ """
    # 1. get parameters
    id, user_combination, key = get_move_args(request)

    if id is None or user_combination is None or len(id) > 36:
        return make_response()

    user_combination = [int(i) for i in user_combination.split(',')]
    if len(user_combination) > 7:
        return make_response()

    if st_get(key, db) is None or st_get(key, db, id) != id:
        return make_response()

   # 5. save data in session
    st_get(key, db, 'round') += 1

    # 2. get session data
    game_data = st_get(key, db)
    # 3. check status of the game

    if len(game_data['combination']) != len(user_combination):
        return make_response()

    data = {'color_match': 0, 'position_match': 0, 'no_match': 0}

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

