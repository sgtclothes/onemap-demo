var processSinglePie = async function (url, param, delimiter) {
    loading("show")
    var params = {
        "longitude": longitude,
        "latitude": latitude,
        "angle": angle,
        "apperture": apperture,
        "radius": radius,
        "outputDelimiter": delimiter,
        "role": role
    }

    var gp = new ESRI.Geoprocessor(url)
    await gp.submitJob(params).then(function (jobInfo) {
        var jobid = jobInfo.jobId;
        makeEsriRequest("http://192.168.5.14/arcgis/rest/services/GP/singlePie/GPServer/Model/jobs" + jobid + "/results/zipFileOutput").then(function (res) {
            if (res !== undefined) {
                window.open(res.data.value.url, '_blank')
            }
        })
    })
    loading("hide")
}

$(document).delegate("#single-pie", "click", async function () {
    await $.get("assets/js/singlePie/singlePie.html", function (data) {
        $(".page-content").append(data);
        $(".header-input-single-pie").css("background-color", sessionStorage.getItem("colorTheme"))
        $(".btn-submit-single-pie").css("background-color", sessionStorage.getItem("colorTheme"))
    });

})

$(document).delegate("#close-input-single-pie", "click", function () {
    $(".popup-single-pie").remove()
})

$(document).delegate(".btn-submit-single-pie", "click", async function () {
    var geoKey = $("#key-geohash").val()
    var geoKeyDelimiter = $("#key-geohash-delimiter").val()
    await processGeohash("http://192.168.5.14/arcgis/rest/services/GP/singleGeohash/GPServer/Model", geoKey, geoKeyDelimiter).then().catch(function (err) {
        Swal.fire(
            'Error',
            'Connection Timeout!',
            'warning'
        )
        loading("hide")
    })
})