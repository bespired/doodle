export default class DoodleApi {

    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/api`
    }

    getRowTemplates() {
        return axios.get(`${this.baseUrl}/rowtemplates/index`).then( response => response.data )
    }

}
