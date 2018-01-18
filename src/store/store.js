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

    explorePage: {
      collectionInfo: {},
      collections: []
    },

    searchPageInfo: {
      start: null,
      step: null,
    },

    searchFilter: {
      establishmentFilter: [],
      cuisineFilter: []
    },
    ui: {
      searchModal: false,
      panelFiltersIsCollapsed: true
    }
  },

  getters: {

    nextSearchPage: state => {
      return state.searchPageInfo.start + state.searchPageInfo.step;
    },

    restaurantId: state => {
      return state.selectedRestaurants.map((restaurant) => restaurant.id)
    },

    establishmentFilterIds: state => {
      return state.searchFilter.establishmentFilter.filter((establishment) => establishment.isSelected).map((establishment) => establishment.id)
    },

    cuisineFilterIds: state => {
      return state.searchFilter.cuisineFilter.filter((cuisine) => cuisine.isSelected).map((cuisine) => cuisine.cuisine_id)
    },


    formattedSearchRestaurants: state => {

      return state.searchedRestaurants.map((restaurant) => {
        if (state.selectedRestaurants.map((restaurant) => restaurant.id).some((id) => id === restaurant.id)) {
          restaurant.isSelected = true
        } else {
          restaurant.isSelected = false
        }
        return restaurant
      });

    }
  },

  mutations: {

    setCollections: (state, payload) => {

      state.explorePage.collections = payload

    },

    toggleCollapse: (state, payload) => {
      return state.ui.panelFiltersIsCollapsed = payload;
    },

    addRestaurant: (state, payload) => {
      state.searchedRestaurants = state.searchedRestaurants.splice(0);
      return state.selectedRestaurants.push(payload)
    },

    removeRestaurant: (state, payload) => {
      return state.selectedRestaurants = state.selectedRestaurants.filter((restaurant) => restaurant.id !== payload.id)
    },

    setEstablishment: (state, payload) => {
      return state.searchFilter.establishmentFilter = payload.map((establishment) => {
        establishment.establishment.isSelected = false;
        return establishment.establishment
      })
    },
    setCuisines: (state, payload) => {
      return state.searchFilter.cuisineFilter = payload.map((cuisine) => {
        cuisine.cuisine.isSelected = false;
        return cuisine.cuisine
      })
    },

    resetFilters: state => {
      state.searchFilter.establishmentFilter.forEach((establishment) => establishment.isSelected = false);
      state.searchFilter.cuisineFilter.forEach((cuisine) => cuisine.isSelected = false);
      return state
    },

    addEstablishment: (state, id) => {
      return state.searchFilter.establishmentFilter = state.searchFilter.establishmentFilter.map((establishment) => {
          if (establishment.id === id) {
            establishment.isSelected = true;
          }
          return establishment;
        }
      )
    },

    removeEstablishment: (state, id) => {
      return state.searchFilter.establishmentFilter = state.searchFilter.establishmentFilter.map((establishment) => {
          if (establishment.id === id) {
            establishment.isSelected = false;
          }
          return establishment;
        }
      )
    },

    addCuisine: (state, id) => {
      return state.searchFilter.cuisineFilter = state.searchFilter.cuisineFilter.map((cuisine) => {
          if (cuisine.cuisine_id === id) {
            cuisine.isSelected = true;
          }
          return cuisine;
        }
      )
    },
    removeCuisine: (state, id) => {
      return state.searchFilter.cuisineFilter = state.searchFilter.cuisineFilter.map((cuisine) => {
          if (cuisine.cuisine_id === id) {
            cuisine.isSelected = false;
          }
          return cuisine;
        }
      )
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
      state.searchedRestaurants = payload.map((restaurant) => {
        if (state.selectedRestaurants.map((restaurant) => restaurant.id).some((id) => id === restaurant.id)) {
          restaurant.isSelected = true
        } else {
          restaurant.isSelected = false
        }
        return restaurant
      });

      console.log( state.searchedRestaurants)
    },

    pushSearchRestaurant: (state, payload) => {

      state.searchedRestaurants = state.searchedRestaurants.concat(payload.map((restaurant) => {
        if (state.selectedRestaurants.map((restaurant) => restaurant.id).some((id) => id === restaurant.id)) {
          restaurant.isSelected = true
        } else {
          restaurant.isSelected = false
        }
        return restaurant
      }));
    },

    setSearchRestaurantPage: (state, payload) => {
      state.searchPageInfo = payload;
    },

  },


});
