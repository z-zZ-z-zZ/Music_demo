import React from 'react';

import '../../assets/css/hot.css'
import { playDetail } from '../../utils/axios';


class Hot extends React.Component {
    constructor() {
        super()
        this.state = {
            rankList: [],
            dateTime: 0
        }
    }
    nowTime(timer) {
        let data = new Date(timer);
        let month = (data.getMonth() + 1 + '').padStart(2, '0');
        let day = (data.getDate() + '').padStart(2, '0');
        return `${month}月${day}日`;
    }
    componentDidMount() {

        playDetail({
            id: 5233072411
        }).then(res => {
            // console.log(res)
            if (res.code === 200) {
                this.setState({
                    rankList: res.playlist.tracks.filter((item, i) => i < 20),
                    dateTime: res.playlist.updateTime
                })
            }
        })
    }
    toPlay(id) {
        this.props.history.push(`/play?id=${id}`)
    }

    render() {
        const { rankList } = this.state
        return (<div className='hot'>
            <div className='title'>
                <i></i>
                <p>更新日期:{this.nowTime(this.state.dateTime)}</p>
            </div>
            <div className='hotList'>
                <ul>
                    {
                        rankList.map((item, index) => {
                            return <li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
                                <b>{(index + 1).toString().padStart(2, "0")}{" "}</b>
                                <div>    <p>{item.name}</p>
                                    <i></i>
                                    <span>{item.ar[0].name} - {item.al.name}{" "}</span>
                                    <span className='playVio'></span></div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>)
    }
}

export default Hot