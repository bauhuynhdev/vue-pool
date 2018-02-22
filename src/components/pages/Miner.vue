<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total miners</h6>
          </div>
          <div class="panel-body">
            <h6>{{ miners.minersTotal }}</h6>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total miners offline</h6>
          </div>
          <div class="panel-body">
            <h6>{{ totalMinersOffline }}</h6>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total miners</h6>
          </div>
          <div class="panel-body">
            <h6>{{ miners.hashrate | intToHashrate }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <table class="table table-sm text-center">
              <thead>
              <tr>
                <th width="50%">Login</th>
                <th width="25%">Hashrate</th>
                <th width="25%">Lastbeat</th>
              </tr>
              </thead>
              <tbody v-if="sortMiners.length > 0">
              <tr v-for="miner in sortMiners" :class="[miner.value.offline ? 'table-danger' : '']">
                <td>
                  <span v-on:click.prevent="showAccount($event)" v-bind:style="styleMiner">{{ miner.key }}</span>
                </td>
                <td>{{ miner.value.hr | intToHashrate }}</td>
                <td>{{ miner.value.lastBeat | intToTimeStamp(true) }}</td>
              </tr>
              </tbody>
              <tbody v-else>
              <tr>
                <td colspan="3">
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
    data() {
      return {
        title: 'Miners',
        styleMiner: {color: '#0056b3', cursor: 'pointer'},
        miners: {
          minersTotal: 0,
        },
        intervalMiners: new Function()
      }
    },
    methods: {
      initMiners() {
        const self = this;

        self
          .AppService
          .getMiners()
          .then(function (res) {
            self.miners = res;
          })
      },
      showAccount(e) {
        let account = e.target.innerText;

        this.$router.push('/account/' + account);
      },
      run() {
        const self = this;

        self.initMiners();
        self.intervalMiners = setInterval(function () {
          self.initMiners();
        }, self.myConfig.timeRefresh);
      }
    },
    computed: {
      sortMiners() {
        const self = this;
        let miners = self.miners.miners;

        return self.$options.methods.sortObject(miners);
      },
      totalMinersOffline() {
        let number = 0;
        const miners = this.miners.miners;

        $.map(miners, function (miner) {
          if (miner.offline) {
            number++;
          }
        })

        return number;
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.run();
    },
    beforeDestroy() {
      clearInterval(this.intervalMiners);
    }
  }
</script>

<style scoped>

</style>
