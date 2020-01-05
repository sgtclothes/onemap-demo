if (sessionStorage.getItem("departments") == "colliers") {
    createInfoPointing = function () {
        if ($("#hold-pointing").length > 0 || $("#hold-driving-time").length > 0 || $("#hold-driving-distance").length > 0) {
            $("#hold-pointing").remove()
            $("#hold-driving-time").remove()
            $("#hold-driving-distance").remove()
            addInfoPointing("assets/js/colliers/slider/slider.html")
        } else {
            addInfoPointing("assets/js/colliers/slider/slider.html")
        }
        $("#hold-pointing").css("background-color", "white")
        $("#hold-pointing").css("border-radius", "5px")
    }
}