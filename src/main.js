// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import axios from "axios";
import App from './App';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import { directive as onClickOutside } from 'vue-on-click-outside';
import VueTheMask from 'vue-the-mask';
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';
import VueToastr from '@deveodk/vue-toastr';
import 'vuetify/dist/vuetify.min.css';
import AOS from "aos";
import "aos/dist/aos.css";

Vue.use(Vuetify)

Vue.use(VeeValidate);
Vue.use(VueTheMask);

Vue.directive('on-click-outside', onClickOutside);

Vue.use(VueToastr, {
  defaultPosition: 'toast-top-center',
  defaultType: 'success',
  defaultTimeout: 5000,
});

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

// All configurations as strings
Vue.prototype.$apiKey = process.env.API_KEY;
Vue.prototype.$newsPath = process.env.NEWS_URI;
Vue.prototype.$loginPath = process.env.LOGIN_URI;

new Vue({
  el: '#app',
  created() {
    AOS.init({ disable: "phone" });
  },
  components: { App },
  template: '<App/>'
})
