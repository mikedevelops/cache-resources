import { Request } from './helpers/Request'

const CacheResources = function (options) {
    // Plugin default options
    const defaults = { 
        test: /\.(jpg|jpeg|png|svg|gif|mp4)$/, 
        filename: 'assets.json', verbose: false 
    }
    // merge instantiation options with defaults
    this.config = Object.assign({}, defaults, options)
    // define media types
    this.types = {
        image: { 
            extension: ['jpg', 'jpeg', 'png', 'svg', 'gif'],
            method: this.cacheImage
        },
        video: {
            extension: ['mp4'],
            method: this.cacheVideo
        }
    }
    // Get assets
    const assets = new Request(this.config.filename)
    .then(res => this.handleAssets.call(this, JSON.parse(res)))
    .catch(err => { 
        console.log(err)
        // throw new Error(err) 
    })
}

/**
 * Handle successful assets
 * @param  {Object} response
 */
CacheResources.prototype.handleAssets = function (response) {
    // send assets to be cached
    this.dispatchCacheMethod(this.buildAssets(response))
}

/**
 * Filter assets returned in the reposnse object
 * @param  {Object} response
 * @return {Array}
 */
CacheResources.prototype.buildAssets = function (response) {
    return response.assets.reduce((assets, asset) => {
        const re = this.filterAsset(asset)

        if (re) assets.push({ file: re.input, method: this.getMediaType(re[1]) })
        return assets
    }, [])
}

CacheResources.prototype.getMediaType = function (extension) {
    for (let type in this.types) {
        const media = this.types[type]
        if (media.extension.find(ext => ext === extension)) return media.method
    }
}

/**
 * Filter single asset against RegExp in config
 * @param {String} asset
 */
CacheResources.prototype.filterAsset = function (asset) {
    return this.config.test.exec(asset)
}

/**
 * Call cache method on resources
 * @param  {Array} assets
 */
CacheResources.prototype.dispatchCacheMethod = function (assets) {
    assets.forEach(asset => asset.method.call(this, asset.file))

    typeof this.config.complete === 'function' 
        && this.config.complete.call(this, assets.map(asset => asset.file))
}

/**
 * Cache Images
 * @param {String} image src
 **/
CacheResources.prototype.cacheImage = function (image) {
    const node = new Image()
    node.src = image
}

/**
 * Cache videos and call load
 * @param {String} video src
 **/
CacheResources.prototype.cacheVideo = function (video) {
    const node = document.createElement('video')
    node.src = video
}

module.exports = CacheResources
