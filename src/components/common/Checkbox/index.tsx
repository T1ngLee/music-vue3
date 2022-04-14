/*
 * @Author: 挺子
 * @Description: Checkbox
 */

import { defineComponent, computed, renderSlot } from 'vue'
import Styles from './index.module.scss'

export default defineComponent({
  name: 'Checkbox',
  props: {
    // 文本
    label: String, 
    // 选中状态
    checked: { 
      default: false,
      type: Boolean
    },
    // 是否填充
    fill: {
      default: false,
      type: Boolean
    }
  },
  emits: ['update:checked'],
  setup(props, context) {
    function showText() {
      if (context.slots.default || props.label) {
        return true
      } else {
        return false
      }
    }

    const textValue = computed(() => {
      return renderSlot(context.slots, 'default') || props.label
    })

    function onToggle() {
      context.emit('update:checked', !props.checked)
    }
    
    return {
      showText,
      textValue,
      onToggle
    }
  },
  render() {
    const { showText, textValue, checked, onToggle, fill } = this

    return (
      <div class="flex items-center justify-center cursor-pointer" onClick={ onToggle }>
        <div class={[
          Styles.checkbox, 
          fill && Styles.fill, 
          checked && Styles.checked
          ]}>
          <span class={['iconfont', 'icon-gou', Styles.icon]}></span>
        </div>
        { showText() && <span class="align-top whitespace-nowrap">{ textValue }</span> }
      </div>
    )
  }
})