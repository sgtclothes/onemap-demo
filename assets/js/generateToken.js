function generateToken() {
    var username = "sigit.sasongko"
    var password = "31081995"
    var request = $.ajax({
        url: "https://139.162.2.92:6443/arcgis/tokens/",
        type: "post"
    })
    console.log(request)
}