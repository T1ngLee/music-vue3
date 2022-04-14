/*
 * @Author: 挺子
 * @Description: 页面标题组件
 */


import { defineComponent } from 'vue'
import Styles from './index.module.scss'

export default defineComponent({
  name: 'PageTitle',
  props: {
    title: {
      required: true,
      type: String
    }
  },
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <h3 class={ Styles.active }>{ this.title }</h3>
    )
  }
})