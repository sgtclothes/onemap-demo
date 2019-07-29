export class Pointing {
  constructor(mapView, latitude, longitude) {
    this.MapView = mapView;
    this.Latitude = latitude;
    this.Longitude = longitude;
  }

  render() {
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

    let id = this.Latitude.toString() + this.Longitude.toString();
    let pointGraphic = new ESRI.Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        id: id
      }
    });
    this.MapView.graphics.add(pointGraphic);
  }
}

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

  create() {
    let point = new ESRI.Point({
      longitude: this.Longitude,
      latitude: this.Latitude
    });

    let pointGraphic = new ESRI.Graphic({
      geometry: point
    });

    let radius = this.Radius;
    let lengthValue;
    if (this.RadiusUnit === "kilometers") {
      lengthValue = parseFloat(radius * 1000);
    } else if (this.RadiusUnit === "miles") {
      lengthValue = parseFloat(radius / 0.00062137);
    } else {
      lengthValue = radius;
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
      color: [
        Math.floor(Math.random() * 255 + 1),
        Math.floor(Math.random() * 255 + 1),
        Math.floor(Math.random() * 255 + 1),
        0.25
      ]
    });

    let circleGraphic = new ESRI.Graphic({
      geometry: circle,
      symbol: circleSymb
    });

    let unitLength;
    if (this.RadiusUnit == "kilometers") {
      unitLength = "km";
    } else if (this.RadiusUnit == "miles") {
      unitLength = "mi";
    } else {
      unitLength = "m";
    }

    const self = this;
    let query = new ESRI.Query();
    query.returnGeometry = true;
    query.geometry = circle;
    query.outFields = ["*"];
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      let features = results.features;
      let fields = results.fields.filter(function(el) {
        return (
          el.alias === "POPULASI" ||
          el.alias === "SES_A" ||
          el.alias === "SES_B" ||
          el.alias === "SES_C" ||
          el.alias === "SES_D" ||
          el.alias === "SES_E" ||
          el.alias === "JML_KK" ||
          el.alias === "POP_LK" ||
          el.alias === "POP_PR"
        );
      });
      fields.forEach(function(field) {
        if (field.alias === "POPULASI") {
          field.name = "Population";
          field.order = "a";
        } else if (field.alias === "SES_A") {
          field.name = "SES A";
          field.order = "e";
        } else if (field.alias === "SES_B") {
          field.name = "SES B";
          field.order = "f";
        } else if (field.alias === "SES_C") {
          field.name = "SES C";
          field.order = "g";
        } else if (field.alias === "SES_D") {
          field.name = "SES D";
          field.order = "h";
        } else if (field.alias === "SES_E") {
          field.name = "SES E";
          field.order = "i";
        } else if (field.alias === "JML_KK") {
          field.name = "Household";
          field.order = "b";
        } else if (field.alias === "POP_LK") {
          field.name = "Male";
          field.order = "c";
        } else if (field.alias === "POP_PR") {
          field.name = "Female";
          field.order = "d";
        }
      });
      let totalPopulasi = 0;
      let household = 0;
      let male = 0;
      let female = 0;
      let sesa = 0;
      let sesb = 0;
      let sesc = 0;
      let sesd = 0;
      let sese = 0;

      features.forEach(function(feature) {
        totalPopulasi += feature.attributes.POPULASI;
        household += feature.attributes.JML_KK;
        male += feature.attributes.POP_LK;
        female += feature.attributes.POP_PR;
        sesa += feature.attributes.SES_A;
        sesb += feature.attributes.SES_B;
        sesc += feature.attributes.SES_C;
        sesd += feature.attributes.SES_D;
        sese += feature.attributes.SES_E;
      });
      totalPopulasi = totalPopulasi
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      household = household
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      male = male.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      female = female.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

      circleGraphic.attributes = {
        POPULASI: totalPopulasi,
        JML_KK: household,
        POP_LK: male,
        POP_PR: female,
        SES_A: sesa,
        SES_B: sesb,
        SES_C: sesc,
        SES_D: sesd,
        SES_E: sese
      };

      let popupContent = {
        title: "Buffer " + radius + " " + unitLength,
        content: "<table class='esri-widget__table'>"
      };
      fields.sort((a, b) => (a.order > b.order ? 1 : -1));
      arrayUtils.forEach(fields, function(field) {
        popupContent.content +=
          "<tr><th class='esri-feature__field-header'>" +
          field.name +
          "</th><td class='esri-feature__field-data'>{" +
          field.alias +
          "}</td></tr>";
      });
      popupContent.content += "</table>";
      circleGraphic.popupTemplate = popupContent;
      let graphicsLayer = new ESRI.GraphicsLayer();
      graphicsLayer.title = self.Title;
      self.Map.add(graphicsLayer);
      graphicsLayer.add(circleGraphic);
      self.MapView.goTo({
        target: pointGraphic,
        zoom: 11
      });
    });
  }

  setUnit(unit) {
    this.RadiusUnit = unit;
  }

  setRadius(radius) {
    this.Radius = radius;
  }

  setTitle(title) {
    this.Title = title;
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
    this.Title = title;
  }

  run(callback) {
    let fillSymbol = {
      type: "simple-fill",
      color: [
        Math.floor(Math.random() * 255 + 1),
        Math.floor(Math.random() * 255 + 1),
        Math.floor(Math.random() * 255 + 1),
        0.3
      ],
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
          title: self.popupTitle + " " + self.Distance + " " + self.Unit
        };
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

  setDistance(distance, unit) {
    this.Distance = distance;
    if (unit == "kilometers") {
      this.Unit = "km";
      this.popupTitle = "Driving Distance";
    } else if (unit == "miles") {
      this.Unit = "mi";
      this.popupTitle = "Driving Distance";
    } else if (unit == "meters") {
      this.Unit = "m";
      this.popupTitle = "Driving Distance";
    } else {
      this.popupTitle = "Driving Time";
      this.Unit = unit;
    }
  }

  render(mapView) {
    this.ObjMapView = mapView;
    this.ObjMapView.center = this.Point;

    let graphicsLayer = new ESRI.GraphicsLayer();
    let graphic = new ESRI.Graphic({
      geometry: this.Point
    });

    graphicsLayer.title = this.Title;

    this.ObjMap.add(graphicsLayer);
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

  setParams(params, callback) {
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
      let fields = result.results[0].value.fields.filter(function(el) {
        return (
          el.alias === "POPULASI" ||
          el.alias === "SES_A" ||
          el.alias === "SES_B" ||
          el.alias === "SES_C" ||
          el.alias === "SES_D" ||
          el.alias === "SES_E" ||
          el.alias === "Jumlah Kepala Keluarga" ||
          el.alias === "POP_LK" ||
          el.alias === "POP_PR"
        );
      });
      fields.forEach(function(field) {
        if (field.alias === "POPULASI") {
          field.name = "Population";
          field.order = "a";
        } else if (field.alias === "SES_A") {
          field.name = "SES A";
          field.order = "e";
        } else if (field.alias === "SES_B") {
          field.name = "SES B";
          field.order = "f";
        } else if (field.alias === "SES_C") {
          field.name = "SES C";
          field.order = "g";
        } else if (field.alias === "SES_D") {
          field.name = "SES D";
          field.order = "h";
        } else if (field.alias === "SES_E") {
          field.name = "SES E";
          field.order = "i";
        } else if (field.alias === "Jumlah Kepala Keluarga") {
          field.alias = "JML_KK";
          field.name = "Household";
          field.order = "b";
        } else if (field.alias === "POP_LK") {
          field.name = "Male";
          field.order = "c";
        } else if (field.alias === "POP_PR") {
          field.name = "Female";
          field.order = "d";
        }
      });
      let features = result.results[0].value.features;
      let totalPopulasi = 0;
      let household = 0;
      let male = 0;
      let female = 0;
      let sesa = 0;
      let sesb = 0;
      let sesc = 0;
      let sesd = 0;
      let sese = 0;
      features.forEach(function(feature) {
        totalPopulasi += feature.attributes.POPULASI;
        household += feature.attributes.JML_KK;
        male += feature.attributes.POP_LK;
        female += feature.attributes.POP_PR;
        sesa += feature.attributes.SES_A;
        sesb += feature.attributes.SES_B;
        sesc += feature.attributes.SES_C;
        sesd += feature.attributes.SES_D;
        sese += feature.attributes.SES_E;
      });
      totalPopulasi = totalPopulasi
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      household = household
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      male = male.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      female = female.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      graphicsLayers.attributes = {
        POPULASI: totalPopulasi,
        JML_KK: household,
        POP_LK: male,
        POP_PR: female,
        SES_A: sesa,
        SES_B: sesb,
        SES_C: sesc,
        SES_D: sesd,
        SES_E: sese
      };

      let popupContent = {
        content: "<table class='esri-widget__table'>"
      };
      fields.sort((a, b) => (a.order > b.order ? 1 : -1));
      arrayUtils.forEach(fields, function(field) {
        popupContent.content +=
          "<tr><th class='esri-feature__field-header'>" +
          field.name +
          "</th><td class='esri-feature__field-data'>{" +
          field.alias +
          "}</td></tr>";
      });
      popupContent.content += "</table>";
      graphicsLayers.popupTemplate.content = popupContent.content;
    }
  }
}

