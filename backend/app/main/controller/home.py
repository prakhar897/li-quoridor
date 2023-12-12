from flask import Blueprint, jsonify, request
import json

home_api = Blueprint('api', __name__)

@home_api.route('/', methods=['POST'])
def add_player_to_queue():
    print(request.__dict__)
    return json.dumps({'name': 'alice',
                       'email': 'alice@outlook.com'})