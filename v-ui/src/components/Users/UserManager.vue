<template>
  <v-card>
    <v-card-title>
      <span class='title'>User Accounts</span>
      <v-spacer></v-spacer>
      <v-btn @click='reload'>
        <v-icon>autorenew</v-icon>
      </v-btn>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers='headers' :items='users' :search='search' class='elevation-1'>
      <template slot='items' slot-scope='props'>
        <td>{{ props.item.displayName }}</td>
        <td>{{ props.item }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { UserTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

export default {
  name: 'UserManager',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Name', align: '', sortable: true, value: 'displayName' },
        { text: 'JSON', align: '', sortable: true, value: 'json' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: UserTypes.all
    })
  },
  methods: {
    reload () {
      this.$store.dispatch(UserTypes.all)
    }
  },
  created () {
    this.reload()
  }
}
</script>
