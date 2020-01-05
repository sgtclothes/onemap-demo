function contextMenuClickMark() {
    var longitude = localStorage.getItem("livePointingLongitude")
    var latitude = localStorage.getItem("livePointingLatitude")
    var count = countLayerByGraphicsType("marker")
    if (longitude !== 0 && latitude !== 0) {
        $("#key-marker-name").val("marker-" + count)
        $("#key-marker-longitude").val(longitude)
        $("#key-marker-latitude").val(latitude)
    }
    $('#modal-fill-marker').modal('show');
}