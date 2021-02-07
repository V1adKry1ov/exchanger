<template>
    <div class="balance">
        <h2>Баланс</h2>
        <div class="balance__valute" v-for="(valute, index) in balance" :key="index">
            <p>{{ valute.valute }}</p>
            <p>{{ valute.amount }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        balance: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .balance {
        width: 288px;
        height: 200px;
        padding: 32px 16px 32px 16px;
        background: #F6F6F6;
        h2 {
            font-size: 16px;
        }
        &__valute {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }
    }
</style>