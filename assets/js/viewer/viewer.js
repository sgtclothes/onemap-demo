var toggleViewer = function (toggle) {
    if (toggle == "open") {
        actionElement(".popupFilter", "remove")
        $("#myViewer").css("width", "350px")
        $("#main").css("margin-left", "350px")
    } else if (toggle == "close") {
        $("#myViewer").css("width", "0")
        $("#main").css("margin-left", "0")
    }
}

$(document).delegate(".master-expand-external-data", "click", function () {
    $("#table-external-data").toggle()
    if ($("#table-external-data").css("display") == "table") {
        $(this).find("div").css("margin-bottom", "0px")
    } else {
        $(this).find("div").css("margin-bottom", "20px")
    }
})

$(document).delegate("#viewer-nav", "click", function () {
    if ($("#myViewer").css("width") > "0px") {
        toggleViewer("close");
    } else if (
        $("#mySiteAnalysis").css("width") > "0px" ||
        $("#myAnalysisPOI").css("width") > "0px"
    ) {
        $("#mySiteAnalysis").css("width") = "0";
        $("#myAnalysisPOI").css("width") = "0";
        toggleViewer("open");
    } else {
        toggleViewer("open");
    }

    if ($("#mySidenav").css("width") > "0px") {
        if (
            $("#mySidenav").hasClass("panel-left")
        ) {
            $("#mySidenav").removeClass("panel-left");
            $("#mySidenav").addClass("panel-right");
            $("#main").css("margin-right") = "320px";
            $("#mySidenav").attr("style", "width:320px;");
        }
    }
});