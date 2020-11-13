export default class DraggrApi {

    constructor() {
        this.apiUrl  = `${window.location.protocol}//${window.location.hostname}/api`
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}`
    }

    getSettings(type) {
        return axios.get(`${this.apiUrl}/settings/${type}/index`).then( response => response.data )
    }

    getTemplates(type) {
        return axios.get(`${this.apiUrl}/templates/${type}/index`).then( response => response.data )
    }

    createTemplate(type) {
        return axios.get(`${this.apiUrl}/templates/${type}/schema`)
    }

    loadOtml(pathslug) {
        return axios.get(`${this.baseUrl}/${pathslug}`).then( response => response.data )
    }

    loadDson(pathslug, language) {
        if (language === undefined) language = 'en'
        return axios.get(`${this.apiUrl}/dson/${language}/${pathslug}`).then( response => response.data )
    }

    loadSchema(pathslug, language) {
        return axios.get(`${this.apiUrl}/template/widget/${pathslug}`).then( response => response.data )
    }

    duplicateTemplates(type, handles) {
        return axios.post(`${this.apiUrl}/templates/${type}/duplicate`, {handles:handles})
    }

    saveTemplates(type, payload) {
        return axios.post(`${this.apiUrl}/templates/${type}/save`, payload)
    }

    deleteTemplates(type, handles) {
        return axios.post(`${this.apiUrl}/templates/${type}/delete`, {handles:handles})
    }

    exportTemplates(type, handles) {
        return axios.post(`${this.apiUrl}/templates/${type}/export`, {handles:handles})
    }

}
