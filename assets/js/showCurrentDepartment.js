function showCurrentDepartment(groupUserDepartment) {
  let currentDepartment = [];
  for (let i in groupUserDepartment) {
    if (groupUserDepartment[i][0] == created_by) {
      currentDepartment.push(groupUserDepartment[i][2]);
    }
  }
  localStorage.setItem("currentDepartment", JSON.stringify(currentDepartment));

  let tree = $("#colliers-custom-data-user").children();

  console.log(currentDepartment);

  if (!currentDepartment.includes("Colliers")) {
    for (let i = 0; i < tree.length; i++) {
      if (!currentDepartment.includes($(tree[i]).attr("value"))) {
        console.log($(tree[i]).attr("value"));
        $(tree[i]).remove();
      }
    }
  }
}
