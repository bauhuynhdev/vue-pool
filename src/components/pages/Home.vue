<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Miners Online</h6>
          </div>
          <div class="panel-body">
            <h6>{{ stats.minersTotal }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Pool Hashrate</h6>
          </div>
          <div class="panel-body">
            <h6>{{ stats.hashrate | intToHashrate }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Last Block Found</h6>
          </div>
          <div class="panel-body">
            <h6>{{ stats.stats.lastBlockFound | intToTimeDiff }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Network Difficulty</h6>
          </div>
          <div class="panel-body">
            <h6>{{ networkDifficulty }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Blockchain height</h6>
          </div>
          <div class="panel-body">
            <h6>{{ stats.nodes[0].height }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Price</h6>
          </div>
          <div class="panel-body">
            <h6>{{ stats.prices.BTC }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Network hashrate</h6>
          </div>
          <div class="panel-body">
            <h6>{{ networkHashrate }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="panel panel-success">
          <div class="panel-heading">
            <h6>Current round variance</h6>
          </div>
          <div class="panel-body">
            <h6>{{ currentRound }}</h6>
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
  </div>
</template>

<script>
  export default {
    data() {
      const self = this;

      return {
        title: 'Home',
        stats: {
          minersTotal: 0,
          hashrate: 0,
          nShares: 0,
          stats: {
            lastBlockFound: 0
          },
          nodes: [{
            difficulty: 0,
            height: 0
          }],
          prices: {
            BTC: 0
          }
        },
        chart: new Function(),
        chartOptions: {
          tooltips: {
            displayColors: false,
            callbacks: {
              title: function (i, v) {
                let timeStamp = v['labels'][i[0]['index']];
                return 'Timestamp: ' + self.$options.filters.intToTimeStamp(timeStamp, true);
              },
              label: function (i, v) {
                let hashRate = v['datasets'][0]['data'][i['index']];
                return 'Hashrate: ' + self.$options.filters.intToHashrate(hashRate);
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
                  return self.$options.filters.intToTimeStamp(v)
                    .toLocaleTimeString(navigator.language, {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    });
                }
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Hashrate'
              },
              ticks: {
                callback: function (v, i) {
                  return self.$options.filters.intToHashrate(v);
                }
              }
            }]
          }
        },
        intervalAccount: new Function()
      }
    },
    computed: {
      networkDifficulty() {
        const oneMillon = 1000000000000;
        const toFixed = 3;

        return (this.stats.nodes[0].difficulty / oneMillon).toFixed(3) + ' T';
      },
      networkHashrate() {
        let networkHashrate = parseInt(this.stats.nodes[0].difficulty / parseInt(this.myConfig.blockTime));

        return this.$options.filters.intToHashrate(networkHashrate);
      },
      currentRound() {
        let oneHundred = 100;
        let toFixed = 2;

        let currentRound = this.stats.nShares / parseInt(this.stats.nodes[0].difficulty);

        return (currentRound * oneHundred).toFixed(toFixed) + ' %';
      }
    },
    methods: {
      initChart(element, type = 'line') {
        const self = this;

        self.chart = new Chart(element, {
          type: type,
          data: {
            labels: [],
            datasets: [{
              label: "Hashrate",
              borderColor: 'rgb(255, 51, 102)',
              backgroundColor: 'rgba(255, 51, 255, .4)',
              data: [],
            }]
          },
          options: self.chartOptions
        });
      },
      initStats() {
        const self = this;

        self
          .AppService
          .getStats()
          .then(function (res) {
            self.stats = res;

            var rangerPoint = 200;
            var poolHistory = res.poolHistory;
            var chartTimestamp = new Array();
            var chartHashrate = new Array();
            var endPoint = poolHistory.length - 1;
            var startPoint = 0;

            while (startPoint < endPoint) {
              chartTimestamp.push(poolHistory[startPoint].timestamp);
              chartHashrate.push(poolHistory[startPoint].hashrate);
              startPoint = startPoint += 10;
            }

            self.chart.data.labels = chartTimestamp;
            self.chart.data.datasets[0].data = chartHashrate;

            self.chart.update();
          })
      },
      runChart() {
        const self = this;

        this.initStats();
        this.intervalAccount = setInterval(function () {
          self.initStats();
        }, this.myConfig.timeRefresh);
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.initChart(this.$refs.myChart);
      this.runChart();
    },
    beforeDestroy() {
      clearInterval(this.intervalAccount);
    }
  }
</script>

<style scoped>

</style>
