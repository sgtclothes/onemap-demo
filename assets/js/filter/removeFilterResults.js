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
    setStartLocalStorage()

    //Reset all grouplayers
    for (let i = 0; i < groupLayers.length; i++) {
      groupLayers[i].removeAll()
    }

    //Close contextmenu
    $(".contextmenu-container").remove()
    $(".legendProperty").remove()

    //Reset filter components
    $(".popupFilter").hide();
    $("input[name='select-property']").prop("checked", false);
    $("input[name='marketing-scheme-input']").prop("checked", false);

    //Uncheck all External Data
    let inputExternalData = $("#table-external-data").find("input[type='checkbox']")
    for (let i = 0; i < inputExternalData.length; i++) {
      $(inputExternalData).prop("checked", false)
    }

    //Remove Legend if showed
    $(".legendProperty").remove()
  });
}
