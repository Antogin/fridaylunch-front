<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Name of survey
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Publish</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
      <div class="corner"></div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'CreateQuestion',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
