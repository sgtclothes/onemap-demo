export class POI {
    constructor(map, mapView, latitude, longitude, value) {
        this.Map = map;
        this.MapView = mapView;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.Radius = [];
        this.RadiusUnit = "";
        this.FeatureLayer = new ESRI.FeatureLayer(
          "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/"+value
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
    
        let circle = new ESRI.Circle({
          center: [this.Longitude, this.Latitude],
          geodesic: true,
          radius: radius,
          radiusUnit: this.RadiusUnit
        });
    
        let circleGraphic = new ESRI.Graphic({
          geometry: circle,
          symbol: circleSymb
        });
    
        let unitLength;
        const self = this;
        let query = new ESRI.Query();
        query.returnGeometry = true;
        query.geometry = circle;
        query.outFields = ["*"];
        this.FeatureLayer.queryFeatures(query).then(function(results) {
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
          let features = results.features;
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