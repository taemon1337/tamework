<template>
  <section class="container" style="min-width:250px;max-width:400px;">
    <div v-if="currentUser">
      <div class="card">
        <div v-if="false" class="card-image">
          <figure class="image">
            <img :src="currentUser.photo">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="currentUser.photo">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ currentUser.displayName }}</p>
              <p class="subtitle is-6">{{ currentUser.email }}</p>
            </div>
          </div>

          <div class="content">
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="title">Sign In:</h1>
      <b-field label="Username" type="is-success" message="This username is available">
        <b-input value="johnsilver" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" value="iwantmytreasure" password-reveal></b-input>
      </b-field>

      <b>or sign in with...</b><br><br>

      <b-field>
        <button @click.prevent="signInWith('google')" class="button is-large is-social is-google">
          <b-icon pack="fa" icon="google"></b-icon>
          <span>Google</span>
        </button>
      </b-field>

      <b-field>
        <button @click.prevent="signInWith('facebook')" class="button is-large is-social is-facebook">
          <b-icon pack="fa" icon="facebook"></b-icon>
          <span>Facebook</span>
        </button>
      </b-field>

      <b-field>
        <button @click.prevent="signInWith('github')" class="button is-large is-social is-github">
          <b-icon pack="fa" icon="github"></b-icon>
          <span>Github</span>
        </button>
      </b-field>
    </div>
  </section>
</template>

<script>
import { AccountTypes } from '@/store/mutation-types'
import { mapGetters } from 'vuex'

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
  methods: {
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
