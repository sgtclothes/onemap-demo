var consumePOI = async function (map) {
    let poi = $(".checkbox-poi");
    let masterSubPOI = $(".checkbox-master-sub-poi");
    let infrastructure = $(".checkbox-infrastructure");
    let demographic = $(".checkbox-demographic");
    let subPOI = $(".checkbox-sub-poi");
    let subInfrasctructure = $(".checkbox-sub-infrastructure");
    let subDemographic = $(".checkbox-sub-demographic");
    let graphicsLayer = new ESRI.GraphicsLayer({
        id: "poi-"
    })
    let kTags = []
    let layerLongName = []
    let arrMaster = []
    let arrSub = []
    let arrTarget = []
    let arrCheckBox = []
    let arrObj = []
    let imageName = []
    let tablePOI = $("#table-external-data")
    let longestLength = 0

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

    createTreeCheckBox(layerLongName, tablePOI, imageName, kTags)
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
            consumeServicesExternalData(map, $(this))
            if ($(this).prev().hasClass("mi-add") || $(this).prev().hasClass("mi-remove")) {
                $(this).prev().removeClass("mi-add").addClass("mi-remove")
                $("input[name='checkbox-" + label + "-" + (Number(index) + 1) + "']").parents("tr").show()
                $(this).parents("tr").nextUntil().each(function () {
                    if ($(this).attr("value") <= index) {
                        return false;
                    } else {
                        if ($(this).find("input").prop("checked") == false) {
                            $(this).find("input").prop("checked", true);
                        }
                    }
                })
            } else {
                checkValue = detectChecked("checked", $(this), checkValue, index)
                changeStateMasterCheckBox($(this), checkValue, index)
            }
        } else if ($(this).prop("checked") == false) {
            removePointExternalData(map, groupLayerExternalData, $(this))
            if ($(this).prev().hasClass("mi-add") || $(this).prev().hasClass("mi-remove")) {
                $(this).prev().removeClass("mi-remove").addClass("mi-add")
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
                $(this).parents("tr").nextUntil().each(function () {
                    if ($(this).attr("value") <= index) {
                        return false;
                    } else {
                        if ($(this).find("input").prop("checked") == true) {
                            $(this).find("input").prop("checked", false);
                        }
                    }
                })
            } else {
                checkValue = detectChecked("unchecked", $(this), checkValue, index)
                changeStateMasterCheckBox($(this), checkValue, index)
            }
        }
    })
}

var getPOI = async function () {
    var results = undefined
    var url = "https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2/query?where=1=1&outFields=*&token=" + token
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
    if (parentObject) {
        id = punctuationFixer(punctuations, "_", parentObject)
    } else {
        id = punctuationFixer(punctuations, "_", object)
    }
    for (let s = 0; s < length; s++) {
        if (j == s) {
            kTags = kTags.toString()
            let val = 30 * j
            $(table).append("<tr ktag='" + kTags + "' style='background-color:#f7f8fc; border:2px solid white;' value='" + s + "' class='table-row-tree'><td style='padding-top:10px;'>" + "<div style='margin-left:" + (16 + val) + "px;'><input class='styled' style='vertical-align:middle;' type='checkbox' name='checkbox-" + id + "-" + s + "'><label class='label-check' style='font-size:12px; word-wrap:break-word;' for='checkbox-" + id + "-" + s + "'><span></span>" + object + "</label>" + "</div></td></tr>")
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

    // let key = $(object).parents("tr").attr("value")

    // $(object).parents("tr").prevUntil().each(function () {
    //     if (key > $(this).attr("value")) {
    //         $(this).find("input").prop("checked", false)
    //         key = $(this).attr("value")
    //     }
    //     console.log(key)
    // })

}

var consumeServicesExternalData = async function (map, object) {
    $("#loading-bar").show()
    let kTag = $(object).parents("tr").attr("ktag")
    kTag = kTag.split(",")
    let where = ""
    let image = {
        type: "picture-marker",
        url: "http://app.locatorlogic.com/assets/image/",
        width: "12px",
        height: "12px"
    };
    let res = undefined
    for (let i = 0; i < kTag.length; i++) {
        where += "'" + kTag[i] + "' =any (string_to_array(k_tag,';'))"
        if (kTag[i + 1] !== undefined) {
            where += " and "
        }
    }

    let graphicsLayer = new ESRI.GraphicsLayer({
        id: "external-data-" + kTag[kTag.length - 1]
    })

    await makeEsriRequest("https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2/query?where=" + where + "&outFields=*&token=" + token).then(function (results) {
        image.url = image.url + results.data.features[0].attributes.imagename
    })
    await makeEsriRequest("https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/0/query?where=" + where + "&outFields=*&token=" + token).then(function (results) {
        res = results.data
    })

    await renderImage(map, res, graphicsLayer, groupLayerExternalData, image, record)

}

var renderImage = function (map, res, graphicsLayer, groupLayerExternalData, image, callback, timeout) {
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
            callback(map, res, graphicsLayer, groupLayerExternalData, image, "error")
        }
    };
    img.onload = function () {
        if (!timedOut) {
            clearTimeout(timer);
            callback(map, res, graphicsLayer, groupLayerExternalData, image, "success")
        }
    };
    img.src = image.url;
    timer = setTimeout(function () {
        timedOut = true;
        callback(map, res, graphicsLayer, groupLayerExternalData, image, "timeout")
    }, timeout);
}

var record = async function (map, res, graphicsLayer, groupLayerExternalData, image) {
    await displayResultsGraphics(map, res, graphicsLayer, groupLayerExternalData, image)
    await $("#loading-bar").hide()
}

var removePointExternalData = function (map, groupLayer, object) {
    let kTag = $(object).parents("tr").attr("ktag")
    kTag = kTag.split(",")
    let layer = getNestedLayerById(map, "external-data", "external-data-" + kTag[kTag.length - 1])
    groupLayer.remove(layer)
}

var getRandomColor = function () {
    let color = [];
    for (let i = 0; i < 3; i++) {
        color.push(Math.floor(Math.random() * 255 + 1));
    }
    return color;
}