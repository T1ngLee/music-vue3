import { defineComponent, ref } from 'vue'
import CollectIcon from '../../common/CollectIcon'

export default defineComponent({
  name: 'SongInfo',
  setup() {
    const collected = ref(false)
    
    return {
      collected
    }
  },
  render() {
    return (
      <div>
        <img 
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp03%2F1Z92109393023V-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639833245&t=260b0fb0f7546c98c0c15c8e195958b0" 
          alt="" 
          class="w-12 h-12 rounded inline-block cursor-pointer"
          />
        <div class="inline-block align-middle ml-3 mr-2 max-w-40 overflow-hidden">
          <div style="white-space: nowrap;" class="cursor-pointer">Song Name Song Name Song Name Song Name Song Name Song Name</div>
          <div class="text-sm cursor-pointer">Singer</div>
        </div>
        <CollectIcon class="cursor-pointer align-top" v-model:collected={ this.collected } />
      </div>
    )
  }
})