Demo: To help illustrate the project I have published it using GitHub Pages. As the app uses React Router, the routes break the app if you manually refresh your page whilst exploring the app. If you don't refresh or manually target an endpoint, React Router does work. This is just a limitation of GitHub Pages. If you know a solution to this, please let me know. The link to the project is: https://marklewis01.github.io/react-materialui-starter/

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Overview](#overview)
- [Libraries Used](#libraries-used)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)

## Overview

This project is based off an ongoing app which I am developing, minus any proprietary bits. I'm keeping this generic copy here as a starter and/or reference for others wanting to build using similar libraries. I am still learning so I do not propose this to be production-ready code.

I'd be thrilled for any feedback/advice/improvements on the code.

## Packages / Libraries Used

- React Router
- MobX
  - So far this dashboard could be built without any 3rd-party state management system, however for practice, I have begun integration of [Mobx](https://mobx.js.org/).
- ~~React-Semantic-UI~~
  - ~~The [React-Semantic-UI](http://react.semantic-ui.com) package has been used in an effort to get started faster. For this dashboard I have just linked to the Semantic UI stylesheet via a CDN link in the index.html file, however you can create your own theme and include it in your project by using the [Semantic UI CSS package](https://react.semantic-ui.com/usage#semantic-ui-css-package). Just a note, the CSS package is _HUGE_. Before a production-ready app is released, you should take steps to strip-back and remove unused components.~~
- Material-UI (v1.0.0)
  - This project started with React-Semantic-UI, however I am rebuilding it currently to use the newly released [Material-UI](https://material-ui.com). So far, it is so much more enjoyable to work with, simply for reason custom styling can easily injected to each element. _I hope to build a theme for this project, in the interim, the injected styles are a quick solution, though I'm not thrilled using them due to potential lack of consistencies._
- React-toastify
  - A super simple and quick way to get a toast message system into the dashboard. [React-toastify](https://fkhadra.github.io/react-toastify/).
- Mobx React DevTools
  - For dev purposes. _Note:_ mobx-react-devtools is currently installed as a dependency and not a dev-dependency. This is for CodeSandbox only, and this package should be moved to a dev dependency for any other purpose.

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

- `npm start`
- `npm test`
- `npm run build`

## Something Missing?

If you have improvements or ideas for additional base functionality, please contribute via a PR.
