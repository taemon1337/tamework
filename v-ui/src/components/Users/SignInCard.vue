<template>
  <v-jumbotron :color='randomColor()'>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Please sign in</h3>
          <span class="subheading">We support the following open authentication providers to sign in with.</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">Select a provider you have an account with</div>
          <v-btn v-for="provider in providers" class='my-3 mx-4' :color='providerColor(provider.name)' :key='provider.name' @click='signInWith(provider.name)' large dark>
            <span :class='providerIcon(provider.name)'></span>
            <span>{{ provider.title }}</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import randomColor from '@/lib/randomColor'
import { AccountTypes } from '@/store/mutation-types'

export default {
  name: 'SignInCard',
  data () {
    return {
      providers: [
        { name: 'google', title: 'Google' },
        { name: 'github', title: 'Github' },
        { name: 'facebook', title: 'Facebook' }
      ]
    }
  },
  methods: {
    randomColor: randomColor,
    providerColor (name) {
      switch (name) {
        case 'google':
          return 'red darken-4'
        case 'facebook':
          return 'blue darken-4'
        case 'github':
          return 'grey darken-4'
        default:
          return ''
      }
    },
    providerIcon (name) {
      return 'px-1 mx-1 fa fa-2x fa-' + name
    },
    signInWith (provider) {
      console.log('Sign in with ' + provider)
      this.$store.dispatch(AccountTypes.signInWith, provider)
    }
  }
}
</script>

<style scoped="true">
  /* https://paulund.co.uk/social-media-colours */
  .is-social {
    width: 250px;
    color: #fff;
  }
  .is-google {
    background-color: rgb(221, 75, 57);
  }
  .is-facebook {
    background-color: rgb(59, 89, 152);
  }
  .is-github {
    background-color: rgb(23, 21, 22);
  }
</style>
