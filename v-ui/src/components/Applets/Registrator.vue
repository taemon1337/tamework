<template>
  <v-card>
    <v-card-title>
      <span class='title'>Registered Applications</span>
      <v-spacer></v-spacer>
      <v-btn @click='reload'>
        <v-icon>autorenew</v-icon>
      </v-btn>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table :headers='headers' :items='applets' :search='search' class='elevation-1'>
      <template slot='items' slot-scope='props'>
        <td>
          <a :title='"Open " + props.item.title' @click.stop.prevent='load(props.item.name)'>
            <v-icon large :color="randomColor()">open_in_browser</v-icon>
          </a>
        </td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.subtitle }}</td>
        <td>{{ props.item.group }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppletTypes } from '@/store/mutation-types'
import randomColor from '@/lib/randomColor'

export default {
  name: 'Registrator',
  data () {
    return {
      search: '',
      headers: [
        { text: 'Name', align: '', sortable: true, value: 'name' },
        { text: 'Title', align: '', sortable: true, value: 'title' },
        { text: 'Subtitle', align: '', sortable: false, value: 'subtitle' },
        { text: 'Group', align: '', sortable: true, value: 'group' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      applets: AppletTypes.all
    })
  },
  methods: {
    randomColor: randomColor,
    reload () {
      this.$store.dispatch(AppletTypes.all)
    },
    load (name) {
      this.$store.dispatch(AppletTypes.currentApp, name)
    }
  }
}
</script>
