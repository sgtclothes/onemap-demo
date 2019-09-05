function createQueryShape(GIS, map, convertCSV) {
  let convertData = new GIS.Buffer.LocalStorage(map.ObjMapView, convertCSV);
  //Sketch to query features
  const gLayer = new ESRI.GraphicsLayer();
  const sketch = new ESRI.Sketch({
    layer: gLayer,
    view: map.ObjMapView
  });

  sketch.on("create", function(event) {
    if (event.state === "complete") {
      $("#loading-bar").show();
      $(".popupFilter").hide();
      let colliersProperty = new ESRI.FeatureLayer({
        url:
          "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0"
      });
      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.outSpatialReference = map.ObjMap.spatialReference;
      query.geometry = event.graphic.geometry;

      let queryShape = new GIS.Buffer.QueryShape(
        map.ObjMap,
        map.ObjMapView,
        event.graphic.geometry
      );

      queryShape.create();

      colliersProperty.queryFeatures(query).then(function(results) {
        if (results.features.length < 1) {
          $("#loading-bar").hide();
        }
        displayResults(results);
      });

      function displayResults(results) {
        let chunkedResults = results.features;
        var lyrFields;
        var layersRequest = {
          query: {
            f: "json"
          },
          responseType: "json"
        };

        EsriRequest(
          "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0",
          layersRequest
        ).then(function(response) {
          console.log("response", response);
          lyrFields = response.data.fields;
        });

        function getFldAlias(fieldName) {
          var retVal = "";
          arrayUtils.forEach(lyrFields, function(item) {
            if (item.name === fieldName) {
              retVal = item.alias;
              return true;
            }
          });
          return retVal;
        }

        let attributes = [];
        let geometry = [];
        let alias = {};

        for (let i in chunkedResults) {
          attributes.push(chunkedResults[i].attributes);
          geometry.push(chunkedResults[i].geometry);
        }

        for (let j in chunkedResults[0].attributes) {
          alias[j] = getFldAlias(j);
        }

        console.log(attributes);

        convertCSV.processCSVData(
          convertData.getRowofTextArray(attributes),
          "custom",
          geometry,
          alias,
          true
        );
        $("#loading-bar").hide();
      }

      let rings = JSON.stringify(event.graphic.geometry.rings[0]);
      var area, length;

      EsriRequest(
        "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths?sr=102009&polygons=[%7B%22rings%22:[" +
          rings +
          "]%7D]&lengthUnit=9001&areaUnit=%7B%22areaUnit%22:%22esriAcres%22%7D&calculationType=preserveShape&f=json"
      ).then(function(response) {
        console.log("response", response);
        area = response.data.areas;
        length = response.data.lengths;
        area = (area[0] * 4046.8564224)/1000;
        length = length[0]/1000;
        console.log(area + " km" + "2".sup());
        console.log(length + " km");
        let div = document.createElement("div");
        div.style.fontSize = "10px";
        let table = document.createElement("table");
        table.style.width = "100%";
        table.style.margin = "10px";
        let trArea = document.createElement("tr");
        let trLength = document.createElement("tr");
        let tdAreaTitle = document.createElement("td");
        tdAreaTitle.style.textAlign = "left";
        let tdAreaResults = document.createElement("td");
        tdAreaResults.style.textAlign = "left";
        let tdLengthTitle = document.createElement("td");
        tdLengthTitle.style.textAlign = "left";
        let tdLengthResults = document.createElement("td");
        tdLengthResults.style.textAlign = "left";
        div.style.width = "auto";
        div.style.height = "auto";
        div.style.textAlign = "center";
        div.style.backgroundColor = "white";
        div.innerHTML = "<b>Measurement</b>";
        tdAreaTitle.innerHTML = "<b>Area</b>";
        tdAreaResults.innerHTML =
          area.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") +
          " km" +
          "2".sup();
        tdLengthTitle.innerHTML = "<b>Length<b/>";
        tdLengthResults.innerHTML =
          length.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + " km";
        trArea.appendChild(tdAreaTitle);
        trArea.appendChild(tdAreaResults);
        trLength.appendChild(tdLengthTitle);
        trLength.appendChild(tdLengthResults);
        table.appendChild(trArea);
        table.appendChild(trLength);
        div.appendChild(table);
        map.ObjMapView.ui.add(div, "bottom-right");
      });
    }
  });

  map.ObjMap.add(gLayer);
  map.ObjMapView.ui.add(sketch, "bottom-left");

  sketch.on("update", onGraphicUpdate);
  function onGraphicUpdate(event) {
    if (event.state === "complete") {
      map.ObjMapView.graphics.removeAll();
      for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if ("customShape" in map.ObjMap.layers.items[i]) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
      console.log(event.graphics);
      console.log(event.graphics[0].geometry);
      $("#loading-bar").show();
      $(".popupFilter").hide();
      let colliersProperty = new ESRI.FeatureLayer({
        url:
          "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0"
      });
      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.outSpatialReference = map.ObjMap.spatialReference;
      query.geometry = event.graphics[0].geometry;

      let queryShape = new GIS.Buffer.QueryShape(
        map.ObjMap,
        map.ObjMapView,
        event.graphics[0].geometry
      );

      queryShape.create();

      colliersProperty.queryFeatures(query).then(function(results) {
        if (results.features.length < 1) {
          $("#loading-bar").hide();
        }
        displayResults(results);
      });

      function displayResults(results) {
        let chunkedResults = results.features;
        var lyrFields;
        var layersRequest = {
          query: {
            f: "json"
          },
          responseType: "json"
        };

        EsriRequest(
          "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0",
          layersRequest
        ).then(function(response) {
          console.log("response", response);
          lyrFields = response.data.fields;
        });

        function getFldAlias(fieldName) {
          var retVal = "";
          arrayUtils.forEach(lyrFields, function(item) {
            if (item.name === fieldName) {
              retVal = item.alias;
              return true;
            }
          });
          return retVal;
        }

        let attributes = [];
        let geometry = [];
        let alias = {};

        for (let i in chunkedResults) {
          attributes.push(chunkedResults[i].attributes);
          geometry.push(chunkedResults[i].geometry);
        }

        for (let j in chunkedResults[0].attributes) {
          alias[j] = getFldAlias(j);
        }

        console.log(attributes);

        convertCSV.processCSVData(
          convertData.getRowofTextArray(attributes),
          "custom",
          geometry,
          alias,
          true
        );
        $("#loading-bar").hide();
      }
      console.log(event.graphic.geometry);
      console.log("Completed");
      console.log(event.geometry)
    }
  }
}
