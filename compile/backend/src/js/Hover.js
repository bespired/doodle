import throttle from 'lodash/throttle';

/**
* Create and return the inView function.
*/
const Hover = () => {

    if (typeof window === 'undefined') return

    let rects      = []
    let topStub    = null
    let mousex     = 0
    let mousey     = 0
    let cursorx    = 0
    let cursory    = 0
    let scrollTop  = 0
    let scrollLeft = 0

    const clone = (i) => JSON.parse(JSON.stringify(i))

    const tellParent = (event) => {

        let overBar = document.querySelector('[data-bar]:hover')
        if (overBar){ topStub = overBar.dataset.bar }

        if ( !topStub ) return

        window.parent.postMessage({
            type: 'stub click',
            stub: topStub,
        })

        event.stopPropagation()
        event.preventDefault()

    }

    const getRects = (e) => {

        const stubs     = document.querySelectorAll('*[data-stub]')
        const scrollTop = e ? document.documentElement.scrollTop : 0

        rects = []
        stubs.forEach((elem) => {
            let rect = clone(elem.getBoundingClientRect())
            rect.top    += scrollTop
            rect.bottom += scrollTop
            rect.y = rect.top

            // add extra space if possible
            if (rect.left > 10 ) { rect.left -= 2; rect.right  += 2; rect.width  += 4; }
            if (rect.top  > 10 ) { rect.top  -= 2; rect.bottom += 2; rect.height += 4; }

            rects.push({
                elem: elem,
                rect: rect
            });
        })
    }

    const getId = (rect) => {
        return `id-${Math.round(rect.left)}-${Math.round(rect.top)}--${Math.round(rect.right)}-${Math.round(rect.bottom)}`
    }

    const getCursorXY = (e) => {

        mousex = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
        mousey = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop  ? document.documentElement.scrollTop  : document.body.scrollTop);

        cursorx = e.clientX
        cursory = e.clientY

        scrollTop  = e ? document.documentElement.scrollTop : 0

    }

    const applyScroll = (e) => {

        scrollLeft  = e ? document.documentElement.scrollLeft : 0
        scrollTop   = e ? document.documentElement.scrollTop : 0

        mousex = cursorx + scrollLeft
        mousey = cursory + scrollTop

    }

    const setHovers = () => {

        let overlays = []

        rects.forEach( (r) => {
            if (( mousey > r.rect.top - 15 ) && ( mousey < r.rect.bottom - 15 )){
                if (( mousex > r.rect.left ) && ( mousex < r.rect.right )){
                    overlays.push({
                        id:     getId(r.rect),
                        name:   r.elem.dataset.stub,
                        detail: r.elem.dataset.id,
                        rect:   r.rect,
                        elem:   r.elem
                    })
                }
            }
        })

        let currentOverlays = document.querySelectorAll(`[data-overlay]`)
        if ( currentOverlays !== null ){
            currentOverlays.forEach( (o) => {
                o.remove()
            })
        }

        topStub = null

        let maxZindex  = 0
        let autoZindex = 0
        let overlay    = null

        overlays.forEach( (o) => {

            overlay = document.querySelector(`[data-overlay='${o.detail}']`)

            const left   = (o.rect.left < 10 ) ? o.rect.left   : o.rect.left   - 5
            const top    = (o.rect.top  < 10 ) ? o.rect.top    : o.rect.top    - 5
            const width  = (o.rect.left < 10 ) ? o.rect.width  : o.rect.width  + 10
            const height = (o.rect.top  < 10 ) ? o.rect.height : o.rect.height + 10

            const style  = window.getComputedStyle(o.elem);

            let rules = [
                'position:absolute',
                'left: '   + left   + 'px',
                'top: '    + top    + 'px',
                'width: '  + width  + 'px',
                'height: ' + height + 'px',
            ]

            let elem = document.createElement('div')
            elem.id = o.id
            elem.style.cssText = rules.join(';')
            elem.setAttribute("data-overlay", o.detail)

            let rule = ( o.rect.top <= scrollTop + 15) ? "overlay-bar bar-inset " : "overlay-bar "
            if (( o.rect.top < scrollTop ) && ( o.rect.top > scrollTop - 200 )) { rule= "overlay-bar bar-fixed " }

            let bar = document.createElement('div')
            bar.setAttribute("class", rule + style.position)
            bar.setAttribute("data-bar", o.detail)

            bar.innerHTML = o.detail
            elem.appendChild(bar)

            document.body.appendChild(elem)

            let elemZindex = style.zIndex
            if ( elemZindex === 'auto' ){
                autoZindex++
                elemZindex = autoZindex
            }else{
                elemZindex = parseInt(elemZindex)
            }

            if ( elemZindex > maxZindex ){
                maxZindex = elemZindex
                topStub = o.detail
            }

        })

        if (overlays.length) document.body.classList.add('pointer');
        else document.body.classList.remove('pointer');


    }

    const isHover = throttle((e) => {
        getCursorXY(e)
        applyScroll(e)
        setHovers()
    }, 100);

    const newRects = throttle((e) => {
        getRects(e)
        applyScroll(e)
        setHovers()
    }, 100);

    document.onmousemove = isHover
    document.onscroll    = newRects
    document.onresize    = newRects
    document.onclick     = tellParent

    getRects()

};

// Export a singleton.
export default Hover()
