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
                    $(this).closest('tr').find('button.btn.btn-xs').removeAttr("disabled")

                    latitude = $(this).attr('data-latitude')
                    longitude = $(this).attr('data-longitude')
                    unit = $(this).attr('data-unit')
                    distance = $(this).attr('data-distance')
                    options = $(this).attr('data-options')
                    values = $(this).attr('data-values')
                    
                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(event){
                            event.stopImmediatePropagation();
                            if($(this).is(":checked")){
                                let layerId = $(this).val()
                                let option = JSON.parse(options)
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

                                                    let latitude = latitudeArr[d].toString()
                                                    let longitude = longitudeArr[d].toString()
                                                    let distance = distanceArr[d][e].toString()
                                                    let title = values+latitude+longitude+distance+unitnum
                                                    for (let c = 0; c < graphicslayers.length; c++) {
                                                        if (graphicslayers[c].title === title) {
                                                            drivePOI.setGeometryDriving(
                                                                graphicslayers[c].graphics.items[0].geometry
                                                            )
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
                    $(this).closest('tr').find('button.btn.btn-xs').attr("disabled","true")
                }
            })

        })
    })
}