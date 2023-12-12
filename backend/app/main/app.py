from flask import Flask, jsonify
from config import config
from extensions import init_app_extensions
from flask_cors import CORS
from controller.home import home_api

# cors hack fix
import collections
collections.Iterable = collections.abc.Iterable

def create_app(config_name: str) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    init_app_extensions(app)
    app.register_blueprint(home_api, url_prefix='/api')
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    return app

if __name__ == "__main__":
    app = create_app('dev')
    app.run(port=8000, debug=True)