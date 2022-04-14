import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'MyCollect',
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <div> 
        <RouterView />
      </div>
    )
  }
})