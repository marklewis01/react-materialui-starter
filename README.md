Demo: https://codesandbox.io/s/github/marklewis01/react-mobx-semantic-dashboard-starter

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

* [Overview](#overview)
* [Libraries Used](#libraries-used)
* [Folder Structure](#folder-structure)
* [Available Scripts](#available-scripts)

## Overview

This project is based off an ongoing app which I am developing, minus any proprietary bits. I'm keeping this generic copy here as a starter and/or reference for others wanting to build using similar libraries. I am still learning so I do not propose this to be production-ready code.

I'd be thrilled for any feedback/advice/improvements on the code.

## Packages / Libraries Used

* React Router
* MobX
  * So far this dashboard could be built without any 3rd-party state management system, however for practice, I have begun integration of [Mobx](https://mobx.js.org/).
* React-Semantic-UI
  * The [React-Semantic-UI](http://react.semantic-ui.com) package has been used in an effort to get started faster. For this dashboard I have just linked to the Semantic UI stylesheet via a CDN link in the index.html file, however you can create your own theme and include it in your project by using the [Semantic UI CSS package](https://react.semantic-ui.com/usage#semantic-ui-css-package). Just a note, the CSS package is _HUGE_. Before a production-ready app is released, you should take steps to strip-back and remove unused components.
* React-toastify
  * A super simple and quick way to get a toast message system into the dashboard. [React-toastify](https://fkhadra.github.io/react-toastify/).
* Mobx React DevTools
  * For dev purposes. _Note:_ mobx-react-devtools is currently installed as a dependency and not a dev-dependency. This is for CodeSandbox only, and this package should be moved to a dev dependency for any other purpose.

## Folder Structure

Folder structures can be subjective - below is the current structure implemented.

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      App.css
      App.js
    containers/
    semantic/
    stores/
    utils/
    index.js
```

I'm in the process of moving the 'view/layout' components into their own directory for clarity. The target directory is currently `./src/containers/`, however this may be renamed to `./src/views/` in time.

## Available Scripts

As this project is based on [Create React App](https://github.com/facebookincubator/create-react-app), those scripts remain available for use. In the project directory, you can run:

* `npm start`
* `npm test`
* `npm run build`

## Something Missing?

If you have improvements or ideas for additional base functionality, please contribute via a PR.
