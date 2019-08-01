$(document).ready(function(){
    $("#form-create-analysis").submit(function(e){
        e.preventDefault();
        let name_analysis = $('#name_analysis').val()
        let created_by = parseInt($('#created_by').val())
        let distance = [];
        let unit = []
        let options = []
        let latitude = []
        let longitude = []
        let values = []

        $.each(window.counterArr, function(index, value){
            latitude.push($(".latitude-form-"+value).val())
            longitude.push($(".longitude-form-"+value).val())

            distance[index] = new Array()
            unit[index] = new Array()
            options[index] = new Array()
            values.push(value)

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
        latitude = latitude.filter(function(el) {
            return (
                el !== undefined
            );
        });
        longitude = longitude.filter(function(el) {
            return (
                el !== undefined
            );
        });
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

        $.ajax({
            url: "content/save_analysis.php",
            type: "POST",
            data: {name_analysis:name_analysis, created_by:created_by, latitude:latitude , longitude:longitude, distance:distance, unit:unit, options:options, values:values},
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
                $('#instantAnalysisDiv').css('display', 'none')
                $('#contentAnalysisDiv').removeAttr("style")

                let currentNum = $("#load-data-site-analysis").children().length+1
                let newTD = "<tr class='selected'><form method='POST' id='form-analysis-"+currentNum+"'><td>"+currentNum+"</td><td>"+name+"</td>"
                newTD += "<td width='20px'><input type=hidden name='variable-for-analysis' data-latitude='"+JSON.stringify(latitude)+"' data-longitude='"+JSON.stringify(longitude)+"' data-options='"+JSON.stringify(options)+"' data-unit='"+JSON.stringify(unit)+"' data-distance='"+JSON.stringify(distance)+"' data-values='"+JSON.stringify(values)+"'>"
                newTD += "<input type='hidden' id='id-analysis-"+currentNum+"' name='id_analysis' value=0><input type='hidden' id='name-analysis-"+currentNum+"' name='name_analysis' value='"+name+"'>"
                newTD += "<button type='submit' class='link'>view</button>&nbsp;<a>edit</a></td></form>"

                $("#load-data-site-analysis").append(newTD);
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