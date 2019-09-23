function removeFilterResults(map) {
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
    map.ObjMap.layers.items = [];

    //Set buffer localstorage
    localStorage.removeItem("startBuffer")

    //Reset filter components
    $(".popupFilter").hide();
    $("input[name='select-property']").prop("checked", false);
    $("input[name='marketing-scheme-input']").prop("checked", false);
    $(".button-create-buffer").hide()

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
