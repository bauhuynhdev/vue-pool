import Vue from 'vue'
import Config from '@/myConfig'

const apiConfig = Config.api;

export default {
  getMiners() {
    return new Promise(function (resolve, reject) {
      Vue
        .prototype
        .$http
        .get(apiConfig.host + 'miners')
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          throw new Error('Cannot get API Miners');
        })
    })
  },
  getStats() {
    return new Promise(function (resolve, reject) {
      Vue
        .prototype
        .$http
        .get(apiConfig.host + 'stats')
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          throw new Error('Cannot get API Statistical');
        })
    })
  },
  getAccount(accountId) {
    return new Promise(function (resolve, reject) {
      Vue
        .prototype
        .$http
        .get(apiConfig.host + 'accounts/' + accountId)
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          throw new Error('Cannot get API ' + accountId);
        })
    })
  },
  getPayments() {
    return new Promise(function (resolve, reject) {
      Vue
        .prototype
        .$http
        .get(apiConfig.host + 'payments')
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          throw new Error('Cannot get API Payments');
        })
    })
  },
  getBlocks() {
    return new Promise(function (resolve, reject) {
      Vue
        .prototype
        .$http
        .get(apiConfig.host + 'blocks')
        .then(function (res) {
          resolve(res.data);
        })
        .catch(function (err) {
          throw new Error('Cannot get API Blocks');
        })
    })
  }
}
