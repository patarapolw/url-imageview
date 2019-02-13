import Viewer from "viewerjs";
import $ from "jquery";

import urlList from "./user/urlList.txt";
import "viewerjs/dist/viewer.css";
import "./index.css";

(() => {
    const mainArea = document.getElementById("App") as HTMLDivElement;
    const $mainArea = $(mainArea);
    shuffle(urlList.trim().split("\n")).forEach((url: any) => {
        const $img = $(`
            <div class="thumbnail-wrapper">
                <img class="thumbnail uncaptioned" src="${url}" alt="${
                    /([^/]+)$/.exec(url)![1]}">
            </div>`);
        $mainArea.append($img);
    });

    const gallery = new Viewer(mainArea);
})();

function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
