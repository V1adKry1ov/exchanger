import Vue from 'vue'
import Vuex from 'vuex'

import balance from './balance'
import valutes from './valutes'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {balance, valutes}
})