/*
 * @Author: 挺子
 * @Description: 一些工具函数
 */

import { ArtistItem } from '../types/Base'

export function matchKeyword(keyword: string, target: string, isAll: boolean = false, color: string = '#507daf' ) {
  const reg = new RegExp(keyword, `i${isAll ? 'g' : ''}`)
  return target.replace(reg, `<font color="${color}">$&</font>`)
}

export function debounce(fn: Function, wait: number) {
  let timer: NodeJS.Timeout
  return function(this: any) {
    // TODO 这里的this
    if (timer != undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

/**
 * @description: 拼接歌手列表为字符串
 * @param {ArtistItem} artistsList 歌手列表
 * @return {*}
 */
export function joinArtists(artistsList: ArtistItem[]): string {
  let str = ''
  if (artistsList && artistsList.length) {
    str = artistsList.reduce((target, item) => {
      return target + item.name + ' '
    }, str)
  }

  return str 
}