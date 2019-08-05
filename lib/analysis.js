export class BufferPOI {
  constructor(map, layerId, poiName) {
    this.Map = map;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/"+layerId
    );
    this.POIName = poiName
  }

  setGeometryBuffer(latitude, longitude){
    this.Latitude = latitude;
    this.Longitude = longitude;
    let circle = new ESRI.Circle({
      center: [this.Longitude, this.Latitude],
      geodesic: true,
      radius: this.Distance,
      radiusUnit: this.Unit
    });
    this.Geometry = circle
  }

  setGeometryDriving(geometry) {
    this.Geometry = geometry
  }

  setTitle(title) {
    this.Title = title
  }
  
  render(callback) {
    const self = this
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer);
    graphicsLayer.title = this.Title;

    let query = new ESRI.Query();
    query.geometry = this.Geometry;
    query.returnGeometry = true;
    query.outFields = ["*"];
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: feature.layer.renderer.symbol,
          popupTemplate: {
            title: self.POIName,
            content: "<table class='esri-widget__table'><tr><th class='esri-feature__field-header'>St Name</th><td class='esri-feature__field-data'>{ST_NAME}</td></tr><tr><th class='esri-feature__field-header'>Ph Number</th><td class='esri-feature__field-data'>{PH_NUMBER}</td></tr><tr><th class='esri-feature__field-header'>Poi St Num</th><td class='esri-feature__field-data'>{POI_ST_NUM}</td></tr><tr><th class='esri-feature__field-header'>Poi Nmtype</th><td class='esri-feature__field-data'>{POI_NMTYPE}</td></tr><tr><th class='esri-feature__field-header'>Act Postal</th><td class='esri-feature__field-data'>{ACT_POSTAL}</td></tr></table>"
          }
        });
        graphicsLayer.add(g);
      });
      callback()
    });
  }

  setDistanceAndUnit(distance,unit){
    this.Distance = distance
    this.Unit = unit
  }
}

export class BufferProperty {
  constructor(map, layerId, poiName) {
    this.Map = map;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/FeatureServer/"+layerId
    );
    this.POIName = poiName
  }

  setGeometryBuffer(latitude, longitude){
    this.Latitude = latitude;
    this.Longitude = longitude;
    let circle = new ESRI.Circle({
      center: [this.Longitude, this.Latitude],
      geodesic: true,
      radius: this.Distance,
      radiusUnit: this.Unit
    });
    this.Geometry = circle
  }

  setGeometryDriving(geometry) {
    this.Geometry = geometry
  }

  setTitle(title) {
    this.Title = title
  }
  
  render(callback) {
    const self = this
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer);
    graphicsLayer.title = this.Title;
    
    let query = new ESRI.Query();
    query.geometry = this.Geometry;
    query.returnGeometry = true;
    query.outFields = ["*"];

    let markerSymbol = {
      type: "picture-marker",
      url: "assets/images/icons/icons8-building-40.png",
      width: "20px",
      height: "20px"
    };
    
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      results.features.forEach(function(feature){
        let myDateP = new Date(feature.attributes.r_k_time_period*1000);
        let myEpochProperty = myDateP.toGMTString();
        let myDateL = new Date(feature.attributes.r_k_l_time_period*1000);
        let myEpochLand = myDateL.toGMTString();
        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: markerSymbol,
          popupTemplate: {
            title: self.POIName,
            content: "<div class='esri-feature__media esri-feature__content-element'><div class='esri-feature__media-container'><div class='esri-feature__media-item-container'><div class='esri-feature__media-item'><img alt='{buildingname}' src='{photo}'></div></div></div></div><table class='esri-widget__table'><tr><th class='esri-feature__field-header'>Building Name</th><td class='esri-feature__field-data'>{buildingname}</td></tr><tr><th class='esri-feature__field-header'>Tenant</th><td class='esri-feature__field-data'>{tenant}</td></tr><tr><th class='esri-feature__field-header'>Property Type</th><td class='esri-feature__field-data'>{propertytype}</td></tr><tr><th class='esri-feature__field-header'>Market Scheme</th><td class='esri-feature__field-data'>{marketscheme}</td></tr><tr><th class='esri-feature__field-header'>Transaction Type</th><td class='esri-feature__field-data'>{transactiontype}</td></tr><tr><th class='esri-feature__field-header'>Floor</th><td class='esri-feature__field-data'>{floor}</td></tr><tr><th class='esri-feature__field-header'>Address</th><td class='esri-feature__field-data'>{address}</td></tr><tr><th class='esri-feature__field-header'>Property Square Meter</th><td class='esri-feature__field-data'>{r_k_p_sqm} m<sup>2</sup></td></tr><tr><th class='esri-feature__field-header'>Land Square Meter</th><td class='esri-feature__field-data'>{r_k_l_sqm} m<sup>2</sup></td></tr><tr><th class='esri-feature__field-header'>Property Availability</th><td class='esri-feature__field-data'>{r_k_property_availability}</td></tr><tr><th class='esri-feature__field-header'>Property Time Period</th><td class='esri-feature__field-data'>"+myEpochProperty+"</td></tr><tr><th class='esri-feature__field-header'>Land Time Period</th><td class='esri-feature__field-data'>"+myEpochLand+"</td></tr></table>"
          }
        });
        graphicsLayer.add(g);
      });
      callback()
    });
  }

  setDistanceAndUnit(distance,unit){
    this.Distance = distance
    this.Unit = unit
  }
}

