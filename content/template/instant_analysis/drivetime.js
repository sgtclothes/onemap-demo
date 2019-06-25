function driveTime(GIS,map){
    $(document).ready(function(){
        var driveTime
        $("#form-list").on('click',function(){
            $.each(window.counterArr, function(index, value){
                let Arr = []
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
                    $(this).on("click", function(){
                        let latitude = $(".latitude-form-"+value).val()
                        let longitude = $(".longitude-form-"+value).val()

                        let distanceStr = $(this).closest(".text-right").prev().children()[0].children[1].value
                        let distance = distanceStr.split(',')
                        let unit = $(this).closest(".text-right").prev().children()[1].children[1].value

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
    
                            let title = "drive-time-"+value+latitude+longitude+distanceStr

                            driveTime = new GIS.Buffer.DriveTime(
                                DriveTimePoint,
                                DriveTimeParams,
                                "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3"
                            );

                            console.log(driveTime.Title)
                            driveTime.setTitle(title)
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
                            driveTime.render(map.ObjMap, map.ObjMapView);
                        }
                    })
                })
                // $(".form-buffer-"+value).find('button.remove-drive').each(function(){
                //     $(this).on("click", function(){
                        
                //         $(this)
                //         .closest(".collapsible")
                //         .remove();
                //     })
                // })
            })
        })
    })
}