function analysispoi (GIS,map){
    $(document).ready(function(){
        let latitude
        let longitude
        let unit
        let distance
        let options
        let values
        $("#load-data-site-analysis").click(function(){
            $(this).find('input[name="get-point-for-analysis"]').each(function(){
                if($(this).is(":checked")){
                    $(this).closest('tr').find('button.btn-modal-form-poi').removeAttr("disabled")
                    $(this).closest('tr').find('i.icon-pin-alt').css("color","#4169e1")

                    latitude = $(this).attr('data-latitude')
                    longitude = $(this).attr('data-longitude')
                    unit = $(this).attr('data-unit')
                    distance = $(this).attr('data-distance')
                    options = $(this).attr('data-options')
                    values = $(this).attr('data-values')

                    if ($(this).attr('data-source')==='db') {
                        let valueArr = JSON.parse(values)
                        let option = JSON.parse(options)
                        let latitudeArr = JSON.parse(latitude)
                        latitudeArr = latitudeArr.map(x=>parseFloat(x))
                        let longitudeArr = JSON.parse(longitude)
                        longitudeArr = longitudeArr.map(x=>parseFloat(x))
                        let distanceArr = JSON.parse(distance)
                        let unitArr = JSON.parse(unit)
                        for (let p = 0; p < option.length; p++) {
                            for (let q = 0; q < option[p].length; q++) {
                                if (parseInt(option[p][q]) === 0) {
                                    let markerList = map.ObjMapView.graphics.items
                                    let findLat = markerList.find(o => o.geometry.latitude === latitudeArr[p])
                                    let findLong = markerList.find(o => o.geometry.longitude === longitudeArr[p])
                                    if (findLat === undefined && findLong === undefined) {
                                        let pointing = new GIS.Buffer.Pointing(
                                            map.ObjMapView,
                                            latitudeArr[p],
                                            longitudeArr[p]
                                        )
                                        pointing.render()   
                                    }

                                    let unitnum
                                    if (unitArr[p][q] === "kilometers") {
                                        unitnum = '3'
                                    } else if (unitArr[p][q] === "miles") {
                                        unitnum = '4'
                                    }
                                    else {
                                        unitnum = '5'
                                    }
                                    let latitude = latitudeArr[p]
                                    let longitude = longitudeArr[p]
                                    let distance = distanceArr[p][q].toString() 
                                    let title = valueArr[p]+latitude+longitude+distance+unitnum

                                    let graphicslayers = map.ObjMap.layers.items
                                    let findTitle = graphicslayers.find(o => o.title === title)

                                    if (findTitle === undefined){
                                        let radius = new GIS.Buffer.Radius(
                                            map.ObjMap,
                                            map.ObjMapView,
                                            latitude,
                                            longitude
                                        );
                                        radius.setTitle(title)
                                        radius.setUnit(unitArr[p][q]);
                                        radius.setRadius(distanceArr[p][q]);
            
                                        map.ObjMapView.popup.dockOptions.breakpoint = false
                                        map.ObjMapView.popup.dockOptions.position = 'bottom-right'
                                        radius.create();
                                    }
                                }
                                else if (parseInt(option[p][q]) !== 0) {
                                    let markerList = map.ObjMapView.graphics.items
                                    let findLat = markerList.find(o => o.geometry.latitude === latitudeArr[p])
                                    let findLong = markerList.find(o => o.geometry.longitude === longitudeArr[p])
                                    if (findLat === undefined && findLong === undefined) {
                                        let pointing = new GIS.Buffer.Pointing(
                                            map.ObjMapView,
                                            latitudeArr[p],
                                            longitudeArr[p]
                                        )
                                        pointing.render()   
                                    }
                                    let unitnum
                                    if (unitArr[p][q] == "minutes") {
                                        unitnum = '1'
                                    } else if (unitArr[p][q] == "hours") {
                                        unitnum = '2'
                                    }
                                    else if (unitArr[p][q] == "kilometers") {
                                        unitnum = '6'
                                    } else if (unitArr[p][q] == "miles") {
                                        unitnum = '7'
                                    } 
                                    else {
                                        unitnum = '8'
                                    }
                                    let latitude = latitudeArr[p]
                                    let longitude = longitudeArr[p]
                                    let distance = distanceArr[p][q].toString() 
                                    let title = valueArr[p]+latitude+longitude+distance+unitnum

                                    let graphicslayers = map.ObjMap.layers.items
                                    let findTitle = graphicslayers.find(o => o.title === title)

                                    if (findTitle === undefined){
                                        let DriveTimePoint = {
                                            type: "point",
                                            longitude: longitude,
                                            latitude: latitude
                                        };
                                            
                                        let DriveTimeParams = {
                                            'f': 'json',
                                            'env:outSR': 4326,
                                            'env:processSR': 4326,
                                            'facilities':'{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + longitude + ',"y":'+ latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
                                            'break_units': unitArr[p][q],
                                            'B_Values': distance
                                        }
            
                                        let driveTime = new GIS.Buffer.DriveTime(
                                            map.ObjMap,
                                            DriveTimePoint,
                                            DriveTimeParams,
                                            "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3",
                                            title
                                        );
            
                                        driveTime.setDistance(
                                            distance,
                                            unitArr[p][q]
                                        );
            
                                        map.ObjMapView.popup.dockOptions.breakpoint = false
                                        map.ObjMapView.popup.dockOptions.position = 'bottom-right'
            
                                        let driveTimePromise = new Promise(function(resolve, reject) {
                                            driveTime.run(resolve);
                                        });
            
                                        driveTimePromise.then(function() {
                                            let gLayers = driveTime.ArrayParamsCatchment[0].features[0]
                                            let inputFeatureArr = driveTime.ArrayParamsCatchment;
                                            let catchmentParams = {
                                                f: "json",
                                                "env:outSR": 4326,
                                                "env:processSR": 4326,
                                                Input_Feature: JSON.stringify(inputFeatureArr[0])
                                            };
                                            
                                            let catchment = new GIS.Buffer.Catchment();
            
                                            let catchmentPromise = new Promise(function(resolve, reject) {
                                                catchment.setServiceUrl(
                                                    "http://tig.co.id/ags/rest/services/GP/v2_catchment/GPServer/catchment_select_table"
                                                );
                                                catchment.setParams(catchmentParams,resolve);
                                            });
            
                                            catchmentPromise.then(function() {
                                                catchment.run(gLayers);
                                            });
                                        });
                                        driveTime.render(map.ObjMapView);
                                    }
                                }
                            }
                        }
                    }
            
                    let option = JSON.parse(options)
                    let valueArr = JSON.parse(values)
                    let latitudeArr = JSON.parse(latitude)
                    latitudeArr = latitudeArr.map(x=>parseFloat(x))
                    let longitudeArr = JSON.parse(longitude)
                    longitudeArr = longitudeArr.map(x=>parseFloat(x))
                    let distanceArr = JSON.parse(distance)
                    let unitArr = JSON.parse(unit)
                    
                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(event){
                            event.stopImmediatePropagation();
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let poiName = $(this).attr('poiname')
                                let poiName2 = $(this).attr('name-of-poi')
                                for (let p = 0; p < option.length; p++) {
                                    for (let q = 0; q < option[p].length; q++) {
                                        if (parseInt(option[p][q]) === 0) {
                                            let radiusPOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId, poiName)

                                            let unitnum
                                            if (unitArr[p][q] == "kilometers") {
                                                unitnum = 'km'
                                            } else if (unitArr[p][q] == "miles") {
                                                unitnum = 'mi'
                                            } 
                                            else {
                                                unitnum = 'm'
                                            }
                                            if (poiName === "{POI_NAME}") {
                                                poiName = poiName2
                                            }
                                            let title = "Buffer "+distanceArr[p][q]+" "+unitnum+" "+poiName
                                            radiusPOI.setTitle(title)

                                            radiusPOI.setDistanceAndUnit(distanceArr[p][q],unitArr[p][q])
                                            radiusPOI.setGeometryBuffer(latitudeArr[p],longitudeArr[p])

                                            let promise = new Promise(function(resolve, reject) {
                                                radiusPOI.render(resolve)
                                            });
            
                                            promise.then(function() {
                                                let layers = map.ObjMap.layers.items
                                                let findPoiName = layers.find(o => o.title === title)
                                                let length = findPoiName.graphics.length

                                                title = title.split(' ')
                                                title = title[0]+" "+title[1]+" "+title[2]
    
                                                $('#analysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden",
                                                    "margin-bottom": "-20px",
                                                })
    
                                                let row = "<tr><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
    
                                                $('#rowAnalysisDiv').prepend(row)
                                            });

                                            // $.ajax({
                                            //     url: "content/analysis/results_table.php",
                                            //     type: "POST",
                                            //     data: {title:title, poiName:poiName, length:length},
                                            //     success: function(data) {
                                            //         $('#contentAnalysisDiv').css({
                                            //             "overflow-x": "hidden",
                                            //             "margin-bottom": "-20px",
                                            //         })
                                            //         $('#rowAnalysisDiv').append(data)
                                            //     }
                                            // });
                                        }
                                        else if (parseInt(option[p][q]) !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            let drivePOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId, poiName)

                                            let titleLayer
                                            if (poiName === "{POI_NAME}") {
                                                poiName = poiName2
                                            } 

                                            if (unitArr[p][q] == "minutes") {
                                                unitnum = '1'
                                                titleLayer = "Driving Time "+distanceArr[p][q]+" "+unitArr[p][q]+" "+poiName
                                            } else if (unitArr[p][q] == "hours") {
                                                unitnum = '2'
                                                titleLayer = "Driving Time "+distanceArr[p][q]+" "+unitArr[p][q]+" "+poiName
                                            }
                                            else if (unitArr[p][q] == "kilometers") {
                                                unitnum = '6'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" km "+poiName
                                            } else if (unitArr[p][q] == "miles") {
                                                unitnum = '7'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" mi "+poiName
                                            } 
                                            else {
                                                unitnum = '8'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" m "+poiName
                                            }
                                            drivePOI.setTitle(titleLayer)

                                            let val = valueArr[p].toString()
                                            let latitude = latitudeArr[p].toString()
                                            let longitude = longitudeArr[p].toString()
                                            let distance = distanceArr[p][q].toString()
                                            let title = val+latitude+longitude+distance+unitnum
                                            for (let c = 0; c < graphicslayers.length; c++) {
                                                if (graphicslayers[c].title === title) {
                                                    drivePOI.setGeometryDriving(
                                                        graphicslayers[c].graphics.items[0].geometry
                                                    )
                                                }
                                            }
                                            let promise = new Promise(function(resolve, reject) {
                                                drivePOI.render(resolve)
                                            });
            
                                            promise.then(function() {
                                                let layers = map.ObjMap.layers.items
                                                let findPoiName = layers.find(o => o.title === titleLayer)
                                                let length = findPoiName.graphics.length

                                                titleLayer = titleLayer.split(' ')
                                                titleLayer = titleLayer[0]+" "+titleLayer[1]+" "+titleLayer[2]+" "+titleLayer[3]
    
                                                $('#analysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden",
                                                    "margin-bottom": "-20px",
                                                })
    
                                                let row = "<tr><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
    
                                                $('#rowAnalysisDiv').prepend(row)
                                            });
                                        }
                                    }
                                }
                            }
                        })
                    })

                    $('input:checkbox.an_property').each(function(){
                        $(this).click(function(event){
                            event.stopImmediatePropagation();
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let poiName = $(this).attr('poiname')
                                let poiName2 = $(this).attr('name-of-poi')
                                for (let p = 0; p < option.length; p++) {
                                    for (let q = 0; q < option[p].length; q++) {
                                        if (parseInt(option[p][q]) === 0) {
                                            let radiusPOI = new GIS.Analysis.BufferProperty(map.ObjMap,layerId, poiName)

                                            let unitnum
                                            if (unitArr[p][q] == "kilometers") {
                                                unitnum = 'km'
                                            } else if (unitArr[p][q] == "miles") {
                                                unitnum = 'mi'
                                            } 
                                            else {
                                                unitnum = 'm'
                                            }
                                            if (poiName === "{buildingname}") {
                                                poiName = poiName2
                                            }

                                            let title = "Buffer "+distanceArr[p][q]+" "+unitnum+" "+poiName
                                            radiusPOI.setTitle(title)

                                            radiusPOI.setDistanceAndUnit(distanceArr[p][q],unitArr[p][q])
                                            radiusPOI.setGeometryBuffer(latitudeArr[p],longitudeArr[p])
                                            let promise = new Promise(function(resolve, reject) {
                                                radiusPOI.render(resolve)
                                            });
            
                                            promise.then(function() {
                                                let layers = map.ObjMap.layers.items
                                                let findPoiName = layers.find(o => o.title === title)
                                                let length = findPoiName.graphics.length

                                                title = title.split(' ')
                                                title = title[0]+" "+title[1]+" "+title[2]
    
                                                $('#analysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden",
                                                    "margin-bottom": "-20px",
                                                })
    
                                                let row = "<tr><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
    
                                                $('#rowAnalysisDiv').prepend(row)
                                            });
                                        }
                                        else if (parseInt(option[p][q]) !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            let drivePOI = new GIS.Analysis.BufferProperty(map.ObjMap,layerId, poiName)
                                            let titleLayer 

                                            if (poiName === "{buildingname}") {
                                                poiName = poiName2
                                            }

                                            if (unitArr[p][q] == "minutes") {
                                                unitnum = '1'
                                                titleLayer = "Driving Time "+distanceArr[p][q]+" "+unitArr[p][q]+" "+poiName
                                            } else if (unitArr[p][q] == "hours") {
                                                unitnum = '2'
                                                titleLayer = "Driving Time "+distanceArr[p][q]+" "+unitArr[p][q]+" "+poiName
                                            }
                                            else if (unitArr[p][q] == "kilometers") {
                                                unitnum = '6'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" km "+poiName
                                            } else if (unitArr[p][q] == "miles") {
                                                unitnum = '7'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" mi "+poiName
                                            } 
                                            else {
                                                unitnum = '8'
                                                titleLayer = "Driving Distance "+distanceArr[p][q]+" m "+poiName
                                            }
                                            drivePOI.setTitle(titleLayer)

                                            let val = valueArr[p].toString()
                                            let latitude = latitudeArr[p].toString()
                                            let longitude = longitudeArr[p].toString()
                                            let distance = distanceArr[p][q].toString()
                                            let title = val+latitude+longitude+distance+unitnum
                                            for (let c = 0; c < graphicslayers.length; c++) {
                                                if (graphicslayers[c].title === title) {
                                                    drivePOI.setGeometryDriving(
                                                        graphicslayers[c].graphics.items[0].geometry
                                                    )
                                                }
                                            }
                                            let promise = new Promise(function(resolve, reject) {
                                                drivePOI.render(resolve)
                                            });
            
                                            promise.then(function() {
                                                let layers = map.ObjMap.layers.items
                                                let findPoiName = layers.find(o => o.title === titleLayer)
                                                let length = findPoiName.graphics.length

                                                titleLayer = titleLayer.split(' ')
                                                titleLayer = titleLayer[0]+" "+titleLayer[1]+" "+titleLayer[2]+" "+titleLayer[3]
    
                                                $('#analysisDiv').css('display', 'block')
                                                $('#contentAnalysisDiv').css({
                                                    "overflow-x": "hidden",
                                                    "margin-bottom": "-20px",
                                                })
    
                                                let row = "<tr><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
    
                                                $('#rowAnalysisDiv').prepend(row)
                                            });
                                        }
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
                }
                else {
                    $(this).closest('tr').find('button.btn-modal-form-poi').attr("disabled","true")
                    $(this).closest('tr').find('i.icon-pin-alt').removeAttr("style")
                }
            })
        })
    })
}