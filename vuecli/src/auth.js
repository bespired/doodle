/* eslint-disable import/prefer-default-export */
import * as Cookies from 'tiny-cookie';

const auth = {
    parsedToken: null,

    requireAuth(to, from, next) {

        if (!auth.isAuthenticated()) {

            localStorage.setItem('doodle.intended', to.path);
            next({path: '/remotelogin'});


        } else {

            next();

        }

    },

    setToken(token, expiration) {
        Cookies.set('token', token, {domain: window.location.hostname});
        Cookies.set('token_expiration', expiration, {domain: window.location.hostname});
    },

    getToken() {
        const token = Cookies.get('token');
        const expiration = Cookies.get('token_expiration');

        if (!token || !expiration) {
            return null;
        }

        if (Date.now() > parseInt(expiration, 10)) {
            this.destroyToken();
            return null;
        }

        return token;
    },

    destroyToken() {
        Cookies.remove('token');
        Cookies.remove('token_expiration');
    },

    isAuthenticated() {
        if (auth.getToken()) {
            return true;
        }

        return false;
    },

    getRole() {
        if (!this.parsedToken) {

            let token = this.getToken();

            if (!token) {
                return null;
            }

            this.parsedToken = this.parseToken(token);

        }

        return this.parsedToken ? this.parsedToken.role : null;
    },

    parseToken(token) {
        try {
            return JSON.parse(this.b64DecodeUnicode(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    },

    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
    }
};

export default auth;