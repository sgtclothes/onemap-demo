var consumePOI = async function (map) {
    var kTags = []
    var layerLongName = []
    var imageName = []
    var tableExternalData = $("#table-external-data")
    var tableExternalDataInPopup = $("#table-config-external-data")
    console.log(tableExternalDataInPopup)
    var longestLength = 0

    await getPOI().then(function (results) {
        for (let i = 0; i < results.length; i++) {
            kTags.push(results[i].attributes.k_tag)
            layerLongName.push(results[i].attributes.layerlongname)
            imageName.push(results[i].attributes.imagename)
        }
    })

    for (let i = 0; i < layerLongName.length; i++) {
        layerLongName[i] = layerLongName[i].split("\\")
    }

    for (let i = 0; i < kTags.length; i++) {
        kTags[i] = kTags[i].split(";")
    }

    longestLength = checkTheLongestArray(layerLongName)

    createTreeCheckBox(layerLongName, tableExternalData, imageName, kTags)
    createTreeCheckBox(layerLongName, tableExternalDataInPopup, imageName, kTags)
    setExpandElement($(".table-row-tree"))
    indexAllInput($(".table-row-tree"))
    neatAllInput($(".table-row-tree"))
    shrinkAllCheckBox($(".table-row-tree"), longestLength)

    $(document).delegate(".expand-external-data", "click", function () {
        let punctuations = [/\s/g, "&", "'", ".", "/"]
        let label = $(this).next().next().text()
        label = punctuationFixer(punctuations, "_", label)
        let index = $(this).next().attr("name").split("-")[2]
        if ($(this).hasClass("mi-add")) {
            $(this).removeClass("mi-add").addClass("mi-remove")
            $("input[name='checkbox-" + label + "-" + (Number(index) + 1) + "']").parents("tr").show()
        } else if ($(this).hasClass("mi-remove")) {
            $(this).removeClass("mi-remove").addClass("mi-add")
            $(this).parents("tr").nextUntil().each(function () {
                if ($(this).attr("value") <= index) {
                    return false;
                } else {
                    if ($(this).find("i").hasClass("mi-remove")) {
                        $(this).find("i").removeClass("mi-remove").addClass("mi-add")
                    }
                    $(this).hide();
                }
            })
        }
    })

    $(document).delegate("#table-external-data input[type='checkbox']", "click", function () {
        let punctuations = [/\s/g, "&", "'", ".", "/"]
        let label = $(this).next().text()
        label = punctuationFixer(punctuations, "_", label)
        let index = $(this).attr("name").split("-")[2]
        let checkValue = []
        if ($(this).prop("checked") == true) {
            if ($(this).prev().hasClass("mi-add") || $(this).prev().hasClass("mi-remove")) {
                $(this).prev().removeClass("mi-add").addClass("mi-remove")
                $("input[name='checkbox-" + label + "-" + (Number(index) + 1) + "']").parents("tr").show()
                let externalData = []
                $(this).parents("tr").nextUntil().each(function () {
                    if ($(this).attr("value") <= index) {
                        return false;
                    } else {
                        if ($(this).find("input").prop("checked") == false) {
                            externalData.push($(this).find("input"))
                            $(this).find("input").prop("checked", true);
                        }
                    }
                })
                if (checkGraphicsExist(map).length > 0) {
                    console.log(checkGraphicsExist(map).length)
                    for (let i = 0; i < checkGraphicsExist(map).length; i++) {
                        consumeServicesExternalData(map, externalData, checkGraphicsExist(map)[i])
                    }
                } else {
                    consumeServicesExternalData(map, externalData)
                }
            } else {
                if (checkGraphicsExist(map).length > 0) {
                    console.log(checkGraphicsExist(map).length)
                    for (let i = 0; i < checkGraphicsExist(map).length; i++) {
                        consumeServicesExternalData(map, $(this), checkGraphicsExist(map)[i])
                    }
                } else {
                    consumeServicesExternalData(map, $(this))
                }
                checkValue = detectChecked("checked", $(this), checkValue, index)
                changeStateMasterCheckBox($(this), checkValue, index)
            }
        } else if ($(this).prop("checked") == false) {
            if ($(this).prev().hasClass("mi-add") || $(this).prev().hasClass("mi-remove")) {
                $(this).prev().removeClass("mi-remove").addClass("mi-add")
                $(this).parents("tr").nextUntil().each(function () {
                    if ($(this).attr("value") <= index) {
                        return false;
                    } else {
                        if ($(this).find("i").hasClass("mi-remove")) {
                            $(this).find("i").removeClass("mi-remove").addClass("mi-add")
                        }
                        removePointExternalData(map, groupLayerExternalData, $(this).find("input"))
                        $(this).hide();
                    }
                })
                $(this).parents("tr").nextUntil().each(function () {
                    if ($(this).attr("value") <= index) {
                        return false;
                    } else {
                        if ($(this).find("input").prop("checked") == true) {
                            removeLegendExternalData($(this).find("input"))
                            $(this).find("input").prop("checked", false);
                        }
                    }
                })
            } else {
                removePointExternalData(map, groupLayerExternalData, $(this))
                removeLegendExternalData($(this))
                checkValue = detectChecked("unchecked", $(this), checkValue, index)
                changeStateMasterCheckBox($(this), checkValue, index)
            }
        }
    })
}