export class Database {
  constructor(host, username, password, dbname, mapView) {
    this.Host = host;
    this.Username = username;
    this.Password = password;
    this.DBName = dbname;
    this.Data = "";
    this.MapView = mapView;
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
        url: "content/read_data.php",
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

  replaceData(currentData, namefile, storage, createdBy, result, color) {
    let self = this;
    let uids = JSON.parse(localStorage.getItem("uids"));
    let length = currentData.length;
    let parent = document.getElementsByClassName(
      "user-poi-" + storage + "-" + createdBy
    );

    let label = $(parent)
      .children()
      .children("label");
    let value = null;

    for (let k = length; k > 0; k--) {
      self.MapView.graphics.items.splice(
        self.MapView.graphics.items.length - k,
        1
      );
    }

    console.log(JSON.parse(localStorage.getItem("uids")));

    for (let i = 0; i < label.length; i++) {
      if ($(label[i]).text() == namefile) {
        value = $(parent)
          .children()
          .children("input[type='checkbox']")[i];
        let index = value.getAttribute("value");
        let data = JSON.parse(localStorage.getItem("data"));
        if (index !== -1) {
          data[index] = currentData;
        }
        localStorage.setItem("data", JSON.stringify(data));

        console.log(uids[index]);
        console.log(self.MapView.graphics.items);
        if (uids[index].length > 0) {
          for (let i in uids[index]) {
            for (let j in self.MapView.graphics.items) {
              if (uids[index][i] == self.MapView.graphics.items[j].uid) {
                self.MapView.graphics.items[j].visible = false;
                self.MapView.graphics.items.splice(j, 1);
              }
            }
          }

          uids[index] = [];
          for (let i in currentData) {
            uids[index].push(currentData[i].uid);
          }

          for (let key in currentData) {
            self.MapView.graphics.add(currentData[key]);
          }

          console.log(currentData);
          console.log(self.MapView.graphics.items);

          localStorage.setItem("uids", JSON.stringify(uids));
        } else if (uids[index].length == 0) {
          for (let i in currentData) {
            uids[index].push(currentData[i].uid);
          }
          for (let key in currentData) {
            self.MapView.graphics.add(currentData[key]);
          }

          $(value).prop("checked", true);

          localStorage.setItem("uids", JSON.stringify(uids));
        }
      }
    }

    this.updateDatabaseTable(namefile, result, storage, JSON.stringify(color));
  }

  updateDatabaseTable(name, data, storage, color) {
    let self = this;
    console.log(data);
    let tableName = name + "_" + storage + "_" + created_by;
    $.ajax({
      url: "content/delete_table.php",
      method: "POST",
      data: {
        tableName: tableName
      },
      success: function(data) {
        alert("Data updated : " + data);
      }
    }).then(function() {
      self.insert(tableName, data, color);
    });
  }
}

export class LocalStorage {
  constructor(mapView, method) {
    this.MapView = mapView;
    this.Method = method;
    this.FunctionConfirm = [];
  }

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

