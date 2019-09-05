import React from 'react';
import { render } from 'react-dom';
import App from './app';
import '@less/global/index.less'
import '@less/components/index.less'
import '@less/pages/index.less'
render(<App />, document.getElementById('app'))