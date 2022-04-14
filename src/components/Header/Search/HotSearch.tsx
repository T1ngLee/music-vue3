/*
 * @Author: 挺子
 * @Description: 热搜列表
 */

import { defineComponent, PropType } from "vue"
import { HotSearchItem, HotType } from "../../../types/Search"
import Styles from './HotSearch.module.scss'

const hotIconList = [
  '', 
  'iconfont icon-hot-fill text-wy-red', 
  '',
  '',
  '',
  'iconfont icon-jiantoushangsheng text-wy-red'
]

export default defineComponent({
  name: 'HotSearch',
  props: {
    hotSearchList: {
      default: [],
      type: Array as PropType<HotSearchItem[]>
    }
  },
  render() {
    const getHotSearchElements = () => {
      return this.hotSearchList.map((item, index) => {
        return (
          <div class={ Styles.item }>
            <span class={ Styles.ranking }>{ ++index }</span>
            <div class={ Styles.content }>
              <div>
                <span class={ Styles.searchWord }>{ item.searchWord }</span>
                <i class={ Styles.score }>{ item.score }</i>
                { item.iconType in HotType && <i class={ hotIconList[item.iconType] }></i> }
              </div>
              { item.content && <span class={ Styles.description }>{ item.content }</span> }
            </div>
          </div>
        )
      })  
    }

    return (
      <div class={ Styles.hotSearch }>
        <h3>热搜榜</h3>
        <div>
          { getHotSearchElements() }
        </div>
      </div>
    )
  }
})