$(document).ready(function(){
    $("#form-create-analysis").submit(function(e){
        e.preventDefault();
        let $form = $(this)
        let analysisArr = JSON.parse(analysis_id);
        let current = analysisArr.length+1
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
            success: function() {
                let name = $('#name_analysis').val()
                $('div.rows').each(function(){
                    $(this).remove()
                });
                let viewer = document.getElementById("myViewer");
                if (viewer.style.width > "0px") {
                    $(".esri-ui-top-right")
                        .children("#drag-csv")
                        .remove();
                    $("#myViewer").css('width','0px');
                    $("#main").css('margin-left','0px');
                    $("#mySiteAnalysis").css('width','300px');
                    $("#main").css('margin-left','300px');
                } 
                if ($("#mySidenav").hasClass("panel-left")) {
                    $("#mySidenav").removeClass("panel-left");
                    $("#mySidenav").addClass("panel-right");
                    $("#main").css('margin-right','320px');
                    $("#mySidenav").css('width','320px');
                    $("#mySiteAnalysis").css('width','320px');
                }
                let newTD = '<tr><td><input type=radio checked name=get-site data-latitude='+JSON.stringify(latitude)+' data-longitude='+JSON.stringify(longitude)+'></td>';
                newTD += '<td>'+name+'</td><td width=20px><button class=btn btn-xs type=button data-toggle=modal data-target=#modal_form_poi_'+current+'><i class=icon-pin-alt><i></button></td></tr>';

                $("#load-data-site-analysis").prepend(newTD);
                $('#name_analysis').val('')
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