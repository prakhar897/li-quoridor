import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False


class DevelopmentConfig(Config):
    
    SQLALCHEMY_DATABASE_URI = 'postgresql://krdxgmox:mb7nX_YzC_-FfL9y3CRosAMsQh8aHqF-@snuffleupagus.db.elephantsql.com/krdxgmox'
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgres://krdxgmox:mb7nX_YzC_-FfL9y3CRosAMsQh8aHqF-@snuffleupagus.db.elephantsql.com/krdxgmox'
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgres://krdxgmox:mb7nX_YzC_-FfL9y3CRosAMsQh8aHqF-@snuffleupagus.db.elephantsql.com/krdxgmox'


config = {
    "dev": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}