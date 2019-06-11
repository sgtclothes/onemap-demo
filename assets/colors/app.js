var colors = jsColorPicker('input.color', {
    customBG: '#000',
    readOnly: true,
    // patch: false,
    init: function(elm, colors) {
        elm.style.backgroundColor = elm.value;
        elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
    }
});