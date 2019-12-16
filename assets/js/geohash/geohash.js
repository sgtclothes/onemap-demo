var processGeohash = async function (url, param, delimiter) {
    loading("show")
    var params = {
        "geohashFromParam": param,
        "outputDelimiter": delimiter
    }

    var gp = new ESRI.Geoprocessor(url)
    await gp.submitJob(params).then(function (jobInfo) {
        var jobid = jobInfo.jobId;
        makeEsriRequest("http://192.168.5.14/arcgis/rest/services/GP/singleGeohash/GPServer/Model/jobs/" + jobid + "/results/zipFileOutput").then(function (res) {
            if (res !== undefined) {
                window.open(res.data.value.url, '_blank')
            }
        })
    })
    loading("hide")
}

var submitGeohash = async function () {
    $("#modal-geohash").modal("hide")
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
}
