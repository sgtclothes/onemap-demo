var createContextMenu = function (map, event, condition) {
    let menu = []
    let strMenu = ""
    if (condition.includes("measurement")) {
        menu.push('<div id="contextmenu-measurement"><i class="mi-straighten"></i>Measurement<i class="mi-keyboard-arrow-right"></i></div>')
    }
    if (condition.includes("draw")) {
        menu.push('<div id="contextmenu-analyze-polygon"><i class="mi-bubble-chart"></i>Analyze<i class="mi-keyboard-arrow-right"></i></div>')
    }
    if (condition.includes("analyze")) {
        menu.push('<div id="contextmenu-analyze"><i class="mi-timeline"></i>Analyze</div>')
    }
    if (condition.includes("view-popup")) {
        menu.push('<div id="contextmenu-view-popup"><i class="mi-speaker-notes"></i>View Popup</div>')
    }
    if (condition.includes("remove")) {
        menu.push('<div id="contextmenu-remove"><i class="esri-icon-trash"></i>Remove</div>')
    }

    for (let i = 0; i < menu.length; i++) {
        strMenu += menu[i]
    }

    let pointer = getLayerById(map, "pointer")

    if (pointer) {
        let imageWrapper = $('<div class="image-wrapper-a">')
            .css({
                "left": event.x + 'px',
                "top": event.y + 50 + 'px'
            })
            .append($(
                strMenu
            ))
        $('<div style="float:left" class="contextmenu-container">')
            .css({
                "width": "auto",
                "height": "auto"
            })
            .append($(imageWrapper))
            .appendTo(document.body);
    }

    if ($('.image-wrapper-a').length) {
        var elem = $('.image-wrapper-a'),
            top = elem.offset().top,
            left = elem.offset().left,
            width = elem.width(),
            height = elem.height()
        if (left + width > $("#mapDiv").width()) {
            $(elem).css("left", event.x - 150)
        }
        if (top + height > $("#mapDiv").height()) {
            $(elem).css("top", event.y - 10)
        }
    }

    if ($('#subcontextmenum').length) {
        var elem = $('#subcontextmenum'),
            top = elem.offset().top,
            left = elem.offset().left,
            width = elem.width(),
            height = elem.height()
        if (left + width > $("#mapDiv").width()) {
            $(elem).css("left", event.x - 150)
        }
        if (top + height > $("#mapDiv").height()) {
            $(elem).css("top", event.y - 10)
        }
    }

    if ($('#subcontextmenud').length) {
        var elem = $('#subcontextmenud'),
            top = elem.offset().top,
            left = elem.offset().left,
            width = elem.width(),
            height = elem.height()
        if (left + width > $("#mapDiv").width()) {
            $(elem).css("left", event.x - 150)
        }
        if (top + height > $("#mapDiv").height()) {
            $(elem).css("top", event.y - 10)
        }
    }
}

var closeContextMenu = function () {
    $('body').click(function (evt) {
        $(".contextmenu-container").remove()
    });
}