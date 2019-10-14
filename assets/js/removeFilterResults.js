function removeFilterResults(map, groupLayer, groupLayer2) {
  $(document).delegate("#button-filter-remove-property", "click", function () {
    //Set all external data variables
    let poi = $(".checkbox-poi");
    let masterSubPOI = $(".checkbox-master-sub-poi");
    let infrastructure = $(".checkbox-infrastructure");
    let demographic = $(".checkbox-demographic");
    let subPOI = $(".checkbox-sub-poi");
    let subInfrasctructure = $(".checkbox-sub-infrastructure");
    let subDemographic = $(".checkbox-sub-demographic");

    //Remove all objects in map
    map.ObjMapView.graphics.removeAll();
    groupLayer.removeAll()
    groupLayer2.removeAll()
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
      let layer = map.ObjMap.layers.items[i];
      if (layer.id !== 'buffers' && layer.id !== 'polygons') { map.ObjMap.remove(layer); }
    }
    console.log(map.ObjMapView.graphics)
    console.log(map.ObjMap)
    // map.ObjMap.layers.items = [];

    //Reset filter components
    $(".popupFilter").hide();
    $("input[name='select-property']").prop("checked", false);
    $("input[name='marketing-scheme-input']").prop("checked", false);

    //Uncheck all External Data
    $(poi).prop("checked", false);
    $(infrastructure).prop("checked", false);
    $(demographic).prop("checked", false);
    for (let i = 0; i < masterSubPOI.length; i++) {
      $(masterSubPOI[i]).prop("checked", false);
    }
    for (let i = 0; i < subPOI.length; i++) {
      $(subPOI[i]).prop("checked", false);
    }
    for (let i = 0; i < subInfrasctructure.length; i++) {
      $(subInfrasctructure[i]).prop("checked", false);
    }
    for (let i = 0; i < subDemographic.length; i++) {
      $(subDemographic[i]).prop("checked", false);
    }

    //Remove item buffer for overlap
    $(".item-buffer-layer").remove();

    //Remove legend if available
    $(".div-poi").remove();
  });
}
