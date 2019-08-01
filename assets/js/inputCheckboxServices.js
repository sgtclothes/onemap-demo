function inputCheckboxServices(GIS, map) {
  let poi = $(".checkbox-poi");
  let infrastructure = $(".checkbox-infrastructure");
  let demographic = $(".checkbox-demographic");
  let subPOI = $(".checkbox-sub-poi");
  let subInfrasctructure = $(".checkbox-sub-infrastructure");
  let subDemographic = $(".checkbox-sub-demographic");

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

  $(poi).click(function() {
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
    renderLegendPoint(tableLegend, JSON.parse(localStorage.getItem("dataPOI")));
    if ($(this).prop("checked") == true) {
      let checked = JSON.parse(localStorage.getItem("checkedPOI"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedPOI"));
      } else {
        checked = [];
      }
      for (let i = 0; i < subPOI.length; i++) {
        if ($(subPOI[i]).prop("checked") == false) {
          $(subPOI[i]).prop("checked", true);
          layer = new GIS.Layer.ServiceLayer(
            map.ObjMap,
            url + $(subPOI[i]).val()
          );
          layer.setPopupTemplate({
            content: "{Geometry}"
          });
          layer.render();
          $(subPOI[i]).attr(
            "name",
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
          checked.push(
            map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
          );
        }
      }
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedPOI")));
    } else if ($(this).prop("checked") == false) {
      let checked = JSON.parse(localStorage.getItem("checkedPOI"));
      if (checked !== null) {
        checked = JSON.parse(localStorage.getItem("checkedPOI"));
      } else {
        checked = [];
      }
      $(".div-poi").remove();
      for (let i = 0; i < subPOI.length; i++) {
        $(subPOI).prop("checked", false);
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
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedPOI")));
    }
  });

  $(subPOI).click(function() {
    let layer;
    let url =
      "http://tig.co.id/ags/rest/services/HERE/LOKASI_JULY2018/MapServer/";
    let check = [];
    let tableLegend = undefined;
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
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedPOI")));
    } else if ($(this).prop("checked") == false) {
      let index = checked.indexOf($(this).attr("name"));
      checked.splice(index, 1);
      localStorage.setItem("checkedPOI", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedPOI")));
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
    }
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
    map.ObjMapView.when(function() {
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

  $(infrastructure).click(function() {
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
      console.log(JSON.parse(localStorage.getItem("checkedInfrastructure")));
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
      console.log(JSON.parse(localStorage.getItem("checkedInfrastructure")));
    }
  });

  $(subInfrasctructure).click(function() {
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
    if ($(this).prop("checked") == true) {
      renderLegendPoint(
        tableLegend,
        JSON.parse(localStorage.getItem("dataInfrastructure")),
        $(this).val()
      );
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedInfrastructure")));
    } else if ($(this).prop("checked") == false) {
      let index = checked.indexOf($(this).attr("name"));
      checked.splice(index, 1);
      localStorage.setItem("checkedInfrastructure", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedInfrastructure")));
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

  $(demographic).click(function() {
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
      console.log(JSON.parse(localStorage.getItem("checkedDemographic")));
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
      console.log(JSON.parse(localStorage.getItem("checkedDemographic")));
    }
  });

  $(subDemographic).click(function() {
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
      layer = new GIS.Layer.ServiceLayer(map.ObjMap, url + $(this).val());
      layer.render();
      $(this).attr(
        "name",
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      checked.push(
        map.ObjMap.layers.items[map.ObjMap.layers.items.length - 1].uid
      );
      localStorage.setItem("checkedDemographic", JSON.stringify(checked));
      console.log(JSON.parse(localStorage.getItem("checkedDemographic")));
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
      console.log(JSON.parse(localStorage.getItem("checkedDemographic")));
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
