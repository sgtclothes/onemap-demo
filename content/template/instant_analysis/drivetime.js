function driveTime(GIS, map) {
    $(document).ready(function () {
        $("#form-list").click(function () {
            $.each(window.counterArr, function (index, value) {
                $(".form-drive-" + value).find('select.select-driving').each(function () {
                    $(this).on("click", function () {
                        if ($(this)[0].value == 3) {
                            $(this).closest(".form-group").next().css("display", "block")
                        } else {
                            $(this).closest(".form-group").next().css("display", "none")
                        }
                    })
                })
                $(".form-drive-" + value).find('button.btn-create-drive-time').each(function () {
                    $(this).on("click", function (event) {
                        event.stopImmediatePropagation();
                        let distance = $(this).closest(".text-right").prev().children()[0].children[1].value
                        let unit = $(this).closest(".text-right").prev().children()[1].children[1].value
                        let options = $(this).closest(".text-right").prev().prev().find('select.select-driving-distance').val()

                        var unitnum
                        if (unit == "minutes") {
                            unitnum = 1
                        } else {
                            unitnum = 2
                        }

                        let latitude = $(".latitude-form-" + value).val()
                        let longitude = $(".longitude-form-" + value).val()
                        let title = value + latitude + longitude + distance + unitnum
                        let graphicslayers = map.ObjMap.layers.items
                        let validate

                        for (let i = 0; i < graphicslayers.length; i++) {
                            if (graphicslayers[i].title === title) {
                                validate = true
                            }
                        }

                        if (validate) {
                            alert('Driving Time with that distance and unit already exists');
                        }
                        else {

                            console.log(value, options)
                            let DriveTimePoint = {
                                type: "point",
                                longitude: longitude,
                                latitude: latitude
                            };

                            let DriveTimeParams = {
                                'f': 'json',
                                'env:outSR': 4326,
                                'env:processSR': 4326,
                                'facilities': '{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + longitude + ',"y":' + latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
                                'break_units': unit,
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
                                unit
                            );
                            driveTime.setOptions(value, options, latitude, longitude, unit, distance)

                            map.ObjMapView.popup.dockOptions.breakpoint = false
                            map.ObjMapView.popup.dockOptions.position = 'bottom-right'

                            let driveTimePromise = new Promise(function (resolve, reject) {
                                driveTime.run(resolve);
                            });

                            driveTimePromise.then(function () {
                                let graphicsLayers = driveTime.ArrayParamsCatchment[0].features[0]
                                let inputFeatureArr = driveTime.ArrayParamsCatchment;
                                let catchmentParams = {
                                    f: "json",
                                    "env:outSR": 4326,
                                    "env:processSR": 4326,
                                    Input_Feature: JSON.stringify(inputFeatureArr[0])
                                };

                                let catchment = new GIS.Buffer.Catchment();

                                let catchmentPromise = new Promise(function (resolve, reject) {
                                    catchment.setServiceUrl(
                                        "http://tig.co.id/ags/rest/services/GP/v2_catchment/GPServer/catchment_select_table"
                                    );
                                    catchment.setParams(catchmentParams, resolve);
                                });

                                catchmentPromise.then(function () {
                                    catchment.run(graphicsLayers);
                                });
                            });

                            driveTime.render(map.ObjMapView);
                            $(this).closest(".text-right").prev().find('input[type=text].distance-time').prop('disabled', true)
                            $(this).closest(".text-right").prev().find('select.select-unit-time').prop('disabled', true)
                            $(this).closest(".text-right").prev().prev().find('select.select-driving').prop('disabled', true)
                            $(this).prop('disabled', true)
                            $('.anly-poi-' + value).removeAttr('disabled')
                            $('#error-down-service').hide()
                        }
                    })
                })
                $(".form-drive-" + value).find('button.remove-drive').each(function () {
                    $(this).on("click", function () {
                        $(this).closest(".collapsible").next().remove()

                        if ($(".form-drive-" + value)
                            .parent('.rows')
                            .children().eq(3)
                            .children().length === 0 &&
                            $(".form-drive-distance-" + value)
                                .parent('.rows')
                                .children().eq(4)
                                .children().length === 0 &&
                            $(".form-buffer-" + value)
                                .parent('.rows')
                                .children().eq(2)
                                .children().length === 0
                        ) {
                            $('.anly-poi-' + value).attr('disabled', true)
                        }

                        let latitude = $(".latitude-form-" + value).val()
                        let longitude = $(".longitude-form-" + value).val()

                        let distance = $(this).closest("h4").next()[0].children[1].children[0].children[1].value

                        let unit = $(this).closest("h4").next()[0].children[1].children[1].children[1].value
                        var unitnum
                        if (unit == "minutes") {
                            unitnum = 1
                        } else {
                            unitnum = 2
                        }

                        let title = value + latitude + longitude + distance + unitnum
                        let titleAnalysisPoi = "Driving Time " + distance + " " + unit + " " + latitude + longitude
                        let graphicslayers = map.ObjMap.layers.items
                        let check = graphicslayers.filter(function (el) {
                            return (
                                el.title.includes(titleAnalysisPoi) === true ||
                                el.title === title
                            );
                        });
                        map.ObjMap.removeMany(check)
                        $('#instant-analysis-result-row tr').each(function () {
                            if (
                                $(this).children()[0].innerText == latitude &&
                                $(this).children()[1].innerText == longitude &&
                                $(this).children()[2].innerText == "Driving Time " + distance + " " + unit
                            ) {
                                $(this).remove()
                            }
                        })

                        $(this)
                            .closest(".collapsible")
                            .remove();
                    })
                })
            })
        })
    })
}