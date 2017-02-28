# Cache Resources

A small ES6 module to cache front end image assets (audo & video coming soon). Made to work in tandem with the webpack plugin [FileCatalogue](https://github.com/mikedevelops/file-catalogue). The plugin parses a JSON file and creates a reference in the browser's cache to each asset.

### Installation

`npm install --save mikedevelops/cache-resources`


### Usage

``` javascript
import CacheResources from 'cache-resources'

const cache = new CacheResources({
    filename: 'assets.json',
    test: /\.(jpg|png|svg|jpeg)$/,
    complete: function (assets) {
        console.log('cached assets!')
    }
})
```

### Options

----

`filename: [String] (default: 'assets.json')`

The JSON file to be requested for asset parsing, you will need to manually create this file and place it in your build directory, or use this plugin to do it for you [FileCatalogue](https://github.com/mikedevelops/file-catalogue).

----

`test: [RegExp] (default: /\.jpg$/)`

A regular expression to execute against each file to determine if it should be cached or skipped.

----

### Caveats

I've not extensively tested this in all browsers, it's currently built to work in the latest Chrome 56 build. I'll be adding additional support down the line as and when it's needed. Feel free to create a Pull Request to add additional support.

### Coming Soon

- Audio file caching
- Video file caching
