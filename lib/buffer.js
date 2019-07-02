export class Radius {
  constructor(map, mapView, latitude, longitude) {
    this.Map = map;
    this.MapView = mapView;
    this.Latitude = latitude;
    this.Longitude = longitude;
    this.Radius = [];
    this.RadiusUnit = "";
    this.FeatureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
    );
  }

  create(callback) {
    let point = new ESRI.Point({
      longitude: this.Longitude,
      latitude: this.Latitude
    });

    let markerSymbol = {
      type: "picture-marker",
      url: "assets/images/icons/map-marker.png",
      width: "35px",
      height: "35px"
    };

    let pointGraphic = new ESRI.Graphic({
      geometry: point,
      symbol: markerSymbol
    });

    this.PointGraphic = pointGraphic
    this.CircleGraphic = []

    let radius =  this.Radius
    let lengthValue
    if (this.RadiusUnit === "kilometers") {
        lengthValue = parseFloat(radius*1000)
    }
    else if (this.RadiusUnit === "miles") {
        lengthValue = parseFloat(radius/0.00062137)
    }
    else {
        lengthValue = radius
    }

    let circle = new ESRI.Circle({
        center: [this.Longitude, this.Latitude],
        geodesic: true,
        radius: radius,
        radiusUnit: this.RadiusUnit,
        lengthValue: lengthValue
    });

    let circleSymb = new ESRI.SimpleFillSymbol({
      style: "solid",
      outline: {
        style: "long-dash",
        color: [
          Math.floor(Math.random() * 255 + 1),
          Math.floor(Math.random() * 255 + 1),
          Math.floor(Math.random() * 255 + 1)
        ],
        width: 1.5
      },
      color: [Math.floor(Math.random() * 255 + 1), Math.floor(Math.random() * 255 + 1), Math.floor(Math.random() * 255 + 1), 0.25]
    });

    let circleGraphic = new ESRI.Graphic({
      geometry: circle,
      symbol: circleSymb
    });

    let unitLength
    if (this.RadiusUnit == "kilometers") {
      unitLength = "km"
    }
    else if (this.RadiusUnit == "miles") {
      unitLength = 'mi'
    }
    else {
      unitLength = "m"
    }

    const self = this;
    let query = new ESRI.Query();
    query.returnGeometry = true;
    query.geometry = circle;
    query.outFields = ["*"];
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      self.ParamsCatchment=results

      let popupContent = {
        title: "Buffer " + radius + " " + unitLength
      };
      circleGraphic.popupTemplate = popupContent;

      self.CircleGraphic.push(circleGraphic);
      self.MapView.graphics.add(circleGraphic);
      self.MapView.graphics.add(pointGraphic);
      self.MapView.goTo({
        target: pointGraphic,
        zoom: 11
      });
      callback()
    });
  }

  setUnit(unit) {
    this.RadiusUnit = unit;
  }

  setRadius(radius) {
    this.Radius = radius;
  }
}

export class DriveTime {
  constructor(map, point, params, url, title) {
    this.ObjMap = map;
    this.Point = point;
    this.Params = params;
    this.UrlGeoprocessor = url;
    this.ArrayParamsCatchment = [];
    this.Geometry = null;
    this.Title = title
  }

  run(callback) {
    let fillSymbol = {
      type: "simple-fill",
      color: [Math.floor(Math.random() * 255 + 1), Math.floor(Math.random() * 255 + 1), Math.floor(Math.random() * 255 + 1), 0.3],
      outline: {
        style: "long-dash",
        color: [
          Math.floor(Math.random() * 255 + 1),
          Math.floor(Math.random() * 255 + 1),
          Math.floor(Math.random() * 255 + 1)
        ],
        width: 1.5
      }
    };

    const self = this;
    let gp = new ESRI.Geoprocessor(this.UrlGeoprocessor);
    gp.execute(this.Params).then(drawResult);
    function drawResult(result) {
      let resultValue = result.results[0].value;
      let resultFeatures = resultValue.features;
      self.ArrayParamsCatchment.push(resultValue);
      // Assign each resulting graphic a symbol
      let resultGraphics = resultFeatures.map(function(feature) {
        feature.symbol = fillSymbol;
        feature.popupTemplate = {
          title : "Driving Time "+self.Distance+" "+self.Unit
        }
        return feature;
      });

      // Add the resulting graphics to the graphics layer
      self.GraphicsLayer.addMany(resultGraphics);

      self.ObjMapView.goTo({
        target: resultGraphics,
        zoom: 13
      });
      callback();
    }
  }

