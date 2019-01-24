import $ from "jquery";

import Viewer from "./views/Viewer";
import Editor from "./views/Editor";

import containerTpl from "./templates/container.html";
import viewerTpl from "./templates/viewer.html";
import editorTpl from "./templates/editor.html";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

let currentTab: "viewer" | "editor" = "viewer";

$("body").html(containerTpl);

document.getElementById("viewer-link")!.onclick = () => {
    $(".nav-link").removeClass("active");
    $("#viewer-link").addClass("active");

    $("#mainArea").html(viewerTpl);
    currentTab = "viewer";

    Viewer();
};

document.getElementById("editor-link")!.onclick = () => {
    $(".nav-link").removeClass("active");
    $("#editor-link").addClass("active");

    $("#mainArea").html(editorTpl);
    currentTab = "editor";

    Editor();
};

document.getElementById("viewer-link")!.click();
