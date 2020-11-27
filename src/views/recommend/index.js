import React from 'react';
import '../../assets/css/recommend.css'
//接口引入
import { recMusic, recMusicList, banner } from '../../utils/axios'
import axios from 'axios'
import Swiper from 'swiper'
import '../../../node_modules/swiper/css/swiper.css'
import '../../../node_modules/swiper/js/swiper'



class List extends React.Component {
    constructor() {
        super()
        this.state = {
            songList: [],
            newSongList: [],
            bannerList: []
        }
    }

    /* 挂载时获取接口，调取数据 */
    componentDidMount() {
        axios.all([recMusicList({ limit: 6 }), recMusic(), banner()])
            .then(
                axios.spread((musicList, music, banner) => {
                    // console.log(music,musicList)
                    // console.log(banner)
                    const songList = musicList.result
                    songList.forEach(item => {
                        item.playCount = (item.playCount / 10000).toFixed(2)
                    })
                    this.setState({
                        songList: musicList.result,
                        newSongList: music.result,
                        bannerList: banner.banners.filter((item, i) => i < 5)
                    }, () => {
                        new Swiper('.swiper-container', {
                            loop: true,
                            autoplay: {
                                delay: 2000
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                dynamicBullets: true,
                            },
                        })
                    })
                    // console.log(this.state.bannerList)
                })
            )
    }
    toListDetail(id) {
        this.props.history.push(`/list?id=${id}`)
    }

    render() {
        const { songList, newSongList, bannerList } = this.state
        return (<div className='recommend'>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map(item => {
                            return (
                                <div className="swiper-slide"
                                    key={item.encodeId}>
                                    <img src={item.imageUrl} alt={item.typeTitle} />
                                </div>
                            )
                        })
                    }
                </div>
                {/* <!-- Add Pagination --> */}
                <div className="swiper-pagination swiper-pagination-white"> </div>
            </div>
            <h2>推荐歌单</h2>
            <div className='content'>
                {/* 推荐歌单 */}
                <ul className='recommedList clearfix'>
                    {songList.map(item => {
                        return <li key={item.id} onClick={this.toListDetail.bind(this, item.id)}>
                            <img className='images' src={item.picUrl} alt='图片'></img>
                            <i>{item.playCount}万</i>
                            <p>{item.name}</p>
                        </li>
                    })}
                </ul>
                {/* 推荐音乐 */}
                <div className='newList'>
                    <h2>最新音乐</h2>
                    <ul>
                        {newSongList.map(item => {
                            return <li key={item.id}>
                                <p className='title'>{item.name}</p>
                                <i></i>
                                <span>{item.song.artists[0].name} - {item.song.album.name}{" "}</span>
                                <span className='playVio'></span>
                            </li>
                        })}
                    </ul>
                </div>
                {/* 底部 */}
                <div className="footer">
                    <div className="title">网易云音乐</div>
                    <div className="text">打开APP，发现更多好音乐</div>
                    <div className="bottom">网易公司版权所有©1997-2020   杭州乐读科技有限公司运营</div>
                </div>

            </div>
        </div>)
    }
}

export default List