var getPOI = async function () {
    var results = undefined
    var url = "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2/query?where=1=1&outFields=*&token=" + token
    await EsriRequest(
        url, { query: { f: "json" }, responseType: "json" }
    ).then(function (response) {
        results = response.data.features
    });

    return results
}

var createTreeCheckBox = function (object, table, imageName, kTags) {
    let tempSub = 0
    let tempObject = ""
    object = object.sort(comparator)
    kTags = kTags.sort(comparator)
    for (let i = 0; i < object.length; i++) {
        for (let j = 0; j < object[i].length; j++) {
            if (i == 0) {
                if (object[i][j] !== "") {
                    createRowTree(kTags[i], object[i][j], table, object[i].length, j)
                }
            } else if (object[i][j] !== object[i - 1][j]) {
                if (object[i][j] !== "") {
                    if (tempSub < checkSubCheckBox(object[i][j], object[i].length, j)) {
                        tempObject = object[i - 1][j - 1]
                        createRowTree(kTags[i], object[i][j], table, object[i].length, j, tempObject)
                    } else if (tempSub > checkSubCheckBox(object[i][j], object[i].length, j)) {
                        tempSub = checkSubCheckBox(object[i][j], object[i].length, j)
                    } else {
                        createRowTree(kTags[i], object[i][j], table, object[i].length, j, tempObject)
                    }
                }
            }
        }
    }
}

var checkSubCheckBox = function (object, length, j) {
    for (let s = 0; s < length; s++) {
        if (j == s) {
            return s
        }
    }
}

var createRowTree = function (kTags, object, table, length, j, parentObject) {
    let punctuations = [/\s/g, "&", "'", ".", "/"]
    let id = ""
    let name = kTags[kTags.length - 1]
    name = punctuationFixer(punctuations, "_", name)
    if (parentObject) {
        id = punctuationFixer(punctuations, "_", parentObject)
    } else {
        id = punctuationFixer(punctuations, "_", object)
    }
    for (let s = 0; s < length; s++) {
        if (j == s) {
            kTags = kTags.toString()
            let val = 30 * j
            $(table).append("<tr ktag='" + kTags + "' style='background-color:#f7f8fc; border:2px solid white;' value='" + s + "' class='table-row-tree'><td style='padding-top:10px;'>" + "<div style='margin-left:" + (16 + val) + "px;'><input class='styled' style='vertical-align:middle;' type='checkbox' id='checkbox-" + name + "-" + s + "' name='checkbox-" + id + "-" + s + "'><label for='checkbox-" + name + "-" + s + "' class='label-check' style='font-size:12px; word-wrap:break-word;'><span></span>" + object + "</label>" + "</div></td></tr>")
        }
    }
}

var checkTheLongestArray = function (object) {
    let max = 0
    for (let i = 0; i < object.length; i++) {
        if (max < object[i].length) {
            max = object[i].length
        }
    }
    return max
}

var fillEmptyArray = function (object, length) {
    for (let i = 0; i < object.length; i++) {
        for (let j = 0; j < length; j++) {
            if (object[i][j] == undefined) {
                object[i][j] = ""
            }
        }
    }
    return object
}

var comparator = function (a, b) {
    if (a[0].toUpperCase() < b[0].toUpperCase()) return -1;
    if (a[0].toUpperCase() > b[0].toUpperCase()) return 1;
    return 0;
}

