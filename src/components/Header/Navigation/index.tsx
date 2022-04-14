/*
 * @Author: 挺子
 * @Description: 页面历史记录 前进 后退 
 */

import { defineComponent } from 'vue'
import Styles from './index.module.scss'
import { storeToRefs } from 'pinia'
import { useNavigation } from '../../../store/Navigation'

export default defineComponent({
  name: 'Navigation',
  setup() {
    const { canBack, canForward } = storeToRefs(useNavigation())

    // 返回上一页
    function historyBack() {
      canBack.value && window.history.back()
    }

    // 前往下一页
    function historyForward() {
      canForward.value && window.history.forward()
    }

    return {
      canBack,
      canForward,
      historyBack,
      historyForward
    }
  },
  render() {
    return (
      <div class={ Styles.navigationContainer }>
        <span 
          class={[
            Styles.arrowBtn, 
            'iconfont', 
            'icon-arrow-left', 
            this.canBack && Styles.active
          ]} 
          onClick={ this.historyBack }
          ></span>
        <span 
          class={[
            Styles.arrowBtn, 
            'iconfont', 
            'icon-arrow-right', 
            this.canForward && Styles.active
          ]} 
          onClick={ this.historyForward }
          ></span>
      </div>
    )
  }
})
