<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Applications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-group prepend-icon='home' @click='$router.push("/")'>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-group v-for="group in groups" :key="group.name" :prepend-icon="group.icon" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ group.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="app in applets.filter(a => a.group === group.name)" :key="app.title" @click="$router.push(app.name)" action class="white">
              <v-list-tile-avatar>
                <v-icon>{{ app.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title class="body-1">{{ app.title }}</v-list-tile-title>
                <v-tooltip right>
                  <span slot="activator">
                    <v-list-tile-sub-title class="body-1">{{ app.subtitle.split(' ').slice(0, 4).join(' ') }}...</v-list-tile-sub-title>
                  </span>
                  <span>{{ app.subtitle }}</span>
                </v-tooltip>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>info</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { AppletTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import GroupAppletTiles from '@/components/Applets/GroupAppletTiles'

export default {
  name: 'AppletList',
  data () {
    return {
      activeGroupName: ''
    }
  },
  computed: {
    ...mapGetters({
      applets: AppletTypes.all,
      groups: AppletTypes.groups
    }),
    activeApplets () {
      return this.applets.filter(app => app.group === this.activeGroupName)
    }
  },
  methods: {
    setActiveGroup (val) {
      console.log('set active ', val)
    }
  },
  components: {
    GroupAppletTiles
  }
}
</script>