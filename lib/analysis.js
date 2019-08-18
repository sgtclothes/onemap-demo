export class BufferPOI {
  constructor(map, mapView, layerId, poiName) {
    this.Map = map;
    this.MapView = mapView;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/"+layerId
    );
    this.POIName = poiName
    this.graphicsLayer = null;
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
        self.graphicsLayer = graphicsLayer
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
      url: "assets/images/icons/OB-red.png",
      width: "15px",
      height: "15px"
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
  constructor(map,title,results) {
    this.Map = map;
    this.Title = title
    this.Results = results;
  }

  summaryAnalysis(){
    let luas_km2 = 0;
    let kepadatan = 0;
    let populasi = 0;
    let household = 0;
    let male = 0;
    let female = 0;
    let ses_up = 0;
    let ses_mid = 0;
    let ses_low = 0;
    let food_1 = 0;
    let food_2 = 0;
    let food_3 = 0;
    let food_4 = 0;
    let food_5 = 0;
    let jml_bangun = 0;
    let nfood_1 = 0;
    let nfood_2 = 0;
    let nfood_3 = 0;
    let nfood_4 = 0;
    let nfood_5 = 0;
    let expend_1 = 0;
    let expend_2 = 0;
    let expend_3 = 0;
    let expend_4 = 0;
    let expend_5 = 0;
    let u00_04 = 0;
    let u05_09 = 0;
    let u10_14 = 0;
    let u15_19 = 0;
    let u20_24 = 0;
    let u25_29 = 0;
    let u30_34 = 0;
    let u35_39 = 0;
    let u40_44 = 0;
    let u45_49 = 0;
    let u50_54 = 0;
    let u55_59 = 0;
    let u60_64 = 0;
    let u65_69 = 0;
    let u70_74 = 0;
    let u75_79 = 0;
    let u80_84 = 0;
    let u85_89 = 0;
    let u90_94 = 0;
    let u95up = 0
    let sesa = 0;
    let sesb = 0;
    let sesc = 0;
    let sesd = 0;
    let sese = 0;
    let state = []
    let city = []
    let district = []
    let village = []
    let total = this.Results.features.length

    this.Results.features.forEach(function(feature){
      state.push(feature.attributes.provinsi)
      city.push(feature.attributes.kab_kota)
      state.push(feature.attributes.provinsi)
      city.push(feature.attributes.kab_kota)
      district.push(feature.attributes.kecamatan)
      village.push(feature.attributes.desa)

      luas_km2 += feature.attributes.luas_km2;
      kepadatan += feature.attributes.kepadatan;
      populasi += feature.attributes.populasi;
      household += feature.attributes.jml_kk;
      male += feature.attributes.pop_lk;
      female += feature.attributes.pop_pr;
      ses_up += feature.attributes.ses_up;
      ses_mid += feature.attributes.ses_mid;
      ses_low += feature.attributes.ses_low;
      food_1 += feature.attributes.food_1;
      food_2 += feature.attributes.food_2;
      food_3 += feature.attributes.food_3;
      food_4 += feature.attributes.food_4;
      food_5 += feature.attributes.food_5;
      jml_bangun += feature.attributes.jml_bangun;
      nfood_1 += feature.attributes.nfood_1;
      nfood_2 += feature.attributes.nfood_2;
      nfood_3 += feature.attributes.nfood_3;
      nfood_4 += feature.attributes.nfood_4;
      nfood_5 += feature.attributes.nfood_5;
      u00_04 += feature.attributes.u00_04;
      u05_09 += feature.attributes.u05_09;
      u10_14 += feature.attributes.u10_14;
      u15_19 += feature.attributes.u15_19;
      u20_24 += feature.attributes.u20_24;
      u25_29 += feature.attributes.u25_29;
      u30_34 += feature.attributes.u30_34;
      u35_39 += feature.attributes.u35_39;
      u40_44 += feature.attributes.u40_44;
      u45_49 += feature.attributes.u45_49;
      u50_54 += feature.attributes.u50_54;
      u55_59 += feature.attributes.u55_59;
      u60_64 += feature.attributes.u60_64;
      u65_69 += feature.attributes.u65_69;
      u70_74 += feature.attributes.u70_74;
      u75_79 += feature.attributes.u75_79;
      u80_84 += feature.attributes.u80_84;
      u85_89 += feature.attributes.u85_89;
      u90_94 += feature.attributes.u90_94;
      u95up += feature.attributes.u95up;
      expend_1 += feature.attributes.expend_1;
      expend_2 += feature.attributes.expend_2;
      expend_3 += feature.attributes.expend_3;
      expend_4 += feature.attributes.expend_4;
      expend_5 += feature.attributes.expend_5;
      sesa += feature.attributes.ses_a;
      sesb += feature.attributes.ses_b;
      sesc += feature.attributes.ses_c;
      sesd += feature.attributes.ses_d;
      sese += feature.attributes.ses_e;
    })

    state = [...new Set(state)]
    let numState = state.length
    city = [...new Set(city)]
    let numCity = city.length
    district = [...new Set(district)]
    let numDistrict = district.length
    village = [...new Set(village)]
    let numVillage = village.length
    ses_up = ses_up/total
    ses_up = ses_up.toFixed(0)+" %"
    ses_mid = ses_mid/total
    ses_mid = ses_mid.toFixed(0)+" %"
    ses_low = ses_low/total
    ses_low = ses_low.toFixed(0)+" %"
    sesa = sesa/total
    sesa = sesa.toFixed(0)+" %"
    sesb = sesb/total
    sesb = sesb.toFixed(0)+" %"
    sesc = sesc/total
    sesc = sesc.toFixed(0)+" %"
    sesd = sesd/total
    sesd = sesd.toFixed(0)+" %"
    sese = sese/total
    sese = sese.toFixed(0)+" %"

    luas_km2 = luas_km2.toFixed(0)
    luas_km2 = this.formatString(luas_km2)
    kepadatan = this.formatString(kepadatan)
    populasi = this.formatString(populasi)
    household = this.formatString(household)
    male = this.formatString(male)
    female = this.formatString(female)
    food_1 = this.formatString(food_1)
    food_2 = this.formatString(food_2)
    food_3 = this.formatString(food_3)
    food_4 = this.formatString(food_4)
    food_5 =  this.formatString(food_5)
    jml_bangun =  this.formatString(jml_bangun)
    nfood_1 = this.formatString(nfood_1)
    nfood_2 = this.formatString(nfood_2)
    nfood_3 = this.formatString(nfood_3)
    nfood_4 = this.formatString(nfood_4)
    nfood_5 =  this.formatString(nfood_5)
    expend_1 = this.formatString(expend_1)
    expend_2 = this.formatString(expend_2)
    expend_3 = this.formatString(expend_3)
    expend_4 = this.formatString(expend_4)
    expend_5 =  this.formatString(expend_5)
    u00_04 = this.formatString(u00_04);
    u05_09 = this.formatString(u05_09);
    u10_14 = this.formatString(u10_14);
    u15_19 = this.formatString(u15_19);
    u20_24 = this.formatString(u20_24);
    u25_29 = this.formatString(u25_29);
    u30_34 = this.formatString(u30_34);
    u35_39 = this.formatString(u35_39);
    u40_44 = this.formatString(u40_44);
    u45_49 = this.formatString(u45_49);
    u50_54 = this.formatString(u50_54);
    u55_59 = this.formatString(u55_59);
    u60_64 = this.formatString(u60_64);
    u65_69 = this.formatString(u65_69);
    u70_74 = this.formatString(u70_74);
    u75_79 = this.formatString(u75_79);
    u80_84 = this.formatString(u80_84);
    u85_89 = this.formatString(u85_89);
    u90_94 = this.formatString(u90_94);
    u95up = this.formatString(u95up);

    this.summaryAnalysisArray = []
    this.summaryAnalysisArray.push(luas_km2)
    this.summaryAnalysisArray.push(kepadatan)
    this.summaryAnalysisArray.push(populasi)
    this.summaryAnalysisArray.push(household)
    this.summaryAnalysisArray.push(male)
    this.summaryAnalysisArray.push(female)
    this.summaryAnalysisArray.push(ses_up)
    this.summaryAnalysisArray.push(ses_mid)
    this.summaryAnalysisArray.push(ses_low)
    this.summaryAnalysisArray.push(food_1)
    this.summaryAnalysisArray.push(food_2)
    this.summaryAnalysisArray.push(food_3)
    this.summaryAnalysisArray.push(food_4)
    this.summaryAnalysisArray.push(food_5)
    this.summaryAnalysisArray.push(jml_bangun)
    this.summaryAnalysisArray.push(nfood_1)
    this.summaryAnalysisArray.push(nfood_2)
    this.summaryAnalysisArray.push(nfood_3)
    this.summaryAnalysisArray.push(nfood_4)
    this.summaryAnalysisArray.push(nfood_5)
    this.summaryAnalysisArray.push(expend_1)
    this.summaryAnalysisArray.push(expend_2)
    this.summaryAnalysisArray.push(expend_3)
    this.summaryAnalysisArray.push(expend_4)
    this.summaryAnalysisArray.push(expend_5)
    this.summaryAnalysisArray.push(u00_04)
    this.summaryAnalysisArray.push(u05_09)
    this.summaryAnalysisArray.push(u10_14)
    this.summaryAnalysisArray.push(u15_19)
    this.summaryAnalysisArray.push(u20_24)
    this.summaryAnalysisArray.push(u25_29)
    this.summaryAnalysisArray.push(u30_34)
    this.summaryAnalysisArray.push(u35_39)
    this.summaryAnalysisArray.push(u40_44)
    this.summaryAnalysisArray.push(u45_49)
    this.summaryAnalysisArray.push(u50_54)
    this.summaryAnalysisArray.push(u55_59)
    this.summaryAnalysisArray.push(u60_64)
    this.summaryAnalysisArray.push(u65_69)
    this.summaryAnalysisArray.push(u70_74)
    this.summaryAnalysisArray.push(u75_79)
    this.summaryAnalysisArray.push(u80_84)
    this.summaryAnalysisArray.push(u85_89)
    this.summaryAnalysisArray.push(u90_94)
    this.summaryAnalysisArray.push(u95up)
    this.summaryAnalysisArray.push(sesa)
    this.summaryAnalysisArray.push(sesb)
    this.summaryAnalysisArray.push(sesc)
    this.summaryAnalysisArray.push(sesd)
    this.summaryAnalysisArray.push(sese)
    this.summaryAnalysisArray.push(numState)
    this.summaryAnalysisArray.push(numCity)
    this.summaryAnalysisArray.push(numDistrict)
    this.summaryAnalysisArray.push(numVillage)
  }

  render() {
    const self = this
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.Map.add(graphicsLayer,0);
    graphicsLayer.title = this.Title+"BatasAdministrasi";
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
        field.name = "Age > 94";
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
      let attr = feature.attributes
      attr.populasi = self.formatString(attr.populasi)
      attr.populasi = attr.populasi+" Ppl"

      attr.jml_kk = self.formatString(attr.jml_kk)
      attr.jml_kk = attr.jml_kk+" Ppl"

      attr.kepadatan = self.formatString(attr.kepadatan)
      attr.kepadatan = attr.kepadatan+" Ppl/km<sup>2</sup>"

      attr.pop_lk = self.formatString(attr.pop_lk)
      attr.pop_lk = attr.pop_lk+" Ppl"

      attr.pop_pr = self.formatString(attr.pop_pr)
      attr.pop_pr = attr.pop_pr+" Ppl"

      attr.ses_up = attr.ses_up.toFixed(0)+" %"
      attr.ses_mid = attr.ses_mid.toFixed(0)+" %"
      attr.ses_low = attr.ses_low.toFixed(0)+" %"
      attr.ses_a = attr.ses_a.toFixed(0)+" %"
      attr.ses_b = attr.ses_b.toFixed(0)+" %"
      attr.ses_c = attr.ses_c.toFixed(0)+" %"
      attr.ses_d = attr.ses_d.toFixed(0)+" %"
      attr.ses_e = attr.ses_e.toFixed(0)+" %"

      attr.food_1 = attr.food_1+" Hh"
      attr.food_2 = attr.food_2+" Hh"
      attr.food_3 = attr.food_3+" Hh"
      attr.food_4 = attr.food_4+" Hh"
      attr.food_5 = attr.food_5+" Hh"
      attr.nfood_1 = attr.nfood_1+" Hh"
      attr.nfood_2 = attr.nfood_2+" Hh"
      attr.nfood_3 = attr.nfood_3+" Hh"
      attr.nfood_4 = attr.nfood_4+" Hh"
      attr.nfood_5 = attr.nfood_5+" Hh"
      attr.expend_1 = attr.expend_1+" Hh"
      attr.expend_2 = attr.expend_2+" Hh"
      attr.expend_3 = attr.expend_3+" Hh"
      attr.expend_4 = attr.expend_4+" Hh"
      attr.expend_5 = attr.expend_5+" Hh"

      attr.jml_bangun = self.formatString(attr.jml_bangun)
      attr.jml_bangun = attr.jml_bangun+" Unit"

      attr.u00_04 = self.formatString(attr.u00_04)
      attr.u00_04 = attr.u00_04+" People"
      attr.u05_09 = self.formatString(attr.u05_09)
      attr.u05_09 = attr.u05_09+" People"
      attr.u10_14 = self.formatString(attr.u10_14)
      attr.u10_14 = attr.u10_14+" People"
      attr.u15_19 = self.formatString(attr.u15_19)
      attr.u15_19 = attr.u15_19+" People"
      attr.u20_24 = self.formatString(attr.u20_24)
      attr.u20_24 = attr.u20_24+" People"
      attr.u25_29 = self.formatString(attr.u25_29)
      attr.u25_29 = attr.u25_29+" People"
      attr.u30_34 = self.formatString(attr.u30_34)
      attr.u30_34 = attr.u30_34+" People"
      attr.u35_39 = self.formatString(attr.u35_39)
      attr.u35_39 = attr.u35_39+" People"
      attr.u40_44 = self.formatString(attr.u40_44)
      attr.u40_44 = attr.u40_44+" People"
      attr.u45_49 = self.formatString(attr.u45_49)
      attr.u45_49 = attr.u45_49+" People"
      attr.u50_54 = self.formatString(attr.u50_54)
      attr.u50_54 = attr.u50_54+" People"
      attr.u55_59 = self.formatString(attr.u55_59)
      attr.u55_59 = attr.u55_59+" People"
      attr.u60_64 = self.formatString(attr.u60_64)
      attr.u60_64 = attr.u60_64+" People"
      attr.u65_69 = self.formatString(attr.u65_69)
      attr.u65_69 = attr.u65_69+" People"
      attr.u70_74 = self.formatString(attr.u70_74)
      attr.u70_74 = attr.u70_74+" People"
      attr.u75_79 = self.formatString(attr.u75_79)
      attr.u75_79 = attr.u75_79+" People"
      attr.u80_84 = self.formatString(attr.u80_84)
      attr.u80_84 = attr.u80_84+" People"
      attr.u85_89 = self.formatString(attr.u85_89)
      attr.u85_89 = attr.u85_89+" People"
      attr.u90_94 = self.formatString(attr.u90_94)
      attr.u90_94 = attr.u90_94+" People"
      attr.u95up = self.formatString(attr.u95up)
      attr.u95up = attr.u95up+" People"

      let g = new ESRI.Graphic({
        geometry: feature.geometry,
        attributes: attr,
        symbol: symbol,
        popupTemplate: {
          title: "{desa}",
          content: content
        }
      });
      graphicsLayer.visible = false
      graphicsLayer.add(g)
    });
  }

  formatString(field){
    let fields = field.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return fields
  }
}

