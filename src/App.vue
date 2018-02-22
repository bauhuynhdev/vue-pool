<template>
  <div id="app">
    <header>
      <layout-navbar v-bind:menus="menus"></layout-navbar>
    </header>
    <main role="main">
      <div class="container" id="main">
        <router-view/>
      </div>
    </main>
    <br/>
    <footer class="container">
      <layout-footer></layout-footer>
    </footer>
  </div>
</template>

<script>
  import LayoutNavbar from "./components/layouts/Navbar";
  import LayoutFooter from "./components/layouts/Footer";

  export default {
    components: {
      LayoutFooter,
      LayoutNavbar
    },
    data() {
      return {
        menus: [
          {name: 'Home', route: 'getHome'},
          {name: 'Miners', route: 'getMiners'},
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
    margin-top: 55px;
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
