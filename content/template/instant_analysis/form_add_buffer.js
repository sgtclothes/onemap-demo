$(document).ready(function() {
  $("#adding-btn").on("click", function() {
    $.each(window.counterArr, function(index, value){
      if (value !== 0) {
        $("#form-list").delegate('.selectbuffer-'+value, 'click', function() {
          $.get("content/template/instant_analysis/buffer.php", function(data){ 
            $(".form-buffer-"+value).append(data)
          });
        }) 
      }
    })
  })

  $("#form-list").delegate('.selectbuffer-0', 'click', function() {
    $.get("content/template/instant_analysis/buffer.php", function(data){ 
      $(".form-buffer-0").append(data)
    });
  })
});