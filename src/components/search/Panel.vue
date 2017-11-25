<template>
  <nav class="panel">
    <p class="panel-heading">
      Categories
    </p>
    <div class="panel-block">
      <div class="zai-field">
        <p class="control ">
          <input class="input" type="text" v-model="cuisineQuery" placeholder="Search">
        </p>
      </div>
    </div>
    <p class="panel-tabs">
      <a v-bind:class="{'is-active': tab === 'establishments'}" v-on:click="changeTabs('establishments')">Establishments</a>
      <a v-bind:class="{'is-active': tab === 'cuisines'}" v-on:click="changeTabs('cuisines')">Cuisines</a>
    </p>
    <div class="panel-container">
      <div v-if="tab === 'cuisines'">
        <a class="panel-block panel-filter" v-for="cuisine in filteredCuisines" v-on:click="addCuisine(cuisine)"
           v-bind:class="{'is-active': cuisine.isSelected }">
        <span class="panel-icon">
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </span>
          {{cuisine.cuisine_name}}
        </a>
      </div>
      <div v-if="tab === 'establishments'">
        <a class="panel-block panel-filter" v-for="establishment in filteredEstablishment" v-on:click="addEstablishment(establishment)"
           v-bind:class="{'is-active': establishment.isSelected }">
        <span class="panel-icon">
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </span>
          {{establishment.name}}
        </a>
      </div>
    </div>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth" v-on:click="resetFilters">
        Reset all filters
      </button>
    </div>
  </nav>
</template>
<script>
  import axios from 'axios';


  export default {
    name: 'Panel',
    data() {
      return {
        cuisines: [],
        cuisineQuery: '',
        establishments: [],
        tab: 'establishments'
      }
    },
    computed: {
      filteredCuisines: function () {
        return this.$store.state.searchFilter.cuisineFilter.filter((cuisine) => {
          return cuisine.cuisine_name.toLowerCase().includes(this.cuisineQuery.toLowerCase())
        })
      },
      filteredEstablishment: function () {
        return this.$store.state.searchFilter.establishmentFilter.filter((establishment) => {
          return establishment.name.toLowerCase().includes(this.cuisineQuery.toLowerCase())
        })
      }
    },
    methods: {
      changeTabs: function (tab) {
        var self = this;
        self.tab = tab;
        console.log(tab);

      },
      addCuisine: function (cuisine) {
        cuisine.isSelected = !cuisine.isSelected;
        if (cuisine.isSelected) {
          this.$store.commit('addCuisine', cuisine);
        } else {
          this.$store.commit('removeCuisine', cuisine);
        }
      },
      addEstablishment: function (establishment) {
        establishment.isSelected = !establishment.isSelected;
        if (establishment.isSelected) {
          this.$store.commit('addEstablishment', establishment);
        } else {
          this.$store.commit('removeEstablishment', establishment);
        }
      },
      resetFilters: function () {
        var self = this;
        this.$store.commit('resetFilters');
        self.cuisineFilter = '';
      }
    },
    created() {
      let cuisines = JSON.parse(localStorage.getItem('cuisines'));
      let establishments = JSON.parse(localStorage.getItem('establishments'));
      if (cuisines && cuisines.length > 0 ) {
        this.$store.commit('setCuisines', cuisines);
//        cuisines.forEach((cuisine) => {
//          cuisine.cuisine.isSelected = false;
//        });
//        this.cuisines = cuisines;
      } else {
        let cuisinesQuery = {
          city_id: '64',
        };
        let cuisinesOptions = {
          method: 'GET',
          url: 'https://developers.zomato.com/api/v2.1/cuisines',
          params: cuisinesQuery,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-key': '17f04c380be2bbe032778ba7c767ca50'
          },
          json: true
        };
        axios(cuisinesOptions)
            .then((response) => {
//              console.log('GA => response.data', JSON.stringify(response.data));
//              this.cuisines = response.data.cuisines;
              this.$store.commit('setCuisines', response.data.cuisines);

              localStorage.setItem('cuisines', JSON.stringify(response.data.cuisines));
            });
      }
      if (establishments && establishments.length > 0) {
        this.$store.commit('setEstablishment', establishments);

      } else {
        let establishmentQuery = {
          city_id: '64',
        };
        let establishmentOptions = {
          method: 'GET',
          url: 'https://developers.zomato.com/api/v2.1/establishments',
          params: establishmentQuery,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-key': '17f04c380be2bbe032778ba7c767ca50'
          },
          json: true
        };
        axios(establishmentOptions)
            .then((response) => {
              this.$store.commit('setEstablishment', response.data.establishment);
              localStorage.setItem('establishments', JSON.stringify(response.data.establishments));
            });
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../variables";

  .panel-container {
    height: 500px;
    overflow: auto;
  }
</style>
