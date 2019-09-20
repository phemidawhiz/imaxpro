<template>
  <form>
    <v-text-field
      v-model="email"
      v-validate="'required|email'"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      v-validate="'required|max:10'"
      :counter="10"
      type="password"
      :error-messages="errors.collect('password')"
      label="Password"
      data-vv-name="password"
      required
    ></v-text-field>
    
    <v-btn class="ma-2" @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
    import axios from 'axios' //importing the axios a HTTP library to connects the app with the API
  export default {
    $_veeValidate: {
      validator: 'new',
    },

    data: () => ({
      password: '',
      email: '',
      url: this.newsPath,
      dictionary: {
        attributes: {
          email: 'E-mail Address',
          // custom attributes
        },
        custom: {
          password: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters',
            // custom messages
          },
          select: {
            required: 'Select field is required',
          },
        },
      },
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      submit() {
        
       if(this.email === "" && this.password === "") {
            this.$toastr('add', {
            msg: "Field(s) cannot be empty",
            timeout: 5000,
            type: 'error',
            });
        } else {
            axios.get(this.$loginPath + '?userpwd=' + this.password+'&useremail='+this.email)
            .then(response => {
                console.log(response);
                if(response.data.status) {
                    console.log(response.data.message);
                    let online = true;
                    let userDetails = {
                    username: this.email,
                    password: this.password
                }
                localStorage.setItem("online", online);
                localStorage.setItem("userDetails", userDetails);
                window.location.reload();
                } else {
                    console.log(response.data.message);
                }
            })
            
        }
      },
      clear () {
        this.password = ''
        this.email = ''
        this.$validator.reset()
      },
    },
  }
</script>