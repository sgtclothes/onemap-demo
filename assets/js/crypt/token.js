var generateToken = function () {
    setMaxDigits(67);
    var username = "sigit.sasongko"
    var password = "31081995"
    var client = "requestip"
    var expiration = "60"
    var f = "json"
    var encryptionExponent = '10001'
    var modulus = '87cb451d119506f68dc3c67e7b985d4ce484d22e60193b085e21f4ee29de10023ad689bf6f834981e6efa3e94af69ced75f1665fefe6465edf58dedf25e929cb'
    var key = new RSAKeyPair(encryptionExponent, "", modulus);
    var data = {
        username: encryptedString(key, username),
        password: encryptedString(key, password),
        f: f,
        client: encryptedString(key, client),
        expiration: encryptedString(key, expiration),
        encrypted: true
    }


    return new Promise((resolve, reject) => {
        var ajaxPost = function () {
            $.ajax({
                url: "https://gis.locatorlogic.com/arcgis/tokens/generateToken",
                type: "post",
                data: data,
                success: function (response) {
                    var last2 = JSON.parse(response).token.slice(-2);
                    if (last2 == "..") {
                        ajaxPost()
                    } else {
                        resolve(JSON.parse(response).token)
                    }
                }
            })
        }
        ajaxPost()
    })

}