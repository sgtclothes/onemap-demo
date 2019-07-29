function inputCheckboxPropertyStatus() {
  let propertyAvailable = $("input[name='property-available']");
  let propertyAvailableMaster = $(
    "input[name='property-status-available-for-sale']"
  );
  let propertyValuation = $("input[name='property-valuation']");
  let propertyValuationMaster = $("input[name='property-status-valuation']");
  let propertySold = $("input[name='property-sold']");
  let propertySoldMaster = $("input[name='property-status-sold']");
  
  $(propertyAvailableMaster).click(function() {
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < propertyAvailable.length; i++) {
        $(propertyAvailable[i]).prop("checked", true);
      }
    } else if ($(this).prop("checked") == false) {
      for (let i = 0; i < propertyAvailable.length; i++) {
        $(propertyAvailable[i]).prop("checked", false);
      }
    }
  });
  $(propertyAvailable).click(function() {
    let check = [];
    for (let i = 0; i < propertyAvailable.length; i++) {
      if ($(propertyAvailable[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(propertyAvailable[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(propertyAvailableMaster).prop("checked", false);
    } else {
      $(propertyAvailableMaster).prop("checked", true);
    }
  });

  $(propertySoldMaster).click(function() {
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < propertySold.length; i++) {
        $(propertySold[i]).prop("checked", true);
      }
    } else if ($(this).prop("checked") == false) {
      for (let i = 0; i < propertySold.length; i++) {
        $(propertySold[i]).prop("checked", false);
      }
    }
  });
  $(propertySold).click(function() {
    let check = [];
    for (let i = 0; i < propertySold.length; i++) {
      if ($(propertySold[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(propertySold[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(propertySoldMaster).prop("checked", false);
    } else {
      $(propertySoldMaster).prop("checked", true);
    }
  });

  $(propertyValuationMaster).click(function() {
    if ($(this).prop("checked") == true) {
      for (let i = 0; i < propertyValuation.length; i++) {
        $(propertyValuation[i]).prop("checked", true);
      }
    } else if ($(this).prop("checked") == false) {
      for (let i = 0; i < propertyValuation.length; i++) {
        $(propertyValuation[i]).prop("checked", false);
      }
    }
  });
  $(propertyValuation).click(function() {
    let check = [];
    for (let i = 0; i < propertyValuation.length; i++) {
      if ($(propertyValuation[i]).prop("checked") == true) {
        check.push("checked");
      } else if ($(propertyValuation[i]).prop("checked") == false) {
        check.push("unchecked");
      }
    }
    if (check.includes("unchecked")) {
      $(propertyValuationMaster).prop("checked", false);
    } else {
      $(propertyValuationMaster).prop("checked", true);
    }
  });
}
