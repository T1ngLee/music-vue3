/*
 * @Author: 挺子
 * @Description: 
 */

import MyStorage from './MyStorage'

export default class SessionStorage<T> extends MyStorage<T> {
  constructor(_key: string) {
    super(_key)
    this.storage = window.sessionStorage
  }
}
