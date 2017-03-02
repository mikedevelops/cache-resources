import CacheResources from './CacheResources'

import dogJpeg from '../assets/images/dog.jpg'
import dogPng from '../assets/images/dog.png'
import dogSvg from '../assets/images/dog.svg'
import videoMp4 from '../assets/videos/video.mp4'

const output = document.getElementById('output')

const cacheAssets = new CacheResources({
    test: /\.(jpg|png|svg|jpeg|mp4)$/,
    complete: function (assets) {
        output.innerHTML = printAssets(assets)
    }
})

function printAssets (assets) {
    return assets.reduce((assetString, asset) => {
        return assetString += `\n- ${asset}`
    }, 'Assets cached...\n')
}
