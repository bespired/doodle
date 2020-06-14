export default class DoodleApi {

    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    }

    getTemplates(type) {
        return axios.get(`${this.baseUrl}/templates/${type}/index`).then( response => response.data )
    }

    createTemplate(type) {
        return axios.get(`${this.baseUrl}/templates/${type}/schema`)
    }

    saveTemplates(type, payload) {
        return axios.post(`${this.baseUrl}/templates/${type}/save`, payload)
    }

    deleteTemplates(type, handles) {
        return axios.post(`${this.baseUrl}/templates/${type}/delete`, {handles:handles})
    }

    exportTemplates(type, handles) {
        return axios.post(`${this.baseUrl}/templates/${type}/export`, {handles:handles})
    }
}
