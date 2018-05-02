<template>
  <div id="app">
    <v-alert v-show="showAlert"></v-alert>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import alert from '@/components/alert'
export default {
  name: 'App',
  components: {
		'v-alert': alert
  },
  computed: {
    ...mapGetters([
          'showAlert'
      ])
  }
}
</script>

<style>
</style>
