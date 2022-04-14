/*
 * @Author: 挺子
 * @Description: 
 */

export interface ArtistItem {
  id: number,
  /** 歌手名称 */
  name: string,
  picUrl: string,
  alias: string[],
  albumSize: number,
  picId: number,
  img1v1Url: string,
  img1v1: number,
  alia: string[],
  trans: string | null
}


export interface AlbumItem {
  id: number,
  /** 专辑名称 */
  name: string,
  /** 歌手 */
  artist: ArtistItem,
  publishTime: number,
  size: number,
  copyrightId: number,
  status: number,
  picId: number,
  mark: number,
}

export interface SongItem {
  id: number,
  /** 歌曲名称 */
  name: string,
  /** 歌手列表 */
  artists: ArtistItem[],
  /** 专辑 */
  album: AlbumItem,
  /** 时长，ms */
  duration: number,
  copyrightId: number,
  status: number,
  rtype: number,
  ftype: number,
  transNames: string[],
  mvid: number,
  fee: number,
  rUrl: string | null,
  mark: number
}

export interface PlayList {
  bookCount: number,
  coverImgUrl: string,
  highQuality: boolean,
  id: number,
  name: string,
  playCount: number,
  specialType: number,
  subscribed: boolean,
  trackCount: number,
  userId: number
}