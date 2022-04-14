import { Module } from 'vuex'
import { RootType } from './index'

export namespace UserType {
  export interface State {
    userId: string,
    nickname: string,
    avatarUrl: string
  }

  export const SET_USER_INFO = 'setUserInfo'
}

const userInfo: Module<UserType.State, RootType.State> = {
  namespaced: true,
  state: () => ({
    userId: '',
    nickname: '',
    avatarUrl: ''
  }),
  mutations: {
    [UserType.SET_USER_INFO]: (state, payload: UserType.State) => {
      state.userId = payload.userId
      state.nickname = payload.nickname
      state.avatarUrl = payload.avatarUrl
    }
  },
}

export default userInfo
