export class Radius {
  constructor(map, mapView, url, pointsym, polysym) {
    this.Map = map;
    this.MapView = mapView;
    this.BufferLayer = new ESRI.GraphicsLayer();
    this.PointLayer = new ESRI.GraphicsLayer();
    this.PointSym = pointsym;
    this.PolySym = polysym;
    this.BufferEnabled = true;
    this.Latitude = 0;
    this.Longitude = 0;
    this.Radius = [];
    this.RadiusUnit = "";
    this.Results = [];
    this.FeatureLayer = new ESRI.FeatureLayer(url);
  }

  create() {
    let self = this;

    self.MapView.on("click", function(event) {
      if (self.BufferEnabled) {
        self.BufferEnabled = !self.BufferEnabled;
        self.Latitude = self.MapView.toMap({
          x: event.x,
          y: event.y
        }).latitude.toFixed(3);

        self.Longitude = self.MapView.toMap({
          x: event.x,
          y: event.y
        }).longitude.toFixed(3);

        let point = new ESRI.Point({
          longitude: self.Longitude,
          latitude: self.Latitude
        });

        let markerSymbol = new ESRI.SimpleMarkerSymbol({
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 0.5
          }
        });

        let pointGraphic = new ESRI.Graphic({
          geometry: point,
          symbol: markerSymbol
        });

        document.getElementById("info").style.display = "none";

        for (let key in self.Radius) {
          let circle = new ESRI.Circle({
            center: [self.Longitude, self.Latitude],
            geodesic: true,
            radius: self.Radius[key],
            radiusUnit: self.RadiusUnit
          });

          let circleSymb = new ESRI.SimpleFillSymbol({
            style: "solid",
            outline: {
              style: "solid",
              color: [
                Math.floor(Math.random() * 255 + 1),
                Math.floor(Math.random() * 255 + 1),
                Math.floor(Math.random() * 255 + 1)
              ],
              width: 0.5
            },
            color: [Math.floor(Math.random() * 255 + 1), 0, 0, 0.1]
          });

          let circleGraphic = new ESRI.Graphic(circle, circleSymb);

          self.MapView.graphics.add(circleGraphic);

          let query = new ESRI.Query();
          query.returnGeometry = true;
          query.geometry = circle;
          query.outFields = ["*"];

          self.FeatureLayer.queryFeatures(query).then(function(results) {
            self.Results.push(results.features);
            // for (let keys in results.features)
            //   self.Results[key].push(results.features[keys].attributes);
          });
        }

        self.MapView.graphics.add(pointGraphic);
      } else return;
    });
    // this.Map.addMany([bufferLayer, pointLayer])
  }

  setUnit(unit) {
    this.RadiusUnit = unit;
  }

  setRadius(radius) {
    this.Radius = [];
    this.Radius = radius;
  }
}

export class DriveTime { 
  constructor(point, params, url, fillSymbol) {
      this.Point = point
      this.Params = params
      this.UrlGeoprocessor = url
      this.FillSymbol = fillSymbol
      this.ArrayParamsCatchment = [];
      this.Geometry = null;
  }

  run(callback) {
      const self = this
      let gp = new ESRI.Geoprocessor(this.UrlGeoprocessor)
      gp.execute(this.Params).then(drawResult)        
      function drawResult(result) {
          let resultValue = result.results[0].value
          let resultFeatures = resultValue.features;
          self.ArrayParamsCatchment.push(resultValue)
          // Assign each resulting graphic a symbol
          let resultGraphics = resultFeatures.map(function(feature) {
              feature.symbol = self.FillSymbol;
              return feature;
          });
  
          // Add the resulting graphics to the graphics layer
          self.GraphicsLayer.addMany(resultGraphics);
  
          self.ObjMapView.goTo({
              target: resultGraphics,
              zoom: 13
          });
          callback()
      }
  }

  createLayer(url) {
      let featureLayer = new ESRI.FeatureLayer({
          url: url
      });
      this.FeatureLayer = featureLayer
  }

  render(map, mapView, markerSymbol) {
      this.ObjMap = map
      this.ObjMapView = mapView
      this.MarkerSymbol = markerSymbol
      this.ObjMapView.center = this.Point

      let graphicsLayer = new ESRI.GraphicsLayer();
      this.ObjMap.add(graphicsLayer);
      let graphic = new ESRI.Graphic({
          geometry: this.Point,
          symbol: this.MarkerSymbol
      })

      graphicsLayer.add(graphic)
      
      let features = []
      features.push(graphic)
  
      let featureSet = new ESRI.FeatureSet()
      featureSet.features = features
      
      this.GraphicsLayer = graphicsLayer
  }
}

export class Catchment {
  constructor() {
      this.Params = ''
      this.Url = ''
      this.ObjectID = []
      this.ObjectIDStr = [];
  }

  setParams(params) {
      this.Params = params
  }

  setServiceUrl(url) {
      this.Url = url
  }

  run(callback) {
      let self = this 
      let gp = new ESRI.Geoprocessor(this.Url)
      gp.execute(this.Params).then(catchResult)
      function catchResult(result) {
          console.log(result)
          let features = result.results[0].value.features
          features.forEach(element => {
              let objectID = element.attributes.OBJECTID
              self.ObjectID.push(objectID)
          });
          let objID = self.ObjectID
          let Str = objID.toString()
          self.ObjectIDStr.push(Str)
          callback()
      };
  }

  setQuery(query) {

  }
}

export class ConvertCSV {
  constructor(map, mapView) {
    this.Map = map;
    this.MapView = mapView;
    this.Data = [];
    this.created_by = created_by
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
              created_by: created_by
            }
          });
        });
      });
    }

    function no() {
      alert("Saved to local storage");
      localStorage.setItem("data", JSON.stringify(self.Data));
      let getData = localStorage.getItem("data");
      console.log("Local Storage : ", JSON.parse(getData));
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

  handleDrop(event,modal) {
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
        console.log("Finished reading CSV data");
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
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 1
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
      content: "{" + popupInfo.fieldInfos[2].fieldName + "}" + "<table>"
    };


    arrayUtils.forEach(popupInfo.fieldInfos, function(field) {
      if (field.visible) {
        json.content +=
          "<tr><td valign='top'>" +
          field.label +
          ": </td><td valign='top'>{" +
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