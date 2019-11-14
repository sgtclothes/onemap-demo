var loading = function (state) {
    if (state == "show") {
        $("#loading-bar").show()
    } else if (state == "hide") {
        $("#loading-bar").hide()
    }
}