async function dashboardBoot(GIS) {

    window.GIS = GIS
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint, 'osm');
    map.render()

    map.ObjMapView.container = "viewDiv"
    map.ObjMapView.zoom = 4
    map.ObjMapView.center = [118, -3.8]

    window.colliersPropertyStaging = new ESRI.FeatureLayer({
        url: "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0",
        id: "land-existing"
    })

    map.ObjMap.add(colliersPropertyStaging)

    console.log(map.ObjMap)

    getData(colliersPropertyStaging, "on-progress", "yellow", "property_type='house'", ["*"])
    getData(colliersPropertyStaging, "request", "blue", "property_type='office'", ["*"])

    async function getData(propLayer, id, color, where, outFields) {
        var count = 0
        var sRenderer = {
            type: "simple",
            symbol: {
                type: "simple-marker",
                size: "4px",
                color: color
            }
        };

        var graArr = [];
        var janQuery = propLayer.createQuery();
        janQuery.where = where;
        janQuery.outFields = outFields;
        janQuery.returnGeometry = true;

        await propLayer.queryFeatures(janQuery).then(function (results) {
            for (feature of results.features) {
                var janGraphic = new ESRI.Graphic({
                    geometry: feature.geometry,
                });
                graArr.push(janGraphic);
            }
            count = graArr.length
            var layer = new ESRI.FeatureLayer({
                id: id,
                source: graArr,
                renderer: sRenderer,
                objectIdField: "ObjectID"
            })
            console.log(layer)
            map.ObjMap.add(layer)
        });
        return count
    }

    window.selectedProperty = ["Land Existing", "On Progress", "Request"]
    $(document).ready(function () {
        $('#ref-dashboard').click(function () {
            $('html, body').animate({
                scrollTop: $("#menu-dashboard").offset().top - 100
            }, 0);
        });
    });

    function switchProperty() {
        let propertyList = [
            "Land Existing",
            "On Progress",
            "Request",
            "Competitor"
        ]

        for (let i = 0; i < selectedProperty.length; i++) {
            $("#bar" + (i + 1)).text(selectedProperty[i])
            if (propertyList.includes(selectedProperty[i])) {
                let index = propertyList.indexOf(selectedProperty[i])
                propertyList.splice(index, 1)
            }
        }

        $(".dropdown-custom").hover(
            function () {
                for (let i = 0; i < propertyList.length; i++) {
                    let a = $("<a>")
                    $(a).text(propertyList[i])
                    $(a).attr("href", "#")
                    $(a).attr("class", "dropdown-a")
                    $(".dropdown-content-custom").append(a)
                }
            },
            function () {
                $(".dropdown-content-custom").empty()
            }
        )

        $(document).delegate(".dropdown-a", "click", async function () {
            var td = $(this).parents("tr").find("td")[1]
            var img = $(this).parents("tr").find("img")
            var subHeading = $(td).find("div.widget-subheading")
            var subNumbers = $(td).find("div.widget-numbers")
            var prevText = $(subHeading).text()
            var count = $(subNumbers).text()
            if ($(this).text() == "Land Existing") { } else if ($(this).text() == "On Progress") {
                count = 5
            } else if ($(this).text() == "Request") {
                count = 10
            } else if ($(this).text() == "Competitor") {
                await getData(colliersPropertyStaging, "competitor", "red", "property_type='Hotel'", ["*"]).then(function (results) {
                    count = results
                })
                $(subHeading).text("Competitor")
                $(subNumbers).text(count)
                $(img).attr("src", "assets/images/dashboard/04_competitor.png")
            }
            if (selectedProperty.includes(prevText)) {
                let indexSelectedProperty = selectedProperty.indexOf(prevText)
                selectedProperty.splice(indexSelectedProperty, 1)
                selectedProperty.push($(td).text())

                let indexPropertyList = propertyList.indexOf($(td).text())
                propertyList.splice(indexPropertyList, 1)
                propertyList.push(prevText)
                if (prevText == "Land Existing") {
                    map.ObjMap.remove(map.ObjMap.findLayerById("land-existing"))
                }
            }
            $(".dropdown-content-custom").empty()
        })
    }

    switchProperty()
}