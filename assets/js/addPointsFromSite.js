function createMarkerFromSite(GIS,map){
    $(document).ready(function(){
        $("#select-row").click(function(){
            $("table tbody").find('input[name="get-site"]').each(function(index,value){
                if($(this).is(":checked")){
                    $.addRows()
                    let $ischecked = $(this)
                    $.each(window.counterArr, function(index, value){
                        if ($(".latitude-form-"+value).val() === '') {
                            $(".latitude-form-"+value).val($ischecked.attr('data-latitude'))
                            $(".longitude-form-"+value).val($ischecked.attr('data-longitude'))
                            $(".latitude-form-"+value).attr('title','Latitude '+$ischecked.attr('data-latitude'));
                            $(".longitude-form-"+value).attr('title','Longitude '+$ischecked.attr('data-longitude'));

                            let pointing = new GIS.Buffer.Pointing(
                                map.ObjMapView,
                                $ischecked.attr('data-latitude'),
                                $ischecked.attr('data-longitude')
                            )
                            pointing.render()

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
                }
            });
        });
    });
}