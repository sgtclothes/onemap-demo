function boot(GIS) {
  // TESTING CUSTOM LAYER
  let map = new GIS.Map([-118.2, 34]);
  map.setBasemap("dark-gray")
  map.render();

  const serviceUrl = "https://services1.arcgis.com/QKasy5M2L9TAQ7gs/ArcGIS/rest/services/At_Risk_CT2010_pts/FeatureServer/0"
  
  let symbol = new GIS.Drawset.SimpleMarkerSymbol("circle","","10px",[128, 128, 128],0.5)

  let customLayer = new GIS.Layer.CustomLayer("simple",symbol.create())

  customLayer.setColorVisVar("color","ACSPOVINDX","SIZE",0.33,"#FFFCD4",0.53,"#0D2644")

  let render = customLayer.render()
  let featurelayer = new GIS.Layer.FeatureLayer(map.ObjMap,render)
  featurelayer.setUrl(serviceUrl)
  featurelayer.render()
}