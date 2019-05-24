export default class GlobalService {
    constructor(router) {
        this._router = router;
    }

    storage(message, alerts, url) {
        localStorage.setItem('message', message)
        localStorage.setItem('alerts', JSON.stringify(alerts))
        this._router.push(url)
    }
}