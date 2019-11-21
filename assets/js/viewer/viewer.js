var toggleViewer = function (toggle) {
    if (toggle == "open") {
        $("#myViewer").css("width", "350px")
        $("#main").css("margin-left", "350px")
    } else if (toggle == "close") {
        $("#myViewer").css("width", "0")
        $("#main").css("margin-left", "0")
    }
}

$(document).delegate("p[name='select-all-property']", "click", function () {
    var property = $("input[name='select-property']")
    var temp = []
    for (let i = 0; i < property.length; i++) {
        if ($(property[i]).prop("checked") == false) {
            temp.push("unchecked")
        } else {
            temp.push("checked")
        }
    }
    if (temp.includes("unchecked")) {
        for (let i = 0; i < property.length; i++) {
            if ($(property[i]).prop("checked") == false) {
                $(property[i]).prop("checked", true)
            }
        }
    } else {
        for (let i = 0; i < property.length; i++) {
            $(property[i]).prop("checked", false)
        }
    }
})

$(document).delegate("p[name='select-all-department']", "click", function () {
    var department = $("input[name='select-department']")
    var temp = []
    for (let i = 0; i < department.length; i++) {
        if ($(department[i]).prop("checked") == false) {
            temp.push("unchecked")
        } else {
            temp.push("checked")
        }
    }
    if (temp.includes("unchecked")) {
        for (let i = 0; i < department.length; i++) {
            if ($(department[i]).prop("checked") == false) {
                $(department[i]).prop("checked", true)
            }
        }
    } else {
        for (let i = 0; i < department.length; i++) {
            $(department[i]).prop("checked", false)
        }
    }
})

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