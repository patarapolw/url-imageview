import requests
from io import BytesIO
from PIL import Image


def get_thumbnail(url: str) -> bytes:
    img = Image.open(BytesIO(requests.get(url).content))
    img.thumbnail((100, 100))

    output = BytesIO()
    img.save(output, "PNG")

    return output.getvalue()
