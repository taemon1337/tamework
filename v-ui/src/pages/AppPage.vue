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
import UserManager from '@/components/Users/UserManager'

export default {
  name: 'AppPage',
  data () {
    return {
      currentApp: 'HomePage'
    }
  },
  computed: {
    ...mapGetters({
      groups: AppletTypes.groups
    })
  },
  mounted () {
    if (this.$route.params.name) {
      console.log('Loading ' + this.$route.params.name + '...')
      this.currentApp = this.$route.params.name
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentApp = to.params.name || 'HomePage'
    }
  },
  components: {
    HomePage,
    Registrator,
    UserManager
  }
}
</script>
