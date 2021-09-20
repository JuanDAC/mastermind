import json


def make_response(data=None):
    """ """
    from api.index import app

    return app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )


def get_start_args(request):
    session_id = request.args.get('key', type=str)
    mode = request.args.get('mode', default=1, type=int)
    rows = request.args.get('rows', default=4, type=int)
    max_colors = request.args.get('max_colors', default=8, type=int)
    player_name = request.args.get('player_name', type=str)
    rounds = request.args.get('rounds', default=10, type=int)

    return mode, rows, max_colors, player_name, rounds, session_id


def get_move_args(request):
    key = request.args.get('key', type=str)
    id = request.args.get('game_id', type=str)
    move = request.args.get('move', type=str)

    return id, move, key


def st_save(id, data, db):
    db[id] = data


def st_get(id, db, key = None):
    if key is None:
        return db.get(id)
    else:
        if db.get(id) is None:
            return None
        return db.get(id).get(key)
