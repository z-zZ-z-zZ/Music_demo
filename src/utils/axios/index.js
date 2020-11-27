import http from './axios'

/* 推荐歌单 */
export function recMusicList(params) {
    return http.get('/personalized', {
        params
    })
}

/* 推荐音乐 */
export function recMusic() {
    return http.get('/personalized/newsong')
}

/* 轮播图 */
export function banner(params) {
    return http.get('/banner', {
        params
    })
}

/* 歌单详情 */
export function playDetail(params) {
    return http.get('/playlist/detail', {
        params
    })
}

//获取歌曲详情
export function songDetail(params) {
    return http.get('/song/detail', {
        params
    })
}

//获取音乐URL
export function playUrl(params) {
    return http.get('/song/url', {
        params
    })
}

//获取歌词
export function getLyric(params) {
    return http.get('/lyric', {
        params
    })
}

//热搜列表
export function getHotSearch() {
    return http.get('/search/hot/detail')
}

//封装一个搜索接口
export function getSearch(params) {
    return http.get('/search', {
        params
    })
}