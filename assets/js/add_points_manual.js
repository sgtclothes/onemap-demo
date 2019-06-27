$(document).ready(function(){
    $("#ok-input").click(function(){
        let $latitude = parseFloat($("#lat-input").val())
        let $longitude = parseFloat($("#lon-input").val())
        let latMessage;
        let lonMessage;
        if( typeof $latitude === 'number' && $latitude >= -90 && $latitude <= 90 ) {
            latMessage = 'Lat Ok';
        } else {
            latMessage = 'Latitude must be a number and between -90 to 90';
            $(".lat-message").text(latMessage);
        }
        if( typeof $longitude === 'number' && $longitude >= -180 && $longitude <= 180 ) {
            lonMessage = 'Lon Ok';
        } else {
            lonMessage = 'Longitude must be a number and between -180 to 180';
            $(".lon-message").text(lonMessage);
        }
        if (latMessage == "Lat Ok" && "Lon Ok") {
            $.addRows()
            $.each(window.counterArr, function(index, value){
                if ($(".latitude-form-"+value).val() === '') {
                    $(".latitude-form-"+value).val($latitude)
                    $(".longitude-form-"+value).val($longitude)
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
        }
    })
})