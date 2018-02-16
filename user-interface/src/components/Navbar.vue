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

      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div v-if="currentUser" class="navbar-end">
      <b-dropdown position="is-bottom-left">
        <a class="navbar-item" slot="trigger">
          <img class="is-round" :src="currentUser.photo" />
          <b-icon icon="caret-down"></b-icon>
        </a>
        <b-dropdown-item custom>
          <b>{{ currentUser.displayName }}</b>
        </b-dropdown-item>
        <hr class="dropdown-divider">
        <b-dropdown-item>
          <a @click.stop.prevent>
            <b-icon icon="group"></b-icon>
            My Groups
          </a>
        </b-dropdown-item>
        <b-dropdown-item>
          <a @click.stop.prevent>
            <b-icon icon="calendar"></b-icon>
            My Calendar
          </a>
        </b-dropdown-item>
        <b-dropdown-item>
          <a @click.stop.prevent>
            <b-icon icon="globe"></b-icon>
            My Locations
          </a>
        </b-dropdown-item>
        <b-dropdown-item>
          <a @click.stop.prevent>
            <b-icon icon="gear"></b-icon>
            My Settings
          </a>
        </b-dropdown-item>
        <hr class="dropdown-divider">
        <b-dropdown-item>
          <a @click.stop.prevent="signout">
            <b-icon icon="sign-out"></b-icon>
            Sign Out
          </a>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-show="!currentUser" class="navbar-end">
      <a class="navbar-item">
        <router-link to="/sign-in">
          <b-icon icon="sign-in"></b-icon>
          Sign in
        </router-link>
      </a>
    </div>
  </nav>
</template>

<script>
import { AccountTypes, GlobalTypes } from '@/store/mutation-types'
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
      showDrawer: GlobalTypes.showDrawer,
      currentUser: AccountTypes.currentUser
    })
  },
  methods: {
    toggleDrawer () {
      this.$store.dispatch(GlobalTypes.showDrawer, !this.showDrawer)
    },
    signout () {
      this.$store.dispatch(AccountTypes.signOut)
    }
  }
}
</script>
