<template>
  <div class="search-restaurant">
    <div class="shadow"></div>

    <nav id="navbar" class="navbar is-fixed-top ">


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
          <button class="button is-primary" v-bind:class="{'is-loading': isLoading}" v-on:click="search(searchQuery)">
            search
          </button>
        </form>
      </div>
      <!--<a class="delete is-large" v-on:click="closeModal"></a>-->
      <router-link to="pool" class="button is-primary toPool is-right is-pulled-right">
        Restaurant list
      </router-link>

    </nav>
    <section class="section">

      <div class="page-component">

        <div class="filters">
          <p class="tag" v-on:click="removeCuisine(tag)" v-for="tag in selectedCusines">
            {{tag.cuisine_name}}</p>

          <p class="tag" v-on:click="removeEstablishment(tag)" v-for="tag in selectedEstablishments">{{tag.name}}</p>

        </div>
      </div>

      <div class="search-view">
        <div class="side-panel">
          <panel></panel>
        </div>
        <div class="grid" v-on:scroll="handleScroll($event)">
          <div class="grid-item" v-for="searchedRestaurant in searchedRestaurants">
            <restaurant-card v-bind:restaurant="searchedRestaurant"></restaurant-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Panel from "./../components/search/Panel.vue";
  import RestaurantCard from "./../components/search/RestaurantCard.vue";
  import ZomatoService from "./../services/zomato.service";


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
        isLoading: false,
        pageInfo: null
      }
    },
    methods: {
      handleScroll: function (event) {
        if (event.srcElement.scrollHeight - event.srcElement.offsetHeight - event.srcElement.scrollTop < 50) {
          this.nextPage(this.searchQuery)
        }
      },
      nextPage() {
        var self = this;


        if (self.isLoading) {
          return
        }
        self.isLoading = true;
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: self.searchQuery,
          start: self.nextSearchPage,
          cuisines: this.$store.getters.cuisineFilterIds.toString(),
          establishment_type: this.$store.getters.establishmentFilterIds.toString(),
        };


        ZomatoService.search(query).then((response) => {
          this.$store.commit('pushSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
          this.$store.commit('setSearchRestaurantPage', {
            step: response.data.results_shown,
            start: response.data.results_start
          });
          self.isLoading = false;
        });
      },
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
      search: function (searchQuery, start) {
        var self = this;

        if (self.isLoading) {
          return
        }
        self.isLoading = true;
        let query = {
          entity_id: '64',
          entity_type: 'city',
          q: searchQuery,
          cuisines: this.$store.getters.cuisineFilterIds.toString(),
          establishment_type: this.$store.getters.establishmentFilterIds.toString(),
        };


        ZomatoService.search(query).then((response) => {
          this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
          this.$store.commit('setSearchRestaurantPage', {
            step: response.data.results_shown,
            start: response.data.results_start
          });
          self.isLoading = false;
        });
      },
    },
    computed: {
      searchedRestaurants() {
        return this.$store.getters.formattedSearchRestaurants
      },

      nextSearchPage() {
        return this.$store.getters.nextSearchPage
      },

      panelFiltersIsCollapsed: function () {
        return this.$store.state.ui.panelFiltersIsCollapsed
      },
      selectedEstablishments() {
        return this.$store.state.searchFilter.establishmentFilter.filter((establishment => establishment.isSelected))
      },

      selectedCusines() {
        return this.$store.state.searchFilter.cuisineFilter.filter((establishment => establishment.isSelected))
      }
    },
    mounted() {
      this.isLoading = true;

      let query = {
        entity_id: '64',
        entity_type: 'city',
      };
      ZomatoService.search(query).then((response) => {
        this.isLoading = false;
        this.$store.commit('setSearchRestaurant', response.data.restaurants.map((item) => item.restaurant));
        this.$store.commit('setSearchRestaurantPage', {
          step: response.data.results_shown,
          start: response.data.results_start
        });
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "./../variables";

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
    height: calc(100vh - 75px);
    overflow: auto;
    .grid-item {
      padding: 10px;
    }

    @include breakpoint(notebook) {
      grid-template-columns: 50% 50%;
    }

    @include breakpoint(laptop) {
      grid-template-columns: 33% 33% 33%;
    }

    @include breakpoint(desktop) {
      grid-template-columns: 25% 25% 25% 25%;
    }
    @include breakpoint(mobileonly) {
      float: left;
    }
  }

  .side-panel {
    float: left;
    @include breakpoint(notebook) {
      width: 250px;
    }

    @include breakpoint(laptop) {
      width: 350px;
    }

    @include breakpoint(mobileonly) {
      width: 100%;
    }

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
    max-width: calc(100vw - 100px);
    .button {
      margin-left: 20px;
    }
  }

  .navbar {
    padding: 10px 1.5rem;
    background-color: $d-black;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
