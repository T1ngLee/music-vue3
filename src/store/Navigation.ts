/*
 * @Author: 挺子
 * @Description: 记录导航状态
 */

import { defineStore } from 'pinia'

export const useNavigation = defineStore('navigation', {
  state: () => ({
    canBack: false,
    canForward: false 
  }),
  actions: {   
    getHistoryStatus() {
      // 获取当前的浏览历史状态
      const historyState = window.history.state
      this.canBack = historyState.back != null
      this.canForward = historyState.forward != null
    }
  }
})