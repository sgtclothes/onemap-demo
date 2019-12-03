var generateToken = function (username, password) {
    setMaxDigits(67);
    var user = username
    var pass = password
    var client = "requestip"
    var expiration = "60"
    var f = "json"
    var encryptionExponent = '10001'
    var modulus = '87cb451d119506f68dc3c67e7b985d4ce484d22e60193b085e21f4ee29de10023ad689bf6f834981e6efa3e94af69ced75f1665fefe6465edf58dedf25e929cb'
    var key = new RSAKeyPair(encryptionExponent, "", modulus);
    var data = {
        username: encryptedString(key, user),
        password: encryptedString(key, pass),
        f: f,
        // client: encryptedString(key, client),
        expiration: encryptedString(key, expiration),
        encrypted: true
    }


    return new Promise((resolve, reject) => {
        var ajaxPost = function () {
            var timeout = 1440;
            var hostname = "https://gis.locatorlogic.com"
            $.ajax({
                url: hostname + "/arcgis/tokens/generateToken",
                type: "post",
                data: data,
                success: function (response) {
                    if (response) {
                        if (response.error) {
                            resolve("error")
                        } else {
                            if (JSON.parse(response).token) {
                                resolve(JSON.parse(response).token)
                            } else {
                                resolve("error")
                            }
                        }
                    } else {
                        resolve("error")
                    }
                },
                error: function (error) {
                    resolve("error")
                },
            })

            var now = +(new Date());
            var expires = now + (timeout * 60000);
            var imObject = {
                "serverInfos": [
                    {
                        "server": hostname,
                        "tokenServiceUrl": hostname + "/arcgis/tokens/",
                        "adminTokenServiceUrl": hostname + "/arcgis/admin/generateToken",
                        "shortLivedTokenValidity": timeout,
                        "currentVersion": 10.22,
                        "hasServer": true
                    }
                ],
                "oAuthInfos": [],
                "credentials": [
                    {
                        "userId": Cookies.get('arcgisusername'),
                        "server": hostname,
                        "token": Cookies.get('arcgistoken'),
                        "expires": expires,
                        "validity": timeout,
                        "ssl": false,
                        "creationTime": now,
                        "scope": "server",
                        "resources": [
                            hostname + '/arcgis/rest/services'
                        ]
                    }
                ]
            };

            IdentityManager.initialize(imObject);

        }
        ajaxPost()
    })

}