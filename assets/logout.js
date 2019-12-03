var logout = function () {
    Cookies.remove("arcgistoken")
    window.location.replace("login.php")
}

$(document).delegate("#logout", "click", function () {
    logout()
})