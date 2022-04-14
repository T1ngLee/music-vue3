/*
 * @Author: 挺子
 * @Description: 登录的弹窗
 */

import { defineComponent, ref, inject, provide } from 'vue'
import Dialog from '../../../common/Dialog'
import QRCodeLogin from './QRCodeLogin' // 二维码登录的组件
import OtherLogin from './OtherLogin' // 其它方式登录的组件

enum LoginPattern {
  /**
   * 通过扫二维码登录
   */
  'QR_CODE',
  /**
   * 其他方式登录, 比如 手机号+验证码 / 手机号+密码 / 邮箱+密码
   */
  'OTHER'
}

export default defineComponent({
  name: 'LoginDialog',
  emits: ['closed'],
  async setup(props, context) {
    const dialogShow = ref(true)
    const loginPattern = ref(LoginPattern.QR_CODE)

    const dialogClosed = inject('dialogClosed') as () => any

    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */    
    function closeDialog() {
      dialogShow.value = false
    }

    // 将关闭弹窗的方法传给子组件 QRCodeLogin 和 OtherLogin
    provide('closeDialog', closeDialog)

    /**
     * @description: 切换登录方式
     * @param {*}
     * @return {*}
     */    
    function togglePattern() {
      if (loginPattern.value === LoginPattern.QR_CODE) {
        loginPattern.value = LoginPattern.OTHER
      } else {
        loginPattern.value = LoginPattern.QR_CODE
      }
    }

    return {
      dialogShow,
      loginPattern,
      dialogClosed,
      togglePattern,
    }
  },
  render() {

    return (
      <Dialog 
        v-model:show={ this.dialogShow } 
        onClosed={ this.dialogClosed } 
        class="h-132"
        >
        {
          this.loginPattern === LoginPattern.QR_CODE ?
          <QRCodeLogin onTogglePattern={ this.togglePattern } /> :
          <OtherLogin onTogglePattern={ this.togglePattern }/>
        }
      </Dialog>
    )
  }
})