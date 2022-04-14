/*
 * @Author: 挺子
 * @Description: 操作 localStoreage 或 sessionStorage 的库
 */

export default abstract class MyStorage<T> {
  storage!: Storage 
  key!: string

  constructor(_key: string) {
    this.key = _key
  }

  get(): T | null {
    const storageStr = this.storage.getItem(this.key)
    if (storageStr) {
      const res = JSON.parse(storageStr)
      return res
    }
    return null
  }

  length() {
    return this.storage.length
  }

  set(data: T) {
    this.storage.setItem(this.key, JSON.stringify(data))
  }

  delete() {
    this.storage.removeItem(this.key)
  }
}
