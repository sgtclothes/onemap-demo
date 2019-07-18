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
                        let option = JSON.parse(options)
                        let latitudeArr = JSON.parse(latitude)
                        latitudeArr = latitudeArr.map(x=>parseFloat(x))
                        let longitudeArr = JSON.parse(longitude)
                        longitudeArr = longitudeArr.map(x=>parseFloat(x))
                        let distanceArr = JSON.parse(distance)
                        let unitArr = JSON.parse(unit)
                        console.log(option)
                        console.log(distanceArr)
                        console.log(unitArr)
                        // for (let p = 0; p < option.length; p++) {
                        //     option[p].forEach(el => {
                        //         if (el === 0) {
                        //             for (let a = 0; a < latitudeArr.length; a++) {
                        //                 for (let e = 0; e < distanceArr[a].length; e++) {
                        //                     let unitnum
                        //                     if (unitArr[a][e] === "kilometers") {
                        //                         unitnum = '3'
                        //                     } else if (unitArr[a][e] === "miles") {
                        //                         unitnum = '4'
                        //                     }
                        //                     else {
                        //                         unitnum = '5'
                        //                     }
                        //                     let latitude = latitudeArr[a].toString()
                        //                     let longitude = longitudeArr[a].toString()
                        //                     let distance = distanceArr[a][e].toString() 
                        //                     let title = values+latitude+longitude+distance+unitnum
                        //                     let radius = new GIS.Buffer.Radius(
                        //                         map.ObjMap,
                        //                         map.ObjMapView,
                        //                         latitude,
                        //                         longitude
                        //                     );
                        //                     radius.setTitle(title)
                        //                     radius.setUnit(unitArr[a][e]);
                        //                     radius.setRadius(distanceArr[a][e]);
                
                        //                     map.ObjMapView.popup.dockOptions.breakpoint = false
                        //                     map.ObjMapView.popup.dockOptions.position = 'bottom-right'
                        //                     radius.create();
                        //                 }
                        //             }
                        //         }
                        //     })
                        // }
                    }
            
                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(event){
                            event.stopImmediatePropagation();
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let option = JSON.parse(options)
                                console.log(option)
                                let valueArr = JSON.parse(values)
                                let latitudeArr = JSON.parse(latitude)
                                latitudeArr = latitudeArr.map(x=>parseFloat(x))
                                let longitudeArr = JSON.parse(longitude)
                                longitudeArr = longitudeArr.map(x=>parseFloat(x))
                                let distanceArr = JSON.parse(distance)
                                let unitArr = JSON.parse(unit)
                                for (let p = 0; p < option.length; p++) {
                                    option[p].forEach(el => {
                                        if (el === 0) {
                                            for (let a = 0; a < latitudeArr.length; a++) {
                                                let radiusPOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId)
                                                for (let b = 0; b < distanceArr[a].length; b++) {
                                                    radiusPOI.setDistanceAndUnit(distanceArr[a][b],unitArr[a][b])
                                                }
                                                radiusPOI.setGeometryBuffer(latitudeArr[a],longitudeArr[a])
                                                radiusPOI.render()
                                            }
                                        }
                                        if (el !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            for (let d = 0; d < latitudeArr.length; d++) {
                                                let drivePOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId)
                                                for (let e = 0; e < distanceArr[d].length; e++) {
                                                    if (unitArr[d][e] == "minutes") {
                                                        unitnum = '1'
                                                    } else if (unitArr[d][e] == "hours") {
                                                        unitnum = '2'
                                                    }
                                                    else if (unitArr[d][e] == "kilometers") {
                                                        unitnum = '6'
                                                    } else if (unitArr[d][e] == "miles") {
                                                        unitnum = '7'
                                                    } 
                                                    else {
                                                        unitnum = '8'
                                                    }

                                                    let value = valueArr
                                                    for (let v = 0; v < value.length; v++) {
                                                        let val = value[v].toString()
                                                        let latitude = latitudeArr[d].toString()
                                                        let longitude = longitudeArr[d].toString()
                                                        let distance = distanceArr[d][e].toString()
                                                        let title = val+latitude+longitude+distance+unitnum
                                                        for (let c = 0; c < graphicslayers.length; c++) {
                                                            if (graphicslayers[c].title === title) {
                                                                drivePOI.setGeometryDriving(
                                                                    graphicslayers[c].graphics.items[0].geometry
                                                                )
                                                            }
                                                        }
                                                    }
                                                }
                                                drivePOI.render()
                                            }
                                        }
                                    });
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