  replaceData(currentData, namefile, storage, createdBy) {
    let self = this;
    let uids = JSON.parse(localStorage.getItem("uids"));
    let length = currentData.length;
    console.log(currentData);
    let parent = document.getElementsByClassName(
      "user-poi-" + storage + "-" + createdBy
    );

    let label = $(parent)
      .children()
      .children("label");
    let value = null;

    for (let k = length; k > 0; k--) {
      self.MapView.graphics.items.splice(
        self.MapView.graphics.items.length - k,
        1
      );
    }

    for (let i = 0; i < label.length; i++) {
      console.log($(label[i]).text());
      console.log(namefile);
      if ($(label[i]).text() == namefile) {
        value = $(parent)
          .children()
          .children("input[type='checkbox']")[i];
        let index = value.getAttribute("value");
        let data = JSON.parse(localStorage.getItem("data"));
        if (index !== -1) {
          data[index] = currentData;
        }
        localStorage.setItem("data", JSON.stringify(data));

        console.log(uids[index]);
        console.log(self.MapView.graphics.items);
        if (uids[index].length > 0) {
          for (let i in uids[index]) {
            for (let j in self.MapView.graphics.items) {
              if (uids[index][i] == self.MapView.graphics.items[j].uid) {
                self.MapView.graphics.items[j].visible = false;
                self.MapView.graphics.items.splice(j, 1);
              }
            }
          }

          uids[index] = [];
          for (let i in currentData) {
            uids[index].push(currentData[i].uid);
          }

          for (let key in currentData) {
            self.MapView.graphics.add(currentData[key]);
          }

          console.log(currentData);
          console.log(self.MapView.graphics.items);

          localStorage.setItem("uids", JSON.stringify(uids));
        } else if (uids[index].length == 0) {
          for (let i in currentData) {
            uids[index].push(currentData[i].uid);
          }
          for (let key in currentData) {
            self.MapView.graphics.add(currentData[key]);
          }

          $(value).prop("checked", true);

          localStorage.setItem("uids", JSON.stringify(uids));
        }
      }
    }
  }

