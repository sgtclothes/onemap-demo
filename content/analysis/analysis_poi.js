function analysispoi (GIS,map){
    $(document).ready(function(){
        let latitude = null
        let longitude = null
        let options = null
        let distance = null
        let unit = null
        $("#load-data-site-analysis").click(function(){
            $(this).find('input[name="get-point-for-analysis"]').each(function(index,value){
                if($(this).is(":checked")){
                    latitude = $(this).attr('data-latitude')
                    longitude = $(this).attr('data-longitude')
                    unit = $(this).attr('data-unit')
                    distance = $(this).attr('data-distance')
                    options = $(this).attr('data-options')
                    console.log(latitude)
                    console.log(longitude)
                    console.log(options)
                    console.log(distance)
                    console.log(unit)
                }
            })
        })

        let analysisArr = JSON.parse(analysis_id);
        let current = analysisArr.length
        analysisArr.push(current)
        $.each(analysisArr, function(key,value){
            $('#all-poi-analysis-'+key)
            .find('input[name="an_poi"]').each(function(){
                $(this).on('click',function(){
                    if($(this).prop('checked')){
                        console.log($(this).val())
                    }
                })
            })
        })
    })
}