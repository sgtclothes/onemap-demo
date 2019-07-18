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

        $.each(window.counterArr, function(index, value){
            latitude.push($(".latitude-form-"+value).val())
            longitude.push($(".longitude-form-"+value).val())
            distance[index] = new Array()
            unit[index] = new Array()
            options[index] = new Array()
            $(".form-buffer-"+value).find('.distance').each(function(){
                distance[index].push($(this).val())
            })
            $(".form-drive-"+value).find('.distance-time').each(function(){
                distance[index].push($(this).val())
            })
            $(".form-drive-distance-"+value).find('.distance-time-distance').each(function(){
                distance[index].push($(this).val())
            })
            $(".form-buffer-"+value).find('.select-unit').each(function(){
                unit[index].push($(this).val())
                options[index].push(0)
            })
            $(".form-drive-"+value).find('.select-unit-time').each(function(){
                unit[index].push($(this).val())
            })
            $(".form-drive-distance-"+value).find('.select-unit-time-distance').each(function(){
                unit[index].push($(this).val())
            })
            $(".form-drive-"+value).find('.select-driving').each(function(){
                options[index].push(parseInt($(this).val()))
            })
            $(".form-drive-distance-"+value).find('.select-driving-distance').each(function(){
                options[index].push(parseInt($(this).val()))
            })
        })
        distance = distance.filter(function(el) {
            return (
                el.length !== 0
            );
        });
        unit = unit.filter(function(el) {
            return (
                el.length !== 0
            );
        });
        options = options.filter(function(el) {
            return (
                el.length !== 0
            );
        });

        console.log(distance)
        console.log(unit)
        console.log(options)

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
                let newTD = '<tr><td><input type=radio checked name=get-point-for-analysis data-latitude='+JSON.stringify(latitude)+' data-longitude='+JSON.stringify(longitude)+' data-options='+JSON.stringify(options)+' data-unit='+JSON.stringify(unit)+' data-distance='+JSON.stringify(distance)+'></td>';
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