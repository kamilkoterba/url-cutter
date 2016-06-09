## URL Cutter

This is simple page that shortens URLs.

## Implementation details

* Code for querying API and servicing results to form is written in pure JavaScript with no dependencies to any libraries or frameworks 
* All images size optimized
* Page responsiveness implemented
* Size needed to download before first paint is less than 14k - page should be ready to interact below 1s on most of connections
* JavaScript code style guidelines is using [Airbnb](https://github.com/airbnb/javascript) stadards
* CSS selectors are using [BEM](http://getbem.com/introduction/) convention

## Demo

http://kamilkot.idl.pl/urlCutter

## Further development steps
* Verify with UX team implemented font sizes
* Add SCSS support and split CSS files to managable modules and reuse colors
* Style language dropdown according to designs
* Add unit tests for urlCutter.js
* Add gulp/grunt assets minifier
* Add i18n support
* Introduce local caching of requested values to limit number of requests to server
