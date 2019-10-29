var generatePOI = async function (token) {
    let tags
    await getTags(token).then(function (results) {
        tags = results
    })
    // console.log(tags)
    // for (let i = 0; i < tags.length; i++) {
    //     let listData = $("#li-data-external")
    //     $.get("assets/js/crypto/generatePOI.html", function (data) {
    //         console.log(data)
    //         $(listData).append(data);
    //     });
    // }
}

var getTags = async function (token) {
    var results = undefined
    var k_tag = []
    var url = "https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/0/query?returnGeometry=false&returnDistinctValues=true&where=1=1&outFields=*&token=" + token
    await EsriRequest(
        url, { query: { f: "json" }, responseType: "json" }
    ).then(function (response) {
        results = response.data.features
    });

    for (let i = 0; i < results.length; i++) {
        k_tag.push(results[i].attributes["k_tag"].split(";")[2])
    }

    let tag = [...new Set(k_tag)];

    return tag
}