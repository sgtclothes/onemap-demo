function createMarkerFromCSV(GIS,map){
    $(document).ready(function(){
        $("#add-from-csv").on('click', function() {
            let getData = localStorage.getItem("data");
            let fields = []
            let values = []
            let latitude = []
            let longitude = []
            getData = JSON.parse(getData)
            if (getData === null) {
                alert('You must upload CSV first.');
            }
            
            function isFloat(n){
                return Number(n) === n && n % 1 !== 0;
            }
    
            for (let i = 0; i < getData.length; i++) {
                let getKey = getData[i][0].attributes
                fields.push(Object.keys(getKey))
                let valueArr = []
                let latArr = []
                let lonArr = []
                for (let j = 0; j < getData[i].length; j++) {
                    let getValue = getData[i][j].attributes
                    let value = Object.values(getValue)
                    valueArr.push(value)
                    
                    for (let v = 0; v < value.length; v++) {
                        if (isFloat(value[v])) {
                            if(typeof value[v] === 'number' && value[v] >= -90 && value[v] <= 90 ) {
                                latArr.push(value[v])
                            }
                            else if(typeof value[v] === 'number' && value[v] >= -180 && value[v] <= 180 ) {
                                lonArr.push(value[v])
                            }   
                        }
                    }
                    
                }
                values.push(valueArr)
                latitude.push(latArr)
                longitude.push(lonArr)
            }
    
            $.ajax({
                url: "content/form_list_csv.php",
                type: "POST",
                data: {fields:fields, values:values, latitude:latitude, longitude:longitude},
                success: function(data) {
                    $('body').find('#modal_form_csv').each(function(){
                        $(this).remove()
                    })
                    $('body').append(data)
                    $.fn.addLatAndLon()
                    $('#modal_form_csv').modal('show');
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
        $.fn.addLatAndLon = function() {
            let getData = localStorage.getItem("data");
            let fields = []
            getData = JSON.parse(getData)
            for (let i = 0; i < getData.length; i++) {
                let getKey = getData[i][0].attributes
                fields.push(Object.keys(getKey))
            }

            $.each(fields,function(key,value){
                $("#select-row-csv"+key).click(function(event){
                    $('#modal_form_csv').modal('toggle');
                    event.stopImmediatePropagation();
                    $("table tbody").find('input[name="get-csv'+key+'"]').each(function(index,value){
                        if($(this).is(":checked")){
                            $.addRows()
                            let $ischecked = $(this)
                            $.each(window.counterArr, function(index, value){
                                if ($(".latitude-form-"+value).val() === '') {
                                    $(".latitude-form-"+value).val($ischecked.attr('data-latitude'+key))
                                    $(".longitude-form-"+value).val($ischecked.attr('data-longitude'+key))
                                    $(".latitude-form-"+value).attr('title','Latitude '+$ischecked.attr('data-latitude'+key));
                                    $(".longitude-form-"+value).attr('title','Longitude '+$ischecked.attr('data-longitude'+key));
                                    
                                    let pointing = new GIS.Buffer.Pointing(
                                        map.ObjMapView,
                                        $ischecked.attr('data-latitude'+key),
                                        $ischecked.attr('data-longitude'+key)
                                    )
                                    pointing.setPictureMarker()
                                    pointing.render()
                                    $('#error-input-points').hide()

                                    $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
                                        $('#error-input-buffer').hide()
                                        $.get("content/template/instant_analysis/buffer.php", function(data){ 
                                            $(".form-buffer-"+value).append(data)
                                        });
                                    })
                                    $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
                                        $('#error-input-buffer').hide()
                                        $.get("content/template/instant_analysis/driving.php", function(data){ 
                                            $(".form-drive-"+value).append(data)
                                        });
                                    }) 
                                    $("#form-list").delegate(
                                        ".selectdrive-distance-" + value,
                                        "click",
                                        function() {
                                            $('#error-input-buffer').hide()
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
                        }
                    });
                });
            })
        }
    })
}