/*
 * @Author: 挺子
 * @Description: 进度条组件
 */

import { defineComponent, onMounted, ref, watch } from 'vue'
import Styles from './index.module.scss' 

export default defineComponent({
  name: 'ProgressBar',
  props: {
    target: {
      // 进度条最大值
      type: Number,
      required: true,
    },
    current: {
      // 进度条当前值
      type: Number,
      required: true
    },
    step: {
      // 步长
      type: Number,
      default: 1
    }
  },
  emits: ['progressChange'],
  setup(props, context) {
    const barRef = ref<HTMLDivElement>()
    /** 移动距离 */
    const moveDistance = ref(0)
    /** 进度条最左侧距离窗口左侧的距离 */
    const barOffsetX = ref(0)
    /** 进度条长度 */
    const barLength = ref(0)

    onMounted(() => {
      barLength.value = (barRef.value as HTMLDivElement).clientWidth

    })

    function handleBarMousedown(e: MouseEvent) {
      moveDistance.value = e.offsetX
      changeProgress()
    }

    function handleDotMousedown(e: MouseEvent) {
      e.stopPropagation()
      barOffsetX.value = (barRef.value as HTMLDivElement).getBoundingClientRect().left
      document.addEventListener('mousemove', handleDocMousemove)
      document.addEventListener('mouseup', handleDocMouseup)
    }

    function handleDocMousemove(e: MouseEvent) {
      console.log(e.clientX)
      if (e.clientX < barOffsetX.value) {
        moveDistance.value = 0
      } else if (e.clientX > barOffsetX.value + barLength.value) {
        moveDistance.value = barLength.value
      } else {
        moveDistance.value = e.clientX - barOffsetX.value
      }
    }
    
    function handleDocMouseup(e: MouseEvent) {
      changeProgress()
      document.removeEventListener('mousemove', handleDocMousemove)
      document.removeEventListener('mouseup', handleDocMouseup)
    }

    function changeProgress() {
      const changedValue = moveDistance.value / barLength.value * props.target
      context.emit('progressChange', changedValue)
    }

    watch(
      [
        () => props.current, 
        () => props.target,
        barLength
      ],
      ([newCurrent, newTarget, newBarLength]) => {
        const distance = newCurrent / newTarget * newBarLength
        if (isNaN(distance)) {
          return 
        }

        moveDistance.value = distance
      },
      { immediate: true }
    )

    return {
      barRef,
      moveDistance,
      handleBarMousedown,
      handleDotMousedown,
      handleDocMouseup
    }
  },
  render() {
    return (
      <div class={ Styles.trackBar } ref="barRef" onMousedown={ this.handleBarMousedown }>
        <div class={ Styles.fillBar } style={{ width: `${this.moveDistance}px` }}>
          <div 
            class={ Styles.dot } 
            style={{ transform: `translate(${this.moveDistance - 6}px, -50%)` }}
            onMousedown={ this.handleDotMousedown }
            ></div>
        </div>
      </div>
    )
  }
})