/*
 * @Author: 挺子
 * @Description: 搜索相关API
 */

import service from "../utils/request"
import { DefaultSearch, HotSearchItem, SearchSuggest } from '../types/Search'

/**
 * @description: 请求默认搜索关键词
 * @param {*}
 * @return {*}
 */
export async function requestDefaultSearch(): Promise<DefaultSearch>  {
  try {
    const res = await service.get('/search/default')
    if (res.data) {
      const { showKeyword, realkeyword } = res.data
      return {
        showKeyword,
        realkeyword
      }
    }
    return Promise.reject({
      message: '数据获取失败'
    })
  } catch(e) {
    //
    return Promise.reject()
  }
}

/**
 * @description: 请求热搜榜
 * @param {*}
 * @return {*}
 */
export async function requestHotSearch(): Promise<HotSearchItem[]> {
  try {
    const res = await service.get('/search/hot/detail')
    if (res.data) {
      return res.data
    }
    return Promise.reject()
  } catch(e) {
    return Promise.reject(e)
  }
}


/**
 * @description: 获取搜索建议
 * @param {string} keywords 搜索关键词
 * @return {*}
 */
export async function requestSearchSuggest(keywords: string): Promise<SearchSuggest> {
  try {
    const res = await service.get('/search/suggest', { params: { keywords } })
    if (res.result) {
      return res.result
    }
    return Promise.reject('数据获取失败')
  } catch(e) {
    return Promise.reject(e)
  }
}