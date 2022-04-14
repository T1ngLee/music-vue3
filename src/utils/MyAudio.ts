// import { useAudioState } from '../store/Audio'
// const a = useAudioState()


export default class MyAudio {
  public static audio: HTMLAudioElement
  private static button: HTMLButtonElement | null = null
  public static paused: boolean = false

  static currentTime: number

  /**
   * @description: 创建audio标签
   * @param {HTMLElement} mountEle
   * @return {*}
   */  
  static create (mountEle: HTMLElement) {
    this.audio = document.createElement('audio')
    // this.audio.autoplay = true
    mountEle.appendChild(this.audio)
    return this
  }

  /**
   * @description: 播放音乐 
   * @param {*}
   * @return {*}
   */  
  static play () {
    if (this.audio) {
      this.audio.play()
      this.getPaused()
      this.startListenProgress()
    }
  }

  /**
   * @description: 暂停音乐
   * @param {*}
   * @return {*}
   */  
  static pause () {
    if (this.audio) {
      this.audio.pause()
      this.getPaused()
      this.stopListenProgress()
    }
  }

  /**
   * @description: 重置音乐
   * @param {*}
   * @return {*}
   */  
  reset () {}

  /**
   * @description: 上一首
   * @param {*}
   * @return {*}
   */  
  before () {}

  /**
   * @description: 下一首
   * @param {*}
   * @return {*}
   */  
  after () {}
    
  /**
   * @description: 设置音乐链接
   * @param {*}
   * @return {*}
   */  
  static setSrc (src: string) {
    const reg = /^http[s]?:\/\//
    if (!reg.test(src)) {
      // todo
    }

    if (!this.audio) {
      return 
    }

    this.audio.setAttribute('src', src)
  }

  static startListenProgress() {
    this.audio.addEventListener('timeupdate', this.getCurrentTime.bind(this))
  }

  static stopListenProgress() {
    this.audio.removeEventListener('timeupdate', this.getCurrentTime.bind(this))
  }

  /**
   * @description: 获取当前播放时间
   * @param {*}
   * @return {*}
   */  
  private static getCurrentTime() {
    this.currentTime = this.audio.currentTime
    console.log('当前播放时间：', this.currentTime)
  }

  private static getPaused() {
    // a.paused = this.audio.paused
  }
}