// Restricts input for each element in the set of matched elements to the given inputFilter.
var inputFilter = function () {
    (function ($) {
        $.fn.inputFilter = function (inputFilter) {
            return this.on(
                "input keydown keyup mousedown mouseup select contextmenu drop",
                function () {
                    if (inputFilter(this.value)) {
                        this.oldValue = this.value;
                        this.oldSelectionStart = this.selectionStart;
                        this.oldSelectionEnd = this.selectionEnd;
                    } else if (this.hasOwnProperty("oldValue")) {
                        this.value = this.oldValue;
                        this.setSelectionRange(
                            this.oldSelectionStart,
                            this.oldSelectionEnd
                        );
                    }
                }
            );
        };
    })(jQuery);

    $("#uintTextBox").inputFilter(function (value) {
        return /^\d*$/.test(value);
    });
    $("#intLimitTextBox").inputFilter(function (value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
    });
    $("#intTextBox").inputFilter(function (value) {
        return /^-?\d*$/.test(value);
    });
    $(".floatTextBox").inputFilter(function (value) {
        return /^-?\d*[.]?\d*$/.test(value);
    });
    $(".floatTextBoxWithRange").inputFilter(function (value) {
        return /^-?\d*[.]?\d*$/.test(value) && (value === "" || parseFloat(value) > 0);
    });
    $(".intTextBoxWithRange").inputFilter(function (value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) > 0);
    });
    $("#currencyTextBox").inputFilter(function (value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });
    $("#basicLatinTextBox").inputFilter(function (value) {
        return /^[a-z]*$/i.test(value);
    });
    $("#extendedLatinTextBox").inputFilter(function (value) {
        return /^[a-z\u00c0-\u024f]*$/i.test(value);
    });
    $("#hexTextBox").inputFilter(function (value) {
        return /^[0-9a-f]*$/i.test(value);
    });

}