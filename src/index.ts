import Viewer from "viewerjs";
import $ from "jquery";

import urlList from "./urlList.txt";
import "viewerjs/dist/viewer.css";
import "./index.css";

(() => {
    const mainArea = document.getElementById("App") as HTMLDivElement;
    const $mainArea = $(mainArea);
    urlList.trim().split("\n").forEach((url: any) => {
        const $img = $(`
            <div class="thumbnail-wrapper">
                <img class="thumbnail uncaptioned" src="${url}" alt="${
                    /([^/]+)$/.exec(url)![1]}">
            </div>`);
        $mainArea.append($img);
    });

    const gallery = new Viewer(mainArea);
})();
