export default class PusherApi {

    constructor() {
        this.appkey  =  null
        this.api     =  null
        this.channel = {}
    }


    addEvent(context, params){
        if ( params === undefined  || params.appkey === undefined ){
            console.error('No Pusher key set in VUE_APP_PUSHER_APP_KEY ?')
            return;
        }

        Pusher.logToConsole = true;

        this.appkey = params.appkey

        if ( this.api === null ){
            this.api = new Pusher( this.appkey, {
                cluster: 'eu',
                forceTLS: true
            });
        }

        if ( this.channel[params.channel] === undefined ){
             this.channel[params.channel] = {
                name   : params.channel,
                channel: this.api.subscribe(params.channel),
                event  : {}
             }
        }

        if ( this.channel[params.channel].event[params.event] === undefined ){
             this.channel[params.channel].event[params.event] = {
                name  : params.event,
                event : this.channel[params.channel].channel.bind(params.event, function(data) {
                    console.log( `context.commit('${params.event}', "${data.message}")`);
                    context.commit(params.event, data.message)
                })
            }
        }

    }

}
