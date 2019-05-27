function boot(GIS) {
    let config = new GIS.Config();
    let map = new GIS.Map(config.CenterPoint);
    //Map Rendering
    map.render();
    let view = map.ObjMapView
    
    const less19 = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#fffcd4",
        style: "solid",
        outline: {
          width: 0.2,
          color: [255, 255, 255, 0.5]
        }
      };

      const less46 = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#b1cdc2",
        style: "solid",
        outline: {
          width: 0.2,
          color: [255, 255, 255, 0.5]
        }
      };

      const more47 = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#38627a",
        style: "solid",
        outline: {
          width: 0.2,
          color: [255, 255, 255, 0.5]
        }
      };

      const more128 = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#1b3f69",
        style: "solid",
        outline: {
          width: 0.2,
          color: [255, 255, 255, 0.5]
        }
      };

      const more264 = {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "#071b33",
        style: "solid",
        outline: {
          width: 0.2,
          color: [255, 255, 255, 0.5]
        }
      };

      const renderer = {
          type: "class-breaks", // autocasts as new ClassBreaksRenderer()
          field: "PDRB",
          normalizationField: null,
          classBreakInfos: [
            {
              minValue: 0,
              maxValue: 19429000,
              symbol: less19,
              label: "0 - 19,429,000"
            },
            {
              minValue: 19429000,
              maxValue: 46666000,
              symbol: less46,
              label: "19,429,001 - 46,666,000"
            },
            {
              minValue: 46666000,
              maxValue: 128517000,
              symbol: more47,
              label: "46,666,001 - 128,517,000"
            },
            {
              minValue: 128517000,
              maxValue: 264643000,
              symbol: more128,
              label: "128,517,001 - 264,643,000"
            },
            {
              minValue: 264643000,
              maxValue: 445321000,
              symbol: more264,
              label: "264,643,001 - 445,321,000"
            }
          ]
        };

    let layer = new GIS.Layer.FeatureLayer(map.ObjMap, renderer);
    layer.setUrl("http://tig.co.id/ags/rest/services/BPS/BPS_SES/MapServer/667")
    layer.render()

    let legend = new GIS.Map.Widgets.Legend(view, layer)
    legend.create()

    view.ui.add(legend.create(), config.Position[2])
}