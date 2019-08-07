function analysisPoi(GIS,map) {
    $(document).ready(function(){
        $("#tbl-analysis-div-parent").on('click','.form-analysis', function(){
            let id_analysis = $(this).attr('data-id')
            let name_analysis = $(this).attr('data-name')
            $.ajax({
                url: "content/analysis/analysis_poi.php",
                type: 'POST',
                data: {id_analysis:id_analysis,name_analysis:name_analysis},
                success: function(data) {
                    $('#datatable-poi-anly').remove()
                    $('#myAnaysisPOIList').append(data)
                    let radiusResults = []
                    let drivingResults = []
                    document.getElementById("myAnalysisPOI").style.width = "320px";
                    $("input[name='render-for-analysis-"+id_analysis+"']").click(function(){
                        $(this).closest('div').find('button.btn-modal-form-poi').removeAttr("disabled")
                        $(this).closest('div').find('button.btn-batas-administrasi').removeAttr("disabled")
                        $(this).closest('div').find('i.icon-pin-alt').css("color","#4169e1")
                        $(this).closest('div').find('i.icon-table2').css("color","#4169e1")
                    
                        function add(id_analysis,name_analysis,margin){
                            let navTabs = "<li id='"+id_analysis+"' class='nav-item dropdown'"+margin+"><a id='titletab"+id_analysis+"' href='#' class='nav-link dropdown-toggle' data-toggle='dropdown'>"+name_analysis+"</a><div class='dropdown-menu dropdown-menu-right'><a href='#basic-tab"+id_analysis+"batas' class='dropdown-item' data-toggle='tab' style='display:none;'>Batas Administrasi</a><a href='#basic-tab"+id_analysis+"poi' class='dropdown-item' data-toggle='tab'>POI</a></div></li>"
                            $('#nav-tabs-analysis').append(navTabs)

                            let table = "<div class='table-responsive'><table class='table table-bordered table-xs table-striped table-hover' style='margin-bottom:15px;'><thead><tr><th style='text-align:center;'><b>Type Specification</b></th><th style='text-align:center;'><b>Poi Name</b></th><th style='text-align:center;'><b>Total</b></th></tr></thead><tbody id='rowAnalysisDiv"+id_analysis+"'></tbody></table></div>"
                            let tabContent = "<div class='tab-pane' id='basic-tab"+id_analysis+"poi'>"+table+"</div>";
                            $('#tab-content-analysis').append(tabContent)

                            let tableBatas = "<div class='table-responsive'><table class='table table-bordered table-xs table-striped table-hover' style='margin-bottom:15px; font-size:11px'><thead><tr><th style='text-align:center;'><b>Area (km<sup>2</sup>)</b></th><th style='text-align:center;'><b>Density (Ppl/km<sup>2</sup>)</b></th><th style='text-align:center;'><b>Population (Ppl)</b></th><th style='text-align:center;'><b>Household (Hh)</b></th><th style='text-align:center;'><b>Male (Ppl)</b></th><th style='text-align:center;'><b>Female (Ppl)</b></th><th style='text-align:center;'><b>SES Upper (%)</b></th><th style='text-align:center;'><b>SES Middle (%)</b></th><th style='text-align:center;'><b>SES Upper (%)</b></th><th style='text-align:center;'><b>Food 1 (Hh)</b></th><th style='text-align:center;'><b>Food 2 (Hh)</b></th><th style='text-align:center;'><b>Food 3 (Hh)</b></th><th style='text-align:center;'><b>Food 4 (Hh)</b></th><th style='text-align:center;'><b>Food 5 (Hh)</b></th><th style='text-align:center;'><b>Total Building (Unit)</b></th><th style='text-align:center;'><b>Non Food 1 (Hh)</b></th><th style='text-align:center;'><b>Non Food 2 (Hh)</b></th><th style='text-align:center;'><b>Non Food 3 (Hh)</b></th><th style='text-align:center;'><b>Non Food 4 (Hh)</b></th><th style='text-align:center;'><b>Non Food 5 (Hh)</b></th><th style='text-align:center;'><b>Expend 1 (Hh)</b></th><th style='text-align:center;'><b>Expend 2 (Hh)</b></th><th style='text-align:center;'><b>Expend 3 (Hh)</b></th><th style='text-align:center;'><b>Expend 4 (Hh)</b></th><th style='text-align:center;'><b>Expend 5 (Hh)</b></th><th style='text-align:center;'><b>SES A (%)</b></th><th style='text-align:center;'><b>SES B (%)</b></th><th style='text-align:center;'><b>SES C (%)</b></th><th style='text-align:center;'><b>SES D (%)</b></th><th style='text-align:center;'><b>SES E (%)</b></th></tr></thead><tbody id='batasAnalysisDiv"+id_analysis+"'></tbody></table></div>"
                            let batasAdmContent = "<div class='tab-pane' id='basic-tab"+id_analysis+"batas' style='display:none;'>"+tableBatas+"</div>";
                            $('#tab-content-analysis').append(batasAdmContent)
                            $("a.nav-link.dropdown-toggle").removeClass("active");
                            $("#titletab"+id_analysis+"").addClass("active");
                            $(".tab-pane").removeClass("active");
                        }
                        let navTabsObj = $("#analysis-results-table").find("#nav-tabs-analysis").children()
                        if (navTabsObj.length === 0) {
                            let margin = "style='margin-left:-7px'"
                            add(id_analysis,name_analysis,margin)
                        }
                        else {
                            $("#analysis-results-table").find("#nav-tabs-analysis").children('li').each(function(){
                                if(parseInt(id_analysis) !== parseInt($(this).attr('id'))) {
                                    let margin = "style='margin-left:-9px;'"
                                    add(id_analysis,name_analysis,margin)
                                }
                            })
                            let seen = {};
                            $("#analysis-results-table").find("#nav-tabs-analysis").children('li')
                            .each(function() {
                                let id = $(this).attr('id');
                                if (seen[id]) {
                                    $(this).remove();
                                }
                                else {
                                    seen[id] = true;
                                }
                            });
                            let tabPane = {};
                            $(".tab-pane").each(function() {
                                let id = $(this).attr('id');
                                if (tabPane[id]) {
                                    $(this).remove();
                                }
                                else {
                                    tabPane[id] = true;
                                }
                            });
                        }
            
                        let latitude = $(this).attr('data-latitude')
                        let longitude = $(this).attr('data-longitude')
                        let unit = $(this).attr('data-unit')
                        let distance = $(this).attr('data-distance')
                        let options = $(this).attr('data-options')
                        let values = $(this).attr('data-values')
            
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
                                            let promise = new Promise(function(resolve, reject) {
                                                radius.create(resolve);
                                            });
                
                                            promise.then(function() {
                                                if (
                                                    localStorage.getItem('titleBatasAdm')
                                                    !== null) {
                                                    let t = JSON.parse(localStorage.getItem('titleBatasAdm'))
                                                    t.push(title)
                                                    localStorage.setItem('titleBatasAdm', JSON.stringify(t))
                                                    radiusResults.push(radius.Results)
                                                }
                                                else {
                                                    let t = []
                                                    t.push(title)
                                                    localStorage.setItem('titleBatasAdm', JSON.stringify(t))
                                                    radiusResults.push(radius.Results)
                                                }
                                            })
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
                                                    let promise = new Promise(function(resolve, reject) {
                                                        catchment.run(gLayers,resolve);
                                                    });
                        
                                                    promise.then(function() {
                                                        if (
                                                            localStorage.getItem('titleBatasAdmDriving')
                                                            !== null) {
                                                            let t = JSON.parse(localStorage.getItem('titleBatasAdmDriving'))
                                                            t.push(title)
                                                            localStorage.setItem('titleBatasAdmDriving', JSON.stringify(t))
                                                            drivingResults.push(catchment.ID_DESA)
                                                        }
                                                        else {
                                                            let t = []
                                                            t.push(title)
                                                            localStorage.setItem('titleBatasAdmDriving', JSON.stringify(t))
                                                            drivingResults.push(catchment.ID_DESA)
                                                        }
                                                    })
                                                });
                                            });
                                            driveTime.render(map.ObjMapView);
                                        }
                                    }
                                }
                            }
                        }
                    })

                    $('.btn-batas-administrasi').on('click', function(){
                        //buffer
                        if (radiusResults.length>0) {
                            $("a[href$='#basic-tab"+id_analysis+"batas']").removeAttr("style")
                            $("#basic-tab"+id_analysis+"batas").removeAttr("style")
                            $(".tab-pane").removeClass("active");
                            $("#basic-tab"+id_analysis+"batas").addClass("active");

                            let title = JSON.parse(localStorage.getItem('titleBatasAdm'))
                            let graphicslayers = map.ObjMap.layers.items
                            for (let i = 0; i < title.length; i++) {
                                let titleLayer = title[i]+"BatasAdministrasi"
                                let findBatasAdm = graphicslayers.find(o => o.title === titleLayer)
                                if (findBatasAdm === undefined){
                                    let batasAdministrasi = new GIS.Analysis.BatasAdministrasi(map.ObjMap,title[i],radiusResults[i])
                                    batasAdministrasi.summaryAnalysis()
                                    let row = "<tr><td>"+batasAdministrasi.luas_km2+"</td><td>"+batasAdministrasi.kepadatan+"</td><td>"+batasAdministrasi.populasi+"</td><td>"+batasAdministrasi.household+"</td><td>"+batasAdministrasi.male+"</td><td>"+batasAdministrasi.female+"</td><td>"+batasAdministrasi.ses_up+"</td><td>"+batasAdministrasi.ses_mid+"</td><td>"+batasAdministrasi.ses_low+"</td><td>"+batasAdministrasi.food_1+"</td><td>"+batasAdministrasi.food_2+"</td><td>"+batasAdministrasi.food_3+"</td><td>"+batasAdministrasi.food_4+"</td><td>"+batasAdministrasi.food_5+"</td><td>"+batasAdministrasi.jml_bangun+"</td><td>"+batasAdministrasi.nfood_1+"</td><td>"+batasAdministrasi.nfood_2+"</td><td>"+batasAdministrasi.nfood_3+"</td><td>"+batasAdministrasi.nfood_4+"</td><td>"+batasAdministrasi.nfood_5+"</td><td>"+batasAdministrasi.expend_1+"</td><td>"+batasAdministrasi.expend_2+"</td><td>"+batasAdministrasi.expend_3+"</td><td>"+batasAdministrasi.expend_4+"</td><td>"+batasAdministrasi.expend_5+"</td><td>"+batasAdministrasi.sesa+"</td><td>"+batasAdministrasi.sesb+"</td><td>"+batasAdministrasi.sesc+"</td><td>"+batasAdministrasi.sesd+"</td><td>"+batasAdministrasi.sese+"</td></tr>"
                                    $('#batasAnalysisDiv'+id_analysis).prepend(row)
                                    $('#analysisDiv').css('display', 'block')
                                    $('#contentAnalysisDiv').css({
                                        "overflow-x": "hidden"
                                    })
                                    batasAdministrasi.render()
                                }
                                else {
                                    if (findBatasAdm.visible === true) {
                                        findBatasAdm.visible = false
                                    }
                                    else {
                                        findBatasAdm.visible = true
                                    }
                                }
                            }
                        }
                        //driving
                        if (drivingResults.length>0) {
                            let title = JSON.parse(localStorage.getItem('titleBatasAdmDriving'))
                            let graphicslayers = map.ObjMap.layers.items
                            for (let i = 0; i < title.length; i++) {
                                let titleLayer = title[i]+"BatasAdministrasi"
                                let findBatasAdm = graphicslayers.find(o => o.title === titleLayer)
                                if (findBatasAdm === undefined){
                                    let batasAdm = new GIS.Analysis.BatasAdministrasiDriving(map.ObjMap,drivingResults[i], title[i])
                                    batasAdm.render()
                                }
                                else {
                                    if (findBatasAdm.visible === true) {
                                        findBatasAdm.visible = false
                                    }
                                    else {
                                        findBatasAdm.visible = true
                                    }
                                }
                            }
                        }
                    })

                    let latitude = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-latitude')
                    let longitude = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-longitude')
                    let unit = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-unit')
                    let distance = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-distance')
                    let options = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-options')
                    let values = $("input[name='render-for-analysis-"+id_analysis+"']").attr('data-values')

                    let option = JSON.parse(options)
                    let valueArr = JSON.parse(values)
                    let latitudeArr = JSON.parse(latitude)
                    latitudeArr = latitudeArr.map(x=>parseFloat(x))
                    let longitudeArr = JSON.parse(longitude)
                    longitudeArr = longitudeArr.map(x=>parseFloat(x))
                    let distanceArr = JSON.parse(distance)
                    let unitArr = JSON.parse(unit)

                    $('input:checkbox.an_poi').each(function(){
                        $(this).click(function(){
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
                                    
                                            let title = "Buffer "+distanceArr[p][q]+" "+unitnum+" "+poiName
                                            radiusPOI.setTitle(title)

                                            radiusPOI.setDistanceAndUnit(distanceArr[p][q],unitArr[p][q])
                                            radiusPOI.setGeometryBuffer(latitudeArr[p],longitudeArr[p])

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

                                                    let row = "<tr><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"

                                                    $('#rowAnalysisDiv'+id_analysis).prepend(row)
                                                    let seen = {};
                                                    $('#rowAnalysisDiv'+id_analysis+' tr').each(function() {
                                                        let txt = $(this).text();
                                                        if (seen[txt]) {
                                                            $(this).remove();
                                                        }
                                                        else {
                                                            seen[txt] = true;
                                                        }
                                                    });
                                                    $("#basic-tab"+id_analysis+"poi").addClass("active");
                                                    $('#analysisDiv').css('display', 'block')
                                                    $('#contentAnalysisDiv').css({
                                                        "overflow-x": "hidden"
                                                    })
                                                }
                                            });
                                        }
                                        else if (parseInt(option[p][q]) !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            let drivePOI = new GIS.Analysis.BufferPOI(map.ObjMap,layerId, poiName)

                                            let titleLayer

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

                                                    let row = "<tr><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"

                                                    $('#rowAnalysisDiv'+id_analysis).prepend(row)
                                                    let seen = {};
                                                    $('#rowAnalysisDiv'+id_analysis+' tr').each(function() {
                                                        let txt = $(this).text();
                                                        if (seen[txt]) {
                                                            $(this).remove();
                                                        }
                                                        else {
                                                            seen[txt] = true;
                                                        }
                                                    });
                                                    $("#basic-tab"+id_analysis+"poi").addClass("active");
                                                    $('#analysisDiv').css('display', 'block')
                                                    $('#contentAnalysisDiv').css({
                                                        "overflow-x": "hidden"
                                                    })
                                                }
                                            });
                                        }
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

                                            let title = "Buffer "+distanceArr[p][q]+" "+unitnum+" "+poiName
                                            radiusPOI.setTitle(title)

                                            radiusPOI.setDistanceAndUnit(distanceArr[p][q],unitArr[p][q])
                                            radiusPOI.setGeometryBuffer(latitudeArr[p],longitudeArr[p])
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

                                                    let row = "<tr><td>"+title+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"

                                                    $('#rowAnalysisDiv'+id_analysis).prepend(row)
                                                    let seen = {};
                                                    $('#rowAnalysisDiv'+id_analysis+' tr').each(function() {
                                                        let txt = $(this).text();
                                                        if (seen[txt]) {
                                                            $(this).remove();
                                                        }
                                                        else {
                                                            seen[txt] = true;
                                                        }
                                                    });
                                                    $("#basic-tab"+id_analysis+"poi").addClass("active");
                                                    $('#analysisDiv').css('display', 'block')
                                                    $('#contentAnalysisDiv').css({
                                                        "overflow-x": "hidden"
                                                    })
                                                }
                                            });
                                        }
                                        else if (parseInt(option[p][q]) !== 0) {
                                            let graphicslayers = map.ObjMap.layers.items
                                            let drivePOI = new GIS.Analysis.BufferProperty(map.ObjMap,layerId, poiName)
                                            let titleLayer 

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
                                                    
                                                    let row = "<tr><td>"+titleLayer+"</td><td>"+poiName+"</td><td>"+length+"</td></tr>"
                                                    
                                                    $('#rowAnalysisDiv'+id_analysis).prepend(row)
                                                    let seen = {};
                                                    $('#rowAnalysisDiv'+id_analysis+' tr').each(function() {
                                                        let txt = $(this).text();
                                                        if (seen[txt]) {
                                                            $(this).remove();
                                                        }
                                                        else {
                                                            seen[txt] = true;
                                                        }
                                                    });
                                                    $("#basic-tab"+id_analysis+"poi").addClass("active");
                                                    $('#analysisDiv').css('display', 'block')
                                                    $('#contentAnalysisDiv').css({
                                                        "overflow-x": "hidden"
                                                    })
                                                }
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
            });
        })
        $("#closeSiteAnalysis").on('click',function(){
            if (localStorage.getItem('titleBatasAdm') !== null) {
                localStorage.removeItem('titleBatasAdm')
            }
            if (localStorage.getItem('titleBatasAdmDriving') !== null) {
                localStorage.removeItem('titleBatasAdmDriving')
            }
            let graphicslayers = map.ObjMap.layers.items
            let graphics = map.ObjMapView.graphics.items
            if (graphicslayers.length > 0 || graphics.length > 0) {
                map.ObjMap.removeAll()
                map.ObjMapView.graphics.removeAll()
            }
            $('#analysisDiv').css('display', 'none')
            $('#contentAnalysisDiv').removeAttr("style")
            $('#tab-content-analysis').empty()
            $('#nav-tabs-analysis').empty()
        })
        // $("#hidden-table-analysis").on('click',function(){
        //     let poiGraphics = map.ObjMap.layers.items
        //     for (let b = 0; b < poiGraphics.length; b++) {
        //         if (poiGraphics[b].title.includes("Buffer") || 
        //         poiGraphics[b].title.includes("Driving")) {
        //             map.ObjMap.remove(poiGraphics[b])
        //         }
        //     }
        //     $('#tab-content-analysis').empty()
        //     $('#nav-tabs-analysis').empty()
        // })
    })
}
