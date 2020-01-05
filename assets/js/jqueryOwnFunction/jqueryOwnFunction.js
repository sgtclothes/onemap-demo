// $(document).tooltip();
var actionElement = function (element, action) {
    if (action == "hide") {
        $(element).hide()
    } else if (action == "show") {
        $(element).show()
    } else if (action == "remove") {
        $(element).remove()
    }
}