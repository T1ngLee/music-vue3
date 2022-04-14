/*
 * @Author: 挺子
 * @Description: 首页列表中的播放图标
 */

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayButton',
  render() {
    return (
      <div class='w-9 h-9 rounded-full bg-white bg-opacity-90 text-center leading-9 relative'>
        <span class={['iconfont', 'icon-bofang', 'text-lg', 'ml-1', 'text-wy-red']}></span>
      </div>
    )
  }
})
