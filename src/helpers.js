import myConfig from '@/myConfig'

myConfig.loadingSvg = require('./assets/loading.svg');

import AppService from '@/services/App'

export default {
  data() {
    return {
      myConfig: myConfig,
      AppService: AppService
    }
  },
  methods: {
    sortObject(obj) {
      let arr = [];
      let prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          arr.push({
            'key': prop,
            'value': obj[prop]
          });
        }
      }
      arr.sort(function (a, b) {

        return b.value.hr - a.value.hr;
      });

      return arr;
    }
  },
  filters: {
    intToBalance(balance) {
      const toFixed = 8;
      const oneHundredMillion = 100000000
      balance = Math.ceil(balance / 10);

      return (balance / oneHundredMillion).toFixed(toFixed);
    },
    intToTimeStamp(timeStamp, toLocaleString = false) {
      timeStamp = new Date(1000 * timeStamp);

      if (toLocaleString) {
        return timeStamp.toLocaleString()
      }

      return timeStamp;
    },
    intToRoundShare(roundShare, toFixed = 2) {
      return (roundShare * 100).toFixed(toFixed) + ' %';
    },
    intToHashrate(hashRate) {
      const MH = 1000;
      const GH = 1000000;
      const TH = 1000000000;

      hashRate = hashRate / 1000;

      if (hashRate > TH) {
        const hashPower = hashRate / TH;

        return hashPower.toFixed(2) + ' TH';
      }

      if (hashRate > GH) {
        const hashPower = hashRate / GH;

        return hashPower.toFixed(2) + ' GH';
      }

      if (hashRate > MH) {
        const hashPower = hashRate / MH;

        return hashPower.toFixed(2) + ' MH';
      }
    },
    intToTimeDiff(d1) {
      let dateDiff = new Date(1000 * d1);
      let dateCurrent = new Date();
      let timeDiff = Math.abs(dateCurrent.getTime() - dateDiff.getTime());

      let hours = Math.floor(timeDiff / (24 * 60 * 1000));
      let minutes = Math.floor(timeDiff / (60 * 1000));
      let seconds = timeDiff % 60;

      let time = '';
      if (hours > 0) {
        time += hours + (hours > 1 ? ' hours ' : ' hour ');
      }
      if (minutes > 0) {
        time += minutes + (minutes > 1 ? ' minutes ' : ' minute ');
      }

      return time + seconds + (seconds > 1 ? ' seconds ' : ' second ');
    }
  }
}
