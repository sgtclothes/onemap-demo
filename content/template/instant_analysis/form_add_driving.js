$(document).ready(function() {
  $("#form-list").delegate('.selectdrive', 'click', function() {
    $.get("content/template/instant_analysis/driving.php", function(data){ 
      $(".form-drive").append(data)
    });
  })
});