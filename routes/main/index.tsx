import React from 'react';
import { render } from 'react-dom';
import App from './app';
import '_less/global/index.less'
import '_less/components/index.less'
import '_less/pages/index.less'

render(<App />, document.getElementById('app'))