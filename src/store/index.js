import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
Vue.use(Vuex)

//声明一个状态 state
const state = {
  count: 0
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store