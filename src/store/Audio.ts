/*
 * @Author: 挺子
 * @Description: 播放器相关的状态
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { PlayMode } from '../types/Audio'

export const useAudioState = defineStore('audio', () => {
  const audio = ref<HTMLAudioElement | null>(null)
  const isPaused = ref(true)
  // 当前播放时间
  const currentTime = ref(0)
  // 音乐时长
  const duration = ref(0)
  const playMode = ref<PlayMode>(PlayMode.ORDER)

  /**
   * @description: 获取播放状态
   * @param {*}
   * @return {*} true为暂停中，false为播放中
   */  
  function getPaused() {
    if (!audio.value) {
      isPaused.value = true
    } else {
      isPaused.value = audio.value.paused
    }

    return isPaused.value
  }

  /**
   * @description: 创建Audio标签并挂载
   * @param {HTMLElement} mountEle 挂载的父元素
   * @return {*}
   */  
  function createAudio(mountEle: HTMLElement) {
    audio.value = document.createElement('audio')

    mountEle.appendChild(audio.value)
    audio.value.addEventListener('durationchange', handleDurationChange)
  }

  function playOrPause() {
    if (getPaused()) {
      play()
    } else {
      pause()
    }

    getPaused()
  }


  function play() {
    if (!audio.value) {
      return 
    }

    audio.value.play()
    startListenProgress()
  }

  function pause() {
    if (!audio.value) {
      return
    }

    audio.value.pause()
    stopListenProgress()
  }

  function handleDurationChange(e: Event) {
    duration.value = (e.target as HTMLAudioElement).duration
  }

  function startListenProgress() {
    audio.value?.addEventListener('timeupdate', getCurrentTime)
  }

  function stopListenProgress() {
    audio.value?.removeEventListener('timeupdate', getCurrentTime)
  }

  /**
   * @description: 获取当前播放时间
   * @param {*}
   */  
  function getCurrentTime(e: Event) {
    const tempTime = audio.value?.currentTime || 0
    if (Math.floor(tempTime) <= currentTime.value) {
      return
    }
    currentTime.value = tempTime
  }

  /**
   * @description: 设置播放连接
   * @param {string} src 
   */  
  function setSrc(src: string) {
    if (!audio.value) {
      return
    }

    const reg = /^http[s]?:\/\//
    if (!reg.test(src)) {
      // TODO
    }

    audio.value.setAttribute('src', src)
  }

  /**
   * @description: 切换播放模式，顺序切换
   * @param {*}
   */  
  function togglePlayMode() {
    if (playMode.value === PlayMode.RANDOM) {
      playMode.value = PlayMode.ORDER
    } else {
      playMode.value++
    }
  }

  function setCurrentTime(time: number) {
    // audio.value?.currentTime = time
    if (!audio.value) {
      return
    }

    audio.value.currentTime = time
    currentTime.value = time
  }

  return {
    createAudio,
    playOrPause,
    setSrc,
    setCurrentTime,
    audio,
    isPaused,
    playMode,
    currentTime,
    duration,
    togglePlayMode
  }
})
