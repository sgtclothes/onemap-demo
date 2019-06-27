$(document).ready(function(){
    $("#form-site").submit(function(e){
        e.preventDefault();
        if ($( "#lat-site" ).val() == 0 || $( "#lon-site" ).val() == 0) {
            let message = 'Latitude and Longitude is required';
            $(".message").text(message);
        } else {
            $.ajax({
                url: "content/save_site.php",
                type: 'POST',
                data: $(this).serialize(),
                success: function() {
                    let message = 'Data was succesfully saved';
                    $(".message").text(message);
                    $( "#lat-site" ).val(0);
                    $( "#lon-site" ).val(0);
                    $( "#name" ).val('');
                    $( "#address" ).val('');
                },
                error: function() {
                    let message = 'Error';
                    $(".message").text(message);
                },
            });   
        }
    });
});