<script setup>
import { RouterView } from 'vue-router'
import NavigationComponent from './components/NavigationComponent.vue';
</script>

<template>
  <div class="app">
    <link rel="stylesheet" 
        href="node_modules/@fortawesome/fontawesome-free/css/all.css">
    <NavigationComponent />
    <RouterView />
  </div>
</template>

<style lang="scss">
@import url("http://fonts.googleapi.com/css2?family=Raleway:wght@400;500&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
