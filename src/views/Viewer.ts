import Viewer from "viewerjs";

import "viewerjs/dist/viewer.css";

export default () => {
    const mainArea = document.getElementById("gallery")!;

    let gallery;

    fetch("/api/image/search")
        .then((r) => r.json())
        .then((r) => {
            r.forEach((el: any) => {
                const childImg = document.createElement("img");
                childImg.src = "data:image/png;base64," + el.thumbnail;
                childImg.alt = el.url;
                mainArea.appendChild(childImg);
            });

            gallery = new Viewer(mainArea, {
                url(img: HTMLImageElement) {
                    return img.alt;
                }
            });
        });
};
