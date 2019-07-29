function multiSelect() {
  let selectAllProperty = $("#select-all-property");
  let selectAllDepartment = $("#select-all-department");
  let inputProperty = $("input[name='select-property']");
  let inputDepartment = $("input[name='select-department']");
  let property = [];
  let department = [];
  let a = $("#property-value");
  let b = $("#department-value");
  let widthA = $(a).css("width");
  let widthB = $(b).css("width");
  let buttonProperty = $("#button-property-ok");
  let buttonDepartment = $("#button-department-ok");

  Array.prototype.remove = function() {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  $(selectAllProperty).click(function() {
    if ($(selectAllProperty).text() == "Select all") {
      for (let i = 0; i < inputProperty.length; i++) {
        $(inputProperty[i]).prop("checked", true);
        property[i] = $(inputProperty[i]).val();
      }
      if (property.length < 1) {
        $(a).text("Select Property");
      } else {
        $(a).text(property.toString());
      }
      if ($(a).css("width") > widthA) {
        $(a).text(property.length + " selected");
      }
      $(selectAllProperty).text("Unselect all");
    } else if ($(selectAllProperty).text() == "Unselect all") {
      for (let i = 0; i < inputProperty.length; i++) {
        $(inputProperty[i]).prop("checked", false);
        property = [];
      }
      if (property.length < 1) {
        $(a).text("Select Property");
      }
      $(selectAllProperty).text("Select all");
    }
  });

  $(inputProperty).click(function() {
    if ($(this).prop("checked") == true) {
      property.push($(this).val());
      if (property.length == 7) {
        $(selectAllProperty).text("Unselect all");
      }
    } else if ($(this).prop("checked") == false) {
      property.remove($(this).val());
      if ($(selectAllProperty).text() == "Unselect all") {
        $(selectAllProperty).text("Select all");
      }
    }
    if (property.length < 1) {
      $(a).text("Select Property");
    } else {
      $(a).text(property.toString());
    }
    if ($(a).css("width") > widthA) {
      $(a).text(property.length + " selected");
    }
  });

  $(buttonProperty).click(function() {
    $(".dropdown-content-property").hide();
  });

  $(selectAllDepartment).click(function() {
    if ($(selectAllDepartment).text() == "Select all") {
      for (let i = 0; i < inputDepartment.length; i++) {
        $(inputDepartment[i]).prop("checked", true);
        department[i] = $(inputDepartment[i]).val();
      }
      if (department.length < 1) {
        $(b).text("Select Department");
      } else {
        $(b).text(department.toString());
      }
      if ($(b).css("width") > widthB) {
        $(b).text(department.length + " selected");
      }
      $(selectAllDepartment).text("Unselect all");
    } else if ($(selectAllDepartment).text() == "Unselect all") {
      for (let i = 0; i < inputDepartment.length; i++) {
        $(inputDepartment[i]).prop("checked", false);
        department = [];
      }
      if (department.length < 1) {
        $(b).text("Select Department");
      }
      $(selectAllDepartment).text("Select all");
    }
  });

  $(inputDepartment).click(function() {
    if ($(this).prop("checked") == true) {
      department.push($(this).val());
      if (department.length == 9) {
        $(selectAllDepartment).text("Unselect all");
      }
    } else if ($(this).prop("checked") == false) {
      department.remove($(this).val());
      if ($(selectAllDepartment).text() == "Unselect all") {
        $(selectAllDepartment).text("Select all");
      }
    }
    if (department.length < 1) {
      $(b).text("Select Department");
    } else {
      $(b).text(department.toString());
    }
    if ($(b).css("width") > widthB) {
      $(b).text(department.length + " selected");
    }
  });

  $(buttonDepartment).click(function() {
    $(".dropdown-content-department").hide();
  });
}
