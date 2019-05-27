import * as Drawset from './drawset.js'
import Config from './config.js'
import MapClass from './map.js'
import * as Layout from './layout.js'
import * as Helper from './helper.js'
import * as Widgets from './widgets.js'
import * as Task from './task.js'
import * as Services from './services.js'
import * as Layer from './layer.js'
import Analysis from './analysis.js'
import * as Buffer from './buffer.js'
import * as Proxy from './proxy.js'
import * as Area from './draw/area.js'
import * as Coords from './draw/coords.js'
import * as Point from './draw/point.js'
import * as Site from './draw/site.js'

let Map = MapClass
Map.Layout = Layout
Map.Helper = Helper
Map.Widgets = Widgets

export { Drawset, Config, Map, Task, Services, Layer, Analysis, Buffer, Proxy, Area, Point, Coords, Site }