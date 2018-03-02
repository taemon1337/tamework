<template>
  <v-layout row>
    <v-flex>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <v-list-tile v-if="currentUser" avatar>
            <v-list-tile-avatar>
              <img :src="currentUser.photo">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="currentUser.displayName"></v-list-tile-title>
              <v-list-tile-sub-title v-html="currentUser.email"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-subheader>
            <v-badge color="red">
              <span slot="badge">{{ users.length }}</span>
              Online Users
            </v-badge>
          </v-subheader>
          <v-divider></v-divider>
          <template v-for="(item, index) in users">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="item.title" @click="">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { AccountTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'UserList',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      users: AccountTypes.all,
      currentUser: AccountTypes.currentUser
    })
  }
}
</script>