export class BatasAdministrasiDriving {
  constructor(map,idDesa,title) {
    this.Map = map;
    this.IdDesa = idDesa
    this.Title = title;
    this.FeatureLayer = new ESRI.FeatureLayer(
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
    );
    this.summaryAnalysisArray = []
  }

  render(callback) {
    const self = this
    let graphicsLayer = new ESRI.GraphicsLayer();
    this.GraphicsLayer = graphicsLayer
    this.Map.add(this.GraphicsLayer,0);
    this.GraphicsLayer.title = this.Title+"BatasAdministrasi";

    let IdDesa = this.IdDesa
    let DesaID = []
    for (let i = 0; i < IdDesa.length; i++) { 
      let newIdDesa = "'"+IdDesa[i]+"'"
      DesaID.push(newIdDesa)
    }

    let symbol = {
      type: "simple-fill",
      color: [218, 221, 236, 0.8],
      style: "solid",
      outline: {
        color: [121, 120, 117, 0.8],
        width: 0.8
      }
    };

    let query = new ESRI.Query();
    query.where = "id_desa IN ("+DesaID.join(',')+")";
    query.outFields = ["provinsi","kab_kota","kecamatan","desa","kepadatan","populasi","jml_kk","pop_lk","pop_pr","ses_up","ses_mid","ses_low","food_1","food_2","food_3","food_4","food_5","jml_bangun","nfood_1","nfood_2","nfood_3","nfood_4","nfood_5","expend_1","expend_2","expend_3","expend_4","expend_5","u00_04","u05_09","u10_14","u15_19","u20_24","u25_29","u30_34","u35_39","u40_44","u45_49","u50_54","u55_59","u60_64","u65_69","u70_74","u75_79","u80_84","u85_89","u90_94","u95up","ses_a","ses_b","ses_c","ses_d","ses_e","luas_km2"];
    query.returnGeometry = true;
    this.FeatureLayer.queryFeatures(query).then(function(results) {
      let luas_km2 = 0;
      let kepadatan = 0;
      let populasi = 0;
      let household = 0;
      let male = 0;
      let female = 0;
      let ses_up = 0;
      let ses_mid = 0;
      let ses_low = 0;
      let food_1 = 0;
      let food_2 = 0;
      let food_3 = 0;
      let food_4 = 0;
      let food_5 = 0;
      let jml_bangun = 0;
      let nfood_1 = 0;
      let nfood_2 = 0;
      let nfood_3 = 0;
      let nfood_4 = 0;
      let nfood_5 = 0;
      let expend_1 = 0;
      let expend_2 = 0;
      let expend_3 = 0;
      let expend_4 = 0;
      let expend_5 = 0;
      let u00_04 = 0;
      let u05_09 = 0;
      let u10_14 = 0;
      let u15_19 = 0;
      let u20_24 = 0;
      let u25_29 = 0;
      let u30_34 = 0;
      let u35_39 = 0;
      let u40_44 = 0;
      let u45_49 = 0;
      let u50_54 = 0;
      let u55_59 = 0;
      let u60_64 = 0;
      let u65_69 = 0;
      let u70_74 = 0;
      let u75_79 = 0;
      let u80_84 = 0;
      let u85_89 = 0;
      let u90_94 = 0;
      let u95up = 0
      let sesa = 0;
      let sesb = 0;
      let sesc = 0;
      let sesd = 0;
      let sese = 0;
      let state = []
      let city = []
      let district = []
      let village = []

      let fields = results.fields
      let features = results.features;
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
          field.name = "Age > 94";
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
  
      let content
      fields.sort((a, b) => (a.order > b.order ? 1 : -1));
      content = "<table class='esri-widget__table'>"
      arrayUtils.forEach(fields, function(field) {
        if (field.alias !== "luas_km2") {
          content +=
          "<tr><th class='esri-feature__field-header'>" +
          field.name +
          "</th><td class='esri-feature__field-data'>{" +
          field.alias +
          "}</td></tr>"; 
        }
      });
      content += "</table>";

      let total = features.length
      features.forEach(function(feature) {
        let attr = feature.attributes
        state.push(attr.provinsi)
        city.push(attr.kab_kota)
        state.push(attr.provinsi)
        city.push(attr.kab_kota)
        district.push(attr.kecamatan)
        village.push(attr.desa)

        luas_km2 += attr.luas_km2;
        kepadatan += attr.kepadatan;
        populasi += attr.populasi;
        household += attr.jml_kk;
        male += attr.pop_lk;
        female += attr.pop_pr;
        ses_up += attr.ses_up;
        ses_mid += attr.ses_mid;
        ses_low += attr.ses_low;
        food_1 += attr.food_1;
        food_2 += attr.food_2;
        food_3 += attr.food_3;
        food_4 += attr.food_4;
        food_5 += attr.food_5;
        jml_bangun += attr.jml_bangun;
        nfood_1 += attr.nfood_1;
        nfood_2 += attr.nfood_2;
        nfood_3 += attr.nfood_3;
        nfood_4 += attr.nfood_4;
        nfood_5 += attr.nfood_5;
        u00_04 += attr.u00_04;
        u05_09 += attr.u05_09;
        u10_14 += attr.u10_14;
        u15_19 += attr.u15_19;
        u20_24 += attr.u20_24;
        u25_29 += attr.u25_29;
        u30_34 += attr.u30_34;
        u35_39 += attr.u35_39;
        u40_44 += attr.u40_44;
        u45_49 += attr.u45_49;
        u50_54 += attr.u50_54;
        u55_59 += attr.u55_59;
        u60_64 += attr.u60_64;
        u65_69 += attr.u65_69;
        u70_74 += attr.u70_74;
        u75_79 += attr.u75_79;
        u80_84 += attr.u80_84;
        u85_89 += attr.u85_89;
        u90_94 += attr.u90_94;
        u95up += attr.u95up;
        expend_1 += attr.expend_1;
        expend_2 += attr.expend_2;
        expend_3 += attr.expend_3;
        expend_4 += attr.expend_4;
        expend_5 += attr.expend_5;
        sesa += attr.ses_a;
        sesb += attr.ses_b;
        sesc += attr.ses_c;
        sesd += attr.ses_d;
        sese += attr.ses_e;

        attr.populasi = self.formatString(attr.populasi)
        attr.populasi = attr.populasi+" Ppl"

        attr.jml_kk = self.formatString(attr.jml_kk)
        attr.jml_kk = attr.jml_kk+" Ppl"

        attr.kepadatan = self.formatString(attr.kepadatan)
        attr.kepadatan = attr.kepadatan+" Ppl/km<sup>2</sup>"

        attr.pop_lk = self.formatString(attr.pop_lk)
        attr.pop_lk = attr.pop_lk+" Ppl"

        attr.pop_pr = self.formatString(attr.pop_pr)
        attr.pop_pr = attr.pop_pr+" Ppl"

        attr.ses_up = attr.ses_up.toFixed(0)+" %"
        attr.ses_mid = attr.ses_mid.toFixed(0)+" %"
        attr.ses_low = attr.ses_low.toFixed(0)+" %"
        attr.ses_a = attr.ses_a.toFixed(0)+" %"
        attr.ses_b = attr.ses_b.toFixed(0)+" %"
        attr.ses_c = attr.ses_c.toFixed(0)+" %"
        attr.ses_d = attr.ses_d.toFixed(0)+" %"
        attr.ses_e = attr.ses_e.toFixed(0)+" %"

        attr.food_1 = attr.food_1+" Hh"
        attr.food_2 = attr.food_2+" Hh"
        attr.food_3 = attr.food_3+" Hh"
        attr.food_4 = attr.food_4+" Hh"
        attr.food_5 = attr.food_5+" Hh"
        attr.nfood_1 = attr.nfood_1+" Hh"
        attr.nfood_2 = attr.nfood_2+" Hh"
        attr.nfood_3 = attr.nfood_3+" Hh"
        attr.nfood_4 = attr.nfood_4+" Hh"
        attr.nfood_5 = attr.nfood_5+" Hh"
        attr.expend_1 = attr.expend_1+" Hh"
        attr.expend_2 = attr.expend_2+" Hh"
        attr.expend_3 = attr.expend_3+" Hh"
        attr.expend_4 = attr.expend_4+" Hh"
        attr.expend_5 = attr.expend_5+" Hh"
        
        attr.jml_bangun = self.formatString(attr.jml_bangun)
        attr.jml_bangun = attr.jml_bangun+" Unit"

        attr.u00_04 = self.formatString(attr.u00_04)
        attr.u00_04 = attr.u00_04+" People"
        attr.u05_09 = self.formatString(attr.u05_09)
        attr.u05_09 = attr.u05_09+" People"
        attr.u10_14 = self.formatString(attr.u10_14)
        attr.u10_14 = attr.u10_14+" People"
        attr.u15_19 = self.formatString(attr.u15_19)
        attr.u15_19 = attr.u15_19+" People"
        attr.u20_24 = self.formatString(attr.u20_24)
        attr.u20_24 = attr.u20_24+" People"
        attr.u25_29 = self.formatString(attr.u25_29)
        attr.u25_29 = attr.u25_29+" People"
        attr.u30_34 = self.formatString(attr.u30_34)
        attr.u30_34 = attr.u30_34+" People"
        attr.u35_39 = self.formatString(attr.u35_39)
        attr.u35_39 = attr.u35_39+" People"
        attr.u40_44 = self.formatString(attr.u40_44)
        attr.u40_44 = attr.u40_44+" People"
        attr.u45_49 = self.formatString(attr.u45_49)
        attr.u45_49 = attr.u45_49+" People"
        attr.u50_54 = self.formatString(attr.u50_54)
        attr.u50_54 = attr.u50_54+" People"
        attr.u55_59 = self.formatString(attr.u55_59)
        attr.u55_59 = attr.u55_59+" People"
        attr.u60_64 = self.formatString(attr.u60_64)
        attr.u60_64 = attr.u60_64+" People"
        attr.u65_69 = self.formatString(attr.u65_69)
        attr.u65_69 = attr.u65_69+" People"
        attr.u70_74 = self.formatString(attr.u70_74)
        attr.u70_74 = attr.u70_74+" People"
        attr.u75_79 = self.formatString(attr.u75_79)
        attr.u75_79 = attr.u75_79+" People"
        attr.u80_84 = self.formatString(attr.u80_84)
        attr.u80_84 = attr.u80_84+" People"
        attr.u85_89 = self.formatString(attr.u85_89)
        attr.u85_89 = attr.u85_89+" People"
        attr.u90_94 = self.formatString(attr.u90_94)
        attr.u90_94 = attr.u90_94+" People"
        attr.u95up = self.formatString(attr.u95up)
        attr.u95up = attr.u95up+" People"

        let g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: attr,
          symbol: symbol,
          popupTemplate: {
            title: "{desa}",
            content: content
          }
        });
        self.GraphicsLayer.visible = false
        self.GraphicsLayer.add(g)
      })

      state = [...new Set(state)]
      let numState = state.length
      city = [...new Set(city)]
      let numCity = city.length
      district = [...new Set(district)]
      let numDistrict = district.length
      village = [...new Set(village)]
      let numVillage = village.length

      ses_up = ses_up/total
      ses_up = ses_up.toFixed(0)+" %"
      ses_mid = ses_mid/total
      ses_mid = ses_mid.toFixed(0)+" %"
      ses_low = ses_low/total
      ses_low = ses_low.toFixed(0)+" %"
      sesa = sesa/total
      sesa = sesa.toFixed(0)+" %"
      sesb = sesb/total
      sesb = sesb.toFixed(0)+" %"
      sesc = sesc/total
      sesc = sesc.toFixed(0)+" %"
      sesd = sesd/total
      sesd = sesd.toFixed(0)+" %"
      sese = sese/total
      sese = sese.toFixed(0)+" %"

      luas_km2 = luas_km2.toFixed(0)
      luas_km2 = self.formatString(luas_km2)
      kepadatan = self.formatString(kepadatan)
      populasi = self.formatString(populasi)
      household = self.formatString(household)
      male = self.formatString(male)
      female = self.formatString(female)
      food_1 = self.formatString(food_1)
      food_2 = self.formatString(food_2)
      food_3 = self.formatString(food_3)
      food_4 = self.formatString(food_4)
      food_5 =  self.formatString(food_5)
      jml_bangun =  self.formatString(jml_bangun)
      nfood_1 = self.formatString(nfood_1)
      nfood_2 = self.formatString(nfood_2)
      nfood_3 = self.formatString(nfood_3)
      nfood_4 = self.formatString(nfood_4)
      nfood_5 =  self.formatString(nfood_5)
      expend_1 = self.formatString(expend_1)
      expend_2 = self.formatString(expend_2)
      expend_3 = self.formatString(expend_3)
      expend_4 = self.formatString(expend_4)
      expend_5 =  self.formatString(expend_5)
      u00_04 = self.formatString(u00_04);
      u05_09 = self.formatString(u05_09);
      u10_14 = self.formatString(u10_14);
      u15_19 = self.formatString(u15_19);
      u20_24 = self.formatString(u20_24);
      u25_29 = self.formatString(u25_29);
      u30_34 = self.formatString(u30_34);
      u35_39 = self.formatString(u35_39);
      u40_44 = self.formatString(u40_44);
      u45_49 = self.formatString(u45_49);
      u50_54 = self.formatString(u50_54);
      u55_59 = self.formatString(u55_59);
      u60_64 = self.formatString(u60_64);
      u65_69 = self.formatString(u65_69);
      u70_74 = self.formatString(u70_74);
      u75_79 = self.formatString(u75_79);
      u80_84 = self.formatString(u80_84);
      u85_89 = self.formatString(u85_89);
      u90_94 = self.formatString(u90_94);
      u95up = self.formatString(u95up);

      self.summaryAnalysisArray.push(luas_km2)
      self.summaryAnalysisArray.push(kepadatan)
      self.summaryAnalysisArray.push(populasi)
      self.summaryAnalysisArray.push(household)
      self.summaryAnalysisArray.push(male)
      self.summaryAnalysisArray.push(female)
      self.summaryAnalysisArray.push(ses_up)
      self.summaryAnalysisArray.push(ses_mid)
      self.summaryAnalysisArray.push(ses_low)
      self.summaryAnalysisArray.push(food_1)
      self.summaryAnalysisArray.push(food_2)
      self.summaryAnalysisArray.push(food_3)
      self.summaryAnalysisArray.push(food_4)
      self.summaryAnalysisArray.push(food_5)
      self.summaryAnalysisArray.push(jml_bangun)
      self.summaryAnalysisArray.push(nfood_1)
      self.summaryAnalysisArray.push(nfood_2)
      self.summaryAnalysisArray.push(nfood_3)
      self.summaryAnalysisArray.push(nfood_4)
      self.summaryAnalysisArray.push(nfood_5)
      self.summaryAnalysisArray.push(expend_1)
      self.summaryAnalysisArray.push(expend_2)
      self.summaryAnalysisArray.push(expend_3)
      self.summaryAnalysisArray.push(expend_4)
      self.summaryAnalysisArray.push(expend_5)
      self.summaryAnalysisArray.push(u00_04)
      self.summaryAnalysisArray.push(u05_09)
      self.summaryAnalysisArray.push(u10_14)
      self.summaryAnalysisArray.push(u15_19)
      self.summaryAnalysisArray.push(u20_24)
      self.summaryAnalysisArray.push(u25_29)
      self.summaryAnalysisArray.push(u30_34)
      self.summaryAnalysisArray.push(u35_39)
      self.summaryAnalysisArray.push(u40_44)
      self.summaryAnalysisArray.push(u45_49)
      self.summaryAnalysisArray.push(u50_54)
      self.summaryAnalysisArray.push(u55_59)
      self.summaryAnalysisArray.push(u60_64)
      self.summaryAnalysisArray.push(u65_69)
      self.summaryAnalysisArray.push(u70_74)
      self.summaryAnalysisArray.push(u75_79)
      self.summaryAnalysisArray.push(u80_84)
      self.summaryAnalysisArray.push(u85_89)
      self.summaryAnalysisArray.push(u90_94)
      self.summaryAnalysisArray.push(u95up)
      self.summaryAnalysisArray.push(sesa)
      self.summaryAnalysisArray.push(sesb)
      self.summaryAnalysisArray.push(sesc)
      self.summaryAnalysisArray.push(sesd)
      self.summaryAnalysisArray.push(sese)
      self.summaryAnalysisArray.push(numState)
      self.summaryAnalysisArray.push(numCity)
      self.summaryAnalysisArray.push(numDistrict)
      self.summaryAnalysisArray.push(numVillage)

      callback()
    })
  }

  formatString(field){
    let fields = field.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return fields
  }
}