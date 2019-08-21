function createSite(createSiteExpand, GIS, map) {
    $(document).ready(function(){
        $("#form-site").submit(function(e){
            e.preventDefault();
            let lat = parseFloat($( "#lat-site" ).val())
            let lon = parseFloat($( "#lon-site" ).val())
            if (lat === 0 || lon === 0) {
                let message = 'Latitude or Longitude is invalid';
                $(".message").text(message);
            }
            else if (typeof lat === 'number' && lat >= -90 && lat <= 90 && typeof lon === 'number' && lon >= -180 && lon <= 180) {
                $.ajax({
                    url: "content/save_site.php",
                    type: 'POST',
                    data: $(this).serialize(),
                    success: function() {
                        let message = 'Data was succesfully saved';
                        $(".message").text(message);
                        let latSite = $( "#lat-site" ).val();
                        let lonSite = $( "#lon-site" ).val();
                        let name = $( "#name" ).val();
                        let address = $( "#address" ).val();
                        let newTD = '<tr><td><input type=checkbox name=get-site data-latitude='+latSite+' data-longitude='+lonSite+'></td>';
                        newTD += '<td>'+latSite+'</td><td>'+lonSite+'</td><td>'+name+'</td><td>'+address+'</td></tr>';
    
                        $("#load-data-site").prepend(newTD);
    
                        $( "#name" ).val('');
                        $( "#address" ).val('');
                        $(".message").text(message);

                        setTimeout(function() {
                            if(createSiteExpand){
                                createSiteExpand.collapse();
                            }

                            let pointing = new GIS.Buffer.Pointing(map.ObjMapView,lat,lon)
                            pointing.setPictureMarker()
                            pointing.render()
                            $('#error-input-points').hide()
                            $('#error-down-service').hide()
                            
                            $.addRows()
                            $.each(window.counterArr, function(index, value){
                                if ($(".latitude-form-"+value).val() === '') {
                                    $(".latitude-form-"+value).val(lat)
                                    $(".longitude-form-"+value).val(lon)
                                    $(".latitude-form-"+value).attr('title','Latitude '+lat);
                                    $(".longitude-form-"+value).attr('title','Longitude '+lon);
                                    $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
                                        $('#error-input-buffer').hide()
                                        $('#error-down-service').hide()
                                        $.get("content/template/instant_analysis/buffer.php", function(data){ 
                                            $(".form-buffer-"+value).append(data)
                                        });
                                    })
                                    $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
                                        $('#error-input-buffer').hide()
                                        $('#error-down-service').hide()
                                        $.get("content/template/instant_analysis/driving.php", function(data){ 
                                            $(".form-drive-"+value).append(data)
                                        });
                                    })
                                    $("#form-list").delegate(
                                        ".selectdrive-distance-" + value,
                                        "click",
                                        function() {
                                            $('#error-input-buffer').hide()
                                            $('#error-down-service').hide()
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

                            let mySidenav = document.getElementById("mySidenav");
                            if (document.getElementById("myViewer").style.width > "0px" 
                                || document.getElementById("mySiteAnalysis").style.width > "0px") {
                                mySidenav.classList.add("panel-right");
                                document.getElementById("main").style.marginRight = "320px";
                                mySidenav.setAttribute("style", "width:320px;");
                                if (mySidenav.classList.contains("panel-left")) {
                                mySidenav.classList.remove("panel-left");
                                }
                            } else {
                                document.getElementById("mySidenav").style.width = "320px";
                                document.getElementById("main").style.marginLeft = "320px";
                                document.getElementById("mySidenav").classList.add("panel-left");
                                document.getElementById("main").style.marginRight = "0";
                            }

                            $( "#lat-site" ).val('');
                            $( "#lon-site" ).val('');
                        }, 800);
                    },
                    error: function() {
                        let message = 'Error';
                        $(".message").text(message);
                    },
                });   
            }
            else {
                let message = 'Latitude or Longitude is invalid';
                $(".message").text(message);
            }
        });
    });
}