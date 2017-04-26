import babelPolyfill from "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import Index from './index';

import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("react-root");
ReactDOM.render(<Index />, reactRoot);


