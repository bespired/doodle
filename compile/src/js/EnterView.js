import inView from './inView/index.js'

inView('section')
	.on('enter', el => {
        el.classList.add("will-change");
    })
	.on('exit', el => {
        el.classList.remove("will-change");
    })

inView('[data-houdini]', { top: -200, bottom: 200 })
	.on('enter', el => {
        el.classList.add("active");
    })
	.on('exit', el => {
        el.classList.remove("active");
    })
