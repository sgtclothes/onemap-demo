function ServiceLayerInfrastructure(GIS, map, config) {
  // Show & Hide POI from GIS Services
  let layerServiceArr = JSON.parse(layerDataArr);

  function setLayerInfos(layer) {
    let layerInfo = arrayUtils.map(layer, function(item) {
      for (let j = 0; j < layerServiceArr.length; j++) {
        if (item.layerId == layerServiceArr[j].id) {
          return {
            layer: item,
            title: layerServiceArr[j].name
          };
        }
      }
    });
    return layerInfo;
  }

  function distinct(layerInfo) {
    let layerInfos = [];
    const map_layer = new Map();
    for (const item of layerInfo) {
      if (!map_layer.has(item.title)) {
        map_layer.set(item.title, true);
        layerInfos.push({
          layer: item.layer,
          title: item.title
        });
      }
    }
    return layerInfos;
  }

  function renderInfrastructure(idform) {
    let form = idform.querySelectorAll('input[type="checkbox"]');
    let layerArr = [];
    let i;
    for (i = 0; i < form.length; i++) {
      if (form[i].checked) {
        layerArr.push(
          new GIS.Layer.ServiceLayer(
            map.ObjMap,
            "http://tig.co.id/ags/rest/services/BPS/BPS_SES/MapServer/" +
              form[i].value
          )
        );
      }
    }
    return layerArr;
  }

  function setStyleLegendClass() {
    setTimeout(function() {
      let legendClass = document.getElementsByClassName(
        "esri-legend--stacked"
      )[0];
      legendClass.setAttribute(
        "style",
        "background: rgba(255,255,255,0.7); height:130px; overflow-y:hidden"
      );
      legendClass.setAttribute("id", "legendId");
    }, 800);
  }

  function renderLegend(layerInfos) {
    let legend = new GIS.Map.Widgets.Legend(map.ObjMapView, layerInfos);
    legend.setStyle("card", "side-by-side");
    map.ObjMapView.ui.add(legend.create(), config.Position[2]);
    window.legend = legend;
    return window.legend;
  }

  function getAllInfrastructure(id, form) {
    document.getElementById(id).addEventListener("change", function() {
      if (this.checked) {
        let layer = map.ObjMap.layers.items;
        if (Object.keys(layer).length > 0) {
          for (let key in layer) {
            map.ObjMap.remove(layer[key]);
          }
        }
        let idform = document.getElementById(form);
        let layerArr = renderInfrastructure(idform);
        for (let k = 0; k < layerArr.length; k++) {
          layerArr[k].render();
        }
        let layerInfo = setLayerInfos(layer);
        let layerInfos = distinct(layerInfo);
        if (
          document.getElementsByClassName("esri-legend--stacked")[0] ===
          undefined
        ) {
          renderLegend(layerInfos);
          setStyleLegendClass();
        } else {
          legend.LayerInfos.length = 0;
          for (let l = 0; l < layerInfos.length; l++) {
            legend.LayerInfos.push(layerInfos[l]);
          }
          legend.create();
        }
      } else {
        let layer = map.ObjMap.layers.items;
        let i;
        let idform = document.getElementById(form);
        let poiForm = idform.querySelectorAll('input[type="checkbox"]');
        for (i = 0; i < poiForm.length; i++) {
          if (poiForm[i].checked == false) {
            for (let key in layer) {
              map.ObjMap.remove(layer[key]);
            }
          }
        }
        document.getElementById("legendId").remove();
      }
    });
  }

  function getPerInfrastructure(id, form) {
    document.getElementById(id).addEventListener("change", function() {
      if (this.checked) {
        let idform = document.getElementById(form);
        let layerArr = renderInfrastructure(idform);
        for (let k = 0; k < layerArr.length; k++) {
          layerArr[k].render();
        }
        let layer = map.ObjMap.layers.items;
        let layerInfo = setLayerInfos(layer);
        let layerInfos = distinct(layerInfo);
        if (
          document.getElementsByClassName("esri-legend--stacked")[0] ===
          undefined
        ) {
          renderLegend(layerInfos);
          setStyleLegendClass();
        } else {
          let currentIndex = parseInt(layerInfos.length - 1);
          legend.LayerInfos.push(layerInfos[currentIndex]);
          legend.create();
        }
      } else {
        let layer = map.ObjMap.layers.items;
        let i;
        let idform = document.getElementById(form);
        let poiForm = idform.querySelectorAll('input[type="checkbox"]');
        for (i = 0; i < poiForm.length; i++) {
          if (poiForm[i].checked == false) {
            for (let key in layer) {
              if (poiForm[i].value == layer[key].layerId) {
                map.ObjMap.remove(layer[key]);
              }
            }
          }
        }
        if (Object.keys(layer).length === 0) {
          document.getElementById("legendId").remove();
        }
      }
    });
  }

  getAllInfrastructure("tall-2", "all-infrastructure");
  getPerInfrastructure("tall-2-1", "all-infrastructure");
  getPerInfrastructure("tall-2-2", "all-infrastructure");
  // End Of Show & Hide POI from GIS Services
}
