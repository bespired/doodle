export default class PageLoad {

    constructor() {
        this.location = `${window.location.protocol}//${window.location.hostname}`
    }

    fixHtml(html) {

        let regex = ''
        let subst = ''
        let inject= ''

        regex = /( href="\/fav)/gm
        subst = ` href="${this.location}/fav`
        html  = html.replace(regex, subst)

        regex = /(\ src="js\/|\ src="\/js\/|\ src="\.\/js\/)/gm
        subst = ` src="${this.location}/js/`
        html  = html.replace(regex, subst)

        regex = /(\ href="css\/|\ href="\/css\/|\ href="\.\/css\/)/gm
        subst = `href="${this.location}/css/`
        html  = html.replace(regex, subst)

        subst= `        <script type="text/javascript" src="${this.location}/js/dragrr.js"></script>`
        inject= "\n" + subst + "$1"
        regex = /([\s]*<\/body>)/gm;
        html = html.replace(regex, inject);

        subst= `        <link rel="stylesheet"href="${this.location}/css/backend.css" >`
        inject= "\n" + subst + "$1"
        regex = /([\s]*<\/head>)/gm;
        html = html.replace(regex, inject);

        return html;


    }

}
