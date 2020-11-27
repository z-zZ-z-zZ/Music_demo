import React from 'react';
import '../../assets/css/search.css'
import { getHotSearch, getSearch } from '../../utils/axios'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchWord: [],
            searchList: []
        }
        this.inputVal = React.createRef();
    }
    /* 组件加载调取热搜词的接口 */
    componentDidMount() {
        getHotSearch().then((res) => {
            if (res.code === 200) {
                this.setState({
                    searchWord: res.data.filter((item, i) => i < 10),
                });
            }
        });
    }

    /* 搜索内容 */
    searchVal(keywords) {
        this.inputVal.current.value = keywords;
        getSearch({ keywords }).then((res) => {
            if (res.code === 200) {
                this.setState({
                    searchList: res.result.songs.filter((item, i) => i < 10),
                })
            }
        });
    }
    /* 跳转到播放 */
    toPlay(id) {
        this.props.history.push(`/play?id=${id}`)
    }
    /* 键盘回车事件 */
    enter(e) {
        if (e.keycode === 13 && e.target.value !== '') {
            this.searchVal(e.target.value)
        }
    }
    // 实时监听用户输入的变化并调取接口
    changeInfo(e) {
        if (e.target.value !== '') {
            this.searchVal(e.target.value)
        } else {
            //重置
            this.reset()
        }
    }

    // 清空
    reset() {
        //清空input的值 
        this.inputVal.current.value = ''
        //清空搜索列表
        this.setState({
            searchList: []
        })
    }
    render() {
        let clearAll = ''
        if (this.inputVal.current) {
            clearAll = this.inputVal.current.value
        }
        const { searchWord, searchList } = this.state;
        let hotWords = <div className='info'>
            <h5>热门搜索</h5>
            <ul className='searchword'>
                {
                    searchWord.map(item => {
                        return <li key={item.searchWord} onClick={this.searchVal.bind(this, item.searchWord)}>{item.searchWord}</li>
                    })
                }
            </ul>
        </div>
        return (<div className='searchPage'>
            <form>
                <div>
                    <i></i>
                    <input placeholder='搜索歌曲、歌手、专辑' className='search' onChange={this.changeInfo.bind(this)} ref={this.inputVal} />
                    <span className={clearAll ? 'clear_show' : 'clear_none'} onClick={this.reset.bind(this)}></span>
                </div>
            </form>
            {/* 热搜词--不搜索时显示 */}
            {searchList.length === 0 ? hotWords : ''}
            {/* 搜索的列表 */}
            <div className='box'>
                <ul className="searchList">
                    {searchList.map((item) => {
                        return (
                            <li onClick={this.toPlay.bind(this, item.id)} key={item.id}>
                                <i></i>
                                <span>{item.name} </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>)
    }
}

export default Search