export class SimpleLineSymbol {
    constructor(color, width, style) {
        this.Color = color
        this.Width = width
        this.Style = style
    }

    create() {
        return new ESRI.SimpleLineSymbol({
            color: this.Color,
            width: this.Width,
            style: this.Style
        })
    }
}

export class FillSymbol {
    constructor(color, colorOutline, width) {
        this.Color = color
        this.Width = width
        this.ColorOutline = colorOutline
        this.Width = width
    }

    create() {
        return new ESRI.FillSymbol({
            color: this.Color,
            outline: {
                color: this.ColorOutline,
                width: this.Width
            }
        })
    }
}

export class SimpleFillSymbol {
    constructor(color, style, colorOutline, width) {
        this.Color = color
        this.Style = style
        this.ColorOutline = colorOutline
        this.Width = width
    }

    create() {
        return new ESRI.SimpleFillSymbol({
            color: this.Color,
            style: this.Style,
            outline: {  
                color: this.ColorOutline,
                width: this.Width
            }
        })
    }
}

export class PictureMarkerSymbol {
    constructor(urlPictureMarkerSymbol, width, height) {
        this.UrlPictureMarkerSymbol = urlPictureMarkerSymbol
        this.Width = width
        this.Height = height
    }

    create() {
        return new ESRI.PictureMarkerSymbol({
            url: this.UrlPictureMarkerSymbol,
            width: this.Width,
            height: this.Height
        })
    }
}

export class Polygon {
    constructor(hasZ, hasM, rings, wkid) {
        this.HasZ = hasZ
        this.HasM = hasM
        this.Rings = rings
        this.Wkid = wkid
    }
    create() {
        return new ESRI.Polygon({
            hasZ: this.HasZ,
            hasM: this.HasM,
            rings: this.Rings,
            spatialReference: { wkid: this.Wkid }
        })
    }
}

export class SimpleMarkerSymbol {
    constructor(style, color, size, colorOutline, width) {
        this.Style = style
        this.Color = color
        this.Size = size
        this.colorOutline = colorOutline
        this.Width = width
    }

    create() {
        return new ESRI.SimpleMarkerSymbol({
            style: this.Style,
            color: this.Color,
            size: this.Size,
            outline: {
                color: this.colorOutline,
                width: this.Width
            }
        })
    }
}