export class BatasAdministrasi {
  constructor(map,title) {
    this.Map = map;
    this.Title = title;
  }

  render(results) {
    let graphicslayers = this.Map.layers.items
    this.GraphicLayer = graphicslayers.find(o => o.title === this.Title)
    this.Results = results;
    const self = this
    let content
    let fields = this.Results.fields.filter(function(el) {
      return (
        el.alias === "provinsi" ||
        el.alias === "kab_kota" ||
        el.alias === "kecamatan" ||
        el.alias === "desa" ||
        el.alias === "kepadatan" ||
        el.alias === "populasi" ||
        el.alias === "jml_kk" ||
        el.alias === "populasi" ||
        el.alias === "pop_lk" ||
        el.alias === "pop_pr" ||
        el.alias === "ses_up" ||
        el.alias === "ses_mid" ||
        el.alias === "ses_low" ||
        el.alias === "food_1" ||
        el.alias === "food_2" ||
        el.alias === "food_3" ||
        el.alias === "food_4" ||
        el.alias === "food_5" ||
        el.alias === "jml_bangun" ||
        el.alias === "nfood_1" ||
        el.alias === "nfood_2" ||
        el.alias === "nfood_3" ||
        el.alias === "nfood_4" ||
        el.alias === "nfood_5" ||
        el.alias === "expend_1" ||
        el.alias === "expend_2" ||
        el.alias === "expend_3" ||
        el.alias === "expend_4" ||
        el.alias === "expend_5" ||
        el.alias === "u00_04" ||
        el.alias === "u05_09" ||
        el.alias === "u10_14" ||
        el.alias === "u15_19" ||
        el.alias === "u20_24" ||
        el.alias === "u25_29" ||
        el.alias === "u30_34" ||
        el.alias === "u35_39" ||
        el.alias === "u40_44" ||
        el.alias === "u45_49" ||
        el.alias === "u50_54" ||
        el.alias === "u55_59" ||
        el.alias === "u60_64" ||
        el.alias === "u65_69" ||
        el.alias === "u70_74" ||
        el.alias === "u75_79" ||
        el.alias === "u80_84" ||
        el.alias === "u85_89" ||
        el.alias === "u90_94" ||
        el.alias === "u95up" ||
        el.alias === "ses_a" ||
        el.alias === "ses_b" ||
        el.alias === "ses_c" ||
        el.alias === "ses_d" ||
        el.alias === "ses_e"
      );
    });

    fields.forEach(function(field) {
      if (field.alias === "provinsi") {
        field.name = "Provinsi";
        field.order = 'aa';
      }
      else if (field.alias === "kab_kota") {
        field.name = "Kab/Kota";
        field.order = 'ab';
      }
      else if (field.alias === "kecamatan") {
        field.name = "Kecamatan";
        field.order = 'ac';
      }
      else if (field.alias === "desa") {
        field.name = "Desa";
        field.order = 'ad';
      }
      else if (field.alias === "kepadatan") {
        field.name = "Density";
        field.order = 'ae';
      }
      else if (field.alias === "populasi") {
        field.name = "Population";
        field.order = 'af';
      }
      else if (field.alias === "jml_kk") {
        field.name = "Household";
        field.order = 'ag';
      }
      else if (field.alias === "pop_lk") {
        field.name = "Male";
        field.order = 'ah';
      }
      else if (field.alias === "pop_pr") {
        field.name = "Female";
        field.order = 'ai';
      }
      else if (field.alias === "ses_up") {
        field.name = "SES Upper";
        field.order = 'aja';
      }
      else if (field.alias === "ses_mid") {
        field.name = "SES Middle";
        field.order = 'ajb';
      }
      else if (field.alias === "ses_low") {
        field.name = "SES Lower";
        field.order = 'ak';
      }
      else if (field.alias === "food_1") {
        field.name = "Food 1";
        field.order = 'al';
      }
      else if (field.alias === "food_2") {
        field.name = "Food 2";
        field.order = 'am';
      }
      else if (field.alias === "food_3") {
        field.name = "Food 3";
        field.order = 'an';
      }
      else if (field.alias === "food_4") {
        field.name = "Food 4";
        field.order = 'ao';
      }
      else if (field.alias === "food_5") {
        field.name = "Food 5";
        field.order = 'ap';
      }
      else if (field.alias === "jml_bangun") {
        field.name = "Total Building";
        field.order = 'aq';
      }
      else if (field.alias === "nfood_1") {
        field.name = "Non Food 1";
        field.order = 'ar';
      }
      else if (field.alias === "nfood_2") {
        field.name = "Non Food 2";
        field.order = 'as';
      }
      else if (field.alias === "nfood_3") {
        field.name = "Non Food 3";
        field.order = 'at';
      }
      else if (field.alias === "nfood_4") {
        field.name = "Non Food 4";
        field.order = 'au';
      }
      else if (field.alias === "nfood_5") {
        field.name = "Non Food 5";
        field.order = 'av';
      }
      else if (field.alias === "expend_1") {
        field.name = "Expend 1";
        field.order = 'aw';
      }
      else if (field.alias === "expend_2") {
        field.name = "Expend 2";
        field.order = 'ax';
      }
      else if (field.alias === "expend_3") {
        field.name = "Expend 3";
        field.order = 'ay';
      }
      else if (field.alias === "expend_4") {
        field.name = "Expend 4";
        field.order = 'az';
      }
      else if (field.alias === "expend_5") {
        field.name = "Expend 5";
        field.order = 'ba';
      }
      else if (field.alias === "u00_04") {
        field.name = "Age 0 - 4";
        field.order = 'bb';
      }
      else if (field.alias === "u05_09") {
        field.name = "Age 5 - 9";
        field.order = 'bc';
      }
      else if (field.alias === "u10_14") {
        field.name = "Age 10 - 14";
        field.order = 'bd';
      }
      else if (field.alias === "u15_19") {
        field.name = "Age 15 - 19";
        field.order = 'be';
      }
      else if (field.alias === "u20_24") {
        field.name = "Age 20 - 24";
        field.order = 'bf';
      }
      else if (field.alias === "u25_29") {
        field.name = "Age 25 - 29";
        field.order = 'bg';
      }
      else if (field.alias === "u30_34") {
        field.name = "Age 30 - 34";
        field.order = 'bh';
      }
      else if (field.alias === "u35_39") {
        field.name = "Age 35 - 39";
        field.order = 'bi';
      }
      else if (field.alias === "u40_44") {
        field.name = "Age 40 - 44";
        field.order = 'bj';
      }
      else if (field.alias === "u45_49") {
        field.name = "Age 45 - 49";
        field.order = 'bk';
      }
      else if (field.alias === "u50_54") {
        field.name = "Age 50 - 54";
        field.order = 'bl';
      }
      else if (field.alias === "u55_59") {
        field.name = "Age 55 - 59";
        field.order = 'bm';
      }
      else if (field.alias === "u60_64") {
        field.name = "Age 60 - 64";
        field.order = 'bn';
      }
      else if (field.alias === "u65_69") {
        field.name = "Age 65 - 69";
        field.order = 'bo';
      }
      else if (field.alias === "u70_74") {
        field.name = "Age 70 - 74";
        field.order = 'bp';
      }
      else if (field.alias === "u75_79") {
        field.name = "Age 75 - 79";
        field.order = 'bq';
      }
      else if (field.alias === "u80_84") {
        field.name = "Age 80 - 84";
        field.order = 'br';
      }
      else if (field.alias === "u85_89") {
        field.name = "Age 85 - 89";
        field.order = 'bs';
      }
      else if (field.alias === "u90_94") {
        field.name = "Age 90 - 94";
        field.order = 'bta';
      }
      else if (field.alias === "u95up") {
        field.name = "Age > 95";
        field.order = 'btb';
      }
      else if (field.alias === "ses_a") {
        field.name = "SES A";
        field.order = 'bu';
      }
      else if (field.alias === "ses_b") {
        field.name = "SES B";
        field.order = 'bv';
      } 
      else if (field.alias === "ses_c") {
        field.name = "SES C";
        field.order = 'bw';
      }
      else if (field.alias === "ses_d") {
        field.name = "SES D";
        field.order = 'by';
      }
      else if (field.alias === "ses_e") {
        field.name = "SES E";
        field.order = 'bz';
      }
    });

    fields.sort((a, b) => (a.order > b.order ? 1 : -1));
    content = "<table class='esri-widget__table'>"
    arrayUtils.forEach(fields, function(field) {
      content +=
        "<tr><th class='esri-feature__field-header'>" +
        field.name +
        "</th><td class='esri-feature__field-data'>{" +
        field.alias +
        "}</td></tr>";
    });
    content += "</table>";

    let symbol = {
      type: "simple-fill",
      color: [218, 221, 236, 0.8],
      style: "solid",
      outline: {
        color: [121, 120, 117, 0.8],
        width: 0.8
      }
    };

    this.Results.features.forEach(function(feature){
      feature.attributes.populasi = feature.attributes.populasi
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.populasi = feature.attributes.populasi+" Ppl"

      feature.attributes.jml_kk = feature.attributes.jml_kk
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.jml_kk = feature.attributes.jml_kk+" Ppl"

      feature.attributes.kepadatan = feature.attributes.kepadatan
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.kepadatan = feature.attributes.kepadatan+" Ppl/km2"

      feature.attributes.pop_lk = feature.attributes.pop_lk
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.pop_lk = feature.attributes.pop_lk+" Ppl"

      feature.attributes.pop_pr = feature.attributes.pop_pr
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.pop_pr = feature.attributes.pop_pr+" Ppl"

      feature.attributes.ses_up = feature.attributes.ses_up.toFixed(0)+" %"
      feature.attributes.ses_mid = feature.attributes.ses_mid.toFixed(0)+" %"
      feature.attributes.ses_low = feature.attributes.ses_low.toFixed(0)+" %"
      feature.attributes.ses_a = feature.attributes.ses_a.toFixed(0)+" %"
      feature.attributes.ses_b = feature.attributes.ses_b.toFixed(0)+" %"
      feature.attributes.ses_c = feature.attributes.ses_c.toFixed(0)+" %"
      feature.attributes.ses_d = feature.attributes.ses_d.toFixed(0)+" %"
      feature.attributes.ses_e = feature.attributes.ses_e.toFixed(0)+" %"

      feature.attributes.food_1 = feature.attributes.food_1+" Hh"
      feature.attributes.food_2 = feature.attributes.food_2+" Hh"
      feature.attributes.food_3 = feature.attributes.food_3+" Hh"
      feature.attributes.food_4 = feature.attributes.food_4+" Hh"
      feature.attributes.food_5 = feature.attributes.food_5+" Hh"
      feature.attributes.nfood_1 = feature.attributes.nfood_1+" Hh"
      feature.attributes.nfood_2 = feature.attributes.nfood_2+" Hh"
      feature.attributes.nfood_3 = feature.attributes.nfood_3+" Hh"
      feature.attributes.nfood_4 = feature.attributes.nfood_4+" Hh"
      feature.attributes.nfood_5 = feature.attributes.nfood_5+" Hh"
      feature.attributes.expend_1 = feature.attributes.expend_1+" Hh"
      feature.attributes.expend_2 = feature.attributes.expend_2+" Hh"
      feature.attributes.expend_3 = feature.attributes.expend_3+" Hh"
      feature.attributes.expend_4 = feature.attributes.expend_4+" Hh"
      feature.attributes.expend_5 = feature.attributes.expend_5+" Hh"
      
      feature.attributes.jml_bangun = feature.attributes.jml_bangun
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.jml_bangun = feature.attributes.jml_bangun+" Unit"

      feature.attributes.u00_04 = feature.attributes.u00_04
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u00_04 = feature.attributes.u00_04+" People"
      feature.attributes.u05_09 = feature.attributes.u05_09
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u05_09 = feature.attributes.u05_09+" People"
      feature.attributes.u10_14 = feature.attributes.u10_14
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u10_14 = feature.attributes.u10_14+" People"
      feature.attributes.u15_19 = feature.attributes.u15_19
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u15_19 = feature.attributes.u15_19+" People"
      feature.attributes.u20_24 = feature.attributes.u20_24
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u20_24 = feature.attributes.u20_24+" People"
      feature.attributes.u25_29 = feature.attributes.u25_29
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u25_29 = feature.attributes.u25_29+" People"
      feature.attributes.u30_34 = feature.attributes.u30_34
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u30_34 = feature.attributes.u30_34+" People"
      feature.attributes.u35_39 = feature.attributes.u35_39
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u35_39 = feature.attributes.u35_39+" People"
      feature.attributes.u40_44 = feature.attributes.u40_44
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u40_44 = feature.attributes.u40_44+" People"
      feature.attributes.u45_49 = feature.attributes.u45_49
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u45_49 = feature.attributes.u45_49+" People"
      feature.attributes.u50_54 = feature.attributes.u50_54
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u50_54 = feature.attributes.u50_54+" People"
      feature.attributes.u55_59 = feature.attributes.u55_59
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u55_59 = feature.attributes.u55_59+" People"
      feature.attributes.u60_64 = feature.attributes.u60_64
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u60_64 = feature.attributes.u60_64+" People"
      feature.attributes.u65_69 = feature.attributes.u65_69
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u65_69 = feature.attributes.u65_69+" People"
      feature.attributes.u70_74 = feature.attributes.u70_74
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u70_74 = feature.attributes.u70_74+" People"
      feature.attributes.u75_79 = feature.attributes.u75_79
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u75_79 = feature.attributes.u75_79+" People"
      feature.attributes.u80_84 = feature.attributes.u80_84
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u80_84 = feature.attributes.u80_84+" People"
      feature.attributes.u85_89 = feature.attributes.u85_89
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u85_89 = feature.attributes.u85_89+" People"
      feature.attributes.u90_94 = feature.attributes.u90_94
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u90_94 = feature.attributes.u90_94+" People"
      feature.attributes.u95up = feature.attributes.u95up
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      feature.attributes.u95up = feature.attributes.u95up+" People"

      let g = new ESRI.Graphic({
        geometry: feature.geometry,
        attributes: feature.attributes,
        symbol: symbol,
        popupTemplate: {
          title: "{desa}",
          content: content
        }
      });
      self.GraphicLayer.add(g)
    });
  }
}