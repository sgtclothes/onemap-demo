/* ------------------------------------------------------------------------------
 *
 *  # Layout - fixed navbar and sidebar with custom scrollbar
 *
 *
 * ---------------------------------------------------------------------------- */
// Setup module
// ------------------------------

var FixedSidebarCustomScroll = function () {

    //
    // Setup module components
    //
    // Perfect scrollbar
    var _componentPerfectScrollbar = function () {
        if (typeof PerfectScrollbar == 'undefined') {
            console.warn('Warning - perfect_scrollbar.min.js is not loaded.');
            return false;
        }
    };
    // set perfect scrollbar for our sidebar content.
    var _sidebarScrollbar = function () {
        var ps = new PerfectScrollbar('.sidebar-fixed .sidebar-content', {
            wheelSpeed: 1,
            wheelPropagation: true,
            maxScrollbarLength: 200
        });
    };
    var _navbarScrollbar = function () {
        var btnTogglerDisp = getComputedStyle(document.querySelector('button.navbar-toggler')).display;
        var navbarScroll = null;
        var _setup = function(){
            if (btnTogglerDisp !== 'none') {
                navbarScroll = new PerfectScrollbar('#navbar-mobile', {
                    wheelSpeed: 1,
                    wheelPropagation: true,
                    maxScrollbarLength: 100
                });
            }else{
                if(navbarScroll instanceof  PerfectScrollbar){
                    navbarScroll.destroy();
                }
            }
        };
        _setup();

        window.addEventListener('resize', function () {
            btnTogglerDisp = getComputedStyle(document.querySelector('button.navbar-toggler')).display;
            _setup();
        });
    };
    //
    // Return objects assigned to module
    //
    return {
        init: function () {
            if (_componentPerfectScrollbar() !== false) {
                _sidebarScrollbar();
                _navbarScrollbar();
            }
        }
    };
}();
// Initialize module
// ------------------------------
document.addEventListener('DOMContentLoaded', function () {
    FixedSidebarCustomScroll.init();
});


