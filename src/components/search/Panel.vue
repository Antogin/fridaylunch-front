<template>
  <nav class="panel" v-bind:class="{'is-collapsed': panelFiltersIsCollapsed}">
    <p class="panel-heading">
      Categories
      <span class="icon" v-on:click="toggleCollapse(panelFiltersIsCollapsed)">
        <i class="fa fa-angle-down" aria-hidden="true" v-if="panelFiltersIsCollapsed"></i>
        <i class="fa fa-angle-up" aria-hidden="true" v-if="!panelFiltersIsCollapsed"></i>
      </span>
    </p>

    <div class="panel-block">
      <div class="zai-field">
        <p class="control ">
          <input class="input" type="text" v-model="filterQuery" placeholder="Search">
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
  import ZomatoService from "./../../services/zomato.service";


  export default {
    name: 'Panel',
    data() {
      return {
        cuisines: [],
        filterQuery: '',
        establishments: [],
        tab: 'establishments'
      }
    },
    computed: {
      filteredCuisines: function () {
        return this.$store.state.searchFilter.cuisineFilter.filter((cuisine) => {
          return cuisine.cuisine_name.toLowerCase().includes(this.filterQuery.toLowerCase())
        })
      },
      filteredEstablishment: function () {
        return this.$store.state.searchFilter.establishmentFilter.filter((establishment) => {
          return establishment.name.toLowerCase().includes(this.filterQuery.toLowerCase())
        })
      },
      panelFiltersIsCollapsed: function () {
        return this.$store.state.ui.panelFiltersIsCollapsed
      },
    },
    methods: {
      toggleCollapse: function (state) {
        this.$store.commit('toggleCollapse', !state);
      },
      changeTabs: function (tab) {
        var self = this;
        self.tab = tab;

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
        self.filterQuery = '';

        this.$store.commit('resetFilters');
        self.cuisineFilter = '';
      }
    },
    created() {
      let cuisines = JSON.parse(localStorage.getItem('cuisines'));
      let establishments = JSON.parse(localStorage.getItem('establishments'));
      if (cuisines && cuisines.length > 0) {
        this.$store.commit('setCuisines', cuisines);

      } else {
        ZomatoService.getCuisines()
            .then((response) => {
              this.$store.commit('setCuisines', response.data.cuisines);
              localStorage.setItem('cuisines', JSON.stringify(response.data.cuisines));
            });

      }
      if (establishments && establishments.length > 0) {
        this.$store.commit('setEstablishment', establishments);

      } else {
        ZomatoService.getEstablishment()
            .then((response) => {
              this.$store.commit('setEstablishment', response.data.establishments);
              localStorage.setItem('establishments', JSON.stringify(response.data.establishments));
            });

      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../variables";

  .side-panel {

  }

  .panel {
    .panel-heading {
      .icon {
        color: $zai-pink;
        float: right;
        display: none;
        @include breakpoint(mobileonly) {
          display: block;
        }
      }
    }
    .panel-container {
      height: 500px;
      overflow: auto;
      @include breakpoint(mobileonly) {
        height: calc(100vh - 330px);

      }
    }
  }

  .is-collapsed {
    @include breakpoint(mobileonly) {

      .panel-container {
        height: auto;

      }
      .panel-block, .panel-tabs {
        display: none;
        height: auto;
      }
    }
  }

  .panel-container:hover::-webkit-scrollbar {
    /*width: 5px;*/

  }
</style>
