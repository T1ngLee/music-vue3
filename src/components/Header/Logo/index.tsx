import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo',
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <div class="h-full inline-block w-48">
        <h1 class="h-full bg-header-logo bg-no-repeat bg-center bg-70%">
          <a href="/#" class="h-full w-full block" style="text-indent: -999px">网易云音乐</a>
        </h1>
      </div>
    )
  }
})