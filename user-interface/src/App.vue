<template>
  <div id="app">
    <div class="columns">
      <div class="column">
        <navbar></navbar>
        <registry-side-menu></registry-side-menu>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import 'buefy/lib/buefy.css'
import { AccountTypes } from '@/store/mutation-types'
import Navbar from '@/components/navbar/Navbar'
import RegistrySideMenu from '@/components/registry/RegistrySideMenu'

export default {
  name: 'App',
  mounted () {
    this.$store.dispatch(AccountTypes.signIn)
  },
  components: {
    Navbar,
    RegistrySideMenu
  }
}
</script>
