#!/usr/bin/env python3
"""Parametrize templates"""
from flask import Flask, render_template, request
from flask_babel import Babel, gettext

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """get_locale function"""
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route("/")
def index():
    """index function"""
    welcome_title = gettext('home_title')
    welcome_header = gettext('home_header')
    return render_template('3-index.html', title=welcome_title, header=welcome_header)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000")
