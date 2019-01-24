import $ from "jquery";

export default () => {
    let currentPage = 1;
    const pageSize = 5;
    let itemCount = -1;

    updatePageNumber();
    reloadImages();

    $("#prev-all a").click(() => {
        currentPage = 1;
        reloadImages();
    });

    $("#prev a").click(() => {
        currentPage--;
        reloadImages();
    });

    $("#next a").click(() => {
        currentPage++;
        reloadImages();
    });

    $("#next-all a").click(() => {
        currentPage = getLastPage();
        reloadImages();
    });

    $(".page-plus-minus a").click((e) => {
        currentPage = parseInt($(e.target).text(), 10);
        reloadImages();
    });

    function updatePageNumber() {
        $(".page-plus-minus").hide();
        $(".page-nav").addClass("disabled");

        $("#current-page a").text(currentPage);

        if (currentPage > 1) {
            $("#minus1").show();
            $("#minus1 a").text(currentPage - 1);

            $("#prev").removeClass("disabled");
            $("#prev-all").removeClass("disabled");
        }

        if (currentPage > 2) {
            $("#minus2").show();
            $("#minus2 a").text(currentPage - 2);
        }

        if (currentPage < getLastPage()) {
            $("#plus1").show();
            $("#plus1 a").text(currentPage + 1);

            $("#next").removeClass("disabled");
            $("#next-all").removeClass("disabled");
        }

        if (currentPage < getLastPage() - 1) {
            $("#plus2").show();
            $("#plus2 a").text(currentPage + 2);
        }
    }

    function getLastPage() {
        return Math.floor(itemCount / pageSize) + 1;
    }

    function reloadImages() {
        fetch("/api/image/search")
            .then((r) => r.json())
            .then((r: string[]) => {
                itemCount = r.length;
                updatePageNumber();

                const $tbody = $("#tbody");
                $tbody.html("");

                r.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .forEach((el: any, i: number) => {
                        const $img = $("<img>");
                        $img.attr("src", "data:image/png;base64," + el.thumbnail);

                        const $tr = $("<tr>");

                        let $td = $("<td>");
                        $td.text(i + (currentPage - 1) * pageSize);
                        $tr.append($td);

                        $td = $("<td>");
                        $td.append($img);
                        $tr.append($td);

                        const $a = $("<a>");
                        $a.attr("href", el.url);
                        $a.attr("target", "_blank");
                        $a.text(el.url);

                        $td = $("<td>");
                        $td.append($a);
                        $tr.append($td);

                        $tbody.append($tr);
                    });
            });
    }
};
