# uqlibrary-callout

A simple element that provides the markup for a UQ Library styled call out. 

## Demo

For a demo and full property rundown see [GH Pages](http://uqlibrary.github.io/uqlibrary-callout).

## Usage
- Install [npm](https://nodejs.org/en/download/)
- Install bower
```sh
npm install bower -g
```
- Install the uqlibrary-callout into your project directory
```sh
bower install uqlibrary-callout --save
```
- Add the call out anywhere in your page
```sh
<uqlibrary-callout json-file="data.json"></uqlibrary-callout>
```
- The callout can also be given a json object
```sh
HTMLImports.whenReady(function () {
    var callout = document.querySelector('#callout');
    callout.menu = {
        "items": [
            {
                "label": "FAQ",
                "link": "http://faq.com"
            }
        ],
        "summary": {
            "label": "View more contact options",
            "link": "http://library.uq.edu.au"
        }
    }
});
```

## Special Options
- 
