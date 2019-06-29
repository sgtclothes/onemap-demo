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
          color: "#717C11",
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
    this.Point = point;
    this.Params = params;
    this.UrlGeoprocessor = url;
    this.FillSymbol = fillSymbol;
    this.ArrayParamsCatchment = [];
    this.Geometry = null;
  }

  run(callback) {
    const self = this;
    let gp = new ESRI.Geoprocessor(this.UrlGeoprocessor);
    gp.execute(this.Params).then(drawResult);
    function drawResult(result) {
      let resultValue = result.results[0].value;
      let resultFeatures = resultValue.features;
      self.ArrayParamsCatchment.push(resultValue);
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
      callback();
    }
  }

  createLayer(url) {
    let featureLayer = new ESRI.FeatureLayer({
      url: url
    });
    this.FeatureLayer = featureLayer;
  }

  render(map, mapView, markerSymbol) {
    this.ObjMap = map;
    this.ObjMapView = mapView;
    this.MarkerSymbol = markerSymbol;
    this.ObjMapView.center = this.Point;

    let graphicsLayer = new ESRI.GraphicsLayer();
    this.ObjMap.add(graphicsLayer);
    let graphic = new ESRI.Graphic({
      geometry: this.Point,
      symbol: this.MarkerSymbol
    });

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
    this.ObjectID = [];
    this.ObjectIDStr = [];
  }

  setParams(params) {
    this.Params = params;
  }

  setServiceUrl(url) {
    this.Url = url;
  }

  run(callback) {
    let self = this;
    let gp = new ESRI.Geoprocessor(this.Url);
    gp.execute(this.Params).then(catchResult);
    function catchResult(result) {
      console.log(result);
      let features = result.results[0].value.features;
      features.forEach(element => {
        let objectID = element.attributes.OBJECTID;
        self.ObjectID.push(objectID);
      });
      let objID = self.ObjectID;
      let Str = objID.toString();
      self.ObjectIDStr.push(Str);
      callback();
    }
  }

  setQuery(query) {}
}

export class Database {
  constructor(host, username, password, dbname) {
    this.Host = host;
    this.Username = username;
    this.Password = password;
    this.DBName = dbname;
    this.Data = "";
  }

