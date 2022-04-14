/*
 * @Author: 挺子
 * @Description: 搜索相关的状态
 */

import { defineStore } from 'pinia'
import { requestDefaultSearch } from '../api/Search'
import { DefaultSearch } from '../types/Search'

interface SearchStateTypes {
  defaultSearch: DefaultSearch
}

export const useSearchState = defineStore('search', {
  state: () => ({
    /** 默认搜索关键词 */
    defaultSearch: {
      showKeyword: '',
      realkeyword: ''
    }
  } as SearchStateTypes),
  actions: {
    /**获取搜索关键词 */
    async getDefaultSearch() {
      try {
        const res = await requestDefaultSearch()
        this.defaultSearch = res
      } catch(e) {
        //
      }
    },
  }
})
