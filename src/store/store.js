import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    options: [
      {name: 'roco', id: 1},
      {name: 'kfc', id: 1},
      {name: 'pizzahut', id: 1},
    ],

    selectedRestaurants: [],
    searchedRestaurants: [],

    ui: {
      searchModal: false
    }
  },

  getters: {
    restaurantId: state => {
      return state.selectedRestaurants.map((restaurant) => restaurant.id)
    },


    formattedSearchRestaurants: state => {

      let rest = state.searchedRestaurants.map((restaurant) => {
          if(state.selectedRestaurants.map((restaurant) => restaurant.id).some((id) => id === restaurant.id)){
            restaurant.isSelected = true
          } else {
            restaurant.isSelected = false
          }
          return restaurant
      });

      console.log('refresh');

      return rest;
    }
  },

  mutations: {
    addRestaurant: (state, payload) => {
      state.searchedRestaurants = state.searchedRestaurants.splice(0);
      return state.selectedRestaurants.push(payload)
    },
    removeRestaurant: (state, payload) => {
      return state.selectedRestaurants = state.selectedRestaurants.filter((restaurant) => restaurant.id !== payload.id)
    },

    addOption: (state, payload) => {
      return state.options.push({name: payload.name, id: payload.id})
    },

    openModal: state => {
      return state.ui.searchModal = true
    },

    closeModal: state => {
      return state.ui.searchModal = false
    },


    setSearchRestaurant: (state, payload) => {
      return state.searchedRestaurants = payload.map((restaurant) => {
        if(state.selectedRestaurants.map((restaurant) => restaurant.id).some((id) => id === restaurant.id)){
          restaurant.isSelected = true
        } else {
          restaurant.isSelected = false
        }
        return restaurant
      });
    }


  },


});