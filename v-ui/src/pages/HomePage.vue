<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">Welcome to Tamework</h3>
              <span class="subheading">Check out our application suite listed below</span>
              <v-divider class="my-3"></v-divider>
              <div class="title mb-3">Check out our newest features!</div>
              <v-btn large color="primary" class="mx-0">See more</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-slide-y-transition>
    <v-container>
      <v-layout align-center>
        <v-card>
          <v-card-media src="https://vuetifyjs.com/static/doc-images/cards/desert.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-container>
</template>