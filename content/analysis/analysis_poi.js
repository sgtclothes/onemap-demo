function analysispoi (GIS,map){
    $(document).ready(function(){
        let latitude
        let longitude
        let unit
        let distance
        let options
        let objectID
        $("#load-data-site-analysis").click(function(){
            $(this).find('input[name="get-point-for-analysis"]').each(function(){
                if($(this).is(":checked")){
                    latitude = $(this).attr('data-latitude')
                    longitude = $(this).attr('data-longitude')
                    unit = $(this).attr('data-unit')
                    distance = $(this).attr('data-distance')
                    options = $(this).attr('data-options')
                    objectID = $(this).attr('data-objectid')
                }
            })
        })

        let analysisArr = JSON.parse(analysis_id);
        analysisArr = analysisArr.map(x=>parseInt(x))
        let current = analysisArr.length+1
        analysisArr.push(current)
        $.each(analysisArr, function(key,value){
            $('input:checkbox.an_poi-'+value).each(function(){
                $(this).click(function(){
                    if($(this).is(":checked")){
                        let layerId = $(this).val()
                        let option = JSON.parse(options)
                        let latitudeArr = JSON.parse(latitude)
                        latitudeArr = latitudeArr.map(x=>parseFloat(x))
                        let longitudeArr = JSON.parse(longitude)
                        longitudeArr = longitudeArr.map(x=>parseFloat(x))
                        let distanceArr = JSON.parse(distance)
                        let unitArr = JSON.parse(unit)
                        let objectIDArr = JSON.parse(objectID)

                        for (let p = 0; p < option.length; p++) {
                            option[p].forEach(el => {
                                if (el === 0) {
                                    for (let a = 0; a < latitudeArr.length; a++) {
                                        let bufferPOI = new GIS.Analysis.BufferPOI(map.ObjMap,map.ObjMapView,latitudeArr[a],longitudeArr[a],layerId)
                                        for (let b = 0; b < distanceArr[a].length; b++) {
                                            bufferPOI.setDistanceAndUnit(distanceArr[a][b],unitArr[a][b])
                                            bufferPOI.setObjectID(objectIDArr[a][b])
                                        }
                                        bufferPOI.create()
                                        console.log(bufferPOI)
                                    }
                                }
                            });
                        }
                    }
                })
            })
        })
    })
}