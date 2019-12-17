var processSinglePieZipFile = async function (url, longitude, latitude, angle, apperture, radius, outputDelimiter, role) {
    loading("show")
    var params = {
        "longitude": longitude,
        "latitude": latitude,
        "angle": angle,
        "apperture": apperture,
        "radius": radius,
        "outputDelimiter": outputDelimiter,
        "role": role
    }

    var gp = new ESRI.Geoprocessor(url)
    await gp.submitJob(params).then(function (jobInfo) {
        var jobid = jobInfo.jobId;
        makeEsriRequest("http://203.153.98.250/arcgis/rest/services/GP/singlePie/GPServer/Model/jobs/" + jobid + "/results/zipFileOutput").then(function (res) {
            if (res !== undefined) {
                console.log(res)
                window.open(res.data.value.url, '_blank')
            }
        })
    })
    loading("hide")
}

var processSinglePieOpsLayer = async function (url, longitude, latitude, angle, apperture, radius, outputDelimiter, role) {
    loading("show")
    var params = {
        "longitude": longitude,
        "latitude": latitude,
        "angle": angle,
        "apperture": apperture,
        "radius": radius,
        "outputDelimiter": outputDelimiter,
        "role": role,
        "env:outSR": 3857
    }

    var gp = new ESRI.Geoprocessor(url)
    await gp.submitJob(params).then(function (jobInfo) {
        var jobid = jobInfo.jobId;
        makeEsriRequest("http://203.153.98.250/arcgis/rest/services/GP/singlePie/GPServer/Model/jobs/" + jobid + "/results/opsLayer").then(function (res) {
            if (res.data.value.features.length < 1) {
                Swal.fire(
                    'Error',
                    'Layer not found!',
                    'warning'
                )
            } else {
                createPolygon(res.data.value.features[0].geometry, res.data.value.features[0].attributes).then(function () {
                    sortID(map, "polygons", "dynamic-polygon-")
                    registerAttributes(map, "polygons", "polygon-graphics", 0)
                })
                map.ObjMapView.goTo({
                    target: [106.83288792851816, -6.226981965999922],
                    zoom: 18
                })
            }
        })
    })
    loading("hide")
}

var submitSinglePie = async function (mode) {
    $("#modal-single-pie").modal("hide")
    var longitude = $("#key-longitude-single-pie").val()
    var latitude = $("#key-latitude-single-pie").val()
    var angle = $("#key-angle-single-pie").val()
    var apperture = $("#key-apperture-single-pie").val()
    var radius = $("#key-radius-single-pie").val()
    var outputDelimiter = $("#key-output-delimiter-single-pie").val()
    var role = $("#key-role-single-pie").val()
    if (mode == "zip") {
        await processSinglePieZipFile("http://203.153.98.250/arcgis/rest/services/GP/singlePie/GPServer/Model", longitude, latitude, angle, apperture, radius, outputDelimiter, role).then().catch(function (err) {
            Swal.fire(
                'Error',
                'Connection Timeout!',
                'warning'
            )
            loading("hide")
        })
    } else if (mode == "opslayer") {
        await processSinglePieOpsLayer("http://203.153.98.250/arcgis/rest/services/GP/singlePie/GPServer/Model", longitude, latitude, angle, apperture, radius, outputDelimiter, role).then().catch(function (err) {
            Swal.fire(
                'Error',
                'Connection Timeout!',
                'warning'
            )
            loading("hide")
        })
    }
}
