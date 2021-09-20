import json


def make_response(data=None):
    """ """
    from api.index import app
    code = 200
    if data is None:
        data = {'error': 'Invalid Request'}
        code = 404
    return app.response_class(
        response=json.dumps(data),
        status=code,
        mimetype='application/json'
    )


def get_start_args(request):
    mode = request.args.get('mode', default=1, type=int)
    rows = request.args.get('rows', default=4, type=int)
    max_colors = request.args.get('max_colors', default=8, type=int)
    player_name = request.args.get('player', type=str)
    rounds = request.args.get('rounds', default=10, type=int)
    session_id = request.args.get('key', type=str)

    return mode, rows, max_colors, player_name, rounds, session_id


def get_move_args(request):
    id = request.args.get('id', type=str)
    key = request.args.get('key', type=str)
    move = request.args.get('move', type=str)

    return id, move, key


def st_save(id, data, db):
    db[id] = data


def st_get(id, db, key=None):
    if key is None:
        return db[id]
    else:
        if db.get(id) is None:
            return None
        return db.get(id).get(key)
