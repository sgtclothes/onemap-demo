var analyzeHover = function (condition) {
    $(document).on('mouseenter mouseleave', "#contextmenu-analyze-polygon", function (event) {
        if (event.type === 'mouseenter') {
            if (!hoveredDraw) {
                hoveredDraw = true
                hoveredMeasurement = false
                let container = $(this).parents(".contextmenu-container")
                let position = getPos($(this)[0])
                let x = position.x
                let y = position.y
                let menu = []
                let strMenu = ""
                if (condition.includes("radius")) {
                    menu.push('<div id="contextmenu-radius"><i class="mi-donut-large"></i>Radius</div>')
                }
                if (condition.includes("drivingtime")) {
                    menu.push('<div id="contextmenu-driving-time"><i class="mi-access-alarms"></i>Driving Time</div>')
                }
                if (condition.includes("drivingdistance")) {
                    menu.push('<div id="contextmenu-driving-distance"><i class="mi-refresh"></i>Driving Distance</div>')
                }
                if (condition.includes("manual")) {
                    menu.push('<div id="contextmenu-manual"><i class="mi-mode-edit"></i>Manual</div>')
                }

                for (let i = 0; i < menu.length; i++) {
                    strMenu += menu[i]
                }
                $(container).append("<div style='position:absolute;' id='subcontextmenud'>")
                $("#subcontextmenud").css({
                    "left": x + 110 + 'px',
                    "top": y - 5 + 'px'
                }).append($(strMenu))
                //Switch condition 
                if ($("#subcontextmenum").length) {
                    $("#subcontextmenum").remove()
                }
            }
        }
    });

    function getPos(el) {
        for (var lx = 0, ly = 0;
            el != null;
            lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return { x: lx, y: ly };
    }
}