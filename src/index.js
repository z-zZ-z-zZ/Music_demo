/* 引入核心库 */
import React from 'react';
/* 引入DOM库 */
import ReactDom from 'react-dom';

import './assets/css/reset.css';
import './assets/js/rem'
/* 要渲染的组件 */
import App from './App'

/* 引入路由模式 */
import { BrowserRouter } from 'react-router-dom'

ReactDom.render(<BrowserRouter><React.StrictMode>
    <App /></React.StrictMode></BrowserRouter>, document.getElementById('root'))

