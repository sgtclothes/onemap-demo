$(document).delegate(".titleLegendProperty", "click", function () {
    $(".div-tableLegendProperty").toggle()
    if ($(".titleLegendProperty").find("i").hasClass("mi-keyboard-arrow-down")) {
        $(".titleLegendProperty").find("i").removeClass("mi-keyboard-arrow-down").addClass("mi-keyboard-arrow-up")
    } else {
        $(".titleLegendProperty").find("i").removeClass("mi-keyboard-arrow-up").addClass("mi-keyboard-arrow-down")
    }
})

var checkLegend = async function (map, table, html) {
    let tableLegend = $(table)
    if (tableLegend.length < 1) {
        await $.get(html, function (data) {
            map.ObjMapView.ui.add($(data)[0], "bottom-right");
        });
    }
}

var setTitleLegend = function (element, title) {
    $(element).text(title)
}

var checkHeightLegend = function () {
    if ($(".tableLegendProperty").find("tr").length < 5 && legendOverflow == true) {
        window.legendOverflow = false
        $(".div-tableLegendProperty").css("height", "auto")
        $(".div-tableLegendProperty").css("overflow-y", "")
    }

    let tableLegend = $(".tableLegendProperty")
    if ($(tableLegend).children().children().length < 1) {
        $(".legendProperty").remove()
    }
}