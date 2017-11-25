<template>
  <div class="search-restaurant">

    <nav id="navbar" class="navbar is-fixed-top ">
      <div id="specialShadow" class="bd-special-shadow" style="opacity: 0; transform: scaleY(1);"></div>


      <div class="navbar-brand">
        <form v-on:submit.prevent="search(searchQuery)">
          <div class="zai-field">

            <div class="control has-icons-left">
              <input class="input" v-model="searchQuery" type="text" placeholder="Search">
              <span class="icon is-small is-left">
              <i class="fa fa-search"></i>
            </span>
            </div>
          </div>
          <button class="button is-primary" v-on:click="search(searchQuery)">search</button>
        </form>
      </div>
      <a class="delete is-large" v-on:click="closeModal"></a>

    </nav>
    <section class="section">

      <div class="page-component">
        <div class="filters">
          <p class="tag" v-on:click="removeCuisine(tag)" v-for="tag in selectedCusines">
            {{tag.cuisine_name}}</p>

          <p class="tag" v-on:click="removeEstablishment(tag)" v-for="tag in selectedEstablishments">{{tag.name}}</p>

        </div>
      </div>


      <div class="side-panel">
        <panel></panel>
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
      addEstablishment: function (tag) {
        var self = this;
        self.establishmentFilter.push(tag)
      },
      removeEstablishment: function (establishment) {
        this.$store.commit('removeEstablishment', establishment.id);
      },
      addCuisine: function (cuisine) {
        var self = this;
        self.cuisineFilter.push(cuisine)
      },
      removeCuisine: function (cuisine) {
        this.$store.commit('removeCuisine', cuisine.cuisine_id);
      },
      closeModal: function () {
        this.$store.commit('closeModal');
      },
      search: function (searchQuery) {
        console.log(this.$store);
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: searchQuery,
          cuisines: this.$store.getters.cuisineFilterIds.toString(),
          establishment_type: this.$store.getters.establishmentFilterIds.toString(),
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

      selectedEstablishments() {
        return this.$store.state.searchFilter.establishmentFilter.filter((establishment => establishment.isSelected))
      },

      selectedCusines() {
        return this.$store.state.searchFilter.cuisineFilter.filter((establishment => establishment.isSelected))
      }
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
  @import "./../../variables";

  .search-restaurant {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: $d-black;
  }

  .tag {
    margin-right: 3px;
    background-color: $zai-pink;
    color: white;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    height: calc(100vh - 75px);
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
    margin: 30px 0px 16px 0;
  }

  .delete {
    position: absolute;
    top: 17px;
    right: 20px;
    color: $zai-pink;
  }

  .delete:after {
    background-color: $zai-pink;
  }

  .delete:before {
    background-color: $zai-pink;
  }

  form {
    display: flex;
    align-items: center;
    .button {
      margin-left: 20px;
    }
  }

  .navbar {
    padding: 10px 1.5rem;
    background-color: $d-black;

  }
</style>