  setDistance(distance,unit) {
    this.Distance = distance
    this.Unit = unit
  }

  render(mapView) {
    this.ObjMapView = mapView
    this.ObjMapView.center = this.Point

    let markerSymbol = {
      type: "picture-marker",
      url: "assets/images/icons/map-marker.png",
      width: "35px",
      height: "35px"
    };

    let graphicsLayer = new ESRI.GraphicsLayer();
    
    let graphic = new ESRI.Graphic({
      geometry: this.Point,
      symbol: markerSymbol
    });

    graphicsLayer.title = this.Title
    
    this.ObjMap.add(graphicsLayer);
    graphicsLayer.add(graphic);

    let features = [];
    features.push(graphic);

    let featureSet = new ESRI.FeatureSet();
    featureSet.features = features;

    this.GraphicsLayer = graphicsLayer;
  }
}

export class Catchment {
  constructor() {
    this.Params = "";
    this.Url = "";
  }

  setParams(params,callback) {
    this.Params = params;
    callback();
  }

  setServiceUrl(url) {
    this.Url = url;
  }

  run(graphicsLayers) {
    let gp = new ESRI.Geoprocessor(this.Url);
    gp.execute(this.Params).then(catchResult);
    function catchResult(result) {
      console.log(result)
      let fields = result.results[0].value.fields.filter(function(el) {
        return el.alias === "POPULASI" ||
               el.alias === "SES_A" ||
               el.alias === "SES_B" ||
               el.alias === "SES_C" ||
               el.alias === "SES_UP" ||
               el.alias === "SES_MID" ||
               el.alias === "SES_LOW" ||
               el.alias === "KELUARGA" ||
               el.alias === "POP_LK" ||
               el.alias === "POP_PR"
      });
      fields.forEach(function(field){
        if (field.alias === "POPULASI") {
          field.name = "Population"
        }
        else if (field.alias === "SES_A") {
          field.name = "SES A"
        }
        else if (field.alias === "SES_B") {
          field.name = "SES B"
        }
        else if (field.alias === "SES_C") {
          field.name = "SES C"
        }
        else if (field.alias === "SES_LOW") {
          field.name = "SES Lower"
        }
        else if (field.alias === "SES_UP") {
          field.name = "SES Upper"
        }
        else if (field.alias === "SES_MID") {
          field.name = "SES Middle"
        }
        else if (field.alias === "KELUARGA") {
          field.name = "Household"
        }
        else if (field.alias === "POP_LK") {
          field.name = "Male"
        }
        else if (field.alias === "POP_PR") {
          field.name = "Female"
        }
      })
      let features = result.results[0].value.features;
      let totalPopulasi = 0
      let household =  0
      let male = 0
      let female = 0
      let sesa =  0
      let sesb = 0
      let sesc = 0
      let sesup = 0
      let sesmid =  0
      let seslow = 0
      features.forEach(function(feature){
        totalPopulasi += feature.attributes.POPULASI
        household += feature.attributes.KELUARGA
        male += feature.attributes.POP_LK
        female += feature.attributes.POP_PR
        sesa += feature.attributes.SES_A
        sesb += feature.attributes.SES_B
        sesc += feature.attributes.SES_C
        sesup += feature.attributes.SES_UP
        seslow += feature.attributes.SES_LOW
        sesmid += feature.attributes.SES_MID
      })
      totalPopulasi = totalPopulasi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      household = household.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      male = male.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      female = female.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      graphicsLayers.attributes = {
        POPULASI:totalPopulasi,
        KELUARGA:household,
        POP_LK:male,
        POP_PR:female,
        SES_A:sesa,
        SES_B:sesb,
        SES_C:sesc,
        SES_UP:sesup.toFixed(3),
        SES_MID:sesmid.toFixed(3),
        SES_LOW:seslow.toFixed(3)
      }

      let popupContent = {
        content: "<table class='esri-widget__table'>"
      }
      arrayUtils.forEach(fields, function(field) {
          popupContent.content +=
          "<tr><th class='esri-feature__field-header'>" +
          field.name +
          "</th><td class='esri-feature__field-data'>{" +
          field.alias +
          "}</td></tr>"; 
      });
      popupContent.content += "</table>";
      graphicsLayers.popupTemplate.content = popupContent.content
    }
  }
}

