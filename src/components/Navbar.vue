<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img class="logo" src="https://png.icons8.com/globe/office/28" width="28" height="28">
          OSM Browser
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <locale-dropdown />

          <a class="navbar-item" href="https://github.com/duxet/osm-browser" target="_blank">
            <span class="icon" style="color: #333;">
              <i class="fa fa-lg fa-github"></i>
            </span>
          </a>
        </div>
      </div>
    </nav>
</template>

<script>
import LocaleDropdown from './Navbar/LocaleDropdown'

export default {
  components: {
    'locale-dropdown': LocaleDropdown
  }
}
</script>


<style lang="scss">
  .navbar {
    position: absolute !important;
    width: 100%;
    z-index: 1024 !important;

    background-color: rgba(255, 255, 255, 0.5) !important;
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
    box-shadow: 0 8px 6px -6px #eee;

    .logo {
      margin-right: 10px;
    }
  }
</style>
