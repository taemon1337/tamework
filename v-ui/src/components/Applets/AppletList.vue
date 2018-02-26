<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Applications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line subheader>
          <template v-for="group in groups">
            <v-list-tile avatar ripple :key="group.title" @click="">
              <v-list-tile-avatar>
                <v-icon :title="group.title">{{ group.icon }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="group.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="group.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-if="activeGroup === group.title">
              <v-list-tile-content>
                <v-container>
                  <v-list two-line subheader>
                    <v-list-tile avatar v-for="app in group.applets" :key="app.title" @click="">
                      <v-list-tile-avatar>
                        <v-icon>{{ app.icon }}</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ app.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ app.subtitle }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-container>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { AppletTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import GroupAppletTiles from '@/components/Applets/GroupAppletTiles'

let applets = [
  { title: 'Applet Registrator', subtitle: 'Registry your applets here', icon: 'library_add' }
]

export default {
  name: 'AppletList',
  data () {
    return {
      activeGroup: 'Tamework Admin',
      groups: [
        { title: 'Tamework Admin', subtitle: 'Administrative applications for the Tamework.', icon: 'settings_applications', applets: applets },
        { title: 'Data Analysis', subtitle: 'Data or file manipulation or analysis applications', icon: 'assessment' },
        { title: 'Social Apps', subtitle: 'Social or user centric apps', icon: 'supervisor_account' },
        { title: 'Real Time', subtitle: 'Applications that communicate in real-time', icon: 'cached' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      applets: AppletTypes.all
    })
  },
  components: {
    GroupAppletTiles
  }
}
</script>