export class ConvertCSV {
  constructor(map, mapView, pointColor) {
    this.Map = map;
    this.MapView = mapView;
    this.PointColor = pointColor;
    this.Data = [];
    this.created_by = created_by;
    this.latFieldStrings = ["lat", "latitude", "y", "ycenter"];
    this.longFieldStrings = ["lon", "long", "longitude", "x", "xcenter"];
  }

  doConfirm(msg) {
    let self = this;
    let modal = $("#dragdrop-modal");
    var confirmBox = $("#confirmBox");
    confirmBox.find(".message").text(msg);
    confirmBox
      .find(".yes,.no")
      .unbind()
      .click(function() {
        confirmBox.hide();
        modal.hide();
      });
    confirmBox.find(".yes").click(yes);
    confirmBox.find(".no").click(no);
    confirmBox.show();

    function yes() {
      alert("Saved to database");
      $(document).ready(function() {
        arrayUtils.forEach(self.Data, function(data) {
          let type = data.type;
          let name = data.name;
          let lat = data.lat;
          let lon = data.lon;
          let region = data.region;
          let shape = data.shape;
          let created_by = self.created_by;
          let color = self.PointColor;
          $.ajax({
            url: "content/insert.php",
            method: "POST",
            data: {
              type: type,
              name: name,
              lat: lat,
              lon: lon,
              region: region,
              shape: shape,
              created_by: created_by,
              color: color
            }
          });
        });
      });
    }

    function no() {
      alert("Saved to local storage");
      localStorage.setItem("data", JSON.stringify(self.Data));
      let getData = localStorage.getItem("data");
      getData = JSON.parse(getData)
      console.log("Local Storage : ", getData);
    }
  }

  setupDropZone() {
    let self = this;
    if (!window.File || !window.FileReader) {
      domUtils.show(document.getElementById("msg"));
      return;
    }
    let x = dom.byId("dragdrop-modal");
    let infocsv = $("#info-csv");
    on(x, "dragenter", function(event) {
      event.preventDefault();
    });

    on(x, "dragover", function(event) {
      event.preventDefault();
    });
    on(x, "drop", function(event) {
      self.handleDrop(event);
      infocsv.hide();
    });
  }

  handleDrop(event, modal) {
    event.preventDefault();
    let dataTransfer = event.dataTransfer,
      files = dataTransfer.files,
      types = dataTransfer.types;
    if (files && files.length === 1) {
      let file = files[0];
      if (file.name.indexOf(".csv") !== -1) {
        if (file.size < 5000000) {
          this.doConfirm("Save it to database?");
          this.handleCSV(file);
        } else {
          console.log("Invalid file size");
        }
      } else {
        console.log("Invalid file format");
      }
    } else {
      console.log("Invalid file format");
    }
  }

  handleCSV(file) {
    let self = this;
    console.log(
      "Processing CSV: ",
      file,
      ", ",
      file.name,
      ", ",
      file.type,
      ", ",
      file.size
    );

    if (file.data) {
      let decoded = this.bytesToString(base64.decode(file.data));
      this.processCSVData(decoded);
    } else {
      let reader = new FileReader();
      reader.onload = function() {
        //console.log("Finished reading CSV data");
        self.processCSVData(reader.result);
      };
      reader.readAsText(file);
    }
  }

