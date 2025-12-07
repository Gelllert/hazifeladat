/**
 * Service worker osztálya.
 */
class Pwa {
    #serviceWorkerRegistration?: ServiceWorkerRegistration;
    constructor() {
        if (isSecureContext) {
            (async () => {
                this.#serviceWorkerRegistration = await navigator.serviceWorker.register("sw.js", {updateViaCache: 'none'});
            })();
        }
    }
}
export const pwa = new Pwa();