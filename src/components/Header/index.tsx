import { defineComponent } from 'vue'
import Logo from './Logo'
import Search from './Search'
import My from './My'
import Resize from './Resize'
import Navigation from './Navigation'

export default defineComponent({
  name: 'Header',
  setup() {
    
    return {

    }
  },
  render() {
    return (
      <header class="h-16 w-full flex-none bg-wy-red relative">
        <Logo />
        <Navigation />
        <Search />
        <My />
        <Resize />
      </header>
    )
  }
})