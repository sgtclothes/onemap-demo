function removeFilterResults(map) {
  $(document).delegate("#button-filter-remove-property", "click", function() {
    map.ObjMapView.graphics.removeAll();
    $(this).toggle();
    $(".popupFilter").hide();
    $("input[name='select-property']").prop("checked", false);
    $("input[name='marketing-scheme-input']").prop("checked", false);
  });
}
