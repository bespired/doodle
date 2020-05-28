/* eslint no-useless-escape: 0 */  // --> OFF
export default {

	set(){

		if (this.lock !== undefined ) return

		let keys=[
			'ABCDEFGHIJKLM',
			'NOPQRSTUVWXYZ',
			'abcdefghijklm',
			'nopqrstuvwxyz',
			'0123456789+/=',
		]
		this.key = keys.join('')

		const dt= new Date()
		const d= [
			dt.getDay()       % 12,
			dt.getDate()      % 11,
			(dt.getMonth()+1) % 10,
			dt.getFullYear()  %  9,
			dt.getDay()       %  8,
		]
		for(let r=0; r<5; r++){
			keys[r] = keys[r].substr(d[r]) + keys[r].substr(0,d[r])
		}
		this.lock = keys.join('').split('')
	},

	atou(b64){
		return decodeURIComponent(escape(atob(b64)));
	},

	utoa(data){
		return btoa(unescape(encodeURIComponent(data)));
	},

	encrypt(data){
		this.set()
		const key  = this.key
		const lock = this.lock
		const bits = data.split('')

		let encryped = ''
		bits.forEach((bit)=>{
			let k = key.indexOf(bit)
			encryped += lock[k]
		})

		return encryped
	},

	model(data){

		let encryped= {
			encryped: true
		}

		Object.keys(data).forEach((key)=>{
			encryped[key] = '*' + this.encrypt( this.utoa(data[key]) ) + '*'
		})

		return encryped
	},

};
