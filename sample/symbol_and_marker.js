function boot(GIS) {
    // TESTING PICTURE MARKER SYMBOL
    let map = new GIS.Map([106.865036, -6.175110]);
    // map.setBasemap('hybrid')
    map.render(); 
    
    let marker = "http://static.arcgis.com/images/Symbols/SafetyHealth/Hospital.png"
    let pictureMarkerSymbol = new GIS.Drawset.PictureMarkerSymbol(marker, "11px", "11px");
    pictureMarkerSymbol.create()
    console.log(pictureMarkerSymbol);
    
    // TESTING SIMPLE MARKER SYMBOL

    let simpleMarkerSymbol = new GIS.Drawset.SimpleMarkerSymbol("circle", "blue", "15px", [255, 255, 0], "0.5px")
    simpleMarkerSymbol.create()
    console.log(simpleMarkerSymbol)

    // TESTING SIMPLE LINE SYMBOL
    let simpleLineSymbol = new GIS.Drawset.SimpleLineSymbol("light blue", "2px", "short-dot")
    simpleLineSymbol.create()
    console.log(simpleLineSymbol)

    // TESTING POLYGON SYMBOL
    const rings = [
        [  
            [-97.06138,32.837,35.1,4.8],
            [-97.06133,32.836,35.2,4.1],
            [-97.06124,32.834,35.3,4.2],
            [-97.06138,32.837,35.1,4.8] 
        ], [  
            [-97.06326,32.759,35.4],
            [-97.06298,32.755,35.5],
            [-97.06153,32.749,35.6],
            [-97.06326,32.759,35.4] 
        ]
    ];
    
    let polygon = new GIS.Drawset.Polygon(true, true, rings, 4326)
    polygon.create()

    console.log(polygon)

    // TESTING FILL SYMBOL
    let fill = new GIS.Drawset.FillSymbol("red", [128, 128, 128, 0.5], "0.5px")
    fill.create()
    console.log(fill)
}