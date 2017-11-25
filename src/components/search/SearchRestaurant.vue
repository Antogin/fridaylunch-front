<template>
  <div class="search-restaurant">
    <nav id="navbar" class="navbar is-fixed-top ">
      <div id="specialShadow" class="bd-special-shadow" style="opacity: 0; transform: scaleY(1);"></div>


      <div class="navbar-brand">
        <form v-on:submit.prevent="search(searchQuery)">
          <div class="control">
            <input class="input" type="text" v-model="searchQuery" placeholder="Search">
          </div>
        </form>
      </div>
      <a class="delete is-large" v-on:click="closeModal"></a>

    </nav>
    <section class="section">
      <hr>

      <div class="page-component">
        <div class="filters">
          <span class="tag is-info">Info</span>
          <span class="tag is-info">Info</span>
          <span class="tag is-info">Info</span>
          <span class="tag is-info">Info</span>

        </div>
      </div>
      <hr>


      <div class="side-panel">
        <panel v-on:addCuisine="addCuisine"
               v-on:removeCuisine="removeCuisine"
               v-on:addEstablishment="addEstablishment"
               v-on:removeEstablishment="removeEstablishment"
               v-on:resetFilters="resetFilters"></panel>
      </div>
      <div class="grid" v-on:scroll="checkBottom($event)">
        <div class="grid-item" v-for="searchedRestaurant in searchedRestaurants">
          <restaurant-card v-bind:restaurant="searchedRestaurant"></restaurant-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import Panel from "./Panel.vue";
  import RestaurantCard from "./RestaurantCard.vue";
  import ZomatoService from "./../../services/zomato.service";


  export default {
    components: {
      RestaurantCard,
      Panel
    },
    name: 'SearchRestaurant',
    data() {
      return {
        msg: 'Search',
        searchQuery: '',
        cuisineFilter: [],
        establishmentFilter: [],
        pageInfo: null
      }
    },
    methods: {
      addEstablishment: function (string) {
        var self = this;
        self.establishmentFilter.push(string)
      },
      removeEstablishment: function (string) {
        var self = this;
        self.establishmentFilter = self.establishmentFilter.filter((id) => id !== string)
      },
      addCuisine: function (string) {
        var self = this;
        self.cuisineFilter.push(string)
      },
      removeCuisine: function (string) {
        var self = this;
        self.cuisineFilter = self.cuisineFilter.filter((id) => id !== string)
      },
      resetFilters: function () {
        console.log('resetFilters');
        var self = this;
        self.cuisineFilter = [];
        self.establishmentFilter = []
      },
      closeModal: function () {
        this.$store.commit('closeModal');
      },
      search: function (searchQuery) {
        var self = this;
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: self.searchQuery,
          cuisines: self.cuisineFilter.toString(),
          establishment_type: self.establishmentFilter.toString(),
        };
        ZomatoService.search(query).then((response) => {
          this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));

        });

      },

    },
    computed: {
      searchedRestaurants() {

        return this.$store.getters.formattedSearchRestaurants

      },
    },
    mounted() {
      let query = {
        entity_id: '64',
        entity_type: 'city',
      };
      ZomatoService.search(query).then((response) => {
        this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));

        console.log(response.data);
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .search-restaurant {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  .grid {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    height: calc(100vh - 100px);
    overflow: auto;
    .grid-item {
      padding: 10px;
    }
  }

  .side-panel {
    width: 350px;
    float: left;
  }

  .page-component {
    /*margin: 10px 0;*/
  }

  .delete {
    position: absolute;
    top: 10px;
    right: 0;
  }

  form {
    display: flex;
    align-items: center;

  }

  .navbar {
    padding: 10px 1.5rem;
  }
</style>