  countMultipleElements(array_elements) {
    let current = null;
    let cnt = 0;
    let data = [];
    for (let i = 0; i < array_elements.length; i++) {
      if (array_elements[i] != current) {
        if (cnt > 0) {
          data.push(cnt);
        }
        current = array_elements[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      data.push(cnt);
    }
    return data;
  }

  stringToObject(arr) {
    let jsonObj = [];
    let headers = arr[0].split(",");
    for (var i = 1; i < arr.length; i++) {
      let data = arr[i].split(",");
      let obj = {};
      for (var j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      jsonObj.push(obj);
    }
    return jsonObj;
  }

  read() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "content/readData.php",
        success: function(response) {
          resolve(response);
        }
      });
    });
  }

  readUserAndDepartment() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: "GET",
        url: "config/read_user_and_department.php",
        success: function(response) {
          alert(response);
          resolve(response);
        }
      });
    });
  }

  insert(name, data, color) {
    let tableName = name;
    let dataString = data.split("\n");
    let dataArr = this.stringToObject(dataString);
    let firstKey = Object.keys(dataArr[0])[0];
    for (let i in dataArr) {
      if (dataArr[i][firstKey] == "") {
        dataArr.splice(i, 1);
      } else {
        dataArr[i].color = color;
        dataArr[i].created_by = created_by;
        dataArr[i].tableName = tableName;
        $.ajax({
          url: "content/insert.php",
          method: "POST",
          data: dataArr[i],
          success: function(data) {
            alert("Data Save: " + data);
          }
        });
      }
    }
  }

  edit(Data) {
    $(document).ready(function() {
      arrayUtils.forEach(Data, function(data) {
        let id = Data["id"];
        let type = data.type;
        let name = data.name;
        let lat = data.lat;
        let lon = data.lon;
        let region = data.region;
        let shape = data.shape;
        let created_by = self.created_by;
        $.ajax({
          url: "content/edit.php",
          method: "POST",
          data: {
            storage_id: id,
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
      Data = [];
    });
  }
}

export class LocalStorage {
  constructor(mapView, method) {
    this.MapView = mapView;
    this.Method = method;
    this.FunctionConfirm = [];
  }

  15;

  doubleData(name, data) {
    let currentData = JSON.parse(localStorage.getItem(name));
    let state = undefined;
    if (currentData !== null) {
      for (let key in currentData) {
        if (currentData[key].includes(data) == false) {
          state = false;
        } else {
          state = true;
        }
      }
    } else {
      currentData = [];
      state = false;
    }
    return state;
  }

  read() {
    console.log(localStorage.getItem("treeview"));
    let newTreeview = $(localStorage.getItem("treeview"));
    if (localStorage.getItem("treeview") !== null) {
      $("#tree-viewer").replaceWith(newTreeview);
    }
  }

  startRenderDataPOIFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("data"))[2];
    console.log(data);
    let items = this.MapView.graphics.items;
    let arrData = [];
    for (let i in data) {
      for (let j in data[i]) {
        arrData.push(data[i][j].attributes);
      }
    }
    this.getRowofTextArray(arrData);
    for (let s in items) {
      items[s].visible = false;
    }
  }

  convertToText(row) {
    var finalVal = "";
    for (var j = 0; j < row.length; j++) {
      var innerValue = row[j] === null ? "" : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      var result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
      if (j > 0) finalVal += ",";
      finalVal += result;
    }
    return finalVal + "\n";
  }

  getValuesFromObject(object) {
    let values = [];
    for (let key in object) {
      values.push(object[key]);
    }
    return values;
  }

  getRowofTextArray(data) {
    let key = this.convertToText(Object.keys(data[0]));
    let strData = key;
    for (let i in data) {
      if (data[i] instanceof Object) {
        strData += this.convertToText(this.getValuesFromObject(data[i]));
      }
    }
    return strData;
  }

  insert(name, data) {
    let currentData = JSON.parse(localStorage.getItem(name));
    if (currentData !== null) {
      currentData.push(data);
    } else {
      currentData = [];
      currentData.push(data);
    }
    localStorage.setItem(name, JSON.stringify(currentData));
    console.log(JSON.parse(localStorage.getItem(name)));
  }

  getLengthData(name) {
    let length = JSON.parse(localStorage.getItem(name)).length;
    return length;
  }
}

export class ConfirmBox {
  constructor(
    msg,
    firstText,
    secondText,
    firstClass,
    secondClass,
    firstMethod,
    secondMethod
  ) {
    this.Message = msg;
    this.FirstText = firstText;
    this.SecondText = secondText;
    this.FirstClass = firstClass;
    this.SecondClass = secondClass;
    this.FirstMethod = firstMethod;
    this.SecondMethod = secondMethod;
  }

  show() {
    let confirmBox = $("#confirmBox");
    let firstChoice = confirmBox.find("#first");
    firstChoice.attr("class", this.FirstClass);
    firstChoice.text(this.FirstText);
    let secondChoice = confirmBox.find("#second");
    secondChoice.attr("class", this.SecondClass);
    secondChoice.text(this.SecondText);
    console.log(confirmBox.find("button"));
    let modal = $("#dragdrop-modal");
    confirmBox.find(".message").text(this.Message);
    console.log(confirmBox.find(firstChoice));
    confirmBox
      .find("." + this.FirstClass + ",." + this.SecondClass)
      .unbind()
      .click(function() {
        confirmBox.hide();
        modal.hide();
      });
    confirmBox.find("." + this.FirstClass).click(this.FirstMethod);
    confirmBox.find("." + this.SecondClass).click(this.SecondMethod);
    confirmBox.show();
  }
}

export class ConvertCSV {
  constructor(map, mapView, pointColor) {
    this.Map = map;
    this.MapView = mapView;
    this.PointColor = pointColor;
    this.NameFile = "";
    this.Data = [];
    this.Uids = [];
    this.Color = null;
    this.Storage = "";
    this.CreatedBy = [];
    this.latFieldStrings = ["lat", "latitude", "y", "ycenter"];
    this.longFieldStrings = ["lon", "long", "longitude", "x", "xcenter"];
  }

  setColor(color) {
    this.Color = color;
  }

  setNameFile(nameFile) {
    this.NameFile = nameFile;
  }

  setStorage(storage) {
    this.Storage = storage;
  }

  setCreatedBy(createdBy) {
    this.CreatedBy = createdBy;
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
      self.handleDrop(event); //Separate files
      infocsv.hide(); //Hide CSV requirements
    });
  }

  handleDrop(event, modal) {
    let self = this;
    event.preventDefault();
    let dataTransfer = event.dataTransfer,
      files = dataTransfer.files,
      types = dataTransfer.types;
    this.NameFile = files[0].name
      .split(".")
      .slice(0, -1)
      .join(".");
    if (files && files.length === 1) {
      let file = files[0];
      if (file.name.indexOf(".csv") !== -1) {
        if (file.size < 5000000) {
          let storeDatabase = new Database(
            "localhost",
            "root",
            "",
            "user_data"
          );
          let storeLocalStorage = new LocalStorage(this.MapView);
          let reader = new FileReader();
          let poi = new POI(this.MapView);
          let confirmBox = new ConfirmBox(
            "",
            "Use Database",
            "Use Local Storage",
            "database",
            "localstorage",
            function() {
              alert("Database");
              self.Storage = "database";
              storeLocalStorage.insert("storage", self.Storage);
              reader.onload = function() {
                let color = JSON.stringify(self.getRandomColor());
                console.log("Finished reading CSV data");
                storeDatabase.insert(self.NameFile, reader.result, color);
                self.Color = JSON.parse(color);
              };
              reader.readAsText(file);
              self.handleCSV(file);
            },
            function() {
              alert("LocalStorage");
              self.Storage = "localstorage";
              storeLocalStorage.insert("storage", self.Storage);
              self.handleCSV(file);
            }
          );
          confirmBox.show();
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

  getRandomColor() {
    let color = [];
    for (let i = 0; i < 3; i++) {
      color.push(Math.floor(Math.random() * 255 + 1));
    }
    return color;
  }

  processCSVData(data, rendered, val) {
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
    let storeToLocalStorage = new LocalStorage(mapView);
    let storeTreeview = new Viewer(mapView);
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

        let color = [];
        if (rendered == true) {
          storeTreeview.setChecked(true);
          color = JSON.parse(localStorage.getItem("color"))[val];
        } else if (rendered == false) {
          storeTreeview.setChecked(false);
          color = self.Color;
          self.Storage = "database";
        } else {
          storeTreeview.setChecked(true);
          self.CreatedBy = created_by;
          if (self.Color == null) {
            color = self.getRandomColor();
          } else {
            color = self.Color;
          }
        }

        self.Data = [];
        self.Uids = [];
        self.Color = color;

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
            color: self.Color,
            outline: {
              color: self.Color,
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

          self.Data.push(pointGraphic);
          self.Uids.push(pointGraphic.uid);

          if (rendered == false) {
            for (let key in mapView.graphics.items) {
              mapView.graphics.items[key].visible = false;
            }
          }
        });
        if (!rendered || rendered == false) {
          storeToLocalStorage.insert("data", self.Data);
          storeTreeview.addTreeview(
            self.Storage,
            self.NameFile,
            storeToLocalStorage.getLengthData("data"),
            self.CreatedBy
          );
          storeToLocalStorage.insert("namefile", self.NameFile);
          storeToLocalStorage.insert("uids", self.Uids);
          storeToLocalStorage.insert("color", self.Color);
          self.Color = null;
        }
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
              "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",
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

export class Viewer {
  constructor(mapView, method) {
    this.Treeview = null;
    this.MapView = mapView;
    this.Method = method;
    this.Checked = true;
  }

  setChecked(checked) {
    this.Checked = checked;
  }

  renderTreeview() {
    let newTreeview = localStorage.getItem("treeview");
    console.log(newTreeview);
    if (newTreeview !== null) {
      $("#tree-viewer").replaceWith(newTreeview);
    }
  }

  addTreeview(storage, nameFile, length, createdBy) {
    let self = this;
    let index = JSON.parse(localStorage.getItem("userIds")).indexOf(createdBy);
    let username = JSON.parse(localStorage.getItem("usernames"))[index];
    if (localStorage.getItem("createdBy-" + storage) !== null) {
      if (
        JSON.parse(localStorage.getItem("createdBy-" + storage)).includes(
          createdBy
        ) == true
      ) {
        createSubPOI(storage);
      } else {
        let storeLocalStorage = new LocalStorage(this.MapView);
        storeLocalStorage.insert("createdBy-" + storage, createdBy);
        createTreeview(storage);
      }
    } else {
      let storeLocalStorage = new LocalStorage(this.MapView);
      storeLocalStorage.insert("createdBy-" + storage, createdBy);
      createTreeview(storage);
    }

    function createTreeview(storage) {
      let data = document.createElement("ul");
      data.setAttribute("class", "treeview-user");

      let li = document.createElement("li");
      li.setAttribute("class", "user");

      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "master-select-all-poi");
      input.setAttribute("class", "master-select-all-poi");

      let label = document.createElement("label");
      label.setAttribute("for", "master-select-all-poi");
      label.setAttribute("class", "label-user");

      let ul = document.createElement("ul");
      ul.setAttribute("class", "user-poi");

      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(ul);

      data.appendChild(li);

      $("#user-" + storage).append(data);
      $(".user").attr("class", "user-" + storage + "-" + createdBy);
      $(".master-select-all-poi").attr(
        "class",
        "master-select-all-poi-" + storage + "-" + createdBy
      );
      $(".label-user").attr(
        "for",
        "master-select-all-poi-" + storage + "-" + createdBy
      );
      $(".label-user").attr("class", "label-user-" + storage + "-" + createdBy);
      $(".label-user-" + storage + "-" + createdBy).text(username);

      let li_sub = document.createElement("LI");
      li_sub.setAttribute("class", "li-user-poi");

      let input_sub = document.createElement("INPUT");
      input_sub.setAttribute("type", "checkbox");
      input_sub.setAttribute("class", "poi");

      let label_sub = document.createElement("LABEL");
      label_sub.setAttribute("for", "poi");
      label_sub.setAttribute("class", "poi");

      li_sub.appendChild(input_sub);
      li_sub.appendChild(label_sub);

      $(".user-poi").attr("class", "user-poi-" + storage + "-" + createdBy);
      $(".user-poi-" + storage + "-" + createdBy).append(li_sub);
      $(".user-poi-" + storage + "-" + createdBy + " .li-user-poi").attr(
        "class",
        "li-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " input.poi"
      ).attr("class", "poi-" + storage + "-" + createdBy + "-" + length);
      if (self.Checked == true) {
        $(
          ".li-user-poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length +
            " input.poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length
        ).prop("checked", true);
      } else if (self.Checked == false) {
        $(
          ".li-user-poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length +
            " input.poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length
        ).prop("checked", false);
      }

      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " input.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).attr("value", length - 1);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " label.poi"
      ).attr("class", "poi-" + storage + "-" + createdBy + "-" + length);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          +createdBy +
          "-" +
          length +
          " label.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).attr("for", "poi-" + storage + "-" + createdBy + "-" + length);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          +createdBy +
          "-" +
          length +
          " label.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).text(nameFile);
      let item = $(
        ".li-user-poi-" + storage + "-" + createdBy + "-" + length + " input"
      ).attr("class");
      let val = $(
        ".li-user-poi-" + storage + "-" + createdBy + "-" + length + " input"
      ).attr("value");
      let selected = JSON.parse(localStorage.getItem("selected"));
      let value = JSON.parse(localStorage.getItem("value"));
      if (selected !== null) {
        selected.push(item);
        value.push(val);
        localStorage.setItem("selected", JSON.stringify(selected));
        localStorage.setItem("value", JSON.stringify(value));
      } else {
        localStorage.setItem("selected", JSON.stringify([item]));
        localStorage.setItem("value", JSON.stringify([val]));
      }
      self.Treeview = document.getElementById("tree-viewer").outerHTML;
      console.log(self.Treeview);
      localStorage.setItem("treeview", self.Treeview);
    }

    function createSubPOI(storage) {
      let li_sub = document.createElement("LI");
      li_sub.setAttribute("class", "li-user-poi");

      let input_sub = document.createElement("INPUT");
      input_sub.setAttribute("type", "checkbox");
      input_sub.setAttribute("class", "poi");

      let label_sub = document.createElement("LABEL");
      label_sub.setAttribute("for", "poi");
      label_sub.setAttribute("class", "poi");

      li_sub.appendChild(input_sub);
      li_sub.appendChild(label_sub);
      $(".user-poi-" + storage + "-" + createdBy).append(li_sub);
      $(".user-poi-" + storage + "-" + createdBy + " .li-user-poi").attr(
        "class",
        "li-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " input.poi"
      ).attr("class", "poi-" + storage + "-" + createdBy + "-" + length);
      if (self.Checked == true) {
        $(
          ".li-user-poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length +
            " input.poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length
        ).prop("checked", true);
      } else if (self.Checked == false) {
        $(
          ".li-user-poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length +
            " input.poi-" +
            storage +
            "-" +
            createdBy +
            "-" +
            length
        ).prop("checked", false);
      }
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " input.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).attr("value", length - 1);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " label.poi"
      ).attr("class", "poi-" + storage + "-" + createdBy + "-" + length);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " label.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).attr("for", "poi-" + storage + "-" + createdBy + "-" + length);
      $(
        ".li-user-poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length +
          " label.poi-" +
          storage +
          "-" +
          createdBy +
          "-" +
          length
      ).text(nameFile);
      let item = $(
        ".li-user-poi-" + storage + "-" + createdBy + "-" + length + " input"
      ).attr("class");
      let val = $(
        ".li-user-poi-" + storage + "-" + createdBy + "-" + length + " input"
      ).attr("value");
      let selected = JSON.parse(localStorage.getItem("selected"));
      let value = JSON.parse(localStorage.getItem("value"));
      if (selected !== null) {
        selected.push(item);
        value.push(val);
        localStorage.setItem("selected", JSON.stringify(selected));
        localStorage.setItem("value", JSON.stringify(value));
      } else {
        localStorage.setItem("selected", JSON.stringify([item]));
        localStorage.setItem("value", JSON.stringify([val]));
      }
      self.Treeview = document.getElementById("tree-viewer").outerHTML;
      console.log(self.Treeview);
      localStorage.setItem("treeview", self.Treeview);
    }
  }

  selectItem() {
    let self = this;
    //All checkbox action, apply here
    $(document).ready(function() {
      $(document).delegate("input:checkbox", "click", function() {
        if ($(this).prop("checked") == true) {
          let className = $(this).attr("class");
          console.log(className);
          if ($(this).siblings().length > 1) {
            if ($(this).siblings("div").length > 0) {
              $(this)
                .siblings("div")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              let getClasses = $(this)
                .siblings("div")
                .children()
                .children()
                .children("input[type='checkbox']");
              for (let i = 0; i < getClasses.length; i++) {
                setAllItem(getClasses[i].getAttribute("class"));
              }
              console.log(getClasses);
            } else if (
              $(this).siblings("ul[id='custom-data-user']").length > 0
            ) {
              $(this)
                .siblings("ul")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              let getClasses = $(this)
                .siblings("ul")
                .children()
                .children()
                .children()
                .children()
                .children("input[type='checkbox']");
              for (let i = 0; i < getClasses.length; i++) {
                setAllItem(getClasses[i].getAttribute("class"));
              }
              console.log(getClasses);
            } else {
              $(this)
                .siblings("ul")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              setAllItem(className);
            }
          } else {
            console.log(JSON.parse(localStorage.getItem("data")));
            setItem(className);
          }
        } else if ($(this).prop("checked") == false) {
          let className = $(this).attr("class");
          if ($(this).siblings().length > 1) {
            if ($(this).siblings("div").length > 0) {
              $(this)
                .siblings("div")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              let getClasses = $(this)
                .siblings("div")
                .children()
                .children()
                .children("input[type='checkbox']");
              for (let i = 0; i < getClasses.length; i++) {
                unsetAllItem(getClasses[i].getAttribute("class"));
              }
            } else if (
              $(this).siblings("ul[id='custom-data-user']").length > 0
            ) {
              $(this)
                .siblings("ul")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              let getClasses = $(this)
                .siblings("ul")
                .children()
                .children()
                .children()
                .children()
                .children("input[type='checkbox']");
              for (let i = 0; i < getClasses.length; i++) {
                unsetAllItem(getClasses[i].getAttribute("class"));
              }
            } else {
              $(this)
                .siblings("ul")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              unsetAllItem(className);
            }
          } else {
            unsetItem(className);
          }
        }
      });
    });

    function setAllItem(className) {
      let selected = JSON.parse(localStorage.getItem("selected"));
      let parent = document.getElementsByClassName(className)[0];
      let child = $(parent)
        .siblings("ul")
        .find("input[type='checkbox']");
      if (selected !== null) {
        for (let i = 0; i < child.length; i++) {
          if (selected.includes(child[i].className) == false) {
            selected.push(child[i].className);
          }
        }
      } else {
        selected = [];
        for (let i = 0; i < child.length; i++) {
          if (selected.includes(child[i].className) == false) {
            selected.push(child[i].className);
          }
        }
      }
      localStorage.setItem("selected", JSON.stringify(selected));
      console.log(JSON.parse(localStorage.getItem("selected")));

      let storeLocalStorage = new LocalStorage(self.MapView);
      let val = [];
      let uids = JSON.parse(localStorage.getItem("uids"));
      let data = JSON.parse(localStorage.getItem("data"));
      let dataRaw = [];
      let dataAdd = [];

      for (let i = 0; i < child.length; i++) {
        val.push(child[i].value);
      }

      for (let key in val) {
        for (let i in uids[val[key]]) {
          for (let j in self.MapView.graphics.items) {
            if (uids[val[key]][i] == self.MapView.graphics.items[j].uid) {
              self.MapView.graphics.items[j].visible = false;
              self.MapView.graphics.items.splice(j, 1);
            }
          }
        }
      }

      for (let i in val) {
        uids[val[i]] = [];
      }

      for (let s in val) {
        let tempData = [];
        for (let key in data[val[s]]) {
          tempData.push(data[val[s]][key].attributes);
        }
        dataRaw.push(tempData);
      }

      for (let i in dataRaw) {
        let length = data[val[i]].length;
        let tempData = [];
        self.Method.processCSVData(
          storeLocalStorage.getRowofTextArray(dataRaw[i]),
          true,
          val[i]
        );
        for (let k = length; k > 0; k--) {
          tempData.push(
            self.MapView.graphics.items[self.MapView.graphics.items.length - k]
          );
        }
        dataAdd.push(tempData);
      }

      for (let s in val) {
        for (let i in dataAdd[s]) {
          uids[val[s]].push(dataAdd[s][i].uid);
        }
      }

      localStorage.setItem("uids", JSON.stringify(uids));
      console.log(JSON.parse(localStorage.getItem("uids")));
    }

    function unsetAllItem(className) {
      let selected = JSON.parse(localStorage.getItem("selected"));
      let parent = document.getElementsByClassName(className)[0];
      let child = $(parent)
        .siblings("ul")
        .find("input[type='checkbox']");
      if (selected !== null) {
        for (let i = 0; i < child.length; i++) {
          let index = selected.indexOf(child[i].className);
          if (index > -1) {
            selected.splice(index, 1);
          } else {
            selected = JSON.parse(localStorage.getItem("selected"));
          }
        }
      } else {
        selected = [];
        for (let i = 0; i < child.length; i++) {
          let index = selected.indexOf(child[i].className);
          if (index > -1) {
            selected.splice(index, 1);
          } else {
            selected = JSON.parse(localStorage.getItem("selected"));
          }
        }
      }
      localStorage.setItem("selected", JSON.stringify(selected));

      let val = [];
      let uids = JSON.parse(localStorage.getItem("uids"));

      for (let i = 0; i < child.length; i++) {
        val.push(child[i].value);
      }

      for (let s in val) {
        for (let i in uids[val[s]]) {
          for (let j in self.MapView.graphics.items) {
            if (uids[val[s]][i] == self.MapView.graphics.items[j].uid) {
              self.MapView.graphics.items[j].visible = false;
              self.MapView.graphics.items.splice(j, 1);
            }
          }
        }
        uids[val[s]] = [];
        localStorage.setItem("uids", JSON.stringify(uids));
      }
      localStorage.setItem("uids", JSON.stringify(uids));
      console.log(JSON.parse(localStorage.getItem("uids")));
    }

    function setItem(className) {
      let storeLocalStorage = new LocalStorage(self.MapView);
      let selected = JSON.parse(localStorage.getItem("selected"));
      let data = JSON.parse(localStorage.getItem("data"));
      let dataRaw = [];
      let dataAdd = [];
      let uids = JSON.parse(localStorage.getItem("uids"));
      let val = $("." + className).val();
      let length = data[val].length;
      if (selected !== null) {
        if (selected.includes(className) == false) {
          selected.push(className);
        } else {
          selected = JSON.parse(localStorage.getItem("selected"));
        }
      } else {
        selected = [];
        selected.push(className);
      }
      localStorage.setItem("selected", JSON.stringify(selected));

      for (let key in data[val]) {
        dataRaw.push(data[val][key].attributes);
      }

      self.Method.processCSVData(
        storeLocalStorage.getRowofTextArray(dataRaw),
        true,
        val
      );

      for (let i = length; i > 0; i--) {
        dataAdd.push(
          self.MapView.graphics.items[self.MapView.graphics.items.length - i]
        );
      }

      uids[val] = [];
      for (let i in dataAdd) {
        uids[val].push(dataAdd[i].uid);
      }

      localStorage.setItem("uids", JSON.stringify(uids));
      console.log(JSON.parse(localStorage.getItem("uids")));
      console.log(self.MapView.graphics.items);
    }

    function unsetItem(className) {
      let selected = JSON.parse(localStorage.getItem("selected"));
      let uids = JSON.parse(localStorage.getItem("uids"));
      let val = $("." + className).val();
      if (selected !== null) {
        let index = selected.indexOf(className);
        if (index > -1) {
          selected.splice(index, 1);
        } else {
          selected = JSON.parse(localStorage.getItem("selected"));
        }
      } else {
        selected = [];
        selected.push(className);
      }
      localStorage.setItem("selected", JSON.stringify(selected));
      for (let i in uids[val]) {
        for (let j in self.MapView.graphics.items) {
          if (uids[val][i] == self.MapView.graphics.items[j].uid) {
            self.MapView.graphics.items[j].visible = false;
            self.MapView.graphics.items.splice(j, 1);
          }
        }
      }
      uids[val] = [];
      localStorage.setItem("uids", JSON.stringify(uids));
      console.log(JSON.parse(localStorage.getItem("uids")));
      console.log(self.MapView.graphics.items);
    }
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