  processCSVData(data) {
    let self = this;
    let mapView = this.MapView;
    let latFieldStrings = this.latFieldStrings;
    let longFieldStrings = this.longFieldStrings;
    let newLineIndex = data.indexOf("\n");
    let firstLine = lang.trim(data.substr(0, newLineIndex)); //remove extra whitespace, not sure if I need to do this since I threw out space delimiters
    let separator = this.getSeparator(firstLine);
    let csvStore = new CsvStore({
      data: data,
      separator: separator
    });
    csvStore.fetch({
      onComplete: function(items) {
        let objectId = 0;
        let featureCollection = self.generateFeatureCollectionTemplateCSV(
          csvStore,
          items
        );
        let popupInfo = self.generateDefaultPopupInfo(featureCollection);
        let infoTemplate = new ESRI.PopupTemplate(
          self.buildInfoTemplate(popupInfo)
        );
        let latField, longField;
        let fieldNames = csvStore.getAttributes(items[0]);

        arrayUtils.forEach(fieldNames, function(fieldName) {
          let matchId;
          matchId = arrayUtils.indexOf(
            latFieldStrings,
            fieldName.toLowerCase()
          );
          if (matchId !== -1) {
            latField = fieldName;
          }
          matchId = arrayUtils.indexOf(
            longFieldStrings,
            fieldName.toLowerCase()
          );
          if (matchId !== -1) {
            longField = fieldName;
          }
        });

        // Add records in this CSV store as graphics
        arrayUtils.forEach(items, function(item) {
          let attrs = csvStore.getAttributes(item),
            attributes = {},
            attributesVal = {};

          // Read all the attributes for  this record/item
          arrayUtils.forEach(attrs, function(attr) {
            let value = Number(csvStore.getValue(item, attr));
            attributes[attr] = isNaN(value)
              ? csvStore.getValue(item, attr)
              : value;
          });

          for (let key in attrs) {
            attributesVal[attrs[key]] = attributes[attrs[key]];
          }

          self.Data.push(attributesVal);
          attributes["__OBJECTID"] = objectId;
          objectId++;

          let latitude = parseFloat(attributes[latField]);
          let longitude = parseFloat(attributes[longField]);
          if (isNaN(latitude) || isNaN(longitude)) {
            return;
          }

          let point = new ESRI.Point({
            longitude: longitude,
            latitude: latitude
          });

          let markerSymbol = new ESRI.SimpleMarkerSymbol({
            color: self.PointColor,
            outline: {
              color: [255, 255, 255],
              width: 0.5
            }
          });

          let pointGraphic = new ESRI.Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: attributesVal,
            popupTemplate: infoTemplate
          });

          mapView.graphics.add(pointGraphic);
        });
      }
    });
  }

  generateFeatureCollectionTemplateCSV(store, items) {
    //create a feature collection for the input csv file
    let featureCollection = {
      geometryType: "esriGeometryPoint",
      layerDefinition: null,
      featureSet: {
        features: [],
        geometryType: "esriGeometryPoint"
      }
    };
    featureCollection.layerDefinition = {
      geometryType: "esriGeometryPoint",
      objectIdField: "__OBJECTID",
      type: "Feature Layer",
      typeIdField: "",
      drawingInfo: {
        renderer: {
          type: "simple",
          symbol: {
            type: "esriPMS",
            url: "https://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
            imageData:
              "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAB3VJREFUeF7tmPlTlEcexnve94U5mANQbgQSbgiHXHINlxpRIBpRI6wHorLERUmIisKCQWM8cqigESVQS1Kx1piNi4mW2YpbcZONrilE140RCTcy3DDAcL/zbJP8CYPDL+9Ufau7uqb7eZ7P+/a8PS8hwkcgIBAQCAgEBAICAYGAQEAgIBAQCAgEBAICAYGAQEAgIBAQCDx/AoowKXFMUhD3lQrioZaQRVRS+fxl51eBTZUTdZ41U1Rox13/0JF9csGJ05Qv4jSz/YPWohtvLmSKN5iTGGqTm1+rc6weICOBRbZs1UVnrv87T1PUeovxyNsUP9P6n5cpHtCxu24cbrmwKLdj+osWiqrVKhI0xzbmZ7m1SpJ+1pFpvE2DPvGTomOxAoNLLKGLscZYvB10cbYYjrJCb7A5mrxleOBqim+cWJRakZY0JfnD/LieI9V1MrKtwokbrAtU4Vm0A3TJnphJD4B+RxD0u0LA7w7FTE4oprOCMbklEGNrfdGf4IqnQTb4wc0MFTYibZqM7JgjO8ZdJkpMln/sKu16pHZGb7IfptIWg389DPp9kcChWODoMuDdBOhL1JgpisbUvghM7AqFbtNiaFP80RLnhbuBdqi0N+1dbUpWGde9gWpuhFi95yL7sS7BA93JAb+Fn8mh4QujgPeTgb9kAZf3Apd2A+fXQ38yHjOHozB1IAJjOSEY2RSIwVUv4dd4X9wJccGHNrJ7CYQ4GGjLeNNfM+dyvgpzQstKf3pbB2A6m97uBRE0/Ergcxr8hyqg7hrwn0vAtRIKIRX6Y2pMl0RhIj8co9nBGFrvh55l3ngU7YObng7IVnFvGS+BYUpmHziY/Ls2zgP9SX50by/G9N5w6I+ogYvpwK1SoOlHQNsGfWcd9Peqof88B/rTyzF9hAIopAByQzC0JQB9ST5oVnvhnt+LOGsprvUhxNIwa0aY7cGR6Cp7tr8+whkjawIxkRWC6YJI6N+lAKq3Qf/Tx+B77oGfaQc/8hB8w2Xwtw9Bf3kzZspXY/JIDEbfpAB2BKLvVV90Jvjgoac9vpRxE8kciTVCBMMkNirJ7k/tRHyjtxwjKV4Yp3t/6s+R4E+/DH3N6+BrS8E314Dvvg2+/Sb4hxfBf5sP/up2TF3ZhonK1zD6dhwGdwail26DzqgX8MRKiq9ZBpkSkmeYOyPM3m9Jjl+1Z9D8AgNtlAq6bZ70qsZi+q+bwV/7I/hbB8D/dAr8Axq89iz474p/G5++koHJy1sx/lkGdBc2YjA3HF0rHNHuboomuQj/5DgclIvOGCGCYRKFFuTMV7YUAD3VDQaLMfyqBcZORGPy01QKYSNm/rYV/Nd/Av9NHvgbueBrsjDzRQamKKDxT9Kgq1iLkbIUDOSHoiNcgnYHgnYZi+9ZExSbiSoMc2eE2flKcuJLa4KGRQz6/U0wlGaP0feiMH4uFpMXEjBVlYjp6lWY+SSZtim0kulYMiYuJEJXuhTDJ9UYPByOvoIwdCxfgE4bAo0Jh39xLAoVpMwIEQyTyFCQvGpLon9sJ0K3J4OBDDcMH1dj9FQsxkrjMPFRPCbOx2GyfLal9VEcxstioTulxjAFNfROJPqLl6Bnfyg6V7ugz5yBhuHwrZjBdiU5YJg7I8wOpifAKoVIW7uQ3rpOBH2b3ekVjYT2WCRG3o+mIGKgO0OrlIaebU/HYOQDNbQnojB4NJyGD0NPfjA0bwTRE6Q7hsUcWhkWN8yZqSQlWWGECAZLmJfJmbrvVSI8taK37xpbdB/wQW8xPee/8xIGjvlj8IQ/hk4G0JbWcX8MHPVDX4kveoq8ocn3xLM33NCZRcPHOGJYZIKfpQyq7JjHS6yJjcHujLHADgkpuC7h8F8zEVqXSNC2awE69lqhs8AamkO26HrbDt2H7dBVQov2NcW26CiwQtu+BWjdY4n2nZboTbfCmKcCnRyDO/YmyLPnDlHvjDH8G6zhS9/wlEnYR7X00fWrFYuWdVI0ZpuhcbcczW/R2qdAcz6t/bRov4mONeaaoYl+p22rHF0bVNAmKtBvweIXGxNcfFH8eNlC4m6wMWMusEnKpn5hyo48pj9gLe4SNG9QoGGLAk8z5XiaJUd99u8122/IpBA2K9BGg2vWWKAvRYVeLzEa7E1R422m2+MsSTem97nSYnfKyN6/mzATv7AUgqcMrUnmaFlLX3ysM0fj+t/b5lQLtK22QEfyAmiSLKFZpUJ7kBRPXKW4HqCYynWVHKSG2LkyZex1uO1mZM9lKem9Tx9jjY5iNEYo0bKMhn7ZAu0r6H5PpLXCAq0rKJClSjSGynE/QIkrQYqBPe6S2X+AJsY2Ped6iWZk6RlL0c2r5szofRsO9R5S1IfQLRCpQL1aifoYFerpsbkuTImaUJXuXIDiH6/Ys8vm3Mg8L2i20YqsO7fItKLcSXyn0kXccclVqv3MS6at9JU/Ox+ouns+SF6Z4cSupz7l8+z1ucs7LF1AQjOdxfGZzmx8Iu1TRcfnrioICAQEAgIBgYBAQCAgEBAICAQEAgIBgYBAQCAgEBAICAQEAv8H44b/6ZiGvGAAAAAASUVORK5CYII=",
            contentType: "image/png",
            width: 15,
            height: 15
          }
        }
      },
      fields: [
        {
          name: "__OBJECTID",
          alias: "__OBJECTID",
          type: "esriFieldTypeOID",
          editable: true,
          domain: null
        }
      ],
      types: [],
      capabilities: "Query"
    };

    let fields = store.getAttributes(items[0]);
    arrayUtils.forEach(fields, function(field) {
      let value = store.getValue(items[0], field);
      let parsedValue = Number(value);
      if (isNaN(parsedValue)) {
        //check first value and see if it is a number
        featureCollection.layerDefinition.fields.push({
          name: field,
          alias: field,
          type: "esriFieldTypeString",
          editable: true,
          domain: null
        });
      } else {
        featureCollection.layerDefinition.fields.push({
          name: field,
          alias: field,
          type: "esriFieldTypeDouble",
          editable: true,
          domain: null
        });
      }
    });
    return featureCollection;
  }

  generateDefaultPopupInfo(featureCollection) {
    let fields = featureCollection.layerDefinition.fields;
    let decimal = {
      esriFieldTypeDouble: 1,
      esriFieldTypeSingle: 1
    };
    let integer = {
      esriFieldTypeInteger: 1,
      esriFieldTypeSmallInteger: 1
    };
    let dt = {
      esriFieldTypeDate: 1
    };
    let displayField = null;
    let fieldInfos = arrayUtils.map(
      fields,
      lang.hitch(this, function(item) {
        if (item.name.toUpperCase() === "NAME") {
          displayField = item.name;
        }
        let visible =
          item.type !== "esriFieldTypeOID" &&
          item.type !== "esriFieldTypeGlobalID" &&
          item.type !== "esriFieldTypeGeometry";
        let format = null;
        if (visible) {
          let f = item.name.toLowerCase();
          let hideFieldsStr =
            ",stretched value,fnode_,tnode_,lpoly_,rpoly_,poly_,subclass,subclass_,rings_ok,rings_nok,";
          if (
            hideFieldsStr.indexOf("," + f + ",") > -1 ||
            f.indexOf("area") > -1 ||
            f.indexOf("length") > -1 ||
            f.indexOf("shape") > -1 ||
            f.indexOf("perimeter") > -1 ||
            f.indexOf("objectid") > -1 ||
            f.indexOf("_") == f.length - 1 ||
            f.indexOf("_i") == f.length - 2
          ) {
            visible = true;
          }
          if (item.type in integer) {
            format = {
              places: 0,
              digitSeparator: true
            };
          } else if (item.type in decimal) {
            format = {
              places: 2,
              digitSeparator: true
            };
          } else if (item.type in dt) {
            format = {
              dateFormat: "shortDateShortTime"
            };
          }
        }

        return lang.mixin(
          {},
          {
            fieldName: item.name,
            label: item.alias,
            isEditable: true,
            tooltip: "",
            visible: visible,
            format: format,
            stringFieldOption: "textbox"
          }
        );
      })
    );

    let popupInfo = {
      title: displayField ? "{" + displayField + "}" : "",
      fieldInfos: fieldInfos,
      description: null,
      showAttachments: false,
      mediaInfos: []
    };
    return popupInfo;
  }

  buildInfoTemplate(popupInfo) {
    let json = {
      content: "<table class='esri-widget__table'>"
    };

    json.title = popupInfo.title;

    arrayUtils.forEach(popupInfo.fieldInfos, function(field) {
      if (field.visible) {
        json.content +=
          "<tr><th class='esri-feature__field-header'>" +
          field.label +
          ": </th><td class='esri-feature__field-data'>{" +
          field.fieldName +
          "}</td></tr>";
      }
    });
    json.content += "</table>";
    return json;
  }

  bytesToString = function(b) {
    console.log("bytes to string");
    let s = [];
    arrayUtils.forEach(b, function(c) {
      s.push(String.fromCharCode(c));
    });
    return s.join("");
  };

  getSeparator(string) {
    let separators = [",", "      ", ";", "|"];
    let maxSeparatorLength = 0;
    let maxSeparatorValue = "";
    arrayUtils.forEach(separators, function(separator) {
      let length = string.split(separator).length;
      if (length > maxSeparatorLength) {
        maxSeparatorLength = length;
        maxSeparatorValue = separator;
      }
    });
    return maxSeparatorValue;
  }

  getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  }
}

