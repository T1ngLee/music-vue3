/*
 * @Author: 挺子
 * @Description: Toast
 */

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    msg: {
      type: [String, Number],
      default: '请配置提示语'
    }
  },
  setup() {

  },
  render() {
    return (
      <div class="bg-gray-400 text-white">这是一个提示</div>
    )
  }
})