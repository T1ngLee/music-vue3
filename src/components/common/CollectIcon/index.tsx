/*
 * @Author: 挺子
 * @Description: 收藏的图标状态，已收藏为红色
 */

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CollectIcon',
  props: {
    collected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:collected'],
  setup(props, context) {
    function toggle() {
      context.emit('update:collected', !props.collected)
    }
    
    return {
      toggle
    }
  },
  render() {
    return (
      this.collected ?
      <span class="iconfont icon-aixin-solid text-wy-red text-xl" onClick={ this.toggle }></span> :
      <span class="iconfont icon-aixin-hollow text-xl" onClick={ this.toggle }></span>
    )
  }
})
