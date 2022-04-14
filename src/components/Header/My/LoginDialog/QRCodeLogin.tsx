import { defineComponent, ref, onMounted, onUnmounted, inject } from 'vue'
import Styles from './QRCodeLogin.module.scss'
import scanSuccess from '../../../../assets/images/scan-success.png'
import phone from '../../../../assets/images/login-image.png'
import { getQRCodeKey, checkQRCode, ScanQRCodeStatus } from '../../../../api/LoginApi'
import QRCode from 'qrcode'
import { getAccountInfo } from '../../../../api/UserApi' 
import { useStore } from 'vuex'
import { key } from '../../../../store/index'
import { UserType } from '../../../../store/User'

export default defineComponent({
  name: 'QRCodeLogin',
  emits: ['togglePattern'],
  async setup(props, context) {
    const store = useStore(key)

    const qrCodeRef = ref(null as unknown as HTMLElement)
    const canvasRef = ref(null as unknown as HTMLCanvasElement)
    const pollTimer = ref(0 as unknown as NodeJS.Timer) // 定时器
    const scanStatus = ref(ScanQRCodeStatus.wait)

    const closeDialog = inject('closeDialog') as Function

    onMounted(async () => {
      renderQRCode()
    })

    onUnmounted(() => {
      clearInterval(pollTimer.value)
    })

    /**
     * @description: 生成二维码后轮询接口请求扫码状态
     * @param {string} unikey
     * @return {*}
     */    
    function scanPoll(unikey: string) {
      pollTimer.value = setInterval(async () => {
        const res = await checkQRCode(unikey) as any
        scanStatus.value = res.code

        switch(res.code) {
          case ScanQRCodeStatus.expired:
            clearInterval(pollTimer.value)
            break
          case ScanQRCodeStatus.success:
            clearInterval(pollTimer.value)
            confirmed()
            break
          default:
            break
        }
      }, 2000)
    }

    /**
     * @description: 渲染二维码
     * @param {*}
     * @return {*}
     */    
    async function renderQRCode() {
      try {
        const unikey = await getQRCodeKey()
        if (unikey) {
          const loginUrl = `https://music.163.com/login?codekey=${unikey}`

          QRCode.toCanvas(canvasRef.value, loginUrl, () => {
            scanStatus.value = ScanQRCodeStatus.wait
            scanPoll(unikey)
            // return true
          })
        }
      } catch(e) {
        //
      }
    }

    /**
     * @description: 
     * @param {*}
     * @return {*}
     */    
    async function confirmed() {
      try {
        const res = await getAccountInfo()
        const { userId, nickname, avatarUrl } = res.profile
        
        store.commit({
          type: 'userInfo/setUserInfo',
          userId,
          nickname,
          avatarUrl
        })

        closeDialog()
      } catch(e) {
        //
      }
    }

    /**
     * @description: 延迟动画播放的方法
     * @param {function} callback 延迟结束后的回调
     * @param {*} delay 延迟时长，毫秒
     * @return {*}
     */    
    function autoTransition(callback: () => void, delay = 1000) {
      return new Promise((resolve) => {
        setTimeout(() => {
          callback()
          resolve(true)
        }, delay)
      })
    }

    function addClass() {
      const classList = qrCodeRef?.value.classList
      if (!classList?.contains(Styles.hover) && scanStatus.value === ScanQRCodeStatus.wait) {
        qrCodeRef.value.classList.add(Styles.hover)
      }
    }

    function removeClass() {
      const classList = qrCodeRef?.value.classList
      if (classList?.contains(Styles.hover) && scanStatus.value === ScanQRCodeStatus.wait) {
        qrCodeRef.value.classList.remove(Styles.hover)
      }
    }

    function toggleToOtherLogin() {
      context.emit('togglePattern')
    }

    // await setTimeout(async () => {
    //   console.log('异步组件加载')
    //   dialogShow.value = true

    //   // 异步组件加载后执行过渡动画
    //   await nextTick()
    //   await autoTransition(addClass, 1000)
    //   await autoTransition(removeClass, 4000)
    // }, 3000)
    
    return {
      qrCodeRef,
      canvasRef,
      scanStatus,
      addClass,
      removeClass,
      renderQRCode,
      toggleToOtherLogin
    }
  },
  render() {
    const { scanStatus, removeClass, addClass, renderQRCode, toggleToOtherLogin } = this

    return (
      <div class={[
        Styles.loginBox, 
        scanStatus === ScanQRCodeStatus.confirm && Styles.waitConfirm,
        scanStatus === ScanQRCodeStatus.expired && Styles.expired
        ]}>
        <h3 class="text-3xl self-end">扫码登录</h3>
        <div class={ Styles.qrCodeContainer } ref="qrCodeRef" onMouseout={ removeClass } onMouseover={ addClass }>
          {/* 手机图 */}
          <div class={ Styles.phone }>
            <img src={ phone } class="w-3/4 mx-auto" />
          </div>
          {/* 二维码区域 */}
          <div class={ Styles.right }>
            <canvas ref="canvasRef" class={ Styles.qrCode } />
            <div class={ Styles.qrcodeMask }>
              <div class={ Styles.qrcodeMaskBg }></div>
              <div class={ Styles.qrcodeMaskText }>
                <span class="text-white">二维码已失效</span>
                <span class={ Styles.refreshBtn } onClick={ renderQRCode }>点击刷新</span>
              </div>
            </div>
            <span class={['mt-44', Styles.loginTip]}>使用<a class="text-blue-500 cursor-pointer">网易云音乐APP</a></span>
            <span class={ Styles.loginTip }>扫码登录</span>
          </div>
          <span class={[Styles.noWrapSpan, Styles.loginTip]}>使用<a class="text-blue-500 cursor-pointer">网易云音乐APP</a>扫码登录</span>
        </div>
        
        <a class={ Styles.bottomText } onClick={ toggleToOtherLogin }>选择其他登录模式 &gt;</a>
        <div class={ Styles.waitConfirmTip }>
          <img src={ scanSuccess } alt="" />
          <span>请在手机上确认登录</span>
        </div>
      </div>
    )
  }
})