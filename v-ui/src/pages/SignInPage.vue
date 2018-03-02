<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout>
        <v-flex xs12>
          <user-card v-if="currentUser" :user='currentUser'></user-card>
          <sign-in-card v-else></sign-in-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { AccountTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'
import UserCard from '@/components/Users/UserCard'
import SignInCard from '@/components/Users/SignInCard'

export default {
  name: 'SignInPage',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      currentUser: AccountTypes.currentUser
    })
  },
  components: {
    UserCard,
    SignInCard
  }
}
</script>
