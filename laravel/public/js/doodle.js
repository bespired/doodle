function doodleCookie(id) {
	var expDate = new Date();
	expDate.setFullYear(expDate.getFullYear() + 1);
  	document.cookie = 'ovid='+id+';expires='+expDate.toUTCString()+';path=/;SameSite=Lax;';
  	localStorage.setItem('doodle.ovid', id);
}

document.doodle = document.doodle || {};
document.doodle.visitorId = document.querySelector("meta[property='visitor']").getAttribute('content')

// if localStorage disagrees, use localStorage
document.doodle.lsvid = localStorage.getItem("doodle.ovid");
if ( document.doodle.lsvid !== document.doodle.visitorId ){
	if ( document.doodle.lsvid !== null ) {
		// tell home we changed it back
		document.doodle.visitorId = document.doodle.lsvid
	}
}

console.log('visitor id:', document.doodle.visitorId)

doodleCookie(document.doodle.visitorId)