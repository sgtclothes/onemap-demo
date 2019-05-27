export class esriConfig {
    constructor() {
        this.ProxyUrl = "http://localhost/lls/jsapp/PHP/proxy.php"
        this.UrlPrefix = "tig.co.id"
    }

    setUrlUtils() {
        ESRI.urlUtils.addProxyRule({
            urlPrefix: this.UrlPrefix,
            proxyUrl: this.ProxyUrl
        });
    }
}