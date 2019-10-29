var measurementHover = function (condition) {
    $(document).on('mouseenter mouseleave', "#contextmenu-measurement", function (event) {
        if (event.type === 'mouseenter') {
            if (!hoveredMeasurement) {
                hoveredMeasurement = true
                hoveredDraw = false
                let container = $(this).parents(".contextmenu-container")
                let position = getPos($(this)[0])
                let x = position.x
                let y = position.y
                let menu = []
                let strMenu = ""
                if (condition.includes("point")) {
                    menu.push('<div id="contextmenu-point"><i class="mi-fiber-manual-record"></i>Point</div>')
                }
                if (condition.includes("polygon")) {
                    menu.push('<div id="contextmenu-polygon"><i class="mi-crop-square"></i>Polygon</div>')
                }
                if (condition.includes("polyline")) {
                    menu.push('<div id="contextmenu-polyline"><i class="mi-show-chart"></i>Polyline</div>')
                }
                if (condition.includes("rectangle")) {
                    menu.push('<div id="contextmenu-rectangle"><i class="mi-crop-16-9"></i>Rectangle</div>')
                }
                for (let i = 0; i < menu.length; i++) {
                    strMenu += menu[i]
                }
                $(container).append("<div style='position:absolute;' id='subcontextmenum'>")
                $("#subcontextmenum").css({
                    "left": x + 110 + 'px',
                    "top": y - 5 + 'px'
                }).append($(strMenu))
                //Switch condition 
                if ($("#subcontextmenud").length) {
                    $("#subcontextmenud").remove()
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