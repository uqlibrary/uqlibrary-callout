# uqlibrary-callout

[![Codeship Status for uqlibrary/uqlibrary-callout](https://app.codeship.com/projects/50a31000-c2f3-0133-5d4e-7e8bd0c2c793/status?branch=master)](https://codeship.com/projects/137960)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-callout.svg)](https://david-dm.org/uqlibrary/uqlibrary-callout)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-callout/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-callout?type=dev)

A simple element that provides the markup for a UQ Library styled call out.

## Demo

For a demo and full property rundown see [GH Pages](http://uqlibrary.github.io/uqlibrary-callout/uqlibrary-callout/).

## Getting Started

Install Node.JS and run the following:

```sh
npm install -g bower web-component-tester polymer-cli
npm install
bower install
```

### Developing

- Please adhere to the Polymer code style guide provided at [Style Guide](http://polymerelements.github.io/style-guide/).
- Colors and common styles are imported (bower install) from [uqlibrary-styles](http://github.com/uqlibrary/uqlibrary-styles).
- A preview of the component can be viewed locally by running `npm start`. Use the second URL from the command output.
- GitHub pages should be updated after every commit to `master` branch by running `bin/generate-gh-pages.sh`

## Usage

- Install the uqlibrary-callout into your project directory

    ```sh
    bower install uqlibrary-callout --save
    ```

- Add the call out anywhere in your page

    ```javascript
    <uqlibrary-callout json-file="data.json"></uqlibrary-callout>
    ```

- The callout can also be given a json object

    ```javascript
    HTMLImports.whenReady(function () {
        var callout = document.querySelector('#callout');
        callout.menu = {
            "items": [
                {
                    "label": "Example",
                    "link": "https://www.example.com",
                    "linkMobile": "tel: +61400000000"
                }
            ],
            "summary": {
                "label": "View more contact options",
                "link": "https://library.uq.edu.au"
            }
        }
    });
    ```

## Testing

Run web-component-tester with `npm test` after bower update.

## Special Item Properties

- `linkMobile`: Replaces the main "link" on mobile devices
- `disabled`: Condition that determines whether the item is enabled. Currently only supports "chat-offline".
