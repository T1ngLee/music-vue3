import { defineComponent, ref, nextTick, Suspense, provide, Ref, defineAsyncComponent } from 'vue'
import Styles from './index.module.scss'
import img from '../../../assets/logo.png'
// import LoginDialog from './LoginDialog'
const LoginDialog = defineAsyncComponent(() => import('./LoginDialog'))

export default defineComponent({
  name: 'My',
  setup() {
    const fatherDialogShow = ref(false)
    const loginDialogRef = ref(null as any)

    provide('dialogShow', fatherDialogShow)

    async function openLoginDialog() {
      fatherDialogShow.value = true
      await nextTick()
      loginDialogRef.value.dialogShow = true
    }

    function dialogClosed() {
      fatherDialogShow.value = false
    }
    provide('dialogClosed', dialogClosed)
    
    return {
      fatherDialogShow,
      loginDialogRef,
      openLoginDialog
    }
  },
  render() {
    return (
      <div class="h-full align-bottom inline-flex items-center absolute right-32 w-60 justify-between">
        {/* 头像区域 */}
        <div class="inline-flex items-center cursor-pointer" onClick={ this.openLoginDialog }>
          <span class="block h-8 w-8 rounded-full bg-pink-100 mr-1 overflow-hidden">
            <img src={ img } class="object-contain"></img>
          </span>
          <span class="text-sm text-header-active-gray hover:text-white">你的名字<i class="iconfont icon-sanjiao"></i></span>
        </div>
        <span class={['iconfont', 'icon-yifu', Styles.icon, 'text-2xl']}></span>
        <span class={['iconfont', 'icon-chilun', Styles.icon, 'text-2xl']} title="设置"></span>
        <span class={['iconfont', 'icon-xinfeng', Styles.icon, 'text-2xl']}></span>
        <span class="h-4 border-r border-header-active-gray ml-4 w-px"></span>
        
        <Suspense>
          <>
          { this.fatherDialogShow && <LoginDialog ref="loginDialogRef" /> } 
          </>
        </Suspense>
      </div>
    )
  }
})