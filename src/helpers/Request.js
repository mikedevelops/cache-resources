/**
 * Wrap XHR request in a Promise
 * @param {String} url
 * @param {String} [method='GET']
 * @return {Promise}
 */
export function Request (url, method = 'GET') {
    const request = new XMLHttpRequest()

    request.open(method, url)
    request.send()

    return new Promise((resolve, reject) => {
        request.addEventListener('load', this.handleResponse.bind(this, resolve, reject))
        request.addEventListener('error', reject)
    })
}

/**
 * Handle XHR load event
 * @param  {Function} resolve
 * @param  {Function} reject
 * @param  {Object} event
 * @return {Object}
 */
Request.prototype.handleResponse = function (resolve, reject, event) {
    const { target } = event

    // catch status 0 here, when the app is run natively in a webview in iOS
    // the XHR request will respond correctlt but will not assign a 200 status
    if (target.status === 200 || target.status === 0 && target.response) return resolve(JSON.parse(target.response))
    else return reject(target)
}
