<template>
  <div class="container">
    <Purchase :valutesArray="valutesArray"/>
    <Rates :valutesArray="valutesArray"/>
    <Balance :balance="balanceFilter"/>
  </div>
</template>

<script>
import Purchase from "@/components/Purchase"
import Rates from "@/components/Rates"
import Balance from "@/components/Balance"

export default {
  components: {
    Purchase,
    Rates,
    Balance
  }, 
  data() {
    return {
      valutesArray: null
    }
  },
  created() {
    this.$store.dispatch('addValutes')
    this.valutesArray = this.$store.getters.getValutes
  },
  computed: {
    balanceFilter() {
      let balance = this.$store.getters.getBalance
      return balance
    }
  }
}
</script>

<style>

</style>
