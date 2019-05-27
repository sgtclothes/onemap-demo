function loadUI() {


    function openNav() {
        document.getElementById("mySidenav").style.width = "250px"
        document.getElementById("main").style.marginLeft = "250px"
        // document.getElementById("myModal").style.marginLeft = "250px"
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0"
        document.getElementById("main").style.marginLeft = "0"
        // document.getElementById("myModal").style.marginLeft = "0"
    }

    document.getElementById("closebtn").addEventListener('click', function () {
        document.getElementById("mySidenav").style.width = "0"
        document.getElementById("main").style.marginLeft = "0"
        // document.getElementById("myModal").style.marginLeft = "0"
    })

    document.getElementById("instant-analysis").addEventListener('click', function () {
        if (document.getElementById("mySidenav").style.width > "0px") {
            closeNav()
        } else {
            openNav()
        }
    })

    document.getElementById("select-analysis").addEventListener('click', function () {
        let x = document.getElementById("resultBuffer")
        let z = document.getElementById("resultDriving")
        let y = document.getElementById("select-analysis")
        if (y.value == "none") {
            x.style.display = "none"
            z.style.display = "none"
        } else if (y.value == "buffer") {
            x.style.display = "block"
            z.style.display = "none"
        } else if (y.value == "driving") {
            x.style.display = "none"
            z.style.display = "block"
        }
    })

    document.querySelector(".select-driving").addEventListener('click', function () {
        let x = document.getElementById("driving-live")
        if (this.value == "live") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    })
}