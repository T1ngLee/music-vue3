/*
 * @Author: 挺子
 * @Description: 搜索相关的类型
 */

import { AlbumItem, ArtistItem, PlayList, SongItem } from "./Base"

/** 默认热搜词 */
export interface DefaultSearch {
  /**
   * 输入框上placeholder的文本 
   */
  showKeyword: string,
  /**
   * 实际搜索的关键词
   */
  realkeyword: string
}

/** 热度类型 */
export enum HotType {
  /**
   * 高热度
   */
  HOT = 1,
  /**
   * 热度正在上升
   */
  RISING = 5
}

/** 热搜关键词 */
export interface HotSearchItem {
  /* 搜索关键词 */
  searchWord: string,
  /* 热度值 */
  score: string,
  /* 描述 */
  content?: string,
  /* 热度类型 */
  iconType: HotType
}


/** 搜索类型 */
export enum SearchType {
  /** 单曲 */
  SONG = 1,
  /** 专辑 */
  ALBUM = 10,
  /** 歌手 */
  SINGER = 100,
  /** 歌单 */
  PLAY_LIST = 1002,
  /** 用户 */
  USER = 1004,
  /** MV */
  MV = 1006,
  /** 歌词 */
  LYRIC = 1009,
  /** 电台 */
  DJ = 1014,
  /** 视频 */
  VIDEO = 1018,
}


export interface SearchSuggest {
  /** 排序 */
  order: string[],
  /** 专辑列表 */
  albums: AlbumItem[],
  /** 歌手列表 */
  artists: ArtistItem[],
  /** 歌曲列表 */
  songs: SongItem[],
  /** 歌单列表 */
  playlists: PlayList[]
}