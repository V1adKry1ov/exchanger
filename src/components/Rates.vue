<template>
    <div class="rates">
        <h2>Курс валют на </h2>
        <table class="valutes">
            <tr>
                <th>Код</th>
                <th>Единиц</th>
                <th>Курс</th>
            </tr> 
            <tr v-for="(valute, index) in valutesArray[0]" :key="index">
                <td>{{ valute.CharCode }}</td>
                <td>{{ valute.Nominal }}</td>
                <td>
                    {{  valute.Value }}
                    ({{((valute.Value - valute.Previous ) / valute.Previous * 100).toFixed(1)}})</td>
            </tr>
        </table>
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
            percent: null,
            currentDate: new Date()
        }
    },

    created() {
        // Главная проблема, утянувшая много времени. Данные приходят асинхронно. Я пытался сделать синхронный запрос, но не смог
        // При запросе целого массива, данные приходят. Но при запросе нулевого элемента массива выдает undefined.

        console.log(this.valutesArray)
        console.log(this.valutesArray[0])
        // console.log(this.valutesArray[0].AMD)
        
    }
}
</script>

<style lang="scss" scoped>
    .rates {
        padding: 32px 20px;
        h2 {
            font-size: 16px;
        }  
    }
    .valutes {
        width: 320px;
        tr {
            
        }
        th {
            width: 100px;
            padding: 5px 0px;
            text-align: center;
            color: rgba(51, 51, 51, 0.5);
            border-bottom: 1px solid rgba(51, 51, 51, 0.5);;
        }
        td {
            width: 100px;
            padding: 5px 0px;
            text-align: center;
            
        }
    }
    .redText {
        color: red;
    }
    .greenText {
        color: green;
    }
</style>