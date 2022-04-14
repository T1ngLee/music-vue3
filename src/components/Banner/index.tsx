import { defineComponent, onMounted, ref, VNode, watch, PropType } from 'vue'
import { requestBanner } from '../../api/DiscoverApi'
import { DiscoverTypes } from '../../types/discover'
import Styles from './index.module.scss'

// TODO 优化轮播图, 从居中去考虑

const typeTitleColors: any = {
  blue: '#4a79cc',
  red: '#cc4a4a' 
}

export default defineComponent({
  name: 'Banner',
  props: {
    list: {
      required: true,
      type: Array as PropType<DiscoverTypes.BannerItem[]>,
      // default: []
    },
    width: Number,
    height: Number,
    imgType: {
      type: String,
      default: 'percentage'
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000,
    },
    dots: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'rgba(248, 85, 85)'
    }
  },
  setup(props) {
    const activeIndex = ref(0)
    let intervalTimer: NodeJS.Timer | null = null

    // 设置每个轮播图的图片
    function setBGImg(src: string) {
      return {
        backgroundImage: `url(${src})`
      }
    }

    // 给轮播图设置Class
    function setClass(i: number) {
      const active = activeIndex.value
      const next = active === (props.list.length - 1) ? 0 : active + 1
      const prev = active === 0 ? (props.list.length - 1) : active - 1

      switch(i) {
        case active: 
          return Styles.active
        case next:
          return Styles.next
        case prev:
          return Styles.prev
        default: 
          return ''
      }
    }

    // 上一页
    function onPrve() {
      activeIndex.value = activeIndex.value === 0 ? props.list.length - 1 : --activeIndex.value
    }

    // 下一页
    function onNext() {
      activeIndex.value = ++activeIndex.value % props.list.length
    }

    // 暂停自动轮播
    function onPause() {
      if (intervalTimer != null) { 
        clearInterval(intervalTimer)
        intervalTimer = null
      }
    }

    // 自动轮播
    function onAutoPlay() {
      onPause()
      if (props.autoPlay) {
        intervalTimer = setInterval(onNext, props.interval)
      }
    }

    onMounted(() => {
      onAutoPlay()
    })

    function setActiveIndex(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.nodeName === 'SPAN') {
        activeIndex.value = Number(target.dataset['index'])
      }
    }
    
    return {
      setBGImg,
      setClass,
      onPrve,
      onNext,
      onPause,
      setActiveIndex,
      onAutoPlay,
      activeIndex
    }
  },
  render() {
    const swiperList: JSX.Element[] = []
    const dotList: JSX.Element[] = []

    this.list.forEach((item, i) => {
      swiperList.push(
        <div 
          class={[Styles.swiper, this.setClass(i)]} 
          style={ this.setBGImg(item.imageUrl) }
          key={ item.targetId }
          >
          <i class={ Styles.typeTitle } style={{ backgroundColor: typeTitleColors[item.titleColor] }}>{ item.typeTitle }</i>
        </div>
      )

      dotList.push(
        <span class={[Styles.dot, this.activeIndex === i && Styles.active ]} data-index={ i }></span>
      )
    })

    return (
      <div ref="swiper" class={ Styles.swiperContainer } onMouseenter={ this.onPause } onMouseleave={ this.onAutoPlay }>
        <div class={ Styles.swiperContent }>
          { swiperList }
          <i class={['iconfont', 'icon-arrow-left', Styles.toggleBtn, Styles.arrowPrev]} onClick={ this.onPrve }></i>
          <i class={['iconfont', 'icon-arrow-right', Styles.toggleBtn, Styles.arrowNext]} onClick={ this.onNext }></i>
        </div>
        <div class={ Styles.dotBox } onMouseover={ this.setActiveIndex }>
          { dotList }
        </div>
      </div>
    )
  }
})