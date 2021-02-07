<template>
    <div class="purchase">
        <div class="selector">
            <p>Валюта:</p>
            <select v-model="valute.selectedValute">
                <option v-for="(valute, index) in valutesArray[0]" :key="index" :value="valute.CharCode">{{ valute.Name  }} ({{ valute.CharCode }})</option>
            </select>
        </div>
        
        <div class="text">
            <p>Доступно:</p>
            <h2>0.00 {{ valute.selectedValute !== null ? valute.selectedValute : ""}}</h2>
        </div>

        <div class="toggle">
            <p>Хочу:</p>
            <div class="form_radio_btn">
                <input v-model="checkedBuy" id="radio-1" type="radio" name="radio" :value="true" checked>
                <label for="radio-1">Купить</label>
            </div>
            
            <div class="form_radio_btn">
                <input v-model="checkedBuy" id="radio-2" type="radio" name="radio" :value="false">
                <label for="radio-2">Продать</label>
            </div>
            <input type=number step="0.01" class="input_valute" placeholder="0,00" v-model="valute.amountValute">
        </div>

        <div class="text">
            <p>Заплачу:</p>
            <h2>{{ totalPrice }}</h2>
        </div>

        <button class="buy_btn" @click="buy">Купить</button>
        <p v-if="expensive">Недосточно средств</p>
    </div>
</template>

<script>

export default {
    props: {
        valutesArray: {
            type: Array, 
            required: true
        }
    },
    data() {
        return {
            checkedBuy: true,
            expensive: false,
            balance: {},
            valute: {
                selectedValute: null,
                amountValute: null
            }
            
        };
    },
    mounted() {
        let valute = "RUB"
        let amount = parseFloat(10000.30).toFixed(2)
        this.balance = this.$store.getters.getBalance
        this.$store.dispatch('addBalance', {valute, amount})
        // console.log(this.valutesArray)
    },

    computed: {
        totalPrice() {
            // Вычисление сколько нужно будет заплатить в рублях за указанное количество валюты, учитывая номинал валют
            if(this.valutesArray !== null && this.valute.selectedValute !== null && this.valute.amountValute > 0) {
                let arr, currentVal, totalPrice, amountValute, price, quantity
                arr = Object.entries(this.valutesArray[0])
                currentVal = this.valute.selectedValute
                amountValute = this.valute.amountValute


                for(let i =0; i <=arr.length; i++) {
                    if(arr[i][0] == currentVal) {
                        price = arr[i][1].Value
                        quantity = arr[i][1].Nominal
                        break
                    }
                }        
                totalPrice = (amountValute * price * quantity).toFixed(2)  
        

                return totalPrice
            } else {
                return 0
            }
            
        }
    },
    
    methods: {
        buy() {
            if(this.checkedBuy && this.valute.selectedValute !== null && this.valute.amountValute > 0) {
                // Кнока "Купить" вызовет сработает если будет выбран чекбокс покупки и поля не будут пусты
                let price, currentVal, arr, balance, totalPrice, quantity, amountValute
                currentVal = this.valute.selectedValute
                amountValute = this.valute.amountValute
                arr = Object.entries(this.valutesArray[0])
                balance = parseFloat(this.balance[0].amount)
                 
                

                for(let i =0; i <=arr.length; i++) {
                    if(arr[i][0] == currentVal) {
                        price = arr[i][1].Value
                        quantity = arr[i][1].Nominal
                        break
                    }
                }
                
                totalPrice = amountValute * price * quantity
                // Проверяем хватате ли баланса
                if(totalPrice <= balance) {
                    // Далее идет проверка, есть ли покупаемая валюта на балансе
                    let isValute
                    let amount = parseFloat(this.valute.amountValute).toFixed(2)
                    this.expensive = false

                    for(let i=0; i<this.balance.length; i++) {
                        if(this.balance[i].valute == currentVal) { isValute = true; break} else {isValute = false}
                    }
                    
                    
                    let valute = this.valute.selectedValute
                    if(isValute) {
                        // Если данная валюта уже есть, то изменяем ее количество
                        // Изменение балнса существующей валюты не работает. Баланс изменятся и записывается в state, но computed изменяет баланс
                        // т.к изменятся не сам массив balance а его элемент. Это можно решить через Vue.set, но я еще не разобрался как 
                        amount = (balance - totalPrice).toFixed(2)
                        valute = "RUB"
                        
                        this.$store.dispatch('editeBalance', {valute, amount})
                        this.balance = this.$store.getters.getBalance
                        balance = parseFloat(this.balance[0].amount)
                    } else {
                        // Если валюты нет, то добавляем ее в кошелек 
                        this.$store.dispatch('addBalance', {valute, amount})
                        // Не забываем изменить баланс в рублях
                        amount = (balance - totalPrice).toFixed(2)
                        valute = "RUB"
                        
                        this.$store.dispatch('editeBalance', {valute, amount})
                        this.balance = this.$store.getters.getBalance
                        balance = parseFloat(this.balance[0].amount)
                    }
                    
                } else {
                    this.expensive = true
                    console.log("Недостаточно средств")
                }
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .purchase {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 288px;
        height: 424px;
        padding: 32px 16px 32px 16px;
        background: #F6F6F6;

        h2 {
            font-size: 16px;
        }

        p {
            color: rgba(51, 51, 51, 0.5);
        }
    }

    .selector {
        select {
            width: 256px;
            height: 40px;
            padding: 8px 16px 8px 16px;
            background: #FFFFFF;
            border: 1px solid #D8D8D8;
            font-weight: bold;
            font-size: 16px;
        }
    }


    .form_radio_btn {
        display: inline-block;
        
        input[type=radio] {
            display: none;
        }

        input[type=radio]:checked + label {
            color: #34AAF2;
        }

        label {
            width: 128px;
            height: 32px;
            display: inline-block;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            padding-left: 30%;
            line-height: 34px;
            border: 1px solid #D8D8D8;
            user-select: none;
        }
    }

    .input_valute {
        width: 256px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #D8D8D8;  
        padding: 8px 16px;  
        margin-top: 8px;  
    }

    .buy_btn {
        width: 256px;
        height: 32px;       
        font-size: 13px;
        font-weight: 700;
        color: white;
        background: #00B956;
    }

    
</style>