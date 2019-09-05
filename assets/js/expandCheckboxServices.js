function expandCheckboxServices() {
  //Expand div of EXTERNAL DATA
  $(document).delegate("div.expand-layer", "click", function() {
    $(".expand-master-element").toggle();
    if ($(".expand-master-element").is(":visible") == false) {
      $(".expand-element").hide();
      $(".expand-sub-element").hide();
      if ($("i.expand-master-layer").hasClass("mi-remove")) {
        $("i.expand-master-layer").removeClass("mi-remove");
        $("i.expand-master-layer").addClass("mi-add");
      }
      if ($("i.expand-layer").hasClass("mi-remove")) {
        $("i.expand-layer").removeClass("mi-remove");
        $("i.expand-layer").addClass("mi-add");
      }
    }
  });

  //Expand i of poi
  $(document).delegate("i.expand-master-layer", "click", function() {
    $(this)
      .parents("table")
      .siblings("table.expand-element")
      .toggle();
    if (
      $(this)
        .parents("table")
        .siblings("table.expand-element")
        .is(":visible")
    ) {
      $(this).removeClass("mi-add");
      $(this).addClass("mi-remove");
    } else {
      $(".expand-sub-element").hide();
      $(this).removeClass("mi-remove");
      $(this).addClass("mi-add");
      $("i.expand-layer").removeClass("mi-remove");
      $("i.expand-layer").addClass("mi-add");
    }
  });

  //Expand sub layer of bank and apotek
  $(document).delegate("i.expand-layer", "click", function() {
    $(this)
      .parents("table")
      .next()
      .toggle();
    if (
      $(this)
        .parents("table")
        .next()
        .is(":visible")
    ) {
      $(this).removeClass("mi-add");
      $(this).addClass("mi-remove");
    } else {
      $(this).removeClass("mi-remove");
      $(this).addClass("mi-add");
    }
  });
}
