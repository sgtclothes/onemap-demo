function editAnalysis(GIS, map){
    $(document).ready(function(){
        $("#tbl-analysis-div-parent").on('click','.edit-analysis', function(){
            let id_analysis = $(this).attr('edit-id')
            let name_analysis = $(this).attr('edit-name')
            $.ajax({
                url: "content/analysis/detail_analysis.php",
                type: 'POST',
                data: {id_analysis:id_analysis,name_analysis:name_analysis},
                success: function(data) {
                    $('#titleSidebarAnalysis').css('display','none')
                    $('#newTitleSidebarAnalysis').css('display','block')
                    if ($("#mySidenav").hasClass("panel-left")) {
                        $("#mySidenav").removeClass("panel-left");
                    }
                    $("#mySidenav").addClass("panel-right");
                    $("#mySidenav").css('width','320px');
                    $("#main").css('margin-right','320px');
                    $('div.rows').each(function(){
                        $(this).remove()
                    });
                    $('#instantAnalysisDiv').css('display', 'none')
                    $('#instant-analysis-row-div').remove()
                    $('#name_analysis').val('')
                    $('#name_analysis').val(name_analysis)
    
                    $('#closebtn').on('click',function(){
                        $('#titleSidebarAnalysis').css('display','block')
                        $('#newTitleSidebarAnalysis').css('display','none')
                        $('#name_analysis').val('')
                        $('div.rows').each(function(){
                            $(this).remove()
                        });
                        map.ObjMap.removeAll()
                        map.ObjMapView.graphics.removeAll()
                    })

                    $('#form-list').css('margin-bottom', '25px')
                    $('#idAnalysis').remove()
                    $('<input>').attr({
                        type: 'hidden',
                        id: 'idAnalysis',
                        name: 'id_analysis',
                        value: id_analysis
                    }).appendTo('form#form-create-analysis');                    
    
                    let dataAnalysis = data.split("|")
                    let lat = JSON.parse(dataAnalysis[0])
                    let lon = JSON.parse(dataAnalysis[1])
                    let distance = JSON.parse(dataAnalysis[2])
                    let unit = JSON.parse(dataAnalysis[3])
                    let options = JSON.parse(dataAnalysis[4])
                    let idPoints = JSON.parse(dataAnalysis[5])
                    for (let p = 0; p < options.length; p++) {
                        $.addRows()
                        $.each(window.counterArr, function(index, value){
                            if ($(".latitude-form-"+value).val() === '') {
                                let pointing = new GIS.Buffer.Pointing(map.ObjMapView,lat[p],lon[p])
                                pointing.setPictureMarker()
                                pointing.render()
                                $(".latitude-form-"+value).css('width', '100px')
                                $(".longitude-form-"+value).css('width', '100px')
                                $(".latitude-form-"+value).siblings()[4].remove()
                                $(".latitude-form-"+value).siblings()[3].remove()
                                $(".latitude-form-"+value).val(lat[p])
                                $(".longitude-form-"+value).val(lon[p])
                                $(".id-points-form-"+value).val(idPoints[p])
                                $(".latitude-form-" + value).attr('title','Latitude '+lat[p]);
                                $(".longitude-form-" + value).attr('title','Longitude '+lon[p]);

                                $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
                                    $.get("content/template/instant_analysis/buffer.php", function(data){ 
                                        $(".form-buffer-"+value).append(data)
                                    });
                                })
                                $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
                                    $.get("content/template/instant_analysis/driving.php", function(data){ 
                                        $(".form-drive-"+value).append(data)
                                    });
                                })
                                $("#form-list").delegate(
                                    ".selectdrive-distance-" + value,
                                    "click",
                                    function() {
                                      $.get(
                                        "content/template/instant_analysis/driving_distance.php",
                                        function(data) {
                                          $(".form-drive-distance-" + value).append(data);
                                        }
                                      );
                                    }
                                  );
                            }
                        })
                        for (let q = 0; q < options[p].length; q++) {
                            $.each(window.counterArr, function(index, value){
                                if ($(".latitude-form-"+value).val() == lat[p]) {
                                    if (parseInt(options[p][q]) === 0) {
                                        $.ajax({
                                            url: "content/analysis/edit/buffer.php",
                                            type: 'POST',
                                            data: {distance: distance[p][q], unit: unit[p][q]},
                                            success: function(data) {
                                                $(".form-buffer-"+value).append(data)
                                            }
                                        })
                                    }
                                    else if (parseInt(options[p][q]) !== 0) {
                                        if (
                                            unit[p][q] == "minutes" ||
                                            unit[p][q] == "hours"
                                            ) {
                                                $.ajax({
                                                    url: "content/analysis/edit/driving.php",
                                                    type: 'POST',
                                                    data: {distance: distance[p][q], unit: unit[p][q], options: options[p][q]},
                                                    success: function(data) {
                                                        $(".form-drive-"+value).append(data)
                                                    }
                                                })
                                        }
                                        else {
                                            $.ajax({
                                                url: "content/analysis/edit/driving_distance.php",
                                                type: 'POST',
                                                data: {distance: distance[p][q], unit: unit[p][q], options: options[p][q]},
                                                success: function(data) {
                                                    $(".form-drive-distance-"+value).append(data)
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    }
                }
            })
        })
    })
}