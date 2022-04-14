/*
 * @Author: 挺子
 * @Description: 下拉框
 */

import { 
  defineComponent, 
  renderSlot, 
  ref, 
  watch, 
  onUnmounted, 
  PropType, 
  computed 
} from 'vue'
import Styles from './index.module.scss'

export default defineComponent({
  name: 'Dropdown',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    destroy: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: Object as PropType<HTMLElement | undefined>,
      // required: true
    }
  },
  emits: ['update:show'],
  setup(props, context) {
    const container = ref<HTMLElement>()

    // 是否渲染过的状态，不默认渲染DOM，用户触发后改为true
    const loaded = ref(false)

    const renderer = computed(() => {
      return !props.destroy || (props.destroy && props.show)
    })
    
    // 点击 触发元素外 和 弹窗外 关闭弹窗
    function onClickOutside(e: MouseEvent) {
      context.emit('update:show', false)
    }

    // 阻止冒泡
    function stopPropagation(e: MouseEvent) {
      e.stopPropagation()
    }
    
    function addClickEvent() {
      props.trigger?.addEventListener('click', stopPropagation)
      document.addEventListener('click', onClickOutside)
    }

    function removeClickEvent() {
      props.trigger?.removeEventListener('click', stopPropagation)
      document.removeEventListener('click', onClickOutside)
    }

    // 初始化时父组件的 trigger 可能还没有加载成功，
    // 获取trigger失败，所以在这里监听
    watch(
      () => props.trigger,
      (newVal, oldVal) => {
        if (!oldVal) {
          removeClickEvent()
          addClickEvent()
        } 
      },
    )

    watch(
      () => props.show, 
      (newVal) => {
        if (newVal) {
          addClickEvent()

          if (!loaded.value && renderer.value) {
            // 第一次渲染组件后将此状态改为true
            loaded.value = true
          }
        } else {
          removeClickEvent()
        }
      },
      { immediate: true }
    )

    onUnmounted(() => {
      removeClickEvent()
    })

    return {
      stopPropagation,
      container,
      renderer,
      loaded
    }
  },
  render() {
    return (
      this.loaded &&
      this.renderer && 
      <div 
        ref="container"
        onClick={ this.stopPropagation }
        class={ Styles.dropdownContainer }
        style={{ visibility: this.show ? 'visible' : 'hidden' }}
        >
        { renderSlot(this.$slots, 'default') }
      </div>
    )
  }
})