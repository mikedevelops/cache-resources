import { Request } from './helpers/Request'

const CacheResources = function (options) {
    // Plugin default options
    const defaults = { test: /\.jpg$/, filename: 'assets.json', verbose: false }
    // merge instantiation options with defaults
    this.config = Object.assign({}, defaults, options)
    // Get assets
    const assets = new Request(this.config.filename)
    .then(res => this.handleAssets.call(this, res))
    .catch(err => { 
        throw new Error(err) 
    })
}

/**
 * Handle successful assets
 * @param  {Object} response
 */
CacheResources.prototype.handleAssets = function (response) {
    // send assets to be cached
    this.cacheAssets(this.buildAssets(response))
}

/**
 * Filter assets returned in the reposnse object
 * @param  {Object} response
 * @return {Array}
 */
CacheResources.prototype.buildAssets = function (response) {
    return response.assets.filter(this.filterAsset.bind(this))
}

/**
 * Filter single asset against RegExp in config
 * @param {String} asset
 */
CacheResources.prototype.filterAsset = function (asset) {
    return this.config.test.exec(asset)
}

/**
 * Cache assets
 * @param  {Array} assets
 * @return {[type]}
 */
CacheResources.prototype.cacheAssets = function (assets) {
    assets.forEach(asset => {
        // TODO cache, video & audio
        const img = new Image()
        img.src = asset
    })

    typeof this.config.complete === 'function' && this.config.complete.call(this, assets)
}

module.exports = CacheResources
