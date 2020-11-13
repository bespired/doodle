/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/

class HoudiniRegistry {

    constructor({elements, selector}) {
        this.elements = elements
        this.intersections = []
        this.selector = selector.replace('[','').replace(']','')

        this.elements.forEach(el => {
            const attr = el.getAttribute(this.selector)
            el.intersections = this.decodeHoudini(attr)
        })
    }


    decodeHoudini(attr){
        let intersections = []

        const list = attr.replaceAll(' ','').split(',')
        console.log(list)

        list.forEach((l)=>{

            let [scroll, action] = l.split('[')
            let [from, to] = scroll.split('->')
            action= action.replace(']','')

            let intersection = {
                top     : parseInt(from) / 100.0,
                bottom  : parseInt(to)   / 100.0,
                distance: (parseInt(to) - parseInt(from)) / 100.0,
            }

            let [dim, values] = action.split('=')
            let [xfrom, xto] = values.split('->')

            intersection[`${dim}s`] = parseInt(xfrom)
            intersection[`${dim}e`] = parseInt(xto)
            intersection[`${dim}d`] = parseInt(xto) - parseInt(xfrom)

            intersections.push(intersection)

        })

        return intersections
    }

    /**
    * Check each element in the registry, if an element
    * changes states, fire an event and operate on current.
    */
    check() {
        this.elements.forEach(el => {

            let cl= el.closest('section');
            const clrect= cl.getBoundingClientRect();
            const { top, bottom, width, height } = el.getBoundingClientRect();

            const sY = window.scrollY
            const wH = window.innerHeight
            const sH = clrect.height
            const sT = clrect.top
            const oT = cl.offsetTop
            const tD = wH + sH

            const sC = -(oT-wH-sY)
            const cF = Math.max(Math.min(sC / (wH + sH), 1), 0)

            const swTop = sT + wH
            const intersections = el.intersections

            // intersections.push({
            //     top     : .41,
            //     bottom  : .60,
            //     distance: .19,
            //     pxs     :   0,
            //     pxe     :  25,
            //     pxd     :  25,
            // })

            let xv= 0
            let yv= 0
            let sc= 1
            let rt= 0

            intersections.forEach((i)=>{
                let relF = (cF-i.top) / i.distance
                let scrollFactor= (cF - i.top) / i.distance

                if (i.pxs !== undefined){
                    xv= i.pxs
                    if ((cF > i.top) && (cF < i.bottom)){
                        xv= i.pxs + relF * i.pxd
                    }else if ( cF > i.bottom ) {
                        xv= i.pxe
                    }
                }
                if (i.pys !== undefined){
                    yv= i.pys
                    if ((cF > i.top) && (cF < i.bottom)){
                        yv= i.pys + relF * i.pyd
                    }else if ( cF > i.bottom ) {
                        yv= i.pye
                    }
                }
                if (i.rts !== undefined){
                    rt= i.rts
                    if ((cF > i.top) && (cF < i.bottom)){
                        rt= i.rts + relF * i.rtd
                    }else if ( cF > i.bottom ) {
                        rt= i.rte
                    }
                }

                // if (i.scs !== undefined){
                //     sc= i.scs
                //     if ((cF > i.top) && (cF < i.bottom)){
                //         sc= i.scs + relF * i.scd
                //     }else if ( cF > i.bottom ) {
                //         sc= i.sce
                //     }
                // }

            })

            let t = `rotate(${rt}deg) translate(${xv}vw,${yv}vh) `
            el.style.transform = t;

        });
        return this;
    }

}

export default (elements) => new HoudiniRegistry(elements);
