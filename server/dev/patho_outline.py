import requests
from bs4 import BeautifulSoup

if __name__ == "__main__":
    r = requests.get("http://www.pathologyoutlines.com/topic/kidneytumorwilmkids.html")
    soup = BeautifulSoup(r.text, "html.parser")

    for a in soup.find_all("a"):
        if a["href"].lower().endswith("jpg"):
            r = requests.post("http://127.0.0.1:5000/api/image", json={
                "url": a["href"]
            })
