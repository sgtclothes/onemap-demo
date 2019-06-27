function driveTime(GIS,map){
    $(document).ready(function(){
        $("#form-list").click(function(){
            $.each(window.counterArr, function(index, value){
                $(".form-drive-"+value).find('select.select-driving').each(function(){
                    $(this).on("click", function(){
                        if ($(this)[0].value == "historical") {
                            $(this).closest(".form-group").next().next().css("display","block")
                        } else {
                            $(this).closest(".form-group").next().next().css("display","none")
                        }
                    })
                })
                $(".form-drive-"+value).find('button.btn-create-drive-time').each(function(){
                    $(this).on("click", function(event){
                        event.stopImmediatePropagation();

                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()

                        let distanceStr = $(this).closest(".text-right").prev().children()[0].children[1].value
                        let distance = distanceStr.split(',')
                        distance = [...new Set(distance)]
                        for (let d = 0; d < distance.length; d++) {
                            if (distance[d] == "") {
                                distance.splice(d,1)
                            }
                        }
                        let distanceString = distance.toString()
                        let unit = $(this).closest(".text-right").prev().children()[1].children[1].value

                        var unitnum
                        if (unit == "minutes") {
                            unitnum = 1
                        } else {
                            unitnum = 2
                        }

                        let title = value+latitude+longitude+distanceString+unitnum

                        let DriveTimePoint = {
                            type: "point",
                            longitude: longitude,
                            latitude: latitude
                        };

                        for (let i = 0; i < distance.length; i++) {
                            
                            let DriveTimeParams = {
                                'f': 'json',
                                'env:outSR': 4326,
                                'env:processSR': 4326,
                                'facilities':'{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + longitude + ',"y":'+ latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
                                'break_units': unit,
                                'B_Values': parseInt(distance[i])
                            }

                            let driveTime = new GIS.Buffer.DriveTime(
                                map.ObjMap,
                                DriveTimePoint,
                                DriveTimeParams,
                                "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3",
                                title
                            );

                            driveTime.createLayer(
                                "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
                            );
                            
                            let driveTimePromise = new Promise(function(resolve, reject) {
                                driveTime.run(resolve);
                            });

                            driveTimePromise.then(function() {
                                let extent =
                                    driveTime.ArrayParamsCatchment[0].features[0].geometry.extent;
                                let xmin = extent.xmin;
                                let xmax = extent.xmax;
                                let ymin = extent.ymin;
                                let ymax = extent.ymax;
                                let wkid =
                                    driveTime.ArrayParamsCatchment[0].features[0].geometry.spatialReference
                                    .wkid;
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
                                    catchment.setParams(catchmentParams);
                                    catchment.run(resolve);
                                });
                            
                                catchmentPromise.then(function() {
                                    let query = {
                                        f: "json",
                                        where: "OBJECT IN (" + catchment.ObjectIDStr[0] + ")",
                                        returnGeometry: true,
                                        spatialRel: "esriSpatialRelIntersects",
                                        maxAllowableOffset: 76,
                                        geometry:
                                            '{"xmin":' +
                                            xmin +
                                            ',"ymin":' +
                                            ymin +
                                            ',"xmax":' +
                                            xmax +
                                            ', "ymax":' +
                                            ymax +
                                            ',"spatialReference":{"wkid":' +
                                            wkid +
                                            "}}",
                                        geometryType: driveTime.ArrayParamsCatchment[0].geometryType,
                                        inSR: 102100,
                                        outFields: "*",
                                        outSR: 102100
                                    };
                                    catchment.setQuery(query);
                                });
                            });

                            driveTime.render(map.ObjMapView);
                        }
                        $(this).closest(".text-right").prev().find('input[type=text].distance-time').prop('readonly', true)
                        $(this).closest(".text-right").prev().find('select.select-unit-time').prop('disabled', true)
                        $(this).closest(".text-right").prev().prev().prev().find('select.select-driving').prop('disabled', true)
                    })
                })
                $(".form-drive-"+value).find('button.remove-drive').each(function(){
                    $(this).on("click", function(){
                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()

                        let distanceStr = $(this).closest("h4").next()[0].children[2].children[0].children[1].value
                        let distance = distanceStr.split(',')
                        distance = [...new Set(distance)]
                        for (let d = 0; d < distance.length; d++) {
                            if (distance[d] == "") {
                                distance.splice(d,1)
                            }
                        }
                        let distanceString = distance.toString()

                        let unit = $(this).closest("h4").next()[0].children[2].children[1].children[1].value

                        var unitnum
                        if (unit == "minutes") {
                            unitnum = 1
                        } else {
                            unitnum = 2
                        }

                        let title = value+latitude+longitude+distanceString+unitnum

                        let graphicslayers = map.ObjMap.layers.items

                        for (let i = 0; i < graphicslayers.length; i++) {
                            if (graphicslayers[i].title == title) {
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
    })
}