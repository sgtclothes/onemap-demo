$(document).ready(function() {
    let counter = 0;
    window.counterArr = []

    $.fn.addRows = function() {
      counterArr.push(counter)
      counterArr = [...new Set(counterArr)]
      let newRow = $("<div class=rows>");
      let cols = "<hr style='margin-right: 2px'>";

      cols +=
        '<div class="form-group row" style="margin-left:10px; margin-top:15px;">';
      cols +=
        '<input name="latitude" type="text" value="" class="form-control latitude-form-'+counter+'" required readonly style="width:80px; margin-right:5px;" title="Latitude">';
      cols +=
        '<input name="longitude" type="text" value="" class="form-control longitude-form-'+counter+'" required readonly style="width:80px;" title="Longitude">';
      cols += '<div class="btn-group ml-1">';
      cols +=
        '<button type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon dropdown-toggle" data-toggle="dropdown" title="Add Buffer Radius, Driving Time and Driving Distance">';
      cols += '<i class="icon-stack3"></i></button>';
      cols += '<div class="dropdown-menu dropdown-menu-right">';
      cols += '<a href="#" class="dropdown-item selectbuffer-'+counter+'">Buffer</a>';
      cols +=
        '<a href="#" class="dropdown-item selectdrive-'+counter+'">Driving Time</a>';
      cols +=
        '<a href="#" class="dropdown-item selectdrive-distance-'+counter+'">Driving Distance</a></div></div>';
      cols +=
        '<button style="display:none;" type="button" class="btn btn-sm alpha-purple border-purple-300 text-purple-800 btn-icon ml-2"><i class="icon-info3"></i></button>';
      cols +=
        '<button type="button" class="btn btn-sm alpha-pink border-pink-400 text-pink-800 btn-icon btn-delete ml-2" title="Delete all buffers and marker pins"><i class="icon-cross2"></i></button></div>';
      cols += '<div class="form-buffer-'+counter+'"></div>'
      cols += '<div class="form-drive-'+counter+'"></div>'
      cols += '<div class="form-drive-distance-'+counter+'"></div>'
      cols += "</div>";

      newRow.append(cols);
      $("#form-list").append(newRow);
      counter++;
    }

    jQuery.addRows = function(){ $.fn.addRows() };
});

// width input lat & lon = 68px
// $(document).ready(function() {
//   $("#adding-btn").on("click", function() {
//     $.get("content/template/instant_analysis/index.php", function(data){ 
//       $("#form-list").append(data)
//     });
//   })
// })