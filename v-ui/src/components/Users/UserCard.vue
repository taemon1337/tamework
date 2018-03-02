<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 md4 lg3 xl2>
        <v-card class='white--text'>
          <v-card-media :src='user.photo.replace("sz=50", "sz=250")' height='250px'>
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ user.displayName }}</span>
                  <span>{{ user.email }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-actions>
            <v-btn @click='signout' class='red darken-4' dark>Sign out</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { AccountTypes } from '@/store/mutation-types'

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    signout () {
      this.$store.dispatch(AccountTypes.signOut)
    }
  }
}
</script>