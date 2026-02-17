from typing import Optional # Import Optional type
from flask import Flask, request # Import Flask and request
from flask_socketio import SocketIO, emit # Import SocketIO for real-time communication
from classes.Constants import Constants # Import Constants
from templates.RouteHelper import RouteHelper # Import RouteHelper blueprint
from flask import request, send_file # Import request and send_file from Flask
import logging
from classes.p import P # Import custom print/logging function

log = logging.getLogger("werkzeug") # Get the werkzeug logger
log.setLevel(logging.ERROR)

app: Optional[Flask] = None # Initialize Flask app variable
socketio: Optional[SocketIO] = None

#! INITIALIZE
app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type" # Set CORS headers

#! SOCKET IO
socketio = SocketIO(app, cors_allowed_origins="*") # Initialize SocketIO with CORS allowed origins
socketio.init_app(app)


@socketio.on("connect") # Handle client connection event
def handle_connect():
    P("Client connected") # Log client connection


@socketio.on("disconnect") # Handle client disconnection event
def handle_disconnect():
    P("Client disconnected") # Log client disconnection


def start():
    if app is None or socketio is None:
        return

    #! REGISTER BLUEPRINT
    app.register_blueprint(RouteHelper.bp)

    #! ADD CORS HEADERS
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = ( # Allow all origins
            "*"  # You can replace * with specific domains
        )
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization" # Allow specific headers
        response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS" # Allow specific methods
        return response

    #! AFTER REQUEST
    @app.after_request
    def after_request(response):
        response = add_cors_headers(response)
        P(f"\n[{response.status_code}] {response.get_data(as_text=True)}", "o") # Log response status and data
        return response

    #! BEFORE REQUEST
    @app.before_request
    def before_request():
        P(f"\n[{request.method}] {request.url}", "gb", end=" ") # Log request method and URL

    #! MAIN
    socketio.run(app, host="0.0.0.0", port=Constants.port, debug=True, use_reloader=False, allow_unsafe_werkzeug=True) # Run the SocketIO server
    # if __name__ == "__main__":
    #     # app.run(debug=True)
    #     socketio.run(app, host="0.0.0.0", port=Constants.port, debug=True)
