// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/store'
import CreateQuestion from './components/CreateQustion.vue'
import QuestionList from './components/QuestionsList.vue'
import RestaurantCard from './components/search/RestaurantCard.vue';
import Panel from './components/search/Panel.vue';
import SearchRestaurant from './components/search/SearchRestaurant.vue';

Vue.config.productionTip = false;

Vue.component('create-question', CreateQuestion);
Vue.component('question-list', QuestionList);
Vue.component('restaurant-card ', RestaurantCard);
Vue.component('panel-card', Panel);
Vue.component('search-restaurant', SearchRestaurant);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
});
