function bufferRadius(GIS,map){
    $(document).ready(function(){
        var radiusArr = []
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                $(".form-buffer-"+value).find('button.btn-create-buffer').each(function(){
                    $(this).on("click", function(){
                        let radius = new GIS.Buffer.Radius(
                            map.ObjMap,
                            map.ObjMapView,
                            $(".latitude-form-"+value).val(),
                            $(".longitude-form-"+value).val()
                        );
                        let distanceStr = $(this).closest(".text-right").prev().prev().children()[1].value
                        let distance = distanceStr.split(',')
                        distance = [...new Set(distance)]
                        for (let d = 0; d < distance.length; d++) {
                            if (distance[d] == "") {
                                distance.splice(d,1)
                            }
                        }
                        let unit = $(this).closest(".text-right").prev().children()[1].value
                        radius.setUnit(unit);
                        radius.setRadius(distance);
                        radius.create()
                        radiusArr.push(radius)
                        $(this).closest(".text-right").prev().prev().find('input[type=text].distance').prop('readonly', true)
                        $(this).closest(".text-right").prev().find('select.select-unit').prop('disabled', true)
                        console.log(radius.Result)
                    })
                })
                $(".form-buffer-"+value).find('button.remove-buffer').each(function(){
                    $(this).on("click", function(){
                        let distanceStr =  $(this).closest("h4").next()[0].childNodes[3].childNodes[3].value
                        let distance = distanceStr.split(',')
                        distance = [...new Set(distance)]
                        for (let d = 0; d < distance.length; d++) {
                            if (distance[d] == "") {
                                distance.splice(d,1)
                            }
                        }
                        let distanceCurrent = distance.toString()
                        let unitCurrent =  $(this).closest("h4").next()[0].childNodes[5].childNodes[3].value
                        for (let b = 0; b < radiusArr.length; b++) {
                            if (radiusArr[b].Radius.toString() == distanceCurrent && radiusArr[b].RadiusUnit == unitCurrent) {
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
                    let dis = $(this).val()
                    let dist = dis.split(',')
                    dist = [...new Set(dist)]
                    for (let d = 0; d < dist.length; d++) {
                        if (dist[d] == "") {
                            dist.splice(d,1)
                        }
                    }
                    let distanceCurrent = dist.toString()
                    distance.push(distanceCurrent)
                })
                $(this).closest("div.rows").find(".select-unit").each(function(){
                    unit.push($(this).val());
                })
                
                for (let a = 0; a < distance.length; a++) {
                    for (let b = 0; b < radiusArr.length; b++) {
                        if (radiusArr[b].Radius.toString() == distance[a] && radiusArr[b].RadiusUnit == unit[a]) {
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
                    let disTime = $(this).val();
                    let distTime = disTime.split(',')
                    distTime = [...new Set(distTime)]
                    for (let d = 0; d < distTime.length; d++) {
                        if (distTime[d] == "") {
                            distTime.splice(d,1)
                        }
                    }
                    let distanceTimeCurrent = distTime.toString()
                    distanceTime.push(distanceTimeCurrent);
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