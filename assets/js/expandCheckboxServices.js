function expandCheckboxServices() {
  $(document).delegate("div.expand-layer", "click", function() {
    $(".expand-master-element").toggle();
    if ($(".expand-master-element").is(":visible") == false) {
      $(".expand-element").hide();
      if ($("i.expand-layer").hasClass("mi-remove")) {
        $("i.expand-layer").removeClass("mi-remove");
        $("i.expand-layer").addClass("mi-add");
      }
    }
  });
  $(document).delegate("i.expand-layer", "click", function() {
    $(this)
      .parents("table")
      .siblings("table")
      .toggle();
    if (
      $(this)
        .parents("table")
        .siblings("table")
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