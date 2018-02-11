<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="" style="padding:15px 5px 5px;">
      <b-icon @click.native="toggleDrawer" v-if="!showDrawer" pack="fa" icon="chevron-right" title="Show side menu"></b-icon>
    </div>
    <div class="navbar-brand" style="padding:0px;margin:0px;">
      <a class="navbar-item" href="/">
        <img :src="logo">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to='/'>Home</router-link>
        </a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item">
          <router-link to="/sign-in">Sign In</router-link>
        </a>
      </div>

      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script>
import { GlobalTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      logo: require('@/assets/logo.png')
    }
  },
  computed: {
    ...mapGetters({
      showDrawer: GlobalTypes.showDrawer
    })
  },
  methods: {
    toggleDrawer () {
      this.$store.dispatch(GlobalTypes.showDrawer, !this.showDrawer)
    }
  }
}
</script>
