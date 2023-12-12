from flask import Flask

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
player_queue = []

def init_app_extensions(app: Flask):
    """Initialize the extensions with app instance."""
    db.init_app(app)