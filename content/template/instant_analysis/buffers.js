function bufferRadius(GIS,map){
    $(document).ready(function(){
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                $(".form-buffer-"+value).find('button.btn-create-buffer').each(function(){
                    $(this).on("click", function(event){
                        event.stopImmediatePropagation();
                        let distance = $(this).closest(".text-right").prev().prev().children()[1].value
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
                            radius.setValue(value);
                            radius.setOptions(0)

                            map.ObjMapView.popup.dockOptions.breakpoint = false
                            map.ObjMapView.popup.dockOptions.position = 'bottom-right'

                            radius.create();
                            $(this).closest(".text-right").prev().prev().find('input[type=text].distance').prop('disabled', true)
                            $(this).closest(".text-right").prev().find('select.select-unit').prop('disabled', true)
                            $(this).prop('disabled', true)
                            $('.anly-poi-'+value).removeAttr('disabled')
                        }
                    })
                })
                $(".form-buffer-"+value).find('button.remove-buffer').each(function(){
                    $(this).on("click", function(){
                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()

                        let distance =  $(this).closest("h4").next()[0].children[0].children[1].value
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
                $(".anly-poi-"+value).on('click',function(){
                    let graphicsLayers = map.ObjMap.layers.items
                    let buffer = graphicsLayers.filter(o => o.value === value)
                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(){
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let poiName = $(this).attr('poiname')
                                let poiName2 = $(this).attr('name-of-poi')

                                for (let i = 0; i < buffer.length; i++) {
                                    if (parseInt(buffer[i].options) === 0) {
                                        let unit = buffer[i].graphics.items[0].geometry.radiusUnit
                                        let distance = buffer[i].graphics.items[0].geometry.radius
                                        let latitude = buffer[i].graphics.items[0].geometry.center.latitude
                                        let longitude = buffer[i].graphics.items[0].geometry.center.longitude

                                        let radiusPOI = new GIS.Analysis.BufferPOI(map.ObjMap, map.ObjMapView, layerId, poiName)
                                        let unitnum
                                        if (unit == "kilometers") {
                                            unitnum = 'km'
                                        } else if (unit == "miles") {
                                            unitnum = 'mi'
                                        } 
                                        else {
                                            unitnum = 'm'
                                        }
                                
                                        let title = "Buffer "+distance+" "+unitnum+" "+poiName
                                        radiusPOI.setTitle(title)

                                        radiusPOI.setDistanceAndUnit(distance,unit)
                                        radiusPOI.setGeometryBuffer(latitude,longitude)

                                        let promise = new Promise(function(resolve, reject) {
                                            let layers = map.ObjMap.layers.items
                                            let check = layers.find(o => o.title === title)
                                            if (check === undefined) {
                                                radiusPOI.render(resolve)
                                            }
                                        });

                                        promise.then(function() {
                                            let layers = map.ObjMap.layers.items
                                            let findPoiName = layers.find(o => o.title === title)
                                            let length = findPoiName.graphics.length

                                            if (length>0) {
                                                title = title.split(' ')
                                                title = title[0]+" "+title[1]+" "+title[2]

                                                if (poiName === "{POI_NAME}") {
                                                    poiName = poiName2
                                                }
                                                
                                                let row = "<tr><td>"+latitude.toString()+"</td><td>"+longitude.toString()+"</td><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
                                                $('#instant-analysis-result-row').prepend(row)
                                                let seen = {};
                                                $('#instant-analysis-result-row tr').each(function() {
                                                    let txt = $(this).text();
                                                    if (seen[txt]) {
                                                        $(this).remove();
                                                    }
                                                    else {
                                                        seen[txt] = true;
                                                    }
                                                });
                                                $('#instantAnalysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden"
                                                })
                                            }
                                        });   
                                    }
                                    else if (parseInt(buffer[i].options) !== 0){
                                        let drivePOI = new GIS.Analysis.BufferPOI(map.ObjMap, map.ObjMapView, layerId, poiName)

                                        let anly = JSON.parse(buffer[i].anly)
                                        let unit = anly.unit
                                        let distance = anly.distance
                                        let latitude = anly.latitude
                                        let longitude = anly.longitude
                                        let titleLayer

                                        if (unit == "minutes") {
                                            unitnum = '1'
                                            titleLayer = "Driving Time "+distance+" "+unit+" "+poiName
                                        } else if (unit == "hours") {
                                            unitnum = '2'
                                            titleLayer = "Driving Time "+distance+" "+unit+" "+poiName
                                        }
                                        else if (unit == "kilometers") {
                                            unitnum = '6'
                                            titleLayer = "Driving Distance "+distance+" km "+poiName
                                        } else if (unit == "miles") {
                                            unitnum = '7'
                                            titleLayer = "Driving Distance "+distance+" mi "+poiName
                                        } 
                                        else {
                                            unitnum = '8'
                                            titleLayer = "Driving Distance "+distance+" m "+poiName
                                        }
                                        drivePOI.setTitle(titleLayer)

                                        let val = value.toString()
                                        let title = val+latitude+longitude+distance+unitnum
                                        for (let c = 0; c < graphicsLayers.length; c++) {
                                            if (graphicsLayers[c].title === title) {
                                                drivePOI.setGeometryDriving(
                                                    graphicsLayers[c].graphics.items[0].geometry
                                                )
                                            }
                                        }
                                        let promise = new Promise(function(resolve, reject) {
                                            let layers = map.ObjMap.layers.items
                                            let check = layers.find(o => o.title === titleLayer)
                                            if (check === undefined) {
                                                drivePOI.render(resolve) 
                                            }
                                        });

                                        promise.then(function() {
                                            let layers = map.ObjMap.layers.items
                                            let findPoiName = layers.find(o => o.title === titleLayer)
                                            let length = findPoiName.graphics.length

                                            if (length>0) {
                                                titleLayer = titleLayer.split(' ')
                                                titleLayer = titleLayer[0]+" "+titleLayer[1]+" "+titleLayer[2]+" "+titleLayer[3]

                                                if (poiName === "{POI_NAME}") {
                                                    poiName = poiName2
                                                }

                                                let row = "<tr><td>"+latitude+"</td><td>"+longitude+"</td><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
                                                $('#instant-analysis-result-row').prepend(row)
                                                let seen = {};
                                                $('#instant-analysis-result-row tr').each(function() {
                                                    let txt = $(this).text();
                                                    if (seen[txt]) {
                                                        $(this).remove();
                                                    }
                                                    else {
                                                        seen[txt] = true;
                                                    }
                                                });
                                                $('#instantAnalysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden"
                                                })
                                            }
                                        });
                                    }
                                }
                            }
                        })
                    })

                    $('input:checkbox.an_property').each(function(){
                        $(this).click(function(){
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let poiName = $(this).attr('poiname')
                                let poiName2 = $(this).attr('name-of-poi')

                                for (let i = 0; i < buffer.length; i++) {
                                    if (parseInt(buffer[i].options) === 0) {
                                        let unit = buffer[i].graphics.items[0].geometry.radiusUnit
                                        let distance = buffer[i].graphics.items[0].geometry.radius
                                        let latitude = buffer[i].graphics.items[0].geometry.center.latitude
                                        let longitude = buffer[i].graphics.items[0].geometry.center.longitude

                                        let radiusPOI = new GIS.Analysis.BufferProperty(map.ObjMap,layerId, poiName)

                                        let unitnum
                                        if (unit == "kilometers") {
                                            unitnum = 'km'
                                        } else if (unit == "miles") {
                                            unitnum = 'mi'
                                        } 
                                        else {
                                            unitnum = 'm'
                                        }

                                        let title = "Buffer "+distance+" "+unitnum+" "+poiName
                                        radiusPOI.setTitle(title)

                                        radiusPOI.setDistanceAndUnit(distance,unit)
                                        radiusPOI.setGeometryBuffer(latitude,longitude)

                                        let promise = new Promise(function(resolve, reject) {
                                            let layers = map.ObjMap.layers.items
                                            let check = layers.find(o => o.title === title)
                                            if (check === undefined) {
                                                radiusPOI.render(resolve)   
                                            }
                                        });

                                        promise.then(function() {
                                            let layers = map.ObjMap.layers.items
                                            let findPoiName = layers.find(o => o.title === title)
                                            let length = findPoiName.graphics.length
                                            
                                            if (length>0) {
                                                title = title.split(' ')
                                                title = title[0]+" "+title[1]+" "+title[2]
        
                                                if (poiName === "{buildingname}") {
                                                    poiName = poiName2
                                                }
        
                                                let row = "<tr><td>"+latitude.toString()+"</td><td>"+longitude.toString()+"</td><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
                                                $('#instant-analysis-result-row').prepend(row)
                                                let seen = {};
                                                $('#instant-analysis-result-row tr').each(function() {
                                                    let txt = $(this).text();
                                                    if (seen[txt]) {
                                                        $(this).remove();
                                                    }
                                                    else {
                                                        seen[txt] = true;
                                                    }
                                                });
                                                $('#instantAnalysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden"
                                                })
                                            }
                                        });
                                    }
                                    else if (parseInt(buffer[i].options) !== 0){
                                        let drivePOI = new GIS.Analysis.BufferProperty(map.ObjMap,layerId, poiName)
                                        let titleLayer 

                                        let anly = JSON.parse(buffer[i].anly)
                                        let unit = anly.unit
                                        let distance = anly.distance
                                        let latitude = anly.latitude
                                        let longitude = anly.longitude

                                        if (unit == "minutes") {
                                            unitnum = '1'
                                            titleLayer = "Driving Time "+distance+" "+unit+" "+poiName
                                        } else if (unit == "hours") {
                                            unitnum = '2'
                                            titleLayer = "Driving Time "+distance+" "+unit+" "+poiName
                                        }
                                        else if (unit == "kilometers") {
                                            unitnum = '6'
                                            titleLayer = "Driving Distance "+distance+" km "+poiName
                                        } else if (unit == "miles") {
                                            unitnum = '7'
                                            titleLayer = "Driving Distance "+distance+" mi "+poiName
                                        } 
                                        else {
                                            unitnum = '8'
                                            titleLayer = "Driving Distance "+distance+" m "+poiName
                                        }
                                        drivePOI.setTitle(titleLayer)

                                        let val = value.toString()
                                        let title = val+latitude+longitude+distance+unitnum
                                        for (let c = 0; c < graphicsLayers.length; c++) {
                                            if (graphicsLayers[c].title === title) {
                                                drivePOI.setGeometryDriving(
                                                    graphicsLayers[c].graphics.items[0].geometry
                                                )
                                            }
                                        }
                                        let promise = new Promise(function(resolve, reject) {
                                            let layers = map.ObjMap.layers.items
                                            let check = layers.find(o => o.title === titleLayer)
                                            if (check === undefined) {
                                                drivePOI.render(resolve) 
                                            }
                                        });

                                        promise.then(function() {
                                            let layers = map.ObjMap.layers.items
                                            let findPoiName = layers.find(o => o.title === titleLayer)
                                            let length = findPoiName.graphics.length

                                            if (length>0) {
                                                titleLayer = titleLayer.split(' ')
                                                titleLayer = titleLayer[0]+" "+titleLayer[1]+" "+titleLayer[2]+" "+titleLayer[3]

                                                if (poiName === "{buildingname}") {
                                                    poiName = poiName2
                                                }
                                                
                                                let row = "<tr><td>"+latitude+"</td><td>"+longitude+"</td><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
                                                $('#instant-analysis-result-row').prepend(row)
                                                let seen = {};
                                                $('#instant-analysis-result-row tr').each(function() {
                                                    let txt = $(this).text();
                                                    if (seen[txt]) {
                                                        $(this).remove();
                                                    }
                                                    else {
                                                        seen[txt] = true;
                                                    }
                                                });
                                                $('#instantAnalysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden"
                                                })
                                            }
                                        });
                                    }
                                }
                            }
                        })
                    })

                    $("#reset").click(function(){
                        $('input:checkbox.an_poi').each(function(){
                            $(this).prop('checked',false)
                        })
                        $('input:checkbox.an_property').each(function(){
                            $(this).prop('checked',false)
                        })
                    })
                })
            })
        })
        $("#closebtn").on('click',function(){
            map.ObjMap.removeAll()
            map.ObjMapView.graphics.removeAll()
            $('#instantAnalysisDiv').css('display', 'none')
            $('#contentAnalysisDiv').removeAttr("style")
            $('#instant-analysis-result-row').empty()
            $('div.rows').each(function(){
                $(this).remove()
            });
            $('#name_analysis').val('')
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
                    let dis = $(this).val()
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
                    let disTime = $(this).val()
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

                // driving distance
                let distance2  = []
                let unit2 = []

                $(this).closest("div.rows").find(".distance-time-distance").each(function(){
                    let dis2 = $(this).val()
                    distance2.push(dis2);
                })
                $(this).closest("div.rows").find(".select-unit-time-distance").each(function(){
                    if ($(this).val() == "kilometers") {
                        unit2.push(6)
                    } else if ($(this).val() == "miles") {
                        unit2.push(7)
                    } else {
                        unit2.push(8)
                    }
                })

                let title2 = []

                for (let rr = 0; rr < unit2.length; rr++) {
                    title2.push(value+latitude+longitude+distance2[rr]+unit2[rr])
                }

                for (let n = 0; n < title2.length; n++) {
                    for (let q = 0; q < graphicslayers.length; q++) {
                        if (graphicslayers[q].title == title2[q]) {
                            map.ObjMap.remove(graphicslayers[q])
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