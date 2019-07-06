function createMarkerFromCSV(GIS,map){
    $(document).ready(function(){
        $("#add-from-csv").click(function(){
            let getData = localStorage.getItem("data");
            getData = JSON.parse(getData)
            if (getData === null) {
                alert('You must upload CSV first.');
            }
            $.each(getData, function(key, value){
                let getAttribute = value
                $.each(getAttribute, function(key, value){
                    let latitude = value.attributes.lat
                    let longitude = value.attributes.lon
                    let pointing = new GIS.Buffer.Pointing(map.ObjMapView,latitude,longitude)
                    pointing.render()
                    
                    $.addRows()
                    $.each(window.counterArr, function(index, value){
                        if ($(".latitude-form-"+value).val() === '') {
                            $(".latitude-form-"+value).val(latitude)
                            $(".longitude-form-"+value).val(longitude)
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
                        }
                    })
                })
            })
        })
    })
}