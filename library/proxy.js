export class esriConfig {
    constructor() {
        this.ProxyUrl = "http://localhost/demo-onemap/PHP/proxy.php"
        this.UrlPrefix = "tig.co.id"
    }

    setUrlUtils() {
        ESRI.urlUtils.addProxyRule({
            urlPrefix: this.UrlPrefix,
            proxyUrl: this.ProxyUrl
        });
    }
}