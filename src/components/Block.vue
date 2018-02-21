<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <table class="table table-sm text-center">
              <thead>
              <tr>
                <th width="25%">Blocks</th>
                <th width="25%">Shares/Diff</th>
                <th width="25%">Uncle Rate</th>
                <th width="25%">Orphan Rate</th>
              </tr>
              </thead>
              <tbody v-if="Object.keys(blocks.luck).length > 0">
              <tr v-for="(luck,key) in blocks.luck">
                <td>{{ key }}</td>
                <td>{{ luck.luck | intToRoundShare(0) }}</td>
                <td>{{ luck.uncleRate | intToRoundShare(0) }}</td>
                <td>{{ luck.orphanRate | intToRoundShare(0) }}</td>
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
    <br/>
    <div class="row">
      <div class="col-12">
        <div class="panel panel-success">
          <div class="panel-body">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" href="#maturer" role="tab" data-toggle="tab">Maturer
                  <span class="badge badge-success">{{ blocks.maturedTotal }}</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#immaturer" role="tab" data-toggle="tab">Immaturer
                  <span class="badge badge-success">{{ blocks.immatureTotal }}</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#newBlock" role="tab" data-toggle="tab">New blocks
                  <span class="badge badge-success">{{ blocks.candidatesTotal }}</span>
                </a>
              </li>
            </ul>

            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="maturer">
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="20%">Height</th>
                    <th width="20%">Block Hash</th>
                    <th width="20%">Time Found</th>
                    <th width="20%">Luck</th>
                    <th width="20%">Reward</th>
                  </tr>
                  </thead>
                  <tbody v-if="processMantured != null && Object.keys(processMantured).length > 0">
                  <tr v-for="mature in processMantured">
                    <td>{{ mature.height }}</td>
                    <td>{{ mature.hash }}</td>
                    <td>{{ mature.timestamp | intToTimeStamp(true) }}</td>
                    <td><span v-bind:class="'badge ' + mature.luckStyle">{{ mature.luck }}</span></td>
                    <td>{{ mature.reward }}</td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td colspan="5">
                      <img class="loading" :src="this.myConfig.loadingSvg"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane" id="immaturer">
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="20%">Height</th>
                    <th width="20%">Block Hash</th>
                    <th width="20%">Time Found</th>
                    <th width="20%">Luck</th>
                    <th width="20%">Reward</th>
                  </tr>
                  </thead>
                  <tbody v-if="processImmatured != null && Object.keys(processImmatured).length > 0">
                  <tr v-for="immatured in processImmatured">
                    <td>{{ immatured.height }}</td>
                    <td>{{ immatured.hash }}</td>
                    <td>{{ immatured.timestamp | intToTimeStamp(true) }}</td>
                    <td><span v-bind:class="'badge ' + immatured.luckStyle">{{ immatured.luck }}</span></td>
                    <td>{{ immatured.reward }}</td>
                  </tr>
                  </tbody>
                  <tbody v-else>
                  <tr>
                    <td colspan="5">
                      <img class="loading" :src="this.myConfig.loadingSvg"/>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div role="tabpanel" class="tab-pane" id="newBlock">
                <table class="table table-sm text-center">
                  <thead>
                  <tr>
                    <th width="50%">Height</th>
                    <th width="25%">Time Found</th>
                    <th width="25%">Luck</th>
                  </tr>
                  </thead>
                  <tbody v-if="blocks.candidates != null && Object.keys(blocks.candidates).length > 0">
                  <tr v-for="candidate in blocks.candidates">
                    <td>{{ candidate.height }}</td>
                    <td>{{ candidate.timestamp | intToTimeStamp(true) }}</td>
                    <td>{{ candidate.shares | intToLuck(candidate.difficulty) }}</td>
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
  export default {
    name: "Block",
    data() {
      return {
        blocks: new Object({
          luck: new Object(),
          matured: new Object(),
          immature: new Object(),
          candidates: new Object()
        })
      }
    },
    methods: {
      initBlock() {
        const self = this;

        self
          .AppService
          .getBlocks()
          .then(function (res) {
            self.blocks = res;
          })
      }
    },
    computed: {
      processMantured() {
        const self = this;
        let matureds = this.blocks.matured;

        return $.map(matureds, function (mature) {
          let obj = mature;
          obj.luck = self.$options.filters.intToLuck(mature.shares, mature.difficulty);
          obj.luckStyle = obj.luck > 100 ? 'badge-danger' : 'badge-success';
          obj.luck = obj.luck + ' %';

          return obj;
        })
      },
      processImmatured() {
        const self = this;
        let immatureds = this.blocks.immature;

        return $.map(immatureds, function (immatured) {
          let obj = immatured;
          obj.luck = self.$options.filters.intToLuck(immatured.shares, parseInt(immatured.difficulty));
          obj.luckStyle = obj.luck > 100 ? 'badge-danger' : 'badge-success';
          obj.luck = obj.luck + ' %';

          return obj;
        })
      },
    },
    filters: {
      intToLuck(n1, n2) {
        let luck = (n1 / n2) * 100;

        return luck.toFixed(0);
      }
    },
    mounted() {
      this.initBlock();
    }
  }
</script>

<style scoped>
  .nav-link {
    padding: 10px 20px;
  }
</style>
