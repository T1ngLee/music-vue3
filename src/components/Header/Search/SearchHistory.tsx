/*
 * @Author: 挺子
 * @Description: 搜索历史
 */

import { defineComponent, ref, watch } from 'vue'
import Judge from '../../../utils/judge'
import LocalStorage from '../../../utils/Storage/LocalStorage'
import Styles from './SearchHistory.module.scss'

// 搜索历史缓存，Search History Storage
const SHStorage = new LocalStorage<string[]>('SearchHistory')

export default defineComponent({
  name: 'SearchHistory',
  setup() {
    const searchHistory = ref<string[]>([])
    const isShow = ref(false)
    
    // 获取历史记录
    function getHistory() {      
      const storage = SHStorage.get()
      if (Judge.isArray(storage)) {
        searchHistory.value = storage
      }
    }

    // 设置历史记录
    function setHistory(keyword: string) {
      // 判断当前记录中有没有相同的关键词，有的话先删除
      const index = searchHistory.value.indexOf(keyword)
      if (index > -1) {
        searchHistory.value.splice(index, 1)
      }

      searchHistory.value.unshift(keyword)
      // 最多存 20 个历史记录，所以将20个往后的删除 
      searchHistory.value.splice(19)
      SHStorage.set(searchHistory.value)
    }

    // 删除单个搜索关键词
    function deleteItem(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (target.nodeName !== 'I') {
        return 
      }

      const indexStr = target.dataset['index']
      if (indexStr == undefined) {
        return
      }

      searchHistory.value.splice(Number(indexStr), 1)
      SHStorage.set(searchHistory.value)
    }

    // 删除全部历史记录
    function deleteAll() {
      searchHistory.value = []
      SHStorage.delete()
    }

    function onItemClick() {
      // todo 历史关键词的点击事件，触发搜索
    }

    watch(
      () => searchHistory.value.length,
      (newVal) => {
        isShow.value = !!newVal
      },
      { immediate: true }
    )

    return {
      getHistory,
      setHistory,
      deleteItem,
      deleteAll,
      searchHistory,
      isShow

    }
  },
  render() {
    const getSearchHistoryElements = () => {
      return this.searchHistory.map((keyword, index) => {
        return (
          <span class={ Styles.historyItem }>
            { keyword }
            <i 
              class={['iconfont', 'icon-guanbi', Styles.icon]}  
              data-index={ index }
              ></i>
          </span>
        )
      })
    }

    return (
      this.isShow && (
        <div class={ Styles.searchHistory }>
          <div class={ Styles.titleBar }>
            <h3>搜索历史</h3>
            <span 
              class={['iconfont', 'icon-shanchu', Styles.deleteIcon]} 
              title="清空全部"
              onClick={ this.deleteAll }
              ></span>
            <span class={ Styles.lookAll }>查看全部</span>
          </div>
          <div class={ Styles.historyContainer } onClick={ this.deleteItem }>
            { getSearchHistoryElements() }
          </div>
        </div>
      )
    )
  }
})
