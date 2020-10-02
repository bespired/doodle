import inView from 'in-view'

inView('section')
	.on('enter', el => {
        el.classList.add("will-change");
    })
	.on('exit', el => {
        el.classList.remove("will-change");
    })