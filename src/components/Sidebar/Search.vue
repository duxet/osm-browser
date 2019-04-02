<template>
  <div class="search">
    <input class="input" type="text" placeholder="Search..."
      v-model="query" />

    <ul class="search-results" v-if="autocomplete.length">
      <li v-for="(point, index) in autocomplete" :key="index">
        {{ point.name }}
        <br>
        <span class="has-text-grey">{{ point.address[0] }}, {{ point.tags['addr:city']}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import AutocompleteRepository from '../../services/AutocompleteRepository'

export default {
  data: function () {
    return {
      autocompleteRepository: new AutocompleteRepository(),
      autocomplete: [],
      query: '',
    };
  },
  watch: {
    query: function (query) {
      if (!query) {
        this.autocomplete = [];
        return;
      }

      this.autocompleteRepository.getAutocomplete(query).then((autocomplete) => {
        this.autocomplete = autocomplete;
      });
    }
  }
}
</script>

<style>
  .search {
    position: relative;
  }

  .search-results {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
    width: 100%;
    position: absolute;
    z-index: 999;
  }

  .search-results li {
    padding: 8px;
  }

  .search-results li:hover {
    background: #eee;
  }

  .search-results li+li {
    border-top: 1px solid #eee;
  }
</style>
