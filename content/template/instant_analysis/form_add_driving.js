$(document).ready(function() {
  $("#adding-btn").on("click", function() {
    $.each(window.counterArr, function(index, value){
      if (value !== 0) {
        $("#form-list").delegate('.selectdrive-'+value, 'click', function() {
          $.get("content/template/instant_analysis/driving.php", function(data){ 
            $(".form-drive-"+value).append(data)
          });
        }) 
      }
    })
  })

  $("#form-list").delegate('.selectdrive-0', 'click', function() {
    $.get("content/template/instant_analysis/driving.php", function(data){ 
      $(".form-drive-0").append(data)
    });
  })
});