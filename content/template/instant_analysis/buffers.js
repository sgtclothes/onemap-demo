function bufferRadius(GIS,map){
    $(document).ready(function(){
        var radiusArr = []
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                $(".form-buffer-"+value).find('button.btn-create-buffer').each(function(){
                    $(this).on("click", function(event){
                        event.stopImmediatePropagation();
                        let radius = new GIS.Buffer.Radius(
                            map.ObjMap,
                            map.ObjMapView,
                            $(".latitude-form-"+value).val(),
                            $(".longitude-form-"+value).val()
                        );
                        let distance = parseFloat($(this).closest(".text-right").prev().prev().children()[1].value)
                        let unit = $(this).closest(".text-right").prev().children()[1].value
                        radius.setUnit(unit);
                        radius.setRadius(distance);

                        let radiusPromise = new Promise(function(resolve, reject) {
                            radius.create(resolve);
                        });

                        radiusPromise.then(function() {
                            let inputFeature = radius.ParamsCatchment;
                            let graphicsLayers = radius.CircleGraphic[0]
                            inputFeature.spatialReference.wkid = 102100
                            inputFeature.spatialReference.latestWkid = 3857
                            let catchmentParams = {
                                f: "json",
                                "env:outSR": 4326,
                                "env:processSR": 4326,
                                Input_Feature: JSON.stringify(inputFeature)
                            };
                            
                            let catchment = new GIS.Buffer.Catchment();

                            let catchmentPromise = new Promise(function(resolve, reject) {
                                catchment.setServiceUrl(
                                    "http://tig.co.id/ags/rest/services/GP/v2_catchment/GPServer/catchment_select_table"
                                );
                                catchment.setParams(catchmentParams,resolve);
                            });

                            catchmentPromise.then(function() {
                                catchment.run(graphicsLayers);
                            });
                        })    
                        radiusArr.push(radius)
                        $(this).closest(".text-right").prev().prev().find('input[type=number].distance').prop('disabled', true)
                        $(this).closest(".text-right").prev().find('select.select-unit').prop('disabled', true)
                        $(this).prop('disabled', true)
                    
                    })
                })
                $(".form-buffer-"+value).find('button.remove-buffer').each(function(){
                    $(this).on("click", function(){
                        let distanceCurrent =  parseFloat($(this).closest("h4").next()[0].children[0].children[1].value)
                        let unitCurrent =  $(this).closest("h4").next()[0].children[1].children[1].value
                        for (let b = 0; b < radiusArr.length; b++) {
                            if (radiusArr[b].Radius == distanceCurrent && radiusArr[b].RadiusUnit == unitCurrent) {
                                for (let i = 0; i < radiusArr[b].CircleGraphic.length; i++) {
                                    map.ObjMapView.graphics.remove(radiusArr[b].CircleGraphic[i])
                                }
                                map.ObjMapView.graphics.remove(radiusArr[b].PointGraphic)
                            }
                        }
                        $(this)
                        .closest(".collapsible")
                        .remove();
                    })
                })
            })
        })
        // delete all buffers and drive time per rows
        $("#form-list").on("click", ".btn-delete", function() {
            var graphicslayers = map.ObjMap.layers.items
            if (radiusArr.length > 0 || graphicslayers.length > 0) {
                // buffer
                let distance = [];
                let unit = []
    
                $(this).closest("div.rows").find(".distance").each(function(){
                    let dis = parseFloat($(this).val())
                    distance.push(dis)
                })
                $(this).closest("div.rows").find(".select-unit").each(function(){
                    unit.push($(this).val());
                })
                
                for (let a = 0; a < distance.length; a++) {
                    for (let b = 0; b < radiusArr.length; b++) {
                        if (radiusArr[b].Radius == distance[a] && radiusArr[b].RadiusUnit == unit[a]) {
                            for (let i = 0; i < radiusArr[b].CircleGraphic.length; i++) {
                                map.ObjMapView.graphics.remove(radiusArr[b].CircleGraphic[i])
                            }
                            map.ObjMapView.graphics.remove(radiusArr[b].PointGraphic)
                        }
                    }
                }

                //driveTime
                let distanceTime  = []
                let unitTime = []
                let getValue = $(this).closest('.form-group.row').next().next()[0].className
                let valueArr = getValue.split('-')
                let value = valueArr[2]
                let latitude = $(".latitude-form-"+value).val()
                let longitude = $(".longitude-form-"+value).val()

                $(this).closest("div.rows").find(".distance-time").each(function(){
                    let disTime = parseFloat($(this).val())
                    distanceTime.push(disTime);
                })
                $(this).closest("div.rows").find(".select-unit-time").each(function(){
                    if ($(this).val() == "minutes") {
                        unitTime.push(1)
                    } else {
                        unitTime.push(2)
                    }
                })

                let title = []

                for (let r = 0; r < unitTime.length; r++) {
                    title.push(value+latitude+longitude+distanceTime[r]+unitTime[r])
                }

                for (let t = 0; t < title.length; t++) {
                    for (let i = 0; i < graphicslayers.length; i++) {
                        if (graphicslayers[i].title == title[t]) {
                            map.ObjMap.remove(graphicslayers[i])
                        }
                    }
                }
            }
            $(this).closest("div.rows").remove();
        });
    })
}