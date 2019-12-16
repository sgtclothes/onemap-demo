export class LivePointing {
    constructor(map, mapView, latitude, longitude) {
        this.Map = map
        this.MapView = mapView;
        this.Latitude = latitude;
        this.Longitude = longitude;
        this.PosLatitude = null;
        this.PosLongitude = null;
        this.MarkerSymbol = null;
    }

    setPictureMarker() {
        let markerSymbol = {
            type: "picture-marker",
            url: "assets/images/icons/map-marker.png",
            width: "24px",
            height: "24px"
        };
        this.MarkerSymbol = markerSymbol;
    }

    setPointingPopupMarker() {
        let markerSymbol = {
            type: "simple-marker",
            style: "circle",
            size: "17px",
            outline: {
                color: "#6496e8",
                width: 3
            }
        };
        this.MarkerSymbol = markerSymbol;
    }

    render() {
        let point = new ESRI.Point({
            longitude: this.Longitude,
            latitude: this.Latitude
        });

        let id = this.Latitude.toString() + this.Longitude.toString();
        let pointGraphic = new ESRI.Graphic({
            geometry: point,
            symbol: this.MarkerSymbol,
            attributes: "livePointing",
            obj: {
                id: id
            }
        });
        let graphicsLayer = new ESRI.GraphicsLayer({
            id: "pointer"
        })
        graphicsLayer.add(pointGraphic)
        this.Map.add(graphicsLayer);
    }
}

export class DriveTime {
    constructor(map, point, params, url) {
        this.ObjMap = map;
        this.Point = point;
        this.Params = params;
        this.UrlGeoprocessor = url;
        this.Geometry = null;
        this.GraphicsLayer = null;
    }

    setUnit(unit) {
        if (unit == "kilometers") {
            this.Unit = "km";
        } else if (unit == "miles") {
            this.Unit = "mi";
        } else if (unit == "meters") {
            this.Unit = "m";
        } else {
            this.Unit = unit;
        }
    }

    run() {
        let fillSymbol = {
            type: "simple-fill",
            color: [150, 150, 150, 0.2],
            outline: {
                style: "long-dash",
                color: "#7a7c80",
                width: 2
            }
        };

        let result = undefined
        let gp = new ESRI.Geoprocessor(this.UrlGeoprocessor);
        gp.execute(this.Params).then(function (result) {
            let resultValue = result.results[0].value;
            let resultFeatures = resultValue.features;
            // Assign each resulting graphic a symbol
            let resultGraphics = resultFeatures.map(function (feature) {
                feature.symbol = fillSymbol;
                return feature;
            });
            result = resultGraphics
        });

        console.log(result)
    }
}

export class Catchment {
    constructor() {
        this.Params = "";
        this.Url = "";
        this.ID_DESA = null;
    }

    setParams(params, callback) {
        this.Params = params;
        callback();
    }

    setServiceUrl(url) {
        this.Url = url;
    }

    run(graphicsLayers, callback) {
        const self = this;
        let gp = new ESRI.Geoprocessor(this.Url);
        gp.execute(this.Params).then(catchResult);
        function catchResult(result) {
            let idDesa = [];
            result.results[0].value.features.forEach(function (feature) {
                idDesa.push(feature.attributes.ID_DESA);
            });
            self.ID_DESA = idDesa;

            let fields = result.results[0].value.fields.filter(function (el) {
                return (
                    el.alias === "POPULASI" ||
                    el.alias === "SES_A" ||
                    el.alias === "SES_B" ||
                    el.alias === "SES_C" ||
                    el.alias === "SES_D" ||
                    el.alias === "SES_E" ||
                    el.alias === "Jumlah Kepala Keluarga" ||
                    el.alias === "POP_LK" ||
                    el.alias === "POP_PR" ||
                    el.alias === "PROVINSI" ||
                    el.alias === "KABKOTA" ||
                    el.alias === "KECAMATAN" ||
                    el.alias === "DESA" ||
                    el.alias === "LUAS_KM2" ||
                    el.alias === "KEPADATAN"
                );
            });
            fields.forEach(function (field) {
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
                } else if (field.alias === "PROVINSI") {
                    field.name = "Number of State";
                    field.order = "ja";
                } else if (field.alias === "KABKOTA") {
                    field.name = "Number of City";
                    field.order = "jb";
                } else if (field.alias === "KECAMATAN") {
                    field.name = "Number of District";
                    field.order = "jc";
                } else if (field.alias === "DESA") {
                    field.name = "Number of Village";
                    field.order = "jd";
                } else if (field.alias === "LUAS_KM2") {
                    field.name = "Area";
                    field.order = "je";
                } else if (field.alias === "KEPADATAN") {
                    field.name = "Density";
                    field.order = "jf";
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
            let state = [];
            let city = [];
            let district = [];
            let village = [];
            let luas_km2 = 0;
            let kepadatan = 0;

            features.forEach(function (feature) {
                state.push(feature.attributes.PROVINSI);
                city.push(feature.attributes.KABKOTA);
                district.push(feature.attributes.KECAMATAN);
                village.push(feature.attributes.DESA);
                luas_km2 += feature.attributes.LUAS_KM2;
                kepadatan += feature.attributes.KEPADATAN;
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
            state = [...new Set(state)];
            let numState = state.length;
            city = [...new Set(city)];
            let numCity = city.length;
            district = [...new Set(district)];
            let numDistrict = district.length;
            village = [...new Set(village)];
            let numVillage = village.length;
            luas_km2 = luas_km2.toFixed(0);
            luas_km2 = luas_km2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            kepadatan = kepadatan
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

            let total = features.length;
            sesa = sesa / total;
            sesa = sesa.toFixed(0) + " %";
            sesb = sesb / total;
            sesb = sesb.toFixed(0) + " %";
            sesc = sesc / total;
            sesc = sesc.toFixed(0) + " %";
            sesd = sesd / total;
            sesd = sesd.toFixed(0) + " %";
            sese = sese / total;
            sese = sese.toFixed(0) + " %";

            graphicsLayers.attributes = {
                POPULASI: totalPopulasi + " Ppl",
                JML_KK: household + " Ppl",
                POP_LK: male + " Ppl",
                POP_PR: female + " Ppl",
                SES_A: sesa,
                SES_B: sesb,
                SES_C: sesc,
                SES_D: sesd,
                SES_E: sese,
                PROVINSI: numState,
                KABKOTA: numCity,
                KECAMATAN: numDistrict,
                DESA: numVillage,
                LUAS_KM2: luas_km2 + " km<sup>2</sup>",
                KEPADATAN: kepadatan + " Ppl/km<sup>2</sup>"
            };

            let popupContent = {
                content: "<table class='esri-widget__table'>"
            };
            fields.sort((a, b) => (a.order > b.order ? 1 : -1));
            arrayUtils.forEach(fields, function (field) {
                popupContent.content +=
                    "<tr><th class='esri-feature__field-header'>" +
                    field.name +
                    "</th><td class='esri-feature__field-data'>{" +
                    field.alias +
                    "}</td></tr>";
            });
            popupContent.content += "</table>";
            graphicsLayers.popupTemplate.content = popupContent.content;
            callback();
        }
    }
}