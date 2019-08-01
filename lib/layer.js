export class FeatureLayer {
  constructor(map, renderer, popupTemplate, url) {
    this.Map = map;
    this.Url = url;
    this.Renderer = renderer;
    this.OutFields = ["*"];
    this.PopupTemplate = popupTemplate;
    this.MinScale = 0;
    this.MaxScale = 0;
  }

  render() {
    let featureLayer = new ESRI.FeatureLayer({
      url: this.Url,
      renderer: this.Renderer,
      outFields: this.OutFields,
      popupTemplate: this.PopupTemplate,
      minScale: this.MinScale,
      maxScale: this.MaxScale
    });

    this.Map.add(featureLayer);
  }

  setUrl(url) {
    this.Url = url;
  }

  setRenderer(renderer) {
    this.Renderer = renderer;
  }

  setOutFields(outFields) {
    this.OutFields = outFields;
  }

  setPopupTemplate(popupTemplate) {
    this.PopupTemplate = popupTemplate;
  }

  setMinScale(minScale) {
    this.MinScale = minScale;
  }

  setMaxScale(maxScale) {
    this.MaxScale = maxScale;
  }
}

export class SceneLayer {
  constructor() {
    this.Construct = "this is scenelayer";
  }

  create() {
    return this.Construct;
  }
}

export class CustomLayer {
  constructor(typeSym, symbol) {
    (this.TypeSym = typeSym), (this.Symbol = symbol);
  }
  render() {
    return {
      type: this.TypeSym,
      symbol: this.Symbol,
      visualVariables: this.ColorVisVar
    };
  }
  setColorVisVar(
    type,
    field,
    normalizationField,
    stopsValueOne,
    stopsColorOne,
    stopsValueTwo,
    stopsColorTwo
  ) {
    this.Type = type;
    this.Field = field;
    this.NormalizationField = normalizationField;
    this.StopsValueOne = stopsValueOne;
    this.StopsColorOne = stopsColorOne;
    this.StopsValueTwo = stopsValueTwo;
    this.StopsColorTwo = stopsColorTwo;
    return (this.ColorVisVar = {
      type: this.Type,
      field: this.Field,
      normalizationField: this.NormalizationField,
      stops: [
        {
          value: this.StopsValueOne,
          color: this.StopsColorOne
        },
        {
          value: this.StopsValueTwo,
          color: this.StopsColorTwo
        }
      ]
    });
  }
}

export class ServiceLayer {
  constructor(map, url, popupTemplate) {
    this.Map = map;
    this.Url = url;
    this.MinScale = 0;
    this.MaxScale = 0;
    this.PopupTemplate = popupTemplate;
  }

  render() {
    let featureLayer = new ESRI.FeatureLayer({
      url: this.Url,
      minScale: this.MinScale,
      maxScale: this.MaxScale,
      popupTemplate: this.PopupTemplate
    });
    this.Map.add(featureLayer);
  }

  setMinScale(minScale) {
    this.MinScale = minScale;
  }

  setMaxScale(maxScale) {
    this.MaxScale = maxScale;
  }

  setPopupTemplate(popupTemplate) {
    this.PopupTemplate = popupTemplate;
  }
}