  createNewName(currentData, namefile) {
    let self = this;
    let length = currentData.length;
    let count = 2;
    if (localStorage.getItem("registerSameName-" + namefile) !== null) {
      count = localStorage.getItem("registerSameName-" + namefile);
      count++;
      localStorage.setItem("registerSameName-" + namefile, count);
    } else {
      localStorage.setItem("registerSameName-" + namefile, count);
    }
    let newNameFile =
      namefile +
      "(" +
      localStorage.getItem("registerSameName-" + namefile) +
      ")";
    for (let k = length; k > 0; k--) {
      self.MapView.graphics.items[
        self.MapView.graphics.items.length - k
      ].visible = false;
      self.MapView.graphics.items.splice(
        self.MapView.graphics.items.length - k,
        1
      );
    }
    return newNameFile;
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
    this.PushDataOnly = false;
    this.TempData = [];
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

  setPushDataOnly(status) {
    this.PushDataOnly = status;
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
    if (/\s/.test(this.NameFile)) {
      this.NameFile = this.NameFile.split(" ").join("_");
    }
    if (files && files.length === 1) {
      let file = files[0];
      if (file.name.indexOf(".csv") !== -1) {
        if (file.size < 5000000) {
          let storeDatabase = new Database(
            "localhost",
            "root",
            "",
            "user_data",
            self.MapView
          );
          let storeLocalStorage = new LocalStorage(
            this.MapView,
            new ConvertCSV(this.Map, this.MapView)
          );
          let reader = new FileReader();
          let poi = new POI(this.MapView);
          let confirmBox = new ConfirmBox(
            "",
            "Use Database",
            "Use Local Storage",
            "database",
            "localstorage",
            function() {
              console.log(
                JSON.parse(localStorage.getItem("currentDepartment"))
              );
              self.Storage = "database";
              if (
                JSON.parse(localStorage.getItem("namefile-" + self.Storage)) !==
                  null &&
                JSON.parse(
                  localStorage.getItem("namefile-" + self.Storage)
                ).includes(self.NameFile) &&
                JSON.parse(
                  localStorage.getItem("createdBy-" + self.Storage)
                ).includes(created_by)
              ) {
                let confirmBoxReplace = new ConfirmBox(
                  "Replace existing data?",
                  "Yes",
                  "No",
                  "yes",
                  "no",
                  function() {
                    console.log(self.Color);
                    reader.onload = function() {
                      console.log("Finished reading CSV data");
                      storeDatabase.replaceData(
                        self.TempData,
                        self.NameFile,
                        self.Storage,
                        self.CreatedBy,
                        reader.result,
                        self.Color
                      );
                    };
                    reader.readAsText(file);
                    self.PushDataOnly = false;
                    setTimeout(function() {
                      self.Color = null;
                    }, 100);
                  },
                  function() {
                    alert("Creating duplicate");
                  }
                );
                self.PushDataOnly = true;
                self.handleCSV(file);
                confirmBoxReplace.show();
              } else {
                storeLocalStorage.insert("storage", self.Storage);
                reader.onload = function() {
                  let color = JSON.stringify(self.getRandomColor());
                  console.log("Finished reading CSV data");
                  storeDatabase.insert(
                    self.NameFile + "_" + self.Storage + "_" + created_by,
                    reader.result,
                    color
                  );
                  self.Color = JSON.parse(color);
                };
                reader.readAsText(file);
                self.handleCSV(file);
              }
            },
            function() {
              self.Storage = "localstorage";
              if (
                JSON.parse(localStorage.getItem("namefile-" + self.Storage)) !==
                  null &&
                JSON.parse(
                  localStorage.getItem("namefile-" + self.Storage)
                ).includes(self.NameFile) &&
                JSON.parse(
                  localStorage.getItem("createdBy-" + self.Storage)
                ).includes(created_by)
              ) {
                let confirmBoxReplace = new ConfirmBox(
                  "Replace existing data?",
                  "Yes",
                  "No",
                  "yes",
                  "no",
                  function() {
                    storeLocalStorage.replaceData(
                      self.TempData,
                      self.NameFile,
                      self.Storage,
                      self.CreatedBy
                    );
                    self.PushDataOnly = false;
                    self.Color = null;
                  },
                  function() {
                    self.NameFile = storeLocalStorage.createNewName(
                      self.Data,
                      self.NameFile,
                      self.Storage,
                      self.CreatedBy
                    );
                    self.PushDataOnly = false;
                    self.Color = null;
                    self.handleCSV(file);
                  }
                );
                self.PushDataOnly = true;
                self.handleCSV(file);
                confirmBoxReplace.show();
              } else {
                alert("Added to localStorage");
                storeLocalStorage.insert("storage", self.Storage);
                self.handleCSV(file);
              }
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

    let reader = new FileReader();
    reader.onload = function() {
      console.log("Finished reading CSV data");
      self.processCSVData(reader.result);
    };
    reader.readAsText(file);
  }

  getRandomColor() {
    let color = [];
    for (let i = 0; i < 3; i++) {
      color.push(Math.floor(Math.random() * 255 + 1));
    }
    return color;
  }

  processCSVData(data, rendered, val, alias) {
    console.log(data);
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
          self.buildInfoTemplate(popupInfo, alias)
        );
        let latField, longField;
        let fieldNames = csvStore.getAttributes(items[0]);
        console.log(fieldNames);
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
          self.PushDataOnly = false;
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

        if (self.PushDataOnly == true) {
          let parent = document.getElementsByClassName(
            "user-poi-" + self.Storage + "-" + self.CreatedBy
          );
          let label = $(parent)
            .children()
            .children("label");
          let value = null;
          let index = null;
          for (let i = 0; i < label.length; i++) {
            if ($(label[i]).text() == self.NameFile) {
              value = $(parent)
                .children()
                .children("input[type='checkbox']")[i];
              index = value.getAttribute("value");
            }
          }
          color = JSON.parse(localStorage.getItem("color"))[index];
        }

        self.Data = [];
        self.Uids = [];
        self.Color = color;

        // Add records in this CSV store as graphics
        arrayUtils.forEach(items, function(item, index) {
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

          if (rendered == "custom") {
            markerSymbol = {
              type: "picture-marker", // autocasts as new PictureMarkerSymbol()
              url: "assets/images/icons/OB-red.png",
              width: "20px",
              height: "20px"
            };
            point = val[index];
          }

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

        if (self.PushDataOnly == true) {
          self.TempData = self.Data;
        }

        console.log(self.PushDataOnly);
        console.log(mapView.graphics.items);

        if ((!rendered || rendered == false) && self.PushDataOnly == false) {
          storeToLocalStorage.insert("data", self.Data);
          storeTreeview.addTreeview(
            self.Storage,
            self.NameFile,
            storeToLocalStorage.getLengthData("data"),
            self.CreatedBy
          );
          storeToLocalStorage.insert("namefile-" + self.Storage, self.NameFile);
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

  createDefaultLabel(label, alias) {
    let arrLabel = Object.keys(alias);
    if (arrLabel.includes(label) == true) {
      let index = arrLabel.indexOf(label);
      let value = arrLabel[index];
      label = alias[value];
    }
    return label;
  }

  createCustomLabel(label, alias) {}

  buildInfoTemplate(popupInfo, alias) {
    let self = this;
    function checkImage(url) {
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }
    let imageUrl = popupInfo.fieldInfos[17].fieldName;

    console.log(popupInfo.fieldInfos);
    console.log(alias);

    let json = {
      content:
        "<img src={" +
        imageUrl +
        "} width='293' height='200'><table class='esri-widget__table'>"
    };

    json.title = popupInfo.title;

    arrayUtils.forEach(popupInfo.fieldInfos, function(field) {
      if (field.label == "photo") {
        field.visible = false;
      }
      if (field.visible) {
        json.content +=
          "<tr><th class='esri-feature__field-header'>" +
          self.createDefaultLabel(field.label, alias) +
          " </th><td class='esri-feature__field-data'>{" +
          field.fieldName +
          "}</td></tr>";
      }
    });
    json.content += "</table>";
    return json;
  }

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
    let data = JSON.parse(localStorage.getItem("data"));
    let inData = [];
    for (let i in data) {
      if (data[i] !== null) {
        inData.push(data[i]);
      }
    }
    if (inData.length < 1) {
      localStorage.clear();
    }
    let newTreeview = localStorage.getItem("treeview");
    if (newTreeview !== null) {
      $("#tree-viewer").replaceWith(newTreeview);
    }
  }

  addTreeview(storage, nameFile, length, createdBy) {
    console.log("creating treeview");
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

      let i = document.createElement("i");
      i.style.marginTop = "-5px";
      i.setAttribute("class", "mi-play-arrow rotate i-tree");

      let input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.setAttribute("name", "master-select-all-poi");
      input.setAttribute("class", "master-select-all-poi");

      let label = document.createElement("label");
      label.setAttribute("for", "master-select-all-poi");
      label.setAttribute("class", "label-user");

      let ul = document.createElement("ul");
      ul.setAttribute("class", "user-poi");

      li.appendChild(i);
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

      let i_sub = document.createElement("i");
      i_sub.style.marginTop = "-5px";
      i_sub.setAttribute("class", "mi-play-arrow rotate i-tree");

      let input_sub = document.createElement("INPUT");
      input_sub.setAttribute("type", "checkbox");
      input_sub.setAttribute("class", "poi");

      let label_sub = document.createElement("LABEL");
      label_sub.setAttribute("for", "poi");
      label_sub.setAttribute("class", "poi");

      let update = document.createElement("A");
      update.setAttribute("href", "#");
      update.setAttribute(
        "class",
        "update-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      update.setAttribute("name", "update-user-poi");
      update.setAttribute("data-toggle", "modal");
      update.setAttribute("data-target", "#modal_form_edit_poi");
      update.innerHTML = "update";
      update.style.marginLeft = "5px";
      update.style.marginRight = "5px";

      let del = document.createElement("A");
      del.setAttribute("href", "#");
      del.setAttribute(
        "class",
        "delete-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      del.setAttribute("name", "delete-user-poi");
      del.innerHTML = "delete";
      del.style.marginLeft = "5px";
      del.style.marginRight = "5px";
      del.style.color = "red";

      li_sub.appendChild(i_sub);
      li_sub.appendChild(input_sub);
      li_sub.appendChild(label_sub);
      li_sub.appendChild(update);
      li_sub.appendChild(del);

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
      ).attr("name", "pois");
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
      console.log(JSON.parse(localStorage.getItem("selected")));
      console.log(self.Treeview);
      localStorage.setItem("treeview", self.Treeview);
    }

    function createSubPOI(storage) {
      let li_sub = document.createElement("LI");
      li_sub.setAttribute("class", "li-user-poi");

      let i_sub = document.createElement("i");
      i_sub.style.marginTop = "-5px";
      i_sub.setAttribute("class", "mi-play-arrow rotate i-tree");

      let input_sub = document.createElement("INPUT");
      input_sub.setAttribute("type", "checkbox");
      input_sub.setAttribute("class", "poi");

      let label_sub = document.createElement("LABEL");
      label_sub.setAttribute("for", "poi");
      label_sub.setAttribute("class", "poi");

      let update = document.createElement("A");
      update.setAttribute("href", "#");
      update.setAttribute(
        "class",
        "update-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      update.setAttribute("name", "update-user-poi");
      update.setAttribute("data-toggle", "modal");
      update.setAttribute("data-target", "#modal_form_edit_poi");
      update.innerHTML = "update";
      update.style.marginLeft = "5px";
      update.style.marginRight = "5px";

      let del = document.createElement("A");
      del.setAttribute("href", "#");
      del.setAttribute(
        "class",
        "delete-user-poi-" + storage + "-" + createdBy + "-" + length
      );
      del.setAttribute("name", "delete-user-poi");
      del.innerHTML = "delete";
      del.style.marginLeft = "5px";
      del.style.marginRight = "5px";
      del.style.color = "red";

      li_sub.appendChild(i_sub);
      li_sub.appendChild(input_sub);
      li_sub.appendChild(label_sub);
      li_sub.appendChild(update);
      li_sub.appendChild(del);

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
      ).attr("name", "pois");
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
      console.log(JSON.parse(localStorage.getItem("selected")));
      console.log(self.Treeview);
      localStorage.setItem("treeview", self.Treeview);
    }
  }

  simpleFilterData() {
    let self = this;
    let selectText = $(".select-filters");
    let inputText = $(".input-filter");
    let key = [];
    let val = [];
    let query = "";

    if (selectText) {
      for (let i = 0; i < selectText.length; i++) {
        if ($(selectText[i]).val() !== null) {
          console.log(
            $(selectText[i])
              .parents("tr")
              .attr("value")
          );
          console.log($(selectText[i]).val());
          key.push(
            $(selectText[i])
              .parents("tr")
              .attr("value")
          );
          val.push($(selectText[i]).val());
        }
      }
    }

    if (inputText) {
      for (let i = 0; i < inputText.length; i++) {
        if ($(inputText[i]).val()) {
          console.log(
            $(inputText[i])
              .parents("tr")
              .attr("value")
          );
          console.log($(inputText[i]).val());
          key.push(
            $(inputText[i])
              .parents("tr")
              .attr("value")
          );
          val.push($(inputText[i]).val());
        }
      }
    }

    for (let i in key) {
      query +=
        'data[i][j].attributes["' +
        key[i] +
        '"] ' +
        "==" +
        ' "' +
        val[i] +
        '" && ';
    }

    query = query.substring(0, query.length - 3);
    console.log(query);

    console.log(JSON.parse(localStorage.getItem("data")));
    console.log(JSON.parse(localStorage.getItem("uids")));
    let data = JSON.parse(localStorage.getItem("data"));
    let dataFilter = [];
    let isFiltered = true;
    for (let i in data) {
      for (let j in data[i]) {
        if (eval(query)) {
          $("input[name='pois'][value='" + i + "']").prop("checked", true);
          dataFilter.push(data[i][j].attributes);
          getFilteredData(i, j, isFiltered);
          isFiltered = false;
        }
      }
    }

    createTable();

    function getFilteredData(i, j, isFiltered) {
      let convertData = new LocalStorage(self.MapView);
      if (isFiltered == true) {
        for (let i in self.MapView.graphics.items) {
          self.MapView.graphics.items[i].visible = false;
          self.MapView.graphics.items = [];
        }
      }
      $(".custom-data-master-select-all-poi")
        .find("input:checkbox")
        .prop("checked", false);
      let data = JSON.parse(localStorage.getItem("data"));
      self.Method.setPushDataOnly(true);
      self.Method.processCSVData(
        convertData.getRowofTextArray([data[i][j].attributes])
      );
      self.Method.setPushDataOnly(false);
      self.MapView.graphics.add(self.Method.TempData);

      let dataFilter = JSON.parse(localStorage.getItem("dataFilter"));
      if (dataFilter == undefined) {
        dataFilter = [];
        dataFilter.push(self.Method.TempData);
      } else {
        dataFilter.push(self.Method.TempData);
      }

      localStorage.setItem("dataFilter", JSON.stringify(dataFilter));
      console.log(JSON.parse(localStorage.getItem("dataFilter")));

      let uidsFilter = JSON.parse(localStorage.getItem("uidsFilter"));
      if (uidsFilter == undefined) {
        uidsFilter = [];
        uidsFilter.push(self.Method.Uids);
      } else {
        uidsFilter.push(self.Method.Uids);
      }

      localStorage.setItem("uidsFilter", JSON.stringify(uidsFilter));
      console.log(JSON.parse(localStorage.getItem("uidsFilter")));
      // createFilteredViewer();
    }

    function createTable() {
      let data = JSON.parse(localStorage.getItem("dataFilter"));
      let table = document.getElementsByClassName("table-filter")[0];
      // table.removeChild()
      let trKey = document.createElement("TR");
      for (let k in data[0][0].attributes) {
        let thKey = document.createElement("TH");
        thKey.innerHTML = k;
        trKey.appendChild(thKey);
      }
      table.appendChild(trKey);

      for (let i in data) {
        let tr = document.createElement("TR");
        for (let j in data[i][0].attributes) {
          let tdVal = document.createElement("TD");
          tdVal.innerHTML = data[i][0].attributes[j];
          tr.appendChild(tdVal);
        }
        table.appendChild(tr);
      }
    }
  }

  //On developing
  filterData() {
    let self = this;
    let inputText = $(".card-filter").find("input:text");
    let operator = $("#operatorFilterData").val();
    let val = [];
    let query = "";
    for (let i = 0; i < inputText.length; i++) {
      let operatorArea = $(inputText[i])
        .parents("tr")
        .find("select")
        .val();
      if (operatorArea == undefined) {
        operatorArea = "==";
      }
      if (
        $(inputText[i])
          .parents("tr")
          .find("input:checkbox")
          .prop("checked") &&
        $(inputText[i]).val() !== ""
      ) {
        console.log(
          $(inputText[i]).attr("name") + " : " + $(inputText[i]).val()
        );
        val.push(
          'data[i][j].attributes["' +
            $(inputText[i]).attr("name") +
            '"] ' +
            operatorArea +
            ' "' +
            $(inputText[i]).val() +
            '"'
        );
      }
    }

    for (let i = 0; i < val.length; i++) {
      if (i > 0) {
        query += " " + operator + " ";
      }
      query += val[i];
    }

    console.log(query);
    console.log(operator);
    console.log(JSON.parse(localStorage.getItem("data")));
    console.log(JSON.parse(localStorage.getItem("uids")));
    let data = JSON.parse(localStorage.getItem("data"));
    let dataFilter = [];
    let isFiltered = true;
    for (let i in data) {
      for (let j in data[i]) {
        if (eval(query)) {
          $("input[name='pois'][value='" + i + "']").prop("checked", true);
          dataFilter.push(data[i][j].attributes);
          getFilteredData(i, j, isFiltered);
          isFiltered = false;
        }
      }
    }

    $(".modal").modal("hide");

    function getFilteredData(i, j, isFiltered) {
      let convertData = new LocalStorage(self.MapView);
      if (isFiltered == true) {
        for (let i in self.MapView.graphics.items) {
          self.MapView.graphics.items[i].visible = false;
          self.MapView.graphics.items = [];
        }
      }
      $(".custom-data-master-select-all-poi")
        .find("input:checkbox")
        .prop("checked", false);
      let data = JSON.parse(localStorage.getItem("data"));
      self.Method.setPushDataOnly(true);
      self.Method.processCSVData(
        convertData.getRowofTextArray([data[i][j].attributes])
      );
      self.Method.setPushDataOnly(false);
      self.MapView.graphics.add(self.Method.TempData);

      let dataFilter = JSON.parse(localStorage.getItem("dataFilter"));
      if (dataFilter == undefined) {
        dataFilter = [];
        dataFilter.push(self.Method.TempData);
      } else {
        dataFilter.push(self.Method.TempData);
      }

      localStorage.setItem("dataFilter", JSON.stringify(dataFilter));
      console.log(JSON.parse(localStorage.getItem("dataFilter")));

      let uidsFilter = JSON.parse(localStorage.getItem("uidsFilter"));
      if (uidsFilter == undefined) {
        uidsFilter = [];
        uidsFilter.push(self.Method.Uids);
      } else {
        uidsFilter.push(self.Method.Uids);
      }

      localStorage.setItem("uidsFilter", JSON.stringify(uidsFilter));
      console.log(JSON.parse(localStorage.getItem("uidsFilter")));

      // createFilteredViewer();
    }

    function createFilteredViewer() {
      let length = JSON.parse(localStorage.getItem("dataFilter")).length;
      console.log($(".filter-master"));
      if ($(".filter-master").length < 1) {
        let li = document.createElement("LI");
        li.setAttribute("class", "tree-filtered-data");
        li.style.marginLeft = "20px";

        let createMasterCheckBox = document.createElement("INPUT");
        createMasterCheckBox.setAttribute("type", "checkbox");
        createMasterCheckBox.setAttribute("class", "filter-master");

        let labelMasterCheckBox = document.createElement("LABEL");
        labelMasterCheckBox.setAttribute("for", "filter-master");
        $(labelMasterCheckBox).text("Filtered_Data");

        let ul = document.createElement("UL");
        ul.setAttribute("id", "filtered-data");

        let liData = document.createElement("LI");
        liData.setAttribute("class", "filter-master-user" + length);

        let input = document.createElement("INPUT");
        input.setAttribute("type", "checkbox");
        input.setAttribute("class", "filter-" + length);
        input.setAttribute("name", "filter-" + length);
        $(input).prop("checked", true);
        $(input).val(length - 1);

        let label = document.createElement("LABEL");
        label.setAttribute("class", "label-filter-" + length);
        label.setAttribute("for", "filter-" + length);
        $(label).text(" filter-" + length);

        liData.appendChild(input);
        liData.appendChild(label);
        ul.appendChild(liData);
        li.appendChild(createMasterCheckBox);
        li.appendChild(labelMasterCheckBox);
        li.appendChild(ul);
        $(".treeview").append(li);
      }
    }
  }

  selectItem() {
    let self = this;
    //All checkbox action, apply here
    $(document).ready(function() {
      $(document).delegate("input:checkbox", "click", function() {
        if ($(this).prop("checked") == true) {
          let className = $(this).attr("class");
          if ($(this).siblings("a").length < 1) {
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
            } else if (
              $(this).attr("class") ==
              "colliers-custom-data-master-select-all-poi"
            ) {
              $(this)
                .siblings("ul")
                .children()
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
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
                .children()
                .children()
                .children("input[type='checkbox']");
              for (let i = 0; i < getClasses.length; i++) {
                setAllItem(getClasses[i].getAttribute("class"));
              }
            } else {
              $(this)
                .siblings("ul")
                .find("input[type='checkbox']")
                .prop("checked", this.checked);
              setAllItem(className);
            }
          } else {
            setItem(className);
          }
        } else if ($(this).prop("checked") == false) {
          let className = $(this).attr("class");
          if ($(this).siblings("a").length < 1) {
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

    $(document).delegate("#filterData", "click", function() {
      self.filterData();
    });

    $(document).delegate(".filter-property", "click", function() {
      if ($(this).prop("checked") == true) {
        $(this)
          .parents("tr")
          .find("input:text")
          .prop("disabled", false);
        $(this)
          .parents("tr")
          .find("select")
          .prop("disabled", false);
      } else if ($(this).prop("checked") == false) {
        $(this)
          .parents("tr")
          .find("input:text")
          .prop("disabled", true);
        $(this)
          .parents("tr")
          .find("select")
          .prop("disabled", true);
      }
    });

    let constructor = this;
    //delete item
    let x = dom.byId("dragdrop-modal");
    let infocsv = $("#info-csv");
    $(document).delegate("a[name='delete-user-poi']", "click", function() {
      let self = this;
      let confirmBox = new ConfirmBox(
        "Delete this item?",
        "Yes",
        "No",
        "yes",
        "no",
        function() {
          let val = $(self)
            .siblings("input")
            .val();
          let tableCreatedBy = $(self)
            .parent()
            .parent()
            .attr("class");
          tableCreatedBy = tableCreatedBy.substr(tableCreatedBy.length - 1);
          let color = JSON.parse(localStorage.getItem("color"));
          let storage = getSecondPart(
            $(self)
              .siblings("label")
              .attr("class")
          );
          let className = $(self)
            .siblings("input")
            .attr("class");
          let createdBy = JSON.parse(
            localStorage.getItem("createdBy-" + storage)
          );
          let data = JSON.parse(localStorage.getItem("data"));
          let namefile = JSON.parse(
            localStorage.getItem("namefile-" + storage)
          );
          let text = $(self)
            .siblings("label")
            .text();
          let indexNameFile = namefile.indexOf(text);
          let uids = JSON.parse(localStorage.getItem("uids"));
          let selected = JSON.parse(localStorage.getItem("selected"));

          if (
            $(self)
              .siblings("input")
              .prop("checked") == true
          ) {
            unsetItem(className);
          }

          delete uids[val];
          delete selected[val];
          delete color[val];
          delete namefile[indexNameFile];
          delete data[val];
          localStorage.setItem("color", JSON.stringify(color));
          localStorage.setItem(
            "createdBy-" + storage,
            JSON.stringify(createdBy)
          );
          localStorage.setItem("data", JSON.stringify(data));
          localStorage.setItem("namefile-" + storage, JSON.stringify(namefile));
          console.log(JSON.parse(localStorage.getItem("color")));
          console.log(JSON.parse(localStorage.getItem("createdBy-" + storage)));
          console.log(JSON.parse(localStorage.getItem("data")));
          console.log(JSON.parse(localStorage.getItem("namefile-" + storage)));
          console.log(JSON.parse(localStorage.getItem("uids")));
          console.log(JSON.parse(localStorage.getItem("selected")));

          if (
            $(self)
              .parent()
              .parent()
              .children().length < 2
          ) {
            $(self)
              .parents(".treeview-user")
              .remove();
            let index = createdBy.indexOf(tableCreatedBy);
            createdBy.splice(index, 1);
            localStorage.setItem(
              "createdBy-" + storage,
              JSON.stringify(createdBy)
            );
            constructor.Treeview = document.getElementById(
              "tree-viewer"
            ).outerHTML;
            localStorage.setItem("treeview", constructor.Treeview);
          } else {
            $(self)
              .parent()
              .remove();
            constructor.Treeview = document.getElementById(
              "tree-viewer"
            ).outerHTML;
            localStorage.setItem("treeview", constructor.Treeview);
          }

          let tableName = text + "_" + storage + "_" + tableCreatedBy;
          $.ajax({
            url: "content/delete_table.php",
            method: "POST",
            data: {
              tableName: tableName
            },
            success: function(data) {
              alert("Table deleted : " + data);
            }
          });
        },
        function() {
          alert("cancel deleting");
        }
      );
      x.style.display = "block";
      infocsv.hide();
      confirmBox.show();
    });

    $(document).delegate("a[name='update-user-poi']", "click", function() {
      if (
        $(this)
          .siblings("input")
          .prop("checked") == false
      ) {
        $(this)
          .siblings("input")
          .prop("checked", true);
        setItem(
          $(this)
            .siblings("input")
            .attr("class")
        );
      }
      let index = $(this)
        .siblings("input")
        .val();
      let selectedData = JSON.parse(localStorage.getItem("data"))[index];
      let length = Object.keys(selectedData[0].attributes).length;
      let val = $(this)
        .siblings("input")
        .val();
      let tableCreatedBy = $(this)
        .parent()
        .parent()
        .attr("class");
      tableCreatedBy = tableCreatedBy.substr(tableCreatedBy.length - 1);
      let color = JSON.parse(localStorage.getItem("color"));
      let storage = getSecondPart(
        $(this)
          .siblings("label")
          .attr("class")
      );
      let namefile = JSON.parse(localStorage.getItem("namefile-" + storage));
      let text = $(this)
        .siblings("label")
        .text();
      let indexNameFile = namefile.indexOf(text);

      for (let i in selectedData) {
        //Create Button Tab
        let card = document.getElementsByClassName("card-edit")[0];
        let divEdit = document.getElementsByClassName("tab-edit")[0];

        let button = document.createElement("BUTTON");
        button.setAttribute("class", "tablinks");
        button.innerHTML = i;
        button.onclick = () => {
          openData(event, "data-" + i);
        };

        divEdit.appendChild(button);

        let div = document.createElement("DIV");
        div.setAttribute("id", "data-" + i);
        div.setAttribute("class", "tabcontent");
        let table = document.createElement("TABLE");
        table.style.marginTop = "20px";
        table.setAttribute("id", "table-data");
        table.style.marginLeft = "145px";
        let buttonSubmit = document.createElement("BUTTON");
        buttonSubmit.setAttribute("type", "button");
        buttonSubmit.setAttribute("class", "update-data btn btn-primary");
        buttonSubmit.innerHTML = "Submit";
        buttonSubmit.style.marginBottom = "50px";
        buttonSubmit.style.marginLeft = "220px";

        for (let j in selectedData[i].attributes) {
          let tr = document.createElement("TR");
          tr.style.margin = "20px";
          tr.style.border = "none";
          let tdKey = document.createElement("TD");
          tdKey.style.border = "none";
          let tdInput = document.createElement("TD");
          tdInput.style.border = "none";
          let input = document.createElement("INPUT");

          tdKey.innerHTML = j;
          input.setAttribute("type", "text");
          input.value = selectedData[i].attributes[j];
          tdInput.appendChild(input);
          tr.appendChild(tdKey);
          tr.appendChild(tdInput);
          table.appendChild(tr);
        }

        div.appendChild(table);
        div.appendChild(buttonSubmit);
        card.appendChild(div);
      }

      $(".close").click(function() {
        $(".card-edit").empty();
        $(".tab-edit").empty();
      });

      $(".update-data").click(function() {
        let convertData = new LocalStorage(self.MapView);
        let database = new Database(
          "localhost",
          "root",
          "",
          "user_data",
          self.MapView
        );
        let getData = [];
        let totalInput = $(".card-edit").find("input");
        let data = {};
        for (let i = 0; i < totalInput.length; i++) {
          if ((i + 1) % length == 0) {
            data[
              $(totalInput[i])
                .parent()
                .siblings()
                .text()
            ] = $(totalInput[i]).val();
            i = i + 1;
            getData.push(data);
            data = {};
          }
          data[
            $(totalInput[i])
              .parent()
              .siblings()
              .text()
          ] = $(totalInput[i]).val();
        }

        self.Method.setPushDataOnly(true);
        self.Method.processCSVData(convertData.getRowofTextArray(getData));
        if (storage == "database") {
          database.replaceData(
            self.Method.TempData,
            namefile[indexNameFile],
            storage,
            tableCreatedBy,
            convertData.getRowofTextArray(getData),
            color[val]
          );
          self.Method.setPushDataOnly(false);
          console.log(JSON.parse(localStorage.getItem("data")));
        }
        // console.log(getData);
        else if (storage == "localstorage") {
          convertData.replaceData(
            self.Method.TempData,
            namefile[indexNameFile],
            storage,
            tableCreatedBy
          );
        }
        $(".card-edit").empty();
        $(".tab-edit").empty();
        $(".modal").modal("hide");
        // $(".modal-backdrop").hide();
      });

      function openData(evt, index) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(index).style.display = "block";
        evt.currentTarget.className += " active";
      }
    });

    function getSecondPart(str) {
      return str.split("-")[1];
    }

    function setAllItem(className) {
      let data = undefined;
      let uids = undefined;
      if (className.includes("filter")) {
        data = JSON.parse(localStorage.getItem("dataFilter"));
        console.log(data);
        uids = JSON.parse(localStorage.getItem("uidsFilter"));
      } else {
        data = JSON.parse(localStorage.getItem("data"));
        console.log(data);
        uids = JSON.parse(localStorage.getItem("uids"));
      }
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

      if (className.includes("filter")) {
        localStorage.setItem("uidsFilter", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uidsFilter")));
      } else {
        localStorage.setItem("uids", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uids")));
      }
    }

    function unsetAllItem(className) {
      let uids = undefined;
      if (className.includes("filter")) {
        uids = JSON.parse(localStorage.getItem("uidsFilter"));
      } else {
        uids = JSON.parse(localStorage.getItem("uids"));
      }
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
        if (className.includes("filter")) {
          localStorage.setItem("uidsFilter", JSON.stringify(uids));
          console.log(JSON.parse(localStorage.getItem("uidsFilter")));
        } else {
          localStorage.setItem("uids", JSON.stringify(uids));
          console.log(JSON.parse(localStorage.getItem("uids")));
        }
      }
      if (className.includes("filter")) {
        localStorage.setItem("uidsFilter", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uidsFilter")));
      } else {
        localStorage.setItem("uids", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uids")));
      }
    }

    function setItem(className) {
      let storeLocalStorage = new LocalStorage(self.MapView);
      let selected = JSON.parse(localStorage.getItem("selected"));
      let data = undefined;
      let uids = undefined;
      if (className.includes("filter")) {
        data = JSON.parse(localStorage.getItem("dataFilter"));
        uids = JSON.parse(localStorage.getItem("uidsFilter"));
      } else {
        data = JSON.parse(localStorage.getItem("data"));
        uids = JSON.parse(localStorage.getItem("uids"));
      }
      let dataRaw = [];
      let dataAdd = [];
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
      console.log(self.MapView.graphics.items);
      console.log(length);

      uids[val] = [];
      for (let i in dataAdd) {
        uids[val].push(dataAdd[i].uid);
      }

      if (className.includes("filter")) {
        localStorage.setItem("uidsFilter", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uidsFilter")));
      } else {
        localStorage.setItem("uids", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uids")));
      }
      console.log(self.MapView.graphics.items);
    }

    function unsetItem(className) {
      let selected = JSON.parse(localStorage.getItem("selected"));
      let uids = undefined;
      if (className.includes("filter")) {
        uids = JSON.parse(localStorage.getItem("uidsFilter"));
      } else {
        uids = JSON.parse(localStorage.getItem("uids"));
      }
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
      if (className.includes("filter")) {
        localStorage.setItem("uidsFilter", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uidsFilter")));
      } else {
        localStorage.setItem("uids", JSON.stringify(uids));
        console.log(JSON.parse(localStorage.getItem("uids")));
      }
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
