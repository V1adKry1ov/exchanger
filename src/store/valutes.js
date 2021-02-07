import axios from 'axios'
export default {
    state: {
        valutes: []
    },
    mutations: {  
        addValutes(state, payload) {
            state.valutes.push(payload)
        }
    },
    actions: {
        addValutes({commit}) {
            axios
                .get('https://www.cbr-xml-daily.ru/daily_jsonp.js')
                .then((response) => {commit('addValutes', (JSON.parse(response.data.substr(60).slice(0, -2)).Valute))})
                .catch(error => console.log(error));
        }
    },
    getters: {
        getValutes(state) {
            return state.valutes
        }
    }
}