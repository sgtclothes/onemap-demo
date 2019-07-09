function analysispoi (GIS,map){
    $(document).ready(function(){
        let analysisArr = JSON.parse(analysis_id);
        let current = analysisArr.length
        analysisArr.push(current)
        $.each(analysisArr, function(key,value){
            $('#all-poi-analysis-'+key)
            .find('input[name="checkbox"]').each(function(){
                console.log($(this).prop("checked"))
            })
        })
    })
}