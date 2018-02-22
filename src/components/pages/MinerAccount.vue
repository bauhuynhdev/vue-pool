<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Immature Balance</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.stats.immature | intToBalance }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Immature Balance</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.stats.balance | intToBalance }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total Paid</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.stats.paid | intToBalance }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Last 24h Reward</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account['24hreward'] | intToBalance }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Last Share Submitted</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.stats.lastShare | intToTimeDiff }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Workers Online</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.workersOnline }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Current Hashrate (30m)</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.currentHashrate | intToHashrate }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Current Hashrate (3h)</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.hashrate | intToHashrate }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Blocks Found</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.stats.blocksFound }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Total Payments</h6>
          </div>
          <div class="panel-body">
            <h6>{{ account.paymentsTotal }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Your Round Share</h6>
          </div>
          <div class="panel-body">
            <h6>{{ statsRoundShares }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Daily estimated gain</h6>
          </div>
          <div class="panel-body">
            <h6>{{ earningUSD }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <canvas ref="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#workers" role="tab" data-toggle="tab">Workers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#rewards" role="tab" data-toggle="tab">Rewards</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#payouts" role="tab" data-toggle="tab">Payouts</a>
              </li>
            </ul>

            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="workers">
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="25%">ID</th>
                    <th width="25%">Hashrate (30m)</th>
                    <th width="25%">Hashrate (3h)</th>
                    <th width="25%">Last Share</th>
                  </tr>
                  </thead>
                  <tbody v-if="Object.keys(account.workers).length > 0">
                  <tr v-for="(worker,key) in account.workers">
                    <td>{{ key }}</td>
                    <td>{{ worker.hr | intToHashrate }}</td>
                    <td>{{ worker.hr2 | intToHashrate }}</td>
                    <td>{{ worker.lastBeat | intToTimeDiff }}</td>
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
              <div role="tabpanel" class="tab-pane fade" id="rewards">
                <br/>
                <table class="table table-sm text-center">
                  <tbody v-if="Object.keys(account.sumrewards).length > 0">
                  <tr v-for="sumreward in account.sumrewards">
                    <td>{{ sumreward.name }}</td>
                    <td>{{ sumreward.reward | intToBalance }}</td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td colspan="2">
                      <img class="loading" :src="this.myConfig.loadingSvg"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="25%">Block Height</th>
                    <th width="50%">Rewards</th>
                    <th width="25%">Round Share</th>
                  </tr>
                  </thead>
                  <tbody v-if="Object.keys(account.rewards).length > 0">
                  <tr v-for="(reward,key) in account.rewards">
                    <td>{{ reward.blockheight }}</td>
                    <td>{{ reward.reward | intToBalance }}</td>
                    <td>{{ reward.percent | intToRoundShare }}</td>
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
              <div role="tabpanel" class="tab-pane fade" id="payouts">
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="25%">Time</th>
                    <th width="50%">Tx ID</th>
                    <th width="25%">Amount</th>
                  </tr>
                  </thead>
                  <tbody v-if="Object.keys(account.payments).length > 0">
                  <tr v-for="payment in account.payments">
                    <td>
                      {{ payment.timestamp | intToTimeStamp(true) }}
                    </td>
                    <td><span v-on:click.prevent="" v-bind:style="styleUrl">{{ payment.tx }}</span></td>
                    <td>{{ payment.amount | intToBalance }}</td>
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
    </div>
  </div>
</template>

<script>
  import Chart from '../../../node_modules/chart.js/src/chart'
  import Helpers from '@/helpers'

  export default {
    data() {
      const self = this;

      return {
        styleUrl: {color: '#0056b3', cursor: 'pointer'},
        accountId: self.$route.params.id,
        stats: new Object(),
        account: {
          workersOnline: 0,
          currentHashrate: 0,
          hashrate: 0,
          '24hreward': 0,
          paymentsTotal: 0,
          stats: {
            immature: 0,
            balance: 0,
            paid: 0,
            lastShare: 0,
            blocksFound: 0
          },
          earnings: {
            USD: 0
          },
          workers: new Object(),
          rewards: new Object(),
          payments: new Object(),
          sumrewards: new Object()
        },
        chart: new Function(),
        chartOptions: {
          tooltips: {
            displayColors: false,
            callbacks: {
              title: function (i, v) {
                var timeStamp = v['labels'][i[0]['index']];
                return 'Timestamp: ' + self.$options.filters.intToTimeStamp(timeStamp).toLocaleString();
              },
              label: function (i, v) {
                switch (i.datasetIndex) {
                  case 0:
                    var hashRate = v['datasets'][0]['data'][i['index']];
                    return 'Hashrate: ' + self.$options.filters.intToHashrate(hashRate);
                    break;
                  case 1:
                    var worker = v['datasets'][1]['data'][i['index']];
                    return 'Workers: ' + worker;
                    break;
                }
              }
            }
          },
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Timestamp'
              },
              ticks: {
                callback: function (v, i) {
                  return new Date(1000 * v)
                    .toLocaleTimeString(navigator.language, {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    });
                }
              }
            }],
            yAxes: [
              {
                id: 'hashrates',
                position: 'left',
                scaleLabel: {
                  display: true,
                  labelString: 'Hashrate'
                },
                ticks: {
                  callback: function (v, i) {
                    return self.$options.filters.intToHashrate(v);
                  }
                }
              },
              {
                id: 'workers',
                position: 'right',
                scaleLabel: {
                  display: true,
                  labelString: 'Workers'
                }
              },
            ]
          }
        },
        intervalAccount: new Function(),
        intervalStats: new Function(),
        roundShares: {
          stats: 0,
          account: 0
        }
      }
    },
    computed: {
      earningUSD() {
        return this.account.earnings.USD.toFixed(2) + ' USD';
      },
      statsRoundShares() {
        let roundShares = (this.roundShares.account / this.roundShares.stats) * 100;

        return roundShares.toFixed(2) + ' %';
      }
    },
    methods: {
      initChart(element, type = 'line') {
        const self = this;

        self.chart = new Chart(element, {
          type: type,
          data: {
            labels: [],
            datasets: [
              {
                yAxisID: 'hashrates',
                label: "Hashrate history",
                borderColor: 'rgb(255, 51, 102)',
                backgroundColor: 'rgba(255, 51, 255, .4)',
                data: [],
              },
              {
                yAxisID: 'workers',
                label: "Workers history",
                borderColor: 'rgb(0, 0, 238)',
                backgroundColor: 'rgba(0, 102, 255, .4)',
                data: [],
              }
            ]
          },
          options: self.chartOptions
        });
      },
      initAccount() {
        const self = this;

        this
          .AppService
          .getAccount(self.accountId)
          .then(function (res) {
            self.account = res;
            self.roundShares.account = res.roundShares;

            var rangerPoint = 100;
            var poolHistory = res.hashHistory;
            var chartTimestamp = new Array();
            var chartHashrate = new Array();
            var chartWorkers = new Array();
            var endPoint = poolHistory.length - 1;
            var startPoint = 0;

            while (startPoint < endPoint) {
              chartTimestamp.push(poolHistory[startPoint].timestamp);
              chartHashrate.push(poolHistory[startPoint].value);
              chartWorkers.push(poolHistory[startPoint].onlineWorkers);
              startPoint++;
            }

            self.chart.data.labels = chartTimestamp;
            self.chart.data.datasets[0].data = chartHashrate;
            self.chart.data.datasets[1].data = chartWorkers;

            self.chart.update();
          })
      },
      initStats() {
        const self = this;

        this
          .AppService
          .getStats()
          .then(function (res) {
            self.stats = res;
            self.roundShares.stats = res.stats.roundShares;
          })
      },
      runChart() {
        const self = this;

        self.initStats();
        self.initAccount();

        self.intervalStats = setInterval(function () {
          self.initStats();
        }, self.myConfig.timeRefresh)

        self.intervalAccount = setInterval(function () {
          self.initAccount();
        }, self.myConfig.timeRefresh + 500);
      }
    },
    created() {
      document.title = this.accountId;
    },
    mounted() {
      this.initChart(this.$refs.myChart);

      this.runChart();
    },
    beforeDestroy() {
      clearInterval(this.intervalAccount);
      clearInterval(this.intervalStats);
    }
  }
</script>

<style scoped>
  .nav-link {
    padding: 10px 20px;
  }
</style>
