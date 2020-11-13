import throttle       from 'lodash/throttle'
import Registry       from './registry'

/**
* Create and return the inView function.
*/
const Houdini = () => {

    /**
    * Fallback if window is undefined.
    */
    if (typeof window === 'undefined') return

    /**
    * How often and on what events we should check
    * each registry.
    */
    const interval = 60;
    const triggers = ['scroll', 'resize', 'load']

    /**
    * Maintain a hashmap of all registries, a history
    * of selectors to enumerate.
    */
    let selectors = { history: [] };

    /**
    * Check each registry from selector history,
    * throttled to interval.
    */
    const check = throttle(() => {
        selectors.history.forEach(selector => {
            selectors[selector].check();
        });
    }, interval);

    /**
    * For each trigger event on window, add a listener
    * which checks each registry.
    */
    triggers.forEach(event =>
        addEventListener(event, check));

    /**
    * If supported, use MutationObserver to watch the
    * DOM and run checks on mutation.
    */
    if (window.MutationObserver) {
        addEventListener('DOMContentLoaded', () => {
            new MutationObserver(check)
                .observe(document.body, { attributes: true, childList: true, subtree: true })
        });
    }

    /**
    * The main interface. Take a selector and retrieve
    * the associated registry or create a new one.
    */
    let control = (selector) => {

        if (typeof selector !== 'string') return;

        // Get an up-to-date list of elements.
        let elements = [].slice.call(document.querySelectorAll(selector))


        // If the registry exists, update the elements.
        if (selectors.history.indexOf(selector) > -1) {
            selectors[selector].elements = elements
        }

        // If it doesn't exist, create a new registry.
        else {

            selectors[selector] = Registry({elements, selector})
            selectors.history.push(selector)

        }

        return selectors[selector]
    };

    return control

};

// Export a singleton.
export default Houdini()
