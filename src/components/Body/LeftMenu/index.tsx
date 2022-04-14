import { defineComponent, VNode } from 'vue'
import MenuButton from './meunButton'
import { RouteRecordRaw } from 'vue-router'
import { contentRoutes, myMusicRoutes } from '../../../router'

export default defineComponent({
  name: 'LeftMenu',
  setup() {

    // 创建菜单列表
    function getMeunList(routes: RouteRecordRaw[]): VNode[] {
      return routes.map(({path, meta}) => {
        return <MenuButton text={ (meta as any).title } path={ path }/>
      })
    }
    
    return {
      getMeunList
    }
  },
  render() {
    return (
      <div class="h-full w-52 border-r flex-none p-2 select-none">
        { this.getMeunList(contentRoutes) }
        { this.getMeunList(myMusicRoutes) }
      </div>
    )
  }
})