<template>
  <v-layout>
    <v-list-tile v-for="app in group.applets" :key="app.title" @click="">
      <v-list-tile-content>
        <v-list-tile-title v-html="app.title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="app.subtitle"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-layout>
</template>

<script>
export default {
  name: 'GroupAppletTiles',
  data () {
    return {
      group: {
        applets: [
          { title: 'Applet 1', subtitle: 'This is an applet' }
        ]
      }
    }
  }
}
</script>
