import { defineComponent, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Styles from './menuButton.module.scss'

export default defineComponent({
  name: 'MenuButton',
  props: {
    text: {
      type: String,
      required: true
    },
    path: String
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    function toRoute() {
      if (!props.path) return
      router.push(props.path)
    }

    const isActive = computed(() => {
      return route.matched.some(({path}) => {
        return path === props.path
      })
    })

    return {
      toRoute,
      isActive,
      route
    }
  },
  render() {
    return (
      <div 
        class={[Styles.buttonBase, this.isActive && Styles.buttonActive]} 
        onClick={ this.toRoute }
        >
        { this.text }
      </div>
    )
  }
})