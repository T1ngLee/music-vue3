import { defineComponent } from 'vue'
import LeftMenu from './LeftMenu'
import Content from './Content'

export default defineComponent({
  name: 'Body',
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <div class="w-full flex-grow flex overflow-hidden">
        <LeftMenu />
        <Content />
      </div>
    )
  }
})