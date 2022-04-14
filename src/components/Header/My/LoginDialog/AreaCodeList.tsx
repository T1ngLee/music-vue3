/*
 * @Author: 挺子
 * @Description: 在登录弹窗中使用的区号下拉列表
 */
import { defineComponent, ref, onMounted } from 'vue'
import Styles from './AreaCodeList.module.scss'
import { requestCountriesCode } from '../../../../api/CommonApi'

export default defineComponent({
  name: 'AreaCodeList',
  props: {
    code: {
      required: true,
      type: String
    }
  },
  emits: ['getAreaCode'],
  async setup(props, context) {
    let countries = await requestCountriesCode()

    /**
     * @description: 选择区号
     * @param {string} code 区号
     * @return {*}
     */    
    function selectAreaCode(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.nodeName !== 'LI') {
        return 
      }

      const code = target.getAttribute('data-code')
      context.emit('getAreaCode', code)
    }

    return {
      countries,
      selectAreaCode
    }
  },
  render() {
    const areaList = this.countries.map((item) => {
      return (
        <li class={{
          [Styles.areaItem]: true,
          [Styles.checked]: item.code === this.code
        }} data-code={ item.code }>
          {/* <svg class={ Styles.areaIcon } aria-hidden="true">
            <use xlinkHref={ `#icon-${item.en}` }></use>
          </svg> */}
          <span class="pointer-events-none">{ item.zh }</span>
          <span class="ml-auto pointer-events-none">{ `+${item.code}` }</span>
        </li>
      )
    })

    return (
      <ul class={ Styles.areaList } onClick={ this.selectAreaCode }>
        { areaList }
      </ul>
    )
  }
})