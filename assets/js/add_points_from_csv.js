$(document).ready(function(){
    $("#add-from-csv").click(function(){
        let getData = localStorage.getItem("data");
        getData = JSON.parse(getData)
        $.each(getData, function(key, value){
            let latitude = value.lat
            let longitude = value.lon
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