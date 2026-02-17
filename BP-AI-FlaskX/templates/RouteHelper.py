from typing import Any # Import Any type
from flask import Blueprint # Import Blueprint from Flask
import sys # Import sys module
from classes.p import P # Import custom print/logging function


class RouteHelper:
    bp = Blueprint("bp", __name__) # Create a Blueprint instance

    @staticmethod
    def route(rule: str, **options: Any): # Define a route decorator
        def decorator(func):
            def wrapper(*args, **kwargs): # Wrapper function for the route
                P(f"{args}, {kwargs}", "gb", end="") # Log arguments
                try:
                    return {"data": func(*args, **kwargs), "error": ""}, 200
                except Exception as e: # Handle exceptions
                    print(
                        f"An exception occurred in {func.__name__}: {str(e)}",
                        file=sys.stderr,  # Print error to stderr
                    )
                    return {"data": [], "error": str(e)}, 200 # Return error response

            wrapper.__name__ = func.__name__
            return RouteHelper.bp.route(rule, **options)(wrapper) # Register the route with the Blueprint

        return decorator

    @staticmethod
    def blob(rule: str, **options: Any): # Define a blob route decorator
        def decorator(func):
            def wrapper(*args, **kwargs): # Wrapper function for the blob route
                P(f"{args}, {kwargs}", "gb", end="") # Log arguments
                return func(*args, **kwargs)

            wrapper.__name__ = func.__name__
            return RouteHelper.bp.route(rule, **options)(wrapper)  # Register the blob route with the Blueprint

        return decorator
