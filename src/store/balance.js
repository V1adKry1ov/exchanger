export default {
    state: {
        balance: []
    },
    mutations: {  
        addBalance(state, payload) {
            state.balance.push(payload)
        },
        editeBalance(state, payload) {
            for(let i=0; i <= state.balance.length; i++) {
                if(state.balance[i].valute == payload.valute) {
                    state.balance[i] = payload
                    
                    break
                }
            }
            
        }
    },
    actions: {
        addBalance({commit}, payload) {
            commit('addBalance', payload)
            
        }, 
        editeBalance({commit}, payload) {
            commit('editeBalance', payload)
        }
    },
    getters: {
        getBalance(state) {
            return state.balance
        }
    }
}