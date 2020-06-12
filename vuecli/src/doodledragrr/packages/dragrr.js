export default class DoodleApi {

    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    }

    getTemplates(type) {
        return axios.get(`${this.baseUrl}/templates/${type}/index`).then( response => response.data )
    }

    saveTemplates(type, payload) {
        return axios.post(`${this.baseUrl}/templates/${type}/save`, payload)
    }
}
