import { defineComponent, ref, Suspense } from 'vue'
import Styles from './OtherLogin.module.scss'
import Checkbox from '../../../common/Checkbox'
import Button from '../../../common/Button'
import img from '../../../../assets/images/image.png'
import AreaCodeList from './AreaCodeList'
import { loginCellphone, sentCaptcha, LoginCellphoneBody } from '../../../../api/LoginApi'
import md5 from 'crypto-js/md5'
import Toast from '../../../common/Toast'

// 登录模式
enum LoginMode {
  /**手机-验证码 */
  'MOBILE_CAPTCHA' = 'mobile_captcha',
  /**手机-密码 */
  'MOBILE_PASSWORD' = 'mobile_password',
  /**邮箱-密码 */
  'EMAIL_PASSWORD' = 'email_password'
}

export default defineComponent({
  name: 'OtherLogin',
  emits: ['togglePattern', 'click'],
  setup(props, context) {
    const agreementChecked = ref(false) // 协议选中状态
    const rememberLogin = ref(false) // 记住登录

    const areaCodeListShow = ref(false) // 区号列表的显示状态
    const currentAreaCode = ref('86') // 区号，默认中国大陆区号 

    const currentLoginMode = ref(LoginMode.MOBILE_CAPTCHA) // 当前登录模式

    const phone = ref('') // 手机号
    const password = ref('') // 密码
    const captcha = ref('') // 验证码

    const canSentCaptcha = ref(true) // 获取验证码的状态
    const sentCaptchaCountDown = ref(60) // 重新获取验证码的倒记时

    /**
     * @description: 协议跳转
     * @param {string} url 协议地址
     * @return {*}
     */    
    function linkTo(url: string) {
      return function(e: Event) {
        console.log(e)
        e.stopPropagation()
        window.open(url)
      }
    }

    /**
     * @description: 切换到二维码登录模式
     * @param {*}
     * @return {*}
     */    
    function toggleToQRCodeLogin() {
      context.emit('togglePattern')
    }

    /**
     * @description: 显示区号列表
     * @param {MouseEvent} e 鼠标事件
     * @return {*}
     */
    function showAreaCodeList(e: MouseEvent) {
      e.stopPropagation()
      areaCodeListShow.value = !areaCodeListShow.value
    }

    /**
     * @description: 隐藏区号列表
     * @param {*}
     * @return {*}
     */    
    function hiddenAreaCodeList() {
      areaCodeListShow.value = false
    }

    /**
     * @description: 切换登录模式
     * @param {LoginMode} mode 登录模式
     * @return {*}
     */    
    function toggleLoginMode(mode: LoginMode) {
      currentLoginMode.value = mode
    }

    /**
     * @description: 获取区号
     * @param {string} code 区号
     * @return {*}
     */    
    function getAreaCode(code: string) {
      currentAreaCode.value = code
      hiddenAreaCodeList()
    }

    /**
     * @description: 点击区号列表外面隐藏区号列表
     * @param {*}
     * @return {*}
     */    
    function areaCodeListOutClicked() {
      hiddenAreaCodeList()
    }

    // 获取验证码
    async function getCaptcha() {
      const res = await sentCaptcha({
        phone: phone.value,
        ctcode: currentAreaCode.value
      })

      canSentCaptcha.value = false
      getCaptchaAgain()
    }

    /**
     * @description: 获取验证码后的倒记时
     * @param {*}
     * @return {*}
     */    
    function getCaptchaAgain() {
      const timer = setInterval(() => {
        --sentCaptchaCountDown.value
        if (sentCaptchaCountDown.value <= 0) {
          clearInterval(timer)
          sentCaptchaCountDown.value = 60
          canSentCaptcha.value = true
        }
      }, 1000)
    }

    async function onLogin() {
      Toast({value: '123123'})

      // let params: LoginCellphoneBody

      // if (currentLoginMode.value === LoginMode.MOBILE_CAPTCHA) {
      //   params = {
      //     phone: phone.value,
      //     countrycode: currentAreaCode.value,
      //     captcha: captcha.value
      //   }
      // } else if (currentLoginMode.value === LoginMode.MOBILE_PASSWORD) {
      //   params = {
      //     phone: phone.value,
      //     countrycode: currentAreaCode.value,
      //     // md5_password: md5(password.value).toString()
      //     password: password.value
      //   }
      // } else {
      //   params = { phone: phone.value }
      // }

      // try {
      //   const res = await loginCellphone(params)
      // } catch (e) {
      //   //
      // }
    }
    
    return {
      agreementChecked,
      linkTo,
      toggleToQRCodeLogin,
      rememberLogin,
      currentAreaCode,
      areaCodeListShow,
      showAreaCodeList,
      currentLoginMode,
      toggleLoginMode,  
      getAreaCode,
      areaCodeListOutClicked,
      getCaptcha,
      phone,
      password,
      onLogin,
      captcha,
      canSentCaptcha,
      sentCaptchaCountDown
    }
  },
  render() {
    // const svgIcon = () => {
    //   class={ Styles.flagIcon }
    // }

    return (
      <div class="h-full" onClick={this.areaCodeListOutClicked}>
        {/* 左上角的二维码图标  ---  开始 */}
        <div class={ Styles.qrcodeIcon } onClick={ this.toggleToQRCodeLogin }>
          <div class={ Styles.mask }></div>
          <div class={ Styles.tip }>
            扫码登录更安全
            <div class={ Styles.arrow }></div>
          </div>
        </div>
        {/* 左上角的二维码图标  ---  结束 */}

        
        <div class={ Styles.content }>
          <img src={ img } alt="" />

          {/* 输入区域  ---  开始 */}
          <div class={ Styles.inputArea }>
            <Suspense>
              <AreaCodeList 
                class={{ 
                  [Styles.areaCodeList]: true,
                  [Styles.isShow]: this.areaCodeListShow
                }} 
                code={ this.currentAreaCode } 
                onGetAreaCode={ this.getAreaCode }
                />
            </Suspense>
            <div class={ Styles.select } onClick={ this.showAreaCodeList }>
              <span class={['iconfont', 'icon-shouji', 'w-8', 'text-s', Styles.baseStyle]}></span>
              <span class="text-xs"> +{ this.currentAreaCode } </span>
              <span class={['iconfont', 'icon-sanjiao', 'w-6', Styles.baseStyle ]}></span>
            </div>
            <input class={ Styles.account } placeholder="请输入手机号" v-model={ this.phone }></input>
            {
              // 手机号登录时，根据模式显示密码输入框还是验证码输入框
              this.currentLoginMode === LoginMode.MOBILE_PASSWORD ? 
              <div class={ Styles.password }>
                <span class={['iconfont', 'icon-mima-cuxiantiao', 'w-8', 'text-xs', Styles.baseStyle]}></span>
                <input type="password" placeholder="请输入密码" v-model={ this.password }></input>
                <div class={['text-xs', 'p-3', Styles.baseStyle]}>
                  <span class="cursor-pointer">重设密码</span>
                </div>
              </div> :
              <div class={ Styles.password }>
                <span class={['iconfont', 'icon-mima-cuxiantiao', 'w-8', 'text-xs', Styles.baseStyle]}></span>
                <input placeholder="请输入验证码" v-model={ this.captcha }></input>
                {
                  this.canSentCaptcha ? 
                  <div class={['text-xs', 'p-3', Styles.baseStyle]} onClick={ this.getCaptcha }>
                    <span class="cursor-pointer">获取验证码</span>
                  </div> :
                  <div class={['text-xs', 'p-3', Styles.baseStyle]}>
                    <span class="cursor-pointer"> { this.sentCaptchaCountDown } 秒后重新获取 </span>
                  </div>
                }
              </div>
            }
          </div>
          {/* 输入区域  ---  结束 */}

          {/* 提示区域  ---  开始 */}
          <div class={ Styles.tipArea }>
            <Checkbox v-model:checked={ this.rememberLogin }>自动登录</Checkbox>

          </div>
          {/* 提示区域  ---  结束 */}

          <Button class="w-full" onClick={ this.onLogin }>登 录</Button>

          <a class="block text-center py-2 underline cursor-pointer mt-2 text-sm">注册</a>

          <div class={ Styles.modelArea }>
            <span 
              class={{
                'iconfont': true,
                'icon-yanzhengma-cuxiantiao': true,
                [Styles.checked]: this.currentLoginMode === LoginMode.MOBILE_CAPTCHA
              }} 
              title="验证码登录" 
              onClick={ () => this.toggleLoginMode(LoginMode.MOBILE_CAPTCHA) }
              ></span>
            <span 
              class={{
                'iconfont': true,
                'icon-mima-cuxiantiao': true,
                [Styles.checked]: this.currentLoginMode === LoginMode.MOBILE_PASSWORD
              }} 
              title="密码登录" 
              onClick={ () => this.toggleLoginMode(LoginMode.MOBILE_PASSWORD) }
              ></span>
            <span 
              class={{
                'iconfont': true,
                'icon-youxiang-cuxiantiao': true,
                [Styles.checked]: this.currentLoginMode === LoginMode.EMAIL_PASSWORD
              }} 
              title="邮箱登录" 
              onClick={ () => this.toggleLoginMode(LoginMode.EMAIL_PASSWORD) }
              ></span>
          </div>
        </div>

        <Checkbox fill v-model:checked={ this.agreementChecked } class={ Styles.clause }>
          同意
          <a onClick={ this.linkTo('http://www.qq.com') }>《服务条款》</a>
          <a>《隐私政策》</a>
          <a>《儿童隐私政策》</a>
        </Checkbox>
      </div>
    )
  }
})