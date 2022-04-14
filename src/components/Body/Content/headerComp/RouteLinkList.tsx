/*
 * @Author: 挺子
 * @Description: 页面头部的导航菜单组件
 */


import { defineComponent, PropType, computed } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import Styles from './index.module.scss'

export default defineComponent({
  name: 'RouteLinkList',
  props: {
    routeList: {
      required: true,
      type: Object as PropType<RouteRecordRaw[]>
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    function toRoute(path: string) {
      router.push(path)
    }

    function isActive(path: string) {
      return route.path === path
    }

    return {
      isActive,
      toRoute
    }
  },
  render() {
    const liList = this.routeList.map(item => {
      const isActive = this.isActive(item.path)
      return (
        <li 
          class={[Styles.base, isActive && Styles.active]} 
          onClick={ () => this.toRoute(item.path) }
          >
          { item.meta?.title ? item.meta.title : item.path }
          { isActive && <span class="block h-1 w-5/6 bg-wy-red m-auto mt-1"></span> }
        </li>
      )
    })

    return (
      <ul>
        { liList }
      </ul>
    )
  }
})