export class POI {
  constructor(mapView, fields) {
    this.MapView = mapView;
    this.Fields = fields;
  }

  run() {
    let self = this;
    $.ajax({
      url: "content/read.php",
      method: "GET"
    }).done(function(data) {
      let result = $.parseJSON(data);
      $.each(result, function(key, value) {
        self.render(value);
      });
    });
  }

  render(poi) {
    let mapView = this.MapView;
    let latitude = parseFloat(poi["lat"]);
    let longitude = parseFloat(poi["lon"]);
    if (isNaN(latitude) || isNaN(longitude)) {
      return;
    }

    let point = new ESRI.Point({
      longitude: longitude,
      latitude: latitude
    });

    let markerSymbol = new ESRI.SimpleMarkerSymbol({
      color: poi["color"],
      outline: {
        color: [255, 255, 255],
        width: 0.5
      }
    });

    let featureCollection = this.generateFeatureCollection();
    let convertClass = new ConvertCSV();
    let popupInfo = convertClass.generateDefaultPopupInfo(featureCollection);
    let infoTemplate = new ESRI.PopupTemplate(
      convertClass.buildInfoTemplate(popupInfo)
    );

    let pointGraphic = new ESRI.Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: poi,
      popupTemplate: infoTemplate
    });

    mapView.graphics.add(pointGraphic);
  }

  generateFeatureCollection() {
    let featureCollection = {
      geometryType: "esriGeometryPoint",
      layerDefinition: null,
      featureSet: {
        features: [],
        geometryType: "esriGeometryPoint"
      }
    };
    featureCollection.layerDefinition = {
      geometryType: "esriGeometryPoint",
      objectIdField: "__OBJECTID",
      type: "Feature Layer",
      typeIdField: "",
      drawingInfo: {
        renderer: {
          type: "simple",
          symbol: {
            type: "esriPMS",
            url: "https://static.arcgis.com/images/Symbols/Basic/RedSphere.png",
            imageData:
              "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",
            contentType: "image/png",
            width: 15,
            height: 15
          }
        }
      },
      fields: this.Fields,
      types: [],
      capabilities: "Query"
    };

    return featureCollection;
  }
}
