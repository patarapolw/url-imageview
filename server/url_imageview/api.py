from flask import request, Response, jsonify
import base64
import json

from . import app
from .db import DB, Image
from .dir import ROOT

db = DB()
image = Image(db)


@app.route("/api/image", methods=["GET", "POST", "PUT", "DELETE"])
def api_image():
    r = request.get_json()

    if request.method == "POST":
        image.post(r["url"])

        return Response(status=201)
    elif request.method == "PUT":
        image.put(r["oldUrl"], r["url"])

        return Response(status=201)
    elif request.method == "DELETE":
        image.delete(r["url"])

        return Response(status=201)
    else:
        db_image = image.get(r["url"])

        return jsonify({
            "url": db_image["url"],
            "thumbnail": base64.b64encode(db_image["thumbnail"]).decode()
        })


SEARCH_JSON = ROOT.joinpath("../user/search.json")


@app.route("/api/image/search")
def api_image_all():
    return jsonify(list(map(lambda x: {
        "url": x["url"],
        "thumbnail": base64.b64encode(x["thumbnail"]).decode()
    }, image.image.find(
        request.get_json() if not SEARCH_JSON.exists() else json.loads(SEARCH_JSON.read_text())
    ))))
