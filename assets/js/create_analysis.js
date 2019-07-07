$(document).ready(function(){
    $("#form-create-analysis").submit(function(e){
        e.preventDefault();
        let $form = $(this)
        let name_analysis = $('#name_analysis').val()
        let created_by = parseInt($('#created_by').val())
        let distance = [];
        let unit = []
        let options = []
        let latitude = []
        let longitude = []
        let valueArr = []

        $('.distance').each(function(){
            let dist = parseFloat($(this).val())
            distance.push(dist);
        });
        $('.select-unit').each(function(){
            unit.push($(this).val());
            options.push(0);
        });
        $('.distance-time').each(function(){
            let dist_time = parseFloat($(this).val())
            distance.push(dist_time);
        });
        $('.select-unit-time').each(function(){
            unit.push($(this).val());
        });
        $('.select-driving').each(function(){
            let option = parseInt($(this).val())
            options.push(option);
        });

        $.each(window.counterArr, function(index, value){
            latitude.push($(".latitude-form-"+value).val())
            longitude.push($(".longitude-form-"+value).val())
            valueArr.push(value)
        })

        $.ajax({
            url: "content/save_analysis.php",
            type: "POST",
            data: {name_analysis:name_analysis, created_by:created_by, latitude:latitude , longitude:longitude, distance:distance, unit:unit, options:options},
            success: function(response) {
                console.log(response)
                $('#name_analysis').val('')
                $('div.rows').each(function(){
                    $(this).remove()
                });
            },
            error: function (jqXHR, exception){
                if (jqXHR.status === 0) {
                    console.log('Not connect. Verify Network.')
                } else if (jqXHR.status == 404) {
                    console.log('Requested page not found. [404]')
                } else if (jqXHR.status == 500) {
                    console.log('Internal Server Error [500].')
                } else if (exception === 'parsererror') {
                    console.log('Requested JSON parse failed.')
                } else if (exception === 'timeout') {
                    console.log('Time out error.')
                } else if (exception === 'abort') {
                    console.log('Ajax request aborted.')
                } else {
                    console.log('Uncaught Error.' + jqXHR.responseText)
                }
            }
        });
    })
})