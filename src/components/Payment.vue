<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total payments sent</h6>
          </div>
          <div class="panel-body">
            <h6>{{ payments.paymentsTotal }}</h6>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total amounts</h6>
          </div>
          <div class="panel-body">
            <h6>{{ totalAmount | intToBalance }}</h6>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <table class="table table-sm text-center">
              <thead>
              <tr>
                <th width="30%">Time</th>
                <th width="20%">Amount</th>
                <th width="25%">Address</th>
                <th width="25%">Tx ID</th>
              </tr>
              </thead>
              <tbody v-if="Object.keys(payments.payments).length > 0">
              <tr v-for="payment in payments.payments">
                <td>{{ payment.timestamp | intToTimeStamp(true) }}</td>
                <td>{{ payment.amount | intToBalance }}</td>
                <td>{{ payment.address }}</td>
                <td>{{ payment.tx }}</td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td colspan="4">
                  <img class="loading" :src="this.myConfig.loadingSvg"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Payment",
    data() {
      return {
        payments: new Object({
          paymentsTotal: 0
        }),
        intervalPayment: new Function()
      }
    },
    methods: {
      initPayments() {
        const self = this;

        self
          .AppService
          .getPayments()
          .then(function (res) {
            self.payments = res;
          })
      },
      run() {
        const self = this;

        self.initPayments();
        self.intervalPayment = setInterval(function () {
          self.initPayments();
        }, self.myConfig.timeRefresh);
      }
    },
    computed: {
      totalAmount() {
        const payments = this.payments.payments;
        let total = 0;

        $.map(payments, function (payment) {
          total = total += payment.amount;
        })

        return total;
      }
    },
    mounted() {
      this.run();
    },
    beforeDestroy() {
      clearInterval(this.intervalPayment);
    }
  }
</script>

<style scoped>

</style>
