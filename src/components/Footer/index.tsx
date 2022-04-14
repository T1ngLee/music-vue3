import { defineComponent } from 'vue'
import SongInfo from './SongInfo'
import Controls from './Controls'
import OtherBtn from './OtherBtn'

export default defineComponent({
  name: 'Footer',
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <footer class="relative w-full h-20 border-t flex-none flex justify-between items-center px-3">
        <SongInfo />
        <Controls class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <OtherBtn />
      </footer>
    )
  }
})