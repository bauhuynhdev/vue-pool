<template>
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
</template>

<script>
  export default {
    name: 'layout-navbar',
    props:[
      'menus'
    ],
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
