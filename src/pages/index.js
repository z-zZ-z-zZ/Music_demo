import React from 'react';

import Recommend from '../views/recommend';
import Hot from '../views/hot';
import Search from '../views/search'

import '../assets/css/index.css'

import { Switch, Route, Redirect, NavLink } from 'react-router-dom'

class Index extends React.Component {
    render() {
        return (<div className='index'>
            <div className='title'>
                <h1>音乐播放器</h1>
                <span>下载APP</span>
            </div>
            <div className='navBar'>
                <NavLink to='/index/recommend' activeClassName='active'><span>推荐音乐</span></NavLink>
                <NavLink to='/index/hot' activeClassName='active'><span>热歌榜</span></NavLink>
                <NavLink to='/index/search' activeClassName='active'><span>搜索</span></NavLink>
            </div>
            <Switch>
                <Route path='/index/recommend' component={Recommend}></Route>
                <Route path='/index/hot' component={Hot}></Route>
                <Route path='/index/search' component={Search}></Route>
                <Redirect to='/index/recommend'></Redirect>
            </Switch>
        </div>)
    }
}

export default Index