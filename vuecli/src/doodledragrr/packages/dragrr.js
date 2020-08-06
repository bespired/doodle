export default class DraggrApi {

    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    }

    getSettings(type) {
        return axios.get(`${this.baseUrl}/settings/${type}/index`).then( response => response.data )
    }

    getTemplates(type, area) {
        let fulltype = ( area === undefined ) ? type : `${type}--${area}`
        return axios.get(`${this.baseUrl}/templates/${fulltype}/index`).then( response => response.data )
    }

    createTemplate(type, area) {
        let fulltype = ( area === undefined ) ? type : `${type}--${area}`
        return axios.get(`${this.baseUrl}/templates/${fulltype}/schema`)
    }

    duplicateTemplates(type, handles) {
        return axios.post(`${this.baseUrl}/templates/${type}/duplicate`, {handles:handles})
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
