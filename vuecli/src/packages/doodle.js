export default class ScoreApi {

    constructor() {
 		this.client  = null
        this.project = null
        this.baseUrl = null
    }

    setCredentials(clientId, projectId){
 		this.client  = clientId
        this.project = projectId
        this.baseUrl = process.env.VUE_APP_SERVICES_LOCATION + `/_/doodle`

    }

    getConnections() {
        return axios.get(`${this.baseUrl}/connection/test`).then( response => response.data )
    }

    getDifferences() {
        return axios.get(`${this.baseUrl}/database/differences`).then( response => response.data )
    }

}
