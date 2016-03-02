[ ![Codeship Status for uqlibrary/uqlibrary-callout](https://codeship.com/projects/50a31000-c2f3-0133-5d4e-7e8bd0c2c793/status?branch=master)](https://codeship.com/projects/137960)

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
                "link": "http://faq.com",
                "linkMobile": "tel: +61235611"
            }
        ],
        "summary": {
            "label": "View more contact options",
            "link": "http://library.uq.edu.au"
        }
    }
});
```

## Special Item Properties
- linkMobile: Replaces the main "link" on mobile devices
- disabled: Condition that determines whether the item is enabled. Currently only supports "chat-offline"
