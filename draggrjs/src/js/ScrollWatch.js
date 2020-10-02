document.doodle.sections = document.querySelectorAll('section')

window.addEventListener('scroll', function(e) {
	let body = document.querySelector('body')

	console.log(document.doodle.sections)

	if (window.scrollY) {
		body.classList.remove("at-top"); body.classList.add("is-scrolled")
	} else {
		body.classList.add("at-top"); body.classList.remove("is-scrolled")
	}

})