var punctuationFixer = function (punctuations, replaceWith, string) {
    let str = string
    for (let i = 0; i < punctuations.length; i++) {
        str = str.replace(punctuations[i], replaceWith)
    }
    return str
}

var setExpandElement = function (object) {
    let listInput = $(object).find("input")
    for (let i = 0; i < listInput.length; i++) {
        let prevArrName = []
        if (i == 0) {
            prevArrName = $(listInput[i]).attr("name").split("-")
        } else {
            let arrName = $(listInput[i]).attr("name").split("-")
            prevArrName = $(listInput[i - 1]).attr("name").split("-")
            if (arrName[2] > prevArrName[2]) {
                $("<i style='margin-top:-2.5px; cursor:pointer;' class='expand-external-data mi-add'></i>").insertBefore($(listInput[i - 1]))
            }
        }
    }
}

var shrinkAllCheckBox = function (object, length) {
    let listInput = $(object).find("input")
    for (let i = 0; i < listInput.length; i++) {
        let arrName = $(listInput[i]).attr("name").split("-")
        if (arrName[2] > 0) {
            $(listInput[i]).parents("tr").hide()
        }
    }
}

var indexAllInput = function (object) {
    let listInput = $(object).find("input")
    for (let i = 0; i < listInput.length; i++) {
        $(listInput[i]).attr("index", i)
    }
}

var neatAllInput = function (object) {
    let listInput = $(object).find("input")
    for (let i = 0; i < listInput.length; i++) {
        let index = $(listInput[i]).parents("tr").attr("value")
        if ($(listInput[i]).prev().hasClass("mi-add") || $(listInput[i]).prev().hasClass("mi-remove")) {
            $(listInput[i]).parents("div").css("margin-left", (30 * index) + "px")
        }
    }
}

var detectChecked = function (state, object, checkValue, index) {
    checkValue.push(state)
    $(object).parents("tr").nextUntil().each(function () {
        if ($(this).attr("value") < index) {
            return false;
        } else {
            if ($(this).find("input").prop("checked") == true) {
                checkValue.push("checked")
            } else if ($(this).find("input").prop("checked") == false) {
                checkValue.push("unchecked")
            }
        }
    })
    $(object).parents("tr").prevUntil().each(function () {
        if ($(this).attr("value") < index) {
            return false;
        } else {
            if ($(this).find("input").prop("checked") == true) {
                checkValue.push("checked")
            } else if ($(this).find("input").prop("checked") == false) {
                checkValue.push("unchecked")
            }
        }
    })
    return checkValue
}

var changeStateMasterCheckBox = function (object, checkValue, index) {
    let i = index
    if (checkValue.includes("unchecked")) {
        $(object).parents("tr").prevUntil().each(function () {
            if ($(this).attr("value") < i) {
                $(this).find("input").prop("checked", false)
                return false
            }
        })
    } else {
        $(object).parents("tr").prevUntil().each(function () {
            if ($(this).attr("value") < i) {
                $(this).find("input").prop("checked", true)
                return false
            }
        })
    }
}

