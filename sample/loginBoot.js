async function loginBoot(GIS) {
    $(document).delegate("#submit-login-onemap", "click", async function () {
        var username = $("#user-username-onemap").val()
        var password = $("#user-password-onemap").val()
        var rememberMe = $("input[name='remember-me']").prop("checked")
        var outFields = "*"
        if (validateUsername(username) == true) {
            await generateToken(username, password).then(async function (token) {
                if (token !== "error") {
                    var layersRequest = {
                        query: {
                            f: "json",
                            where: "username='" + username + "'",
                            outFields: outFields,
                            token: token
                        },
                        responseType: "json",
                        usePost: true
                    };
                    await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/13/query", layersRequest).then(async function (results) {
                        if (results.data.features.length > 0) {
                            var id = results.data.features[0].attributes.id
                            var username = results.data.features[0].attributes.username
                            var departmentId = results.data.features[0].attributes.department_id
                            var email = results.data.features[0].attributes.email
                            var roleId = results.data.features[0].attributes.role_id
                            var departmentName = undefined
                            var colorThemeDepartment = undefined
                            var roleName = undefined
                            var layersRequest2 = {
                                query: {
                                    f: "json",
                                    where: "id='" + departmentId + "'",
                                    outFields: "name, theme_color",
                                    token: token
                                },
                                responseType: "json",
                                usePost: true
                            };
                            var layersRequest3 = {
                                query: {
                                    f: "json",
                                    where: "id='" + roleId + "'",
                                    outFields: "name",
                                    token: token
                                },
                                responseType: "json",
                                usePost: true
                            };
                            await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/6/query", layersRequest2).then(function (res) {
                                departmentName = res.data.features[0].attributes.name
                                colorThemeDepartment = res.data.features[0].attributes.theme_color
                            })
                            await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/11/query", layersRequest3).then(function (res) {
                                roleName = res.data.features[0].attributes.name
                            })

                            sessionStorage.setItem("id", id)
                            sessionStorage.setItem("username", username)
                            sessionStorage.setItem("token", token)
                            sessionStorage.setItem("departments", departmentName)
                            sessionStorage.setItem("colorTheme", colorThemeDepartment)
                            sessionStorage.setItem("email", email)
                            sessionStorage.setItem("role", roleName)

                            if (rememberMe == true) {
                                Cookies.set('arcgistoken', token, { expires: 14 });
                            }

                            location.replace("index.php")

                        } else {
                            $("#username-password-handler-login-onemap").find("div").text("Invalid username or password")
                            $("#username-password-handler-login-onemap").show()
                        }
                    })
                } else {
                    $("#username-password-handler-login-onemap").find("div").text("Invalid username or password")
                    $("#username-password-handler-login-onemap").show()
                }
            })
        }
    })

    $(document).delegate("#see-password-user-onemap", "click", function () {
        var i = $(this).find("i")
        if ($(i).hasClass("fa-eye")) {
            $(i).removeClass("fa-eye").addClass("fa-eye-slash")
            $(this).next().attr("type", "text")
        } else if ($(i).hasClass("fa-eye-slash")) {
            $(i).removeClass("fa-eye-slash").addClass("fa-eye")
            $(this).next().attr("type", "password")
        }
    })

}

var validateEmail = function (email) {
    if (email == "") {
        alert("Please fill your email")
        return (false)
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    } else {
        $("#username-password-handler-login-onemap").find("div").text("Invalid email address")
        $("#username-password-handler-login-onemap").show()
        return (false)
    }
}

var validateUsername = function (username) {
    if (username == "") {
        $("#username-password-handler-login-onemap").find("div").text("Please fill your username")
        $("#username-password-handler-login-onemap").show()
        return (false)
    } else return true
}

var getUrlVars = function () {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
