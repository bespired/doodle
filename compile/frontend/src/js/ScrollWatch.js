window.addEventListener('scroll', function(e) {
	let body = document.querySelector('body')

	// console.log( window.scrollY )

	if (window.scrollY) {
		body.classList.remove("at-top"); body.classList.add("is-scrolled")
	} else {
		body.classList.add("at-top"); body.classList.remove("is-scrolled")
	}

})

