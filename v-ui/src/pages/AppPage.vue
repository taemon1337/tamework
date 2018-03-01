<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <component :is='currentApp'></component>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppletTypes } from '@/store/mutation-types'
import HomePage from '@/pages/HomePage'
import Registrator from '@/components/Applets/Registrator'

export default {
  name: 'AppPage',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      currentApp: AppletTypes.currentApp,
      groups: AppletTypes.groups
    })
  },
  methods: {
    load (name) {
      this.$store.dispatch(AppletTypes.load, name)
    }
  },
  mounted () {
    if (this.$route.params.name) {
      console.log('Loading ' + this.$route.params.name + '...')
      this.load(this.$route.params.name)
    }
  },
  components: {
    HomePage,
    Registrator
  }
}
</script>
