function inputCheckboxServices(GIS, map) {
  let poi = $(".checkbox-poi");
  let masterSubPOI = $(".checkbox-master-sub-poi");
  let infrastructure = $(".checkbox-infrastructure");
  let demographic = $(".checkbox-demographic");
  let subPOI = $(".checkbox-sub-poi");
  let subInfrasctructure = $(".checkbox-sub-infrastructure");
  let subDemographic = $(".checkbox-sub-demographic");
  let graphicsLayer = new ESRI.GraphicsLayer({
    id: "poi-"
  })

  function makeTableLegend(titleText, className) {
    let divLegend = document.createElement("DIV");
    divLegend.setAttribute("class", "div-legend " + className);
    divLegend.style.backgroundColor = "white";
    let title = document.createElement("P");
    title.setAttribute("class", "title-legend");
    title.innerHTML = titleText;
    let tableLegend = document.createElement("TABLE");
    tableLegend.setAttribute("class", "table-legend table-" + className);
    divLegend.appendChild(title);
    divLegend.appendChild(tableLegend);
    return divLegend;
  }

  $(poi).click(function () {
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let tableLegend = undefined;
    if (document.getElementsByClassName("div-poi")[0] == undefined) {
      tableLegend = makeTableLegend("LIST OF POI", "div-poi");
    } else {
      tableLegend = document.getElementsByClassName("div-poi")[0];
      for (let i = 0; i < subPOI.length; i++) {
        if ($(subPOI[i]).prop("checked") == true) {
          $(document.getElementsByClassName("div-poi")[0]).remove();
          tableLegend = makeTableLegend("LIST OF POI", "div-poi");
        }
      }
    }
    let itemLayer = $(".checkbox-sub-poi")
      .parents("td")
      .siblings("td");
    renderLegendPoint(tableLegend, JSON.parse(localStorage.getItem("dataPOI")));
    if ($(this).prop("checked") == true) {
      //Check if graphicslayer is larger than 0 to make query
      let checkGraphic = 0;
      for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        for (let j = 0; j < map.ObjMap.layers.items[i].graphics.items.length; j++) {
          if (map.ObjMap.layers.items[i].graphics.items.length > 0) {
            checkGraphic = 1;
          }
        }
      }
      console.log(checkGraphic)
      if (checkGraphic == 1) {
        $("#loading-bar").show();
        if (map.ObjMap.layers.items.length > 0) {
          for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
            if ("graphics" in map.ObjMap.layers.items[i]) {
              if (map.ObjMap.layers.items[i].graphics.items.length > 0) {
                for (let j = 0; j < map.ObjMap.layers.items[i].graphics.items.length; j++) {
                  let graphicsLayer = new ESRI.GraphicsLayer();
                  map.ObjMap.add(graphicsLayer)
                  let query = new ESRI.Query();
                  query.returnGeometry = true;
                  query.outFields = ["*"];
                  query.outSpatialReference = map.ObjMap.spatialReference;
                  query.geometry = map.ObjMap.layers.items[i].graphics.items[j].geometry
                  for (let k = 0; k < subPOI.length; k++) {
                    let property = new ESRI.FeatureLayer({
                      url:
                        url + $(subPOI[k]).val()
                    });
                    property.queryFeatures(query).then(function (results) {
                      if (results.features.length < 1) {
                        $("#loading-bar").hide();
                      } else {
                        results.features.forEach(function (feature) {
                          let g = new ESRI.Graphic({
                            geometry: feature.geometry,
                            attributes: feature.attributes,
                            symbol: feature.layer.renderer.symbol,
                          });
                          graphicsLayer.add(g);
                        });
                      }
                    });
                  }
                }
                console.log(JSON.parse(localStorage.getItem("dataPOI")))
              }
            }
          }
        }
      }
    }
    //   $(masterSubPOI).prop("checked", true);
    //   //Show item to do overlapping
    //   for (let i = 0; i < itemLayer.length; i++) {
    //     $(itemLayer[i]).show();
    //     $(itemLayer[i]).css("height", "24px");
    //     $(itemLayer[i]).css("float", "right");
    //   }
    //   //Show all POI
    //   let checked = JSON.parse(localStorage.getItem("checkedPOI"));
    //   if (checked !== null) {
    //     checked = JSON.parse(localStorage.getItem("checkedPOI"));
    //   } else {
    //     checked = [];
    //   }
    //   for (let i = 0; i < subPOI.length; i++) {
    //     if ($(subPOI[i]).prop("checked") == false) {
    //       $(subPOI[i]).prop("checked", true);
    //       layer = new GIS.Layer.ServiceLayer(
    //         map.ObjMap,
    //         url + $(subPOI[i]).val()
    //       );
    //       layer.setPopupTemplate({
    //         content: "{*}"
    //       });
    //       layer.render();
    //       $(subPOI[i]).attr(
    //         "name",
    //         map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
    //       );
    //       checked.push(
    //         map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
    //       );
    //     }
    //   }
    //   localStorage.setItem("checkedPOI", JSON.stringify(checked));
    // } else if ($(this).prop("checked") == false) {
    //   $(masterSubPOI).prop("checked", false);
    //   //Hide item to do overlapping
    //   for (let i = 0; i < itemLayer.length; i++) {
    //     $(itemLayer[i]).hide();
    //     $(itemLayer[i]).css("height", "24px");
    //     $(itemLayer[i]).css("float", "right");
    //   }
    //   let checked = JSON.parse(localStorage.getItem("checkedPOI"));
    //   if (checked !== null) {
    //     checked = JSON.parse(localStorage.getItem("checkedPOI"));
    //   } else {
    //     checked = [];
    //   }
    //   $(".div-poi").remove();
    //   for (let i = 0; i < subPOI.length; i++) {
    //     $(subPOI[i]).prop("checked", false);
    //   }
    //   for (let i in map.ObjMap.layers.items) {
    //     for (let j = 0; j < checked.length; j++) {
    //       if (map.ObjMap.layers.items[i].uid == checked[j]) {
    //         map.ObjMap.layers.items[i].visible = false;
    //         map.ObjMap.layers.items.splice(i, 1);
    //       }
    //     }
    //   }
    //   checked = [];
    //   localStorage.setItem("checkedPOI", JSON.stringify(checked));
    // }
  });

  $(masterSubPOI).click(function () {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    if ($(this).attr("id") == "checkbox-sub-poi-bank") {
      a = 0;
      b = 2;
      c = 0;
      d = 5;
    } else if ($(this).attr("id") == "checkbox-sub-poi-apotek") {
      a = 3;
      b = 5;
      c = 6;
      d = 11;
    }
    let check = [];
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let tableLegend = undefined;
    if (document.getElementsByClassName("div-poi")[0] == undefined) {
      tableLegend = makeTableLegend("LIST OF POI", "div-poi");
    } else {
      tableLegend = document.getElementsByClassName("div-poi")[0];
      for (let i = a; i <= b; i++) {
        let trSecondValue = $(subPOI[i]).attr("secondValue");
        let trValue = $(subPOI[i]).val();
        $("#" + trSecondValue + "-" + trValue).remove();
        if ($(".table-div-poi").children("tr").length == 0) {
          $(".div-poi").remove();
        }
      }
    }
    let itemLayer = $(".checkbox-sub-poi")
      .parents("td")
      .siblings("td");
    if ($(this).prop("checked") == true) {
      for (let i = a; i <= b; i++) {
        renderLegendPoint(
          tableLegend,
          JSON.parse(localStorage.getItem("dataPOI")),
          $(subPOI[i]).val()
        );
      }
      // Show item to do overlapping
      for (let i = c; i <= d; i++) {
        $(itemLayer[i]).show();
        $(itemLayer[i]).css("height", "24px");
        $(itemLayer[i]).css("float", "right");
      }
      // Show current POI
      let checked = JSON.parse(localStorage.getItem("checkedPOI"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedPOI"));
      } else {
        checked = [];
      }
      for (let i = a; i <= b; i++) {
        if ($(subPOI[i]).prop("checked") == false) {
          $(subPOI[i]).prop("checked", true);
          if (checkGraphicsExist(map).length < 1) {
            layer = new GIS.Layer.ServiceLayer(
              map.ObjMap,
              url + $(subPOI[i]).val()
            );
            layer.setPopupTemplate({
              content: "{*}"
            });
            layer.render();
            $(subPOI[i]).attr(
              "name",
              map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
            );
            checked.push(
              map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
            );
          } else {
            console.log($(subPOI[i]).val())
            layer = new ESRI.FeatureLayer({
              url: url + $(subPOI[i]).val()
            })
            for (let j = 0; j < checkGraphicsExist(map).length; j++) {
              console.log(layer)
              let query = new ESRI.Query();
              query.returnGeometry = true;
              query.outFields = ["*"];
              query.outSpatialReference = map.ObjMap.spatialReference;
              query.geometry = checkGraphicsExist(map)[j]
              query.where = "1=1"
              layer.queryFeatures(query).then(async function (results) {
                await displayResultsGraphics(map, results, graphicsLayer, groupLayerPOI, layer.renderer.symbol)
                console.log(results)
              })
            }
          }
        }
      }
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      for (let i = a; i <= b; i++) {
        $(subPOI[i]).prop("checked", false);
      }
      let checked = JSON.parse(localStorage.getItem("checkedPOI"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedPOI"));
      } else {
        checked = [];
      }
      for (let i = a; i <= b; i++) {
        let index = checked.indexOf($(subPOI[i]).attr("name"));
        checked.splice(index, 1);
        localStorage.setItem("checkedPOI", JSON.stringify(checked));
        let trSecondValue = $(subPOI[i]).attr("secondValue");
        let trValue = $(subPOI[i]).val();
        $("#" + trSecondValue + "-" + trValue).remove();
        if ($(".table-div-poi").children("tr").length == 0) {
          $(".div-poi").remove();
        }
        for (let j in map.ObjMap.layers.items) {
          if (map.ObjMap.layers.items[j].uid == $(subPOI[i]).attr("name")) {
            map.ObjMap.layers.items[j].visible = false;
            map.ObjMap.layers.items.splice(j, 1);
          }
        }
      }

      // Hide item to do overlapping
      for (let i = c; i <= d; i++) {
        $(itemLayer[i]).hide();
        $(itemLayer[i]).css("height", "24px");
        $(itemLayer[i]).css("float", "right");
      }
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
    }
    //Autocheck for POI
    for (let i = 0; i < subPOI.length; i++) {
      if ($(subPOI[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subPOI[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(poi).prop("checked", false);
    } else {
      $(poi).prop("checked", true);
    }
  });

  $(subPOI).click(function () {
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let check = [];
    let checkMasterBank = [];
    let checkMasterApotek = [];
    let tableLegend = undefined;
    //Show or hide item to do overlapping
    let itemLayer = $(this)
      .parents("td")
      .siblings("td");
    for (let i = 0; i < itemLayer.length; i++) {
      $(itemLayer[i]).toggle();
      $(itemLayer[i]).css("height", "24px");
      $(itemLayer[i]).css("float", "right");
    }
    //Show list POI
    if (document.getElementsByClassName("div-poi")[0] == undefined) {
      tableLegend = makeTableLegend("LIST OF POI", "div-poi");
    } else {
      tableLegend = document.getElementsByClassName("div-poi")[0];
    }
    let checked = undefined;
    if (JSON.parse(localStorage.getItem("checkedPOI") !== null)) {
      checked = JSON.parse(localStorage.getItem("checkedPOI"));
    } else {
      checked = [];
    }
    if ($(this).prop("checked") == true) {
      renderLegendPoint(
        tableLegend,
        JSON.parse(localStorage.getItem("dataPOI")),
        $(this).val()
      );
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.setPopupTemplate({
        content: "{*}"
      });
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      let index = checked.indexOf($(this).attr("name"));
      checked.splice(index, 1);
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
      let trSecondValue = $(this).attr("secondValue");
      let trValue = $(this).val();
      $("#" + trSecondValue + "-" + trValue).remove();
      if ($(".table-div-poi").children("tr").length == 0) {
        $(".div-poi").remove();
      }
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
      //Remove tab navigation if it opens
      let value = $(this).val();
      let tabLink = $(".tab-link-service");
      let visibility = [];
      $("#tab-link-services-" + value).hide();
      $("#tab-content-services-" + value).hide();
      for (let i = tabLink.length - 1; i > -1; i--) {
        if ($(tabLink[i]).is(":visible")) {
          visibility.push($(tabLink[i]).is(":visible"));
          $(tabLink[i]).addClass("active");
          let a = $(tabLink[i]).attr("id"),
            b = a.split("-"),
            c = b[3];
          document.getElementById("tab-content-services-" + c).style.display =
            "block";
          break;
        }
      }
      function checkVisibility(visible) {
        return visible == false;
      }
      if (visibility.every(checkVisibility)) {
        $(".table_list_services").hide();
      }
    }
    //Autocheck for POI
    for (let i = 0; i < subPOI.length; i++) {
      if ($(subPOI[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subPOI[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(poi).prop("checked", false);
    } else {
      $(poi).prop("checked", true);
    }
    //Autocheck for Sub Master Bank
    for (let i = 0; i < 3; i++) {
      if ($(subPOI[i]).prop("checked") == true) {
        checkMasterBank.push("checked");
      } else if ($(subPOI[i]).prop("checked") == false) {
        checkMasterBank.push("unchecked");
      }
    }
    if (checkMasterBank.includes("unchecked")) {
      $(masterSubPOI[0]).prop("checked", false);
    } else {
      $(masterSubPOI[0]).prop("checked", true);
    }
    //Autocheck for Sub Master Apotek
    for (let i = 3; i < 6; i++) {
      if ($(subPOI[i]).prop("checked") == true) {
        checkMasterApotek.push("checked");
      } else if ($(subPOI[i]).prop("checked") == false) {
        checkMasterApotek.push("unchecked");
      }
    }
    if (checkMasterApotek.includes("unchecked")) {
      $(masterSubPOI[1]).prop("checked", false);
    } else {
      $(masterSubPOI[1]).prop("checked", true);
    }
  });

  function renderLegendPoint(legend, data, value) {
    for (let i = 0; i < data.length; i++) {
      if (value == undefined) {
        let pic = document.createElement("IMG");
        pic.style.width = "14px";
        pic.style.height = "14px";
        pic.setAttribute("src", data[i][2]);
        let tr = document.createElement("TR");
        tr.setAttribute("id", data[i][0] + "-" + data[i][3]);
        let tdName = document.createElement("TD");
        tdName.style.fontSize = "9px";
        let tdSym = document.createElement("TD");
        tdSym.style.paddingLeft = "5px";
        tdName.innerHTML = data[i][1];
        tdSym.appendChild(pic);
        tr.appendChild(tdSym);
        tr.appendChild(tdName);
        legend.childNodes[1].appendChild(tr);
      } else {
        if (data[i][3] == value) {
          let pic = document.createElement("IMG");
          pic.style.width = "14px";
          pic.style.height = "14px";
          pic.setAttribute("src", data[i][2]);
          let tr = document.createElement("TR");
          tr.setAttribute("id", data[i][0] + "-" + data[i][3]);
          let tdName = document.createElement("TD");
          tdName.style.fontSize = "9px";
          let tdSym = document.createElement("TD");
          tdSym.style.paddingLeft = "5px";
          tdName.innerHTML = data[i][1];
          tdSym.appendChild(pic);
          tr.appendChild(tdSym);
          tr.appendChild(tdName);
          legend.childNodes[1].appendChild(tr);
        }
      }
    }
    map.ObjMapView.ui.add(legend, "bottom-right");
  }

  function renderLegendPolygon(legend, data) {
    let label = [];
    let color = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i][0].length; j++) {
        label.push(data[i][0][j].label);
        color.push(data[i][0][j].symbol.color);
      }
    }
    let symbol = "▲";
    map.ObjMapView.when(function () {
      for (let j = 0; j < label.length; j++) {
        let tr = document.createElement("TR");
        let tdName = document.createElement("TD");
        tdName.style.fontSize = "9px";
        let tdSym = document.createElement("TD");
        tdSym.style.paddingLeft = "5px";
        tdName.innerHTML = label[j];
        tdSym.style.color = "rgb(" + color[j] + ")";
        tdSym.innerHTML = symbol;
        tr.appendChild(tdSym);
        tr.appendChild(tdName);
        legend.childNodes[1].appendChild(tr);
      }
      map.ObjMapView.ui.add(legend, "bottom-right");
    });
  }

  $(infrastructure).click(function () {
    let layer;
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/UberMedia/MapServer/";
    let tableLegend = undefined;
    if (document.getElementsByClassName("div-infrastructure")[0] == undefined) {
      tableLegend = makeTableLegend(
        "LIST OF INFRASTRUCTURE",
        "div-infrastructure"
      );
    } else {
      tableLegend = document.getElementsByClassName("div-infrastructure")[0];
      for (let i = 0; i < subInfrasctructure.length; i++) {
        if ($(subInfrasctructure[i]).prop("checked") == true) {
          $(document.getElementsByClassName("div-infrastructure")[0]).remove();
          tableLegend = makeTableLegend(
            "LIST OF INFRASTRUCTURE",
            "div-infrastructure"
          );
        }
      }
    }
    renderLegendPoint(
      tableLegend,
      JSON.parse(localStorage.getItem("dataInfrastructure"))
    );
    if ($(this).prop("checked") == true) {
      let checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
      } else {
        checked = [];
      }
      for (let i = 0; i < subInfrasctructure.length; i++) {
        if ($(subInfrasctructure[i]).prop("checked") == false) {
          $(subInfrasctructure[i]).prop("checked", true);
          layer = new GIS.Layer.ServiceLayer(
            map.ObjMap,
            url + $(subInfrasctructure[i]).val()
          );
          layer.setPopupTemplate({
            content: "{*}"
          });
          layer.render();
          $(subInfrasctructure[i]).attr(
            "name",
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
          checked.push(
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
        }
      }
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      let checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
      } else {
        checked = [];
      }
      $(".div-infrastructure").remove();
      for (let i = 0; i < subInfrasctructure.length; i++) {
        $(subInfrasctructure).prop("checked", false);
      }
      for (let i in map.ObjMap.layers.items) {
        for (let j = 0; j < checked.length; j++) {
          if (map.ObjMap.layers.items[i].uid == checked[j]) {
            map.ObjMap.layers.items[i].visible = false;
            map.ObjMap.layers.items.splice(i, 1);
          }
        }
      }
      checked = [];
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
    }
  });

  $(subInfrasctructure).click(function () {
    let layer;
    let check = [];
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/UberMedia/MapServer/";
    if (document.getElementsByClassName("div-infrastructure")[0] == undefined) {
      tableLegend = makeTableLegend(
        "LIST OF INFRASTRUCTURE",
        "div-infrastructure"
      );
    } else {
      tableLegend = document.getElementsByClassName("div-infrastructure")[0];
    }
    let checked = undefined;
    if (JSON.parse(localStorage.getItem("checkedInfrastructure") !== null)) {
      checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
    } else {
      checked = [];
    }
    let itemLayer = $(this)
      .parents("td")
      .siblings("td");
    for (let i = 0; i < itemLayer.length; i++) {
      $(itemLayer[i]).toggle();
      $(itemLayer[i]).css("height", "24px");
      $(itemLayer[i]).css("float", "right");
    }
    if ($(this).prop("checked") == true) {
      renderLegendPoint(
        tableLegend,
        JSON.parse(localStorage.getItem("dataInfrastructure")),
        $(this).val()
      );
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.setPopupTemplate({
        content: "{*}"
      });
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      let index = checked.indexOf($(this).attr("name"));
      checked.splice(index, 1);
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
      let trSecondValue = $(this).attr("secondValue");
      let trValue = $(this).val();
      $("#" + trSecondValue + "-" + trValue).remove();
      if ($(".table-div-infrastructure").children("tr").length == 0) {
        $(".div-infrastructure").remove();
      }
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < subInfrasctructure.length; i++) {
      if ($(subInfrasctructure[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subInfrasctructure[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(infrastructure).prop("checked", false);
    } else {
      $(infrastructure).prop("checked", true);
    }
  });

  $(demographic).click(function () {
    let layer;
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/";
    let tableLegend = undefined;
    if (document.getElementsByClassName("div-demographic")[0] == undefined) {
      tableLegend = makeTableLegend("JUMLAH PENDUDUK", "div-demographic");
    } else {
      tableLegend = document.getElementsByClassName("div-demographic")[0];
      for (let i = 0; i < subDemographic.length; i++) {
        if ($(subDemographic[i]).prop("checked") == true) {
          $(document.getElementsByClassName("div-demographic")[0]).remove();
          tableLegend = makeTableLegend("JUMLAH PENDUDUK", "div-demographic");
        }
      }
    }
    renderLegendPolygon(
      tableLegend,
      JSON.parse(localStorage.getItem("dataDemographic"))
    );
    if ($(this).prop("checked") == true) {
      let checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      } else {
        checked = [];
      }
      for (let i = 0; i < subDemographic.length; i++) {
        if ($(subDemographic[i]).prop("checked") == false) {
          $(subDemographic[i]).prop("checked", true);
          layer = new GIS.Layer.ServiceLayer(
            map.ObjMap,
            url + $(subDemographic[i]).val()
          );
          layer.setPopupTemplate({
            content: "{*}"
          });
          layer.render();
          $(subDemographic[i]).attr(
            "name",
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
          checked.push(
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
        }
      }
      localStorage.setItem("checkedDemographic", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      let checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      } else {
        checked = [];
      }
      $(".div-demographic").remove();
      for (let i = 0; i < subDemographic.length; i++) {
        $(subDemographic[i]).prop("checked", false);
      }
      for (let i in map.ObjMap.layers.items) {
        for (let j = 0; j < checked.length; j++) {
          if (map.ObjMap.layers.items[i].uid == checked[j]) {
            map.ObjMap.layers.items[i].visible = false;
            map.ObjMap.layers.items.splice(i, 1);
          }
        }
      }
      checked = [];
      localStorage.setItem("checkedDemographic", JSON.stringify(checked));
    }
  });

  $(subDemographic).click(function () {
    let layer;
    let check = [];
    let url =
      "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/";
    if (document.getElementsByClassName("div-demographic")[0] == undefined) {
      tableLegend = makeTableLegend("JUMLAH PENDUDUK", "div-demographic");
    } else {
      tableLegend = document.getElementsByClassName("div-demographic")[0];
      for (let i = 0; i < subDemographic.length; i++) {
        if ($(subDemographic[i]).prop("checked") == true) {
          $(document.getElementsByClassName("div-demographic")[0]).remove();
          tableLegend = makeTableLegend("JUMLAH PENDUDUK", "div-demographic");
        }
      }
    }
    let checked = undefined;
    if (JSON.parse(localStorage.getItem("checkedInfrastructure") !== null)) {
      checked = JSON.parse(localStorage.getItem("checkedInfrastructure"));
    } else {
      checked = [];
    }
    if ($(this).prop("checked") == true) {
      renderLegendPolygon(
        tableLegend,
        JSON.parse(localStorage.getItem("dataDemographic")),
        $(this).val()
      );
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val()); //https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/
      layer.setPopupTemplate({
        content: "{*}"
      });
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedDemographic", JSON.stringify(checked));
    } else if ($(this).prop("checked") == false) {
      $(".div-demographic").remove();
      let checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedDemographic"));
      } else {
        checked = [];
      }
      checked = [];
      localStorage.setItem("checkedDemographic", JSON.stringify(checked));
      for (let i in map.ObjMap.layers.items) {
        if (map.ObjMap.layers.items[i].uid == $(this).attr("name")) {
          map.ObjMap.layers.items[i].visible = false;
          map.ObjMap.layers.items.splice(i, 1);
        }
      }
    }
    for (let i = 0; i < subDemographic.length; i++) {
      if ($(subDemographic[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(subDemographic[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(demographic).prop("checked", false);
    } else {
      $(demographic).prop("checked", true);
    }
  });
}
