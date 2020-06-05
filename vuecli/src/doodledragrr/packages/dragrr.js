export default class DoodleApi {

    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    }

    getTemplates(type) {
        return axios.get(`${this.baseUrl}/templates/${type}/index`).then( response => response.data )
    }

}
