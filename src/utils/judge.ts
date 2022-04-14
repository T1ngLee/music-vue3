/*
 * @Author: 挺子
 * @Description: 各种判断方法
 */

export default class Judge {
  private constructor() {}

  /**
   * @description: 基础判断
   * @param {any} data 要判断的数据
   * @param {*} type 支持的类型
   * @return {*}
   */  
  static baseJudge(data: any, type: 'Array' | 'Object' | 'Number' | 'String'): boolean {
    return Object.prototype.toString.call(data) === `[object ${type}]`
  }

  /**
   * @description: 判断是不是数组类型
   * @param {any} data
   * @return {*}
   */  
  static isArray(data: any): data is any[] {
    return this.baseJudge(data, 'Array')
  }

  static isEmptyArray(array: any[]): boolean {
    return array.length === 0
  }

  static isNumber(data: any): data is number {
    return this.baseJudge(data, 'Number')
  }

  static isString(data: any): data is string {
    return this.baseJudge(data, 'String')
  }
}

