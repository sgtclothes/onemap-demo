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
                    let latSite = $( "#lat-site" ).val();
                    let lonSite = $( "#lon-site" ).val();
                    let name = $( "#name" ).val();
                    let address = $( "#address" ).val();
                    let newTD = '<tr><td><input type=checkbox name=get-site data-latitude='+latSite+' data-longitude='+lonSite+'></td>';
                    newTD += '<td>'+latSite+'</td><td>'+lonSite+'</td><td>'+name+'</td><td>'+address+'</td></tr>';

                    $("#load-data-site").prepend(newTD);

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