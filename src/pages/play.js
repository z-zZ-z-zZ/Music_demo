import React from 'react';
import '../assets/css/play.css'
import qs from 'querystring'
import $ from 'jquery'
import axios from 'axios'
import img from '../assets/images/play.png'
import { playUrl, getLyric, songDetail } from "../utils/axios";

class play extends React.Component {
    constructor() {
        super();
        this.state = {
            img,
            songUrl: "",
            songDetail: {},
            lyric: "",
            playTime: "00:00",
            flag: false,
        };
        //创建一个播放器的ref
        this.audio = React.createRef();
        //创建一个播放图表的ref
        this.playIcon = React.createRef();
    }
    componentDidMount() {
        let query = this.props.location.search.slice(1);
        axios
            .all([
                playUrl({
                    id: qs.parse(query).id,
                }),
                getLyric({
                    id: qs.parse(query).id,
                }),
                songDetail({
                    ids: qs.parse(query).id,
                }),
            ])
            .then(
                axios.spread((songUrl, lyric, songDetail) => {
                    if (songUrl.code === 200) {
                        this.setState({
                            songUrl: songUrl.data[0].url,
                        });
                    }
                    if (lyric.code === 200) {
                        let lyricInfo = "";
                        lyricInfo = lyric.lrc.lyric;
                        //设定一个正则 
                        let reg = /\[(.*?)](.*)/g;
                        let obj = {};
                        lyricInfo.replace(reg, (a, b, c) => {
                            b = b.slice(0, 5);
                            obj[b] = c;
                        });
                        this.setState(
                            {
                                lyric: obj,
                            },
                            () => {
                                let audio = this.audio.current;
                                audio.ontimeupdate = () => {

                                    let nowTime = this.formateTime(audio.currentTime);

                                    if (nowTime in this.state.lyric) {
                                        this.setState(
                                            {
                                                playTime: nowTime,
                                            },
                                            () => {
                                                this.moveLyric();
                                            }
                                        );
                                    }
                                };
                            }
                        );
                    }
                    if (songDetail.code === 200) {
                        this.setState({
                            songDetail: songDetail.songs[0],
                        });
                    }
                })
            );
    }
    /* 获取想要的时间格式 */
    formateTime(timer) {
        let minutes = (Math.floor(timer / 60) + "").padStart(2, "0");
        let seconds = (Math.floor(timer % 60) + "").padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
    //歌词滚动
    moveLyric() {
        let active = document.getElementsByClassName("active")[0];
        let index = $(".geci_box").children().index(active);
        let offSet = 31;
        if (active.offsetTop > 31) {
            $(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
        }
    }
    //创建一个播放事件
    toPlay() {
        this.setState(
            {
                flag: !this.state.flag,
            },
            () => {
                if (this.state.flag) {
                    this.playIcon.current.style.display = "block";
                    this.audio.current.pause();
                } else {
                    this.playIcon.current.style.display = "none";
                    this.audio.current.play();
                }
            }
        );
    }
    render() {
        const { songUrl, songDetail, lyric, img, playTime } = this.state;
        return (
            <div className="play">
                <div className="play_top">
                    <img src={img} alt='专辑图片' />
                </div>
                <div className="play_img_all" onClick={this.toPlay.bind(this)}>
                    <i ref={this.playIcon} className="play_icon"></i>
                    <div className="play_img_box">
                        <div className="small_img">
                            <img
                                src={
                                    songDetail.al
                                        ? songDetail.al.picUrl
                                        : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606381386769&di=b313b7d9646d226c4778d7aa229b9e4c&imgtype=0&src=http%3A%2F%2Fwx1.sinaimg.cn%2Fmw690%2F006qOO1Xly1gc7b7lbabxj32dc2dce27.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="play_txt">
                    <div className="play_txt_name">
                        <span>{songDetail.name}</span>-
              {songDetail.ar
                            ? songDetail.ar.map((arInfo) => {
                                return <span key={arInfo.id}>{arInfo.name}</span>;
                            })
                            : ""}
                    </div>
                    <div className="play_txt_geci">
                        <div className="geci_box">
                            {
                                Object.entries(lyric).map((item, idx) => {
                                    if (playTime === item[0]) {
                                        return (
                                            <p key={idx} className="active">
                                                {item[1]}
                                            </p>
                                        );
                                    } else {
                                        return <p key={idx}>{item[1]}</p>;
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="audio_box">
                    <audio ref={this.audio} src={songUrl} autoPlay></audio>
                </div>
            </div>
        );
    }
}

export default play;
