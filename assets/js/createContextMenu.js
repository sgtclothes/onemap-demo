function createContextMenu(map, event, condition) {
    let menu = []
    let strMenu = ""
    if (condition.includes("radius")) {
        menu.push('<div id="contextmenu-radius"><i class="mi-donut-large"></i>Radius</div>')
    }
    if (condition.includes("drivingtime")) {
        menu.push('<div id="contextmenu-driving"><i class="mi-access-alarms"></i>Driving Time</div>')
    }
    if (condition.includes("analyze")) {
        menu.push('<div id="contextmenu-analyze"><i class="mi-timeline"></i>Analyze</div>')
    }
    if (condition.includes("remove")) {
        menu.push('<div id="contextmenu-remove"><i class="esri-icon-trash"></i>Remove</div>')
    }

    for (let i = 0; i < menu.length; i++) {
        strMenu += menu[i]
    }

    for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {
        if ("livePointing" in map.ObjMapView.graphics.items[i].attributes) {
            var div = $('<div class="image-wrapper-a">')
                .css({
                    "left": event.x + 'px',
                    "top": event.y + 50 + 'px'
                })
                .append($(
                    strMenu
                ))
                .appendTo(document.body);
        }
    }
    if ($('.image-wrapper-a').length) {
        var elem = $('.image-wrapper-a'),
            top = elem.offset().top,
            left = elem.offset().left,
            width = elem.width(),
            height = elem.height()
        if (left + width > $("#mapDiv").width()) {
            $(elem).css("left", event.x - 100)
        }
        if (top + height > $("#mapDiv").height()) {
            $(elem).css("top", event.y - 10)
        }
    }
}