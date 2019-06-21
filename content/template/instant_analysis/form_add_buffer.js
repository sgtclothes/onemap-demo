$(document).ready(function() {
  $("#form-list").delegate('.selectbuffer', 'click', function() {
    var $this = $(this).parents().find(".form-buffer");
    $.get("content/template/instant_analysis/buffer.php", function(data){ 
      $this.append(data)
    });
  })
});