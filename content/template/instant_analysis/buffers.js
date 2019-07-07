function bufferRadius(GIS,map){
    $(document).ready(function(){
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                $(".form-buffer-"+value).find('button.btn-create-buffer').each(function(){
                    $(this).on("click", function(event){
                        event.stopImmediatePropagation();
                        let distance = parseFloat($(this).closest(".text-right").prev().prev().children()[1].value)
                        let unit = $(this).closest(".text-right").prev().children()[1].value

                        var unitnum
                        if (unit == "kilometers") {
                            unitnum = 3
                        } else if (unit == "miles") {
                            unitnum = 4
                        } 
                        else {
                            unitnum = 5
                        }
                        
                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()
                        let title = value+latitude+longitude+distance+unitnum
                        let graphicslayers = map.ObjMap.layers.items
                        let validate

                        for (let i = 0; i < graphicslayers.length; i++) {
                            if (graphicslayers[i].title === title) {
                                validate = true
                            }
                        }
                        
                        if (validate) {
                            alert('Buffer radius with that distance and unit already exists');
                        }
                        else {
                            let radius = new GIS.Buffer.Radius(
                                map.ObjMap,
                                map.ObjMapView,
                                latitude,
                                longitude
                            );
                            radius.setTitle(title)
                            radius.setUnit(unit);
                            radius.setRadius(distance);

                            map.ObjMapView.popup.dockEnabled= true
                            map.ObjMapView.popup.dockOptions.breakpoint = false
                            map.ObjMapView.popup.dockOptions.position = 'bottom-right'
                            radius.create();

                            $(this).closest(".text-right").prev().prev().find('input[type=text].distance').prop('disabled', true)
                            $(this).closest(".text-right").prev().find('select.select-unit').prop('disabled', true)
                            $(this).prop('disabled', true)
                        }
                    })
                })
                $(".form-buffer-"+value).find('button.remove-buffer').each(function(){
                    $(this).on("click", function(){
                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()

                        let distance =  parseFloat($(this).closest("h4").next()[0].children[0].children[1].value)
                        let unit =  $(this).closest("h4").next()[0].children[1].children[1].value
                        var unitnum
                        if (unit == "kilometers") {
                            unitnum = 3
                        } else if (unit == "miles") {
                            unitnum = 4
                        } 
                        else {
                            unitnum = 5
                        }

                        let title = value+latitude+longitude+distance+unitnum

                        let graphicslayers = map.ObjMap.layers.items
                        for (let i = 0; i < graphicslayers.length; i++) {
                            if (graphicslayers[i].title === title) {
                                // console.log(graphicslayers[i].title.substring(0, 5))
                                map.ObjMap.remove(graphicslayers[i])
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
            var graphics = map.ObjMapView.graphics.items
            if (graphicslayers.length > 0 || graphics.length > 0) {
                //lat & lon input
                let getValue = $(this).closest('.form-group.row').next().next()[0].className
                let valueArr = getValue.split('-')
                let value = valueArr[2]
                let latitude = $(".latitude-form-"+value).val()
                let longitude = $(".longitude-form-"+value).val()

                // buffer
                let distance = [];
                let unit = []
    
                $(this).closest("div.rows").find(".distance").each(function(){
                    let dis = parseFloat($(this).val())
                    distance.push(dis)
                })
                $(this).closest("div.rows").find(".select-unit").each(function(){
                    if ($(this).val() == "kilometers") {
                        unit.push(3)
                    } else if ($(this).val() == "miles") {
                        unit.push(4)
                    } 
                    else {
                        unit.push(5)
                    }
                })

                let titleRadius = []

                for (let s = 0; s < unit.length; s++) {
                    titleRadius.push(value+latitude+longitude+distance[s]+unit[s])
                }

                for (let rdst = 0; rdst < titleRadius.length; rdst++) {
                    for (let h = 0; h < graphicslayers.length; h++) {
                        if (graphicslayers[h].title == titleRadius[rdst]) {
                            map.ObjMap.remove(graphicslayers[h])
                        }
                    }
                }

                //driveTime
                let distanceTime  = []
                let unitTime = []

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

                // delete point marker
                let id = latitude.toString()+longitude.toString()
                for (let a = 0; a < graphics.length; a++) {
                    if (graphics[a].attributes.id == id) {
                        map.ObjMapView.graphics.remove(graphics[a])
                    }
                }
            }
            $(this).closest("div.rows").remove();
        });
    })
}