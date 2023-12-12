# This file is used to deploy on render.com using Gunicorn.

from app import create_app

app = create_app('dev')