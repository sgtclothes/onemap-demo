var paginationColliersPopup = function (map, objJson) {
    let features = objJson.features
    getColliersData(map, features[0].attributes)
    map.ObjMapView.popup.visible = false
    $("#loading-bar").hide()
    var records_per_page = 1;

    checkPage(features)
    changePage(currentPagePopup, records_per_page, features)

    $("#btn-previous-popup").click(function () {
        prevPage(currentPagePopup, records_per_page, features)
        checkPage(features)
        getColliersData(map, features[currentPagePopup - 1].attributes)
    })

    $("#btn-next-popup").click(function () {
        nextPage(currentPagePopup, records_per_page, features)
        checkPage(features)
        getColliersData(map, features[currentPagePopup - 1].attributes)
    })

}

var prevPage = function (currentPagePopup, records_per_page, objJson) {
    if (currentPagePopup > 1) {
        window.currentPagePopup--;
        changePage(currentPagePopup, records_per_page, objJson);
    }
}

var nextPage = function (currentPagePopup, records_per_page, objJson) {
    if (currentPagePopup < objJson.length) {
        window.currentPagePopup++;
        changePage(currentPagePopup, records_per_page, objJson);
    }
}

var changePage = function (page, records_per_page, objJson) {
    var page_span = document.getElementById("page-number-popup");

    // Validate page
    if (page < 1) page = 1;
    if (page > objJson.length) page = objJson.length

    page_span.innerHTML = currentPagePopup + "/" + objJson.length;
}

var checkPage = function (objJson) {
    if (objJson.length > 1) {
        if (currentPagePopup == 1) {
            $("#btn-previous-popup").css("visibility", "hidden")
        } else {
            $("#btn-previous-popup").css("visibility", "visible")
        }

        if (currentPagePopup == objJson.length) {
            $("#btn-next-popup").css("visibility", "hidden")
        } else {
            $("#btn-next-popup").css("visibility", "visible")
        }
    } else {
        $("#btn-previous-popup").css("visibility", "hidden")
        $("#page-number-popup").css("visibility", "hidden")
        $("#btn-next-popup").css("visibility", "hidden")
    }

}