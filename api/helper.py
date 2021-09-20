""" This module contains function used for secondary purpose as formating
    responses or extracting data from URL. """
import json


def make_response(data=None):
    """ Formats incoming data to a reponse-like structure.
        Parameters:
            data: Data to cast into json. """
    from api.index import app

    return app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )


def get_start_args(request):
    """ Extracts parameters from a request used to start the program.
        Parameters:
            request: request from which data is extracted. """
    session_id = request.args.get('key', type=str)
    mode = request.args.get('mode', default=1, type=int)
    rows = request.args.get('rows', default=4, type=int)
    max_colors = request.args.get('max_colors', default=8, type=int)
    player_name = request.args.get('player_name', type=str)
    rounds = request.args.get('rounds', default=10, type=int)

    return mode, rows, max_colors, player_name, rounds, session_id


def get_move_args(request):
    """ Extracts parameters from a request used to check a players game.
        Parameters:
            request: request from which data is extracted. """
    key = request.args.get('key', type=str)
    id = request.args.get('game_id', type=str)
    move = request.args.get('move', type=str)

    return id, move, key


def st_save(id, data, db):
    """ Stores data from a game with its id.
        Parameters:
            id: id of the game to store data to.
            data: information to store.
            db: data storage. """
    db[id] = data


def st_get(id, db, key=None):
    """ Gets data from a game with the id.
        Parameters:
            id: id of the game to get data from.
            db: data storage.
            key: name of variable to look data from. """
    if key is None:
        return db.get(id)
    else:
        if db.get(id) is None:
            return None
        return db.get(id).get(key)
