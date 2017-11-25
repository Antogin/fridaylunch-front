<template>
  <nav class="panel">
    <p class="panel-heading">
      Categories
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="cuisineQuery" placeholder="Search">
        <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
      </p>
    </div>
    <p class="panel-tabs">
      <a v-bind:class="{'is-active': tab === 'establishments'}" v-on:click="changeTabs('establishments')">Establishments</a>
      <a v-bind:class="{'is-active': tab === 'cuisines'}" v-on:click="changeTabs('cuisines')">Cuisines</a>
    </p>
    <div class="panel-container">
      <div v-if="tab === 'cuisines'">
        <a class="panel-block" v-for="cuisine in filteredCuisines" v-on:click="addCuisine(cuisine.cuisine)"
           v-bind:class="{'is-active': cuisine.cuisine.isSelected }">
        <span class="panel-icon">
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </span>
          {{cuisine.cuisine.cuisine_name}}
        </a>
      </div>
      <div v-if="tab === 'establishments'">
        <a class="panel-block" v-for="establishment in filteredEstablishment" v-on:click="addEstablishment(establishment.establishment)"
           v-bind:class="{'is-active': establishment.establishment.isSelected }">
        <span class="panel-icon">
          <i class="fa fa-cutlery" aria-hidden="true"></i>
        </span>
          {{establishment.establishment.name}}
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
        return this.cuisines.filter((cuisine) => {
          return cuisine.cuisine.cuisine_name.toLowerCase().includes(this.cuisineQuery.toLowerCase())
        })
      },
      filteredEstablishment: function () {
        return this.establishments.filter((establishment) => {
          return establishment.establishment.name.toLowerCase().includes(this.cuisineQuery.toLowerCase())
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
          this.$emit('addCuisine', cuisine.cuisine_id)
        } else {
          this.$emit('removeCuisine', cuisine.cuisine_id)
        }
      },
      addEstablishment: function (establishment) {
        establishment.isSelected = !establishment.isSelected;
        if (establishment.isSelected) {
          this.$emit('addEstablishment', establishment.id)
        } else {
          this.$emit('removeEstablishment', establishment.id)
        }
      },
      resetFilters: function () {
        var self = this;
        this.$emit('resetFilters');

        self.cuisineFilter = '';
        self.cuisines.forEach((cuisine) => {
          cuisine.cuisine.isSelected = false;
        });
        self.establishments.forEach((establishment) => {
          establishment.establishment.isSelected = false;
        });
      }
    },
    created() {
      let cuisines = JSON.parse(localStorage.getItem('cuisines'));
      let establishments = JSON.parse(localStorage.getItem('establishments'));
      if (cuisines && cuisines.length > 0) {
        cuisines.forEach((cuisine) => {
          cuisine.cuisine.isSelected = false;
        });
        this.cuisines = cuisines;
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
            console.log('GA => response.data', JSON.stringify(response.data));
            this.cuisines = response.data.cuisines;
            localStorage.setItem('cuisines', JSON.stringify(response.data.cuisines));
          });
      }
      if (establishments && establishments.length > 0) {
        establishments.forEach((establishments) => {
          establishments.establishment.isSelected = false;
        });
        this.establishments = establishments;
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
            console.log('GA => response.data', response.data);
            this.establishments = response.data.establishments;
            localStorage.setItem('establishments', JSON.stringify(response.data.establishments));
          });
      }
    },
  }
</script>

<style lang="scss" scoped>

  .panel-container {
    height: 500px;
    overflow: auto;
  }
</style>
