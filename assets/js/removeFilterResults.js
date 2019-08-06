function removeFilterResults(map) {
  $(document).delegate("#button-filter-remove-property", "click", function() {
    map.ObjMapView.graphics.removeAll();
    $(this).toggle();
  });
}