var consumeServicesExternalData = async function (map, object, layer) {
    console.log(layer)
    loading("show")
    let geo = undefined

    for (let i = 0; i < object.length; i++) {
        let kTag = $(object[i]).parents("tr").attr("ktag")
        kTag = kTag.split(",")
        let index = $(object[i]).attr("index")
        let where = ""
        let image = {
            type: "picture-marker",
            url: "http://app.locatorlogic.com/assets/image/",
            width: "12px",
            height: "12px"
        };

        let res = undefined
        for (let j = 0; j < kTag.length; j++) {
            where += "'" + kTag[j] + "'=any (string_to_array(k_tag,';'))"
            if (kTag[j + 1] !== undefined) {
                where += " and "
            }
        }

        let id = makeid(50)
        let graphicsLayer = new ESRI.GraphicsLayer({
            id: "external-data-" + kTag[kTag.length - 1] + "-" + id
        })

        if ($(object[i]).attr("tempid")) {
            let tempId = $(object[i]).attr("tempid")
            tempId += "," + id
            $(object[i]).attr("tempid", tempId)
        } else {
            $(object[i]).attr("tempid", id)
        }

        var layersRequest = {
            query: {
                f: "json",
                where: where,
                outFields: ["*"],
                token: token
            },
            responseType: "json",
            usePost: true
        };

        await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2/query", layersRequest).then(function (results) {
            image.url = image.url + results.data.features[0].attributes.imagename
        })

        if (layer) {

            if (layer.geometry.spatialReference.wkid == "102100") {
                await getProjectionPoint(JSON.stringify(layer.geometry.rings[0]), "3857", "4326").then(function (results) {
                    geo = "{'rings':[" + JSON.stringify(results) + "]}"
                })
            } else {
                geo = "{'rings':[" + JSON.stringify(layer.geometry.rings[0]) + "]}"
                console.log(where)
                console.log(geo)
            }

            var layersRequest2 = {
                query: {
                    f: "json",
                    where: where,
                    geometry: geo,
                    geometryType: "esriGeometryPolygon",
                    outFields: ["*"],
                    token: token
                },
                responseType: "json",
                usePost: true
            };

            let punctuations = ["{"]
            geo = punctuationFixer(punctuations, "%7B", geo)
            punctuations = ["'"]
            geo = punctuationFixer(punctuations, "%27", geo)
            punctuations = [":"]
            geo = punctuationFixer(punctuations, "%3A", geo)
            punctuations = ["["]
            geo = punctuationFixer(punctuations, "%5B", geo)
            punctuations = [","]
            geo = punctuationFixer(punctuations, "%2C", geo)
            punctuations = ["{"]
            geo = punctuationFixer(punctuations, "%7B", geo)
            punctuations = ["]"]
            geo = punctuationFixer(punctuations, "%5D", geo)
            punctuations = ["}"]
            geo = punctuationFixer(punctuations, "%7D", geo)

            await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/0/query", layersRequest2).then(function (results) {
                res = results.data
            })

        } else {
            await makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/0/query", layersRequest).then(function (results) {
                res = results.data
            })
        }

        console.log(res)

        await renderImage(map, res, graphicsLayer, groupLayerExternalData, image, kTag[kTag.length - 1], index, record)
    }
    await loading("hide")
}

var makeid = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var renderImage = function (map, res, graphicsLayer, groupLayerExternalData, image, kTag, index, callback, timeout) {
    timeout = timeout || 5000;
    var timedOut = false, timer;
    var img = new Image();
    img.onerror = img.onabort = function () {
        if (!timedOut) {
            clearTimeout(timer);
            image = {
                type: "simple-marker",
                style: "circle",
                color: getRandomColor(),
                size: "8px"
            }
            callback(map, res, graphicsLayer, groupLayerExternalData, image, kTag, index, "error")
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(map, res, graphicsLayer, groupLayerExternalData, image, kTag, index, "success")
        }
    };
    img.src = image.url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(map, res, graphicsLayer, groupLayerExternalData, image, kTag, index, "timeout")
    }, timeout);
}

var record = async function (map, res, graphicsLayer, groupLayerExternalData, image, kTag, index) {
    await displayResultsGraphics(map, res, graphicsLayer, groupLayerExternalData, image)
    if (displayedLegend.length < 1) {
        displayedLegend.push(kTag)
        await displayLegendProperty(map, "LEGEND", res, kTag, image, index)
    } else {
        if (!displayedLegend.includes(kTag)) {
            displayedLegend.push(kTag)
            await displayLegendProperty(map, "LEGEND", res, kTag, image, index)
        }
    }
    checkHeightLegend()
}

var removePointExternalData = function (map, groupLayer, object) {
    let kTag = $(object).parents("tr").attr("ktag")
    let tempid = $(object).attr("tempid").split(",")
    kTag = kTag.split(",")
    for (let i = 0; i < tempid.length; i++) {
        let layer = getNestedLayerById(map, "external-data", "external-data-" + kTag[kTag.length - 1] + "-" + tempid[i])
        groupLayer.remove(layer)
    }
}

var removeLegendExternalData = function (object) {
    let kTag = $(object).parents("tr").attr("ktag")
    let index = $(object).attr("index")
    kTag = kTag.split(",")
    kTag = kTag[kTag.length - 1]

    if (displayedLegend.includes(kTag)) {
        let index = displayedLegend.indexOf(kTag)
        displayedLegend.splice(index, 1)
    }

    let punctuations = [/\s/g, "&", "'", ".", "/"]
    kTag = punctuationFixer(punctuations, "_", kTag)
    $("#" + kTag + "-" + index).remove()

    checkHeightLegend()
}

var getRandomColor = function () {
    let color = [];
    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 255 + 1));
    }
    return color;
}