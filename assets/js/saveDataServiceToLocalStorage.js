//Save data using Esri Request
function saveDataServiceToLocalStorage() {
  let subPOI = $(".checkbox-sub-poi");
  let subInfrasctructure = $(".checkbox-sub-infrastructure");
  let subDemographic = $(".checkbox-sub-demographic");
  let layersRequest = {
    query: {
      f: "json"
    },
    responseType: "json"
  };
  let urlPOI =
    "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
  let urlInfrastructure =
    "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/UberMedia/MapServer/";
  let urlDemographic =
    "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/";

  let dataPOI = [];
  let dataInfrastructure = [];
  let dataDemographic = [];

  for (let i = 0; i < subPOI.length; i++) {
    EsriRequest(urlPOI + $(subPOI[i]).val(), layersRequest).then(function(
      response
    ) {
      let symbol = response.data.drawingInfo.renderer.symbol.url;
      let name = response.data.name;
      toDataURL(urlPOI + $(subPOI[i]).val() + "/images/" + symbol, function(
        result
      ) {
        dataPOI.push([symbol, name, result, $(subPOI[i]).val()]);
        localStorage.setItem("dataPOI", JSON.stringify(dataPOI));
      });
    });
  }
  for (let i = 0; i < subInfrasctructure.length; i++) {
    EsriRequest(
      urlInfrastructure + $(subInfrasctructure[i]).val(),
      layersRequest
    ).then(function(response) {
      let symbol = response.data.drawingInfo.renderer.symbol.url;
      let name = response.data.name;
      toDataURL(
        urlInfrastructure +
          $(subInfrasctructure[i]).val() +
          "/images/" +
          symbol,
        function(result) {
          dataInfrastructure.push([
            symbol,
            name,
            result,
            $(subInfrasctructure[i]).val()
          ]);
          localStorage.setItem(
            "dataInfrastructure",
            JSON.stringify(dataInfrastructure)
          );
        }
      );
    });
  }
  for (let i = 0; i < subDemographic.length; i++) {
    EsriRequest(
      urlDemographic + $(subDemographic[i]).val(),
      layersRequest
    ).then(function(response) {
      let classBreakInfos = response.data.drawingInfo.renderer.classBreakInfos;
      let name = response.data.name;
      dataDemographic.push([classBreakInfos, name]);
      localStorage.setItem("dataDemographic", JSON.stringify(dataDemographic));
    });
  }

  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
}
