<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-for="menu in menus">
              <router-link v-bind:to="{ name: menu.route }" class="nav-link">{{ menu.name }}</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main role="main">
      <div class="container" id="main">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'AppComponent',
    data() {
      return {
        menus: [
          {name: 'Home', route: 'getHome'},
          {name: 'Miners', route: 'initMiners'},
          {name: 'Blocks', route: 'getBlocks'},
          {name: 'Payments', route: 'getPayments'}
        ]
      }
    }
  }
</script>

<style>
  body {
    background-color: #EEEEEE;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
  }

  .table > thead > tr > th {
    border-top: unset;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: unset;
  }

  #main {
    /*background-color: #FFFFFF;*/
  }

  .nav-link {
    padding: .2rem 1rem;
  }

  .panel {
    background-color: #FFFFFF;
  }

  .panel-success > .panel-heading, .panel-success > .panel-body {
    padding: 5px 10px;
    text-align: center;
  }

  .panel-success {
    border: 1px solid #DDDDDD;
    box-shadow: 1px 1px 9px 1px rgba(50, 50, 50, .1), 1px 1px 2px 1px rgba(50, 50, 50, .1);
  }

  .panel-success > .panel-heading {
    background-color: #28a745;
    color: #FFFFFF;
  }

  .col-3, .col-4 {
    margin-bottom: 10px;
  }
</style>
