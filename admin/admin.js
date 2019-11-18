var getUserAdmin = function () {
    $("#username-admin i:first-child").after(localStorage.getItem("created_by"));
}

getUserAdmin()