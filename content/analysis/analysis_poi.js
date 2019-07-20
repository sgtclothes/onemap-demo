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
                                option[p][q] = parseInt(option[p][q])
                                if (option[p][q] === 0) {
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
                                else if (option[p][q] !== 0) {
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
            
                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(event){
                            event.stopImmediatePropagation();
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let option = JSON.parse(options)
                                let valueArr = JSON.parse(values)
                                let latitudeArr = JSON.parse(latitude)
                                latitudeArr = latitudeArr.map(x=>parseFloat(x))
                                let longitudeArr = JSON.parse(longitude)
                                longitudeArr = longitudeArr.map(x=>parseFloat(x))
                                let distanceArr = JSON.parse(distance)
                                let unitArr = JSON.parse(unit)
                                for (let p = 0; p < option.length; p++) {
                                    for (let q = 0; q < option[p].length; q++) {
                                        option[p][q] = parseInt(option[p][q])
                                        if (option[p][q] === 0) {
                                            let radiusPOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId)
                                            radiusPOI.setDistanceAndUnit(distanceArr[p][q],unitArr[p][q])
                                            radiusPOI.setGeometryBuffer(latitudeArr[p],longitudeArr[p])
                                            radiusPOI.render()
                                        }
                                        else if (option[p][q] !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            let drivePOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId)
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
                                            drivePOI.render()
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