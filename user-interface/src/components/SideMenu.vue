<template>
  <v-drawer :open="showDrawer" @open-change="onOpenChange">
    <aside slot="sidebar" class="menu">
      <b-icon @click.native="onOpenChange" class="pull-right" pack="fa" icon="chevron-left"></b-icon>
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><a>Dashboard</a></li>
        <li><a>Customers</a></li>
      </ul>
      <p class="menu-label">
        Tamework Applications
      </p>
      <ul class="menu-list">
        <li><a>League Manager</a></li>
        <li><a>HashiCluster</a></li>
        <li><a>Resumer</a></li>
        <li><a>Real Time Analyst Notebook</a></li>
        <li><a>World Data Miner</a></li>
        <li><a>Texel</a></li>
        <li><a>IP Geolocator</a></li>
        <li><a>Regexer</a></li>
        <li><a>Reporter</a></li>
        <li><a>Mboxer</a></li>
        <li><a>Rider</a></li>
        <li><a>Uploader</a></li>
        <li><a>WebPST</a></li>
        <li><a>Free4</a></li>
        <li><a>Internut</a></li>
        <li><a>File Drop</a></li>
        <li><a>Bibler</a></li>
      </ul>
    </aside>
  </v-drawer>
</template>

<script>
import VDrawer from 'v-drawer'
import { GlobalTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  methods: {
    onOpenChange () {
      this.$store.dispatch(GlobalTypes.showDrawer, !this.showDrawer)
    }
  },
  computed: {
    ...mapGetters({
      showDrawer: GlobalTypes.showDrawer
    })
  },
  components: {
    VDrawer
  }
}
</script>

<style scoped="true">
  .menu {
    padding: 15px;
    background-color:white;
    height:100%;
  }
</style>
