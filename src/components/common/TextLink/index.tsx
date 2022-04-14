import { defineComponent, renderSlot } from 'vue'

export default defineComponent({
  name: 'TextLink',
  setup() {
    
    return {

    }
  },
  render() {
    const { $slots } = this

    return (
      <a class="">
        { $slots.default && renderSlot($slots, 'default') }
      </a>
    )
  }
})