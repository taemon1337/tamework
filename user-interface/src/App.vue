<template>
  <div id="app">
    <div class="columns">
      <SideMenu></SideMenu>
      <div class="column">
        <Navbar></Navbar>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import 'buefy/lib/buefy.css'
import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu'
import { AccountTypes } from '@/store/mutation-types'

export default {
  name: 'App',
  components: {
    Navbar,
    SideMenu
  },
  mounted () {
    this.$store.dispatch(AccountTypes.signIn)
  }
}
</script>
