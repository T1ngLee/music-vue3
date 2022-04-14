import { defineComponent } from 'vue'
import Styles from './index.module.scss'

export default defineComponent({
  name: 'Resize',
  setup() {

    // 全屏控制
    function handleFullScreen(fullScreen: boolean) {
      // 判断当前是否是全屏的
      const isFullscreen = !!document.fullscreenElement

      if (fullScreen) {
          // 全屏模式
          if (isFullscreen) {
            return
          }

          const docElm = document.documentElement as any
          const fullscreenMethod = 
            docElm.requestFullscreen || 
            docElm.mozRequestFullScreen || 
            docElm.webkitRequestFullScreen || 
            docElm.msRequestFullscreen

          fullscreenMethod.call(docElm)
      } else {
          // 退出全屏
          if (!isFullscreen) {
            return
          }

          const doc = document as any
          const exitFullscreenMethod = 
            doc.exitFullscreen ||
            doc.webkitCancelFullScreen ||
            doc.mozCancelFullScreen ||
            doc.msExitFullscreen

          exitFullscreenMethod.call(doc)
      }
    }
    
    // 关闭窗口
    function closeWindow() {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }

    return {
      handleFullScreen,
      closeWindow
    }
  },
  render() {
    return (
      <div class="h-full w-28 inline-flex items-center align-bottom justify-aroundmr-3 absolute right-0">
        {/* <span class={['iconfont', 'icon-zuixiaohua', Styles.icon, 'text-2xl']} title="mini模式"></span> */}
        <span class={['iconfont', 'icon-mini', Styles.icon, 'text-2xl']} title="退出全屏" onClick={ () => this.handleFullScreen(false) }></span>
        <span class={['iconfont', 'icon-zuidahua', Styles.icon, 'text-2xl']} title="全屏" onClick={ () => this.handleFullScreen(true) }></span>
        <span class={['iconfont', 'icon-guanbi', Styles.icon, 'text-xl', 'leading-8']} title="关闭" onClick={ this.closeWindow }></span>
      </div>
    )
  }
})