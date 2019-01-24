import pymongo as mg
import os

from .util import get_thumbnail


class DB:
    def __init__(self):
        client = mg.MongoClient(os.getenv("MONGO_URI"))
        self.image = client.imageserver.image


class Image:
    def __init__(self, db):
        self.image = db.image

    def set_schema(self):
        self.image.create_indexes([
            mg.IndexModel("url", unique=True)
        ])

    def post(self, url):
        return self.image.insert_one({"url": url, "thumbnail": get_thumbnail(url)}).inserted_id

    def put(self, src, dst):
        return self.image.find_one_and_update(
            {"url": src},
            {"$set", {
                "url": dst,
                "thumbnail": get_thumbnail(dst)
            }})

    def delete(self, url):
        return self.image.find_one_and_delete({"url": url})

    def get(self, url):
        return self.image.find_one({"url": url})
