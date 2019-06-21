$(document).ready(function() {
    var counter = 1;
    $("#adding-btn").on("click", function() {
      let newRow = $("<div class=cols>");
      let cols = "<hr style='margin-right: 2px'>";

      cols +=
        '<div class="form-group row" style="margin-left:10px; margin-top:15px;">';
      cols +=
        '<label class="col-form-label" style="margin-right:5px;">Latitude</label>';
      cols +=
        '<input name="latitude" type="text" value="0" class="form-control latitude-form" required readonly style="width:60px; margin-right:5px;">';
      cols +=
        '<label class="col-form-label" style="margin-right:5px;">Longitude</label>';
      cols +=
        '<input name="longitude" type="text" value="0" class="form-control longitude-form" required readonly style="width:60px;">';
      cols +=
        '<button type="button" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon btn-delete ml-2"><i class="icon-cross2"></i></button></div>';
      cols += '<div style="padding-left: 90px; padding-bottom: 10px;">';
      cols += '<div class="btn-group ml-1">';
      cols +=
        '<button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon dropdown-toggle" data-toggle="dropdown">';
      cols += '<i class="icon-stack3"></i></button>';
      cols += '<div class="dropdown-menu dropdown-menu-right">';
      cols += '<a href="#" class="dropdown-item selectbuffer">Buffer</a>';
      cols +=
        '<a href="#" class="dropdown-item selectdrive">Driving Time</a></div></div>';
      cols +=
        '<button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon ml-2"><i class="icon-info3"></i></button></div>';
      cols += '<div class="form-buffer"></div>'
      cols += '<div class="form-drive"></div>'
      cols += "</div>";

      newRow.append(cols);
      $("#form-list").append(newRow);
      counter++;
    });

    $("#form-list").on("click", ".btn-delete", function(event) {
      $(this)
        .closest("div.cols")
        .remove();
      counter -= 1;
    });
});

// $(document).ready(function() {
//   $("#adding-btn").on("click", function() {
//     $.get("content/template/instant_analysis/index.php", function(data){ 
//       $("#form-list").append(data)
//     });
//   })
// })