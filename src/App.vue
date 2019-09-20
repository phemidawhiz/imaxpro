<template>


  <v-app light>
  

    <!--The SideMenu Component go here--> 
    <div v-if="online">
      <SideMenu :drawer="drawer"  :api_key="api_key" @selectsource="setResource" ></SideMenu>
    </div> 
    

    <v-toolbar fixed app light clipped-left color="primary" class="elevation-2">
      <v-toolbar-side-icon @click="drawer = !drawer"  class="white--text"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">News App</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>

        <!--The MainContent Component go here--> 
        <div v-if="online">
          <MainContent :articles="articles"></MainContent>
        </div> 
        
        <div v-if="online == null">
            <h3>Login </h3>
          <Login ></Login>
        </div>
      </v-container>
    </v-content>
  
  
   <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
            by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
            and <a class="white--text" href="https://github.com/phemidawhiz" target="_blank">Ayodele Olufemi</a>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>


</template>

<script>

import axios from 'axios' //importing the axios a HTTP library to connects the app with the API
import SideMenu from './components/SideMenu.vue' // import the SideMenu component
import MainContent from './components/MainContent.vue' // import the MainContent component
import Login from './components/Login.vue' // import the Login component

export default {

  components: {
      SideMenu,
      MainContent,
      Login
  },

  data() {
    return {
      online: localStorage.getItem("online"),
      drawer: true, // true to show/hide the side navigation drawer 
      articles: [],
      errors: [],
      pageSize: 15,
      api_key: this.$apiKey
    }
  },


  created () {
    axios.get(this.$newsPath + 'techcrunch&apiKey=' + this.$apiKey+'&pageSize='+this.pageSize)
      .then(response => {
        this.articles = response.data.articles
        
    })
  },


  methods: {
     
      setResource(source){

        axios.get(this.$newsPath+source+'&apiKey='+this.$apiKey+'&pageSize='+this.pageSize)
        .then(response => {
          //this.articles = response.data.articles
          this.articles = response.data.articles
          
        })
        .catch(e => {
          this.errors.push(e)
        })

      }


   },
   

  }
</script>