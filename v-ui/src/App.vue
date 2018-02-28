<template>
  <v-app>
    <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" width="400" enable-resize-watcher fixed app>
      <applet-list></applet-list>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="currentUser" icon @click.stop="rightDrawer = !rightDrawer">
        <v-avatar class="grey lighten-4" :title="currentUser.displayName">
          <img :src="currentUser.photo">
        </v-avatar>
      </v-btn>
      <v-btn v-else icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>chat</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed app>
      <user-list></user-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { AccountTypes } from '@/store/mutation-types'
import UserList from '@/components/UserList'
import AppletList from '@/components/Applets/AppletList'

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tamework'
    }
  },
  computed: {
    ...mapGetters({
      currentUser: AccountTypes.currentUser
    })
  },
  mounted () {
    this.$store.dispatch(AccountTypes.signIn)
  },
  components: {
    UserList,
    AppletList
  }
}
</script>
