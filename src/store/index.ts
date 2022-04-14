import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import userInfo, { UserType } from './User'

export namespace RootType {
  export interface State {
    count: number,
  }
}

const store = createStore<RootType.State>({
  state: {
    count: 0
  },
  modules: {
    userInfo
  }
})

export const key: InjectionKey<Store<RootType.State>> = Symbol()

export default store