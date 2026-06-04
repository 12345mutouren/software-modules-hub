"""FastAPI-shaped API entry.

Install FastAPI in a real project and replace the plain dictionaries with
actual route handlers. This file is intentionally dependency-light for this
repository.
"""

API_ROUTES = [
    "GET /health",
    "POST /auth/login",
    "GET /workspaces",
    "POST /documents",
    "POST /conversations",
]


def health():
    return {"status": "ok", "routes": API_ROUTES}

