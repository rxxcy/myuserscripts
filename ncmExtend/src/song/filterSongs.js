import { createSongsUrlApi } from "./createSongsUrlApi"
//过滤歌曲
export const filterSongs = (songList, config) => {
    let songFilteredList = []
    if (config.skipFilter !== true) {
        for (let song of songList) {
            if (song.privilege.st < 0 || song.privilege.plLevel == 'none') continue
            if (song.privilege.cs && config.skipCloud) continue
            if (song.privilege.fee == 0 && !config.free) continue
            if (song.privilege.fee == 1 && !config.VIP) continue
            if (song.privilege.fee == 4 && !config.pay) continue
            if (song.privilege.fee == 8 && !config.lowFree) continue
            songFilteredList.push(song)
        }
    }
    else {
        songFilteredList = songList.slice(0)
    }
    if (config.action === 'batchUpload' || config.action === 'batchDownload') {
        createSongsUrlApi(songFilteredList, config)
    }
}