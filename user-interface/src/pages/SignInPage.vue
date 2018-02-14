<template>
  <section class="container" style="min-width:250px;max-width:400px;">
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

  </section>
</template>

<script>
export default {
  name: 'SignInPage',
  data () {
    return {}
  },
  methods: {
    signInWith (provider) {
      console.log('Sign in with ' + provider)
      window.location = '/api/auth/' + provider
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
