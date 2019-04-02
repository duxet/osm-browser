<template>
  <aside class="menu">
    <search />

    <b-tabs v-model="activeTab">
      <b-tab-item v-for="tab in tabs" :label="$t(tab.id)" :key="tab.name">
        <ul class="menu-list">
          <li v-for="category in tab.items" :key="category.filter">
            <a v-if="category.children" :class="{ 'is-active': isSelected(category) }" @click="selectGroup(category)">
              <img v-if="category.icon" :src="getIcon(category)" class="category-icon" width="20" height="20">
              {{ $t(`${tab.id}.${category.id}`) }}
            </a>

            <ul v-if="selectedGroup && selectedGroup.id == category.id">
              <li v-for="child in category.children" :key="child.filter">
                <a :class="{ 'is-active': isSelected(child) }" @click="selectCategory(child)">
                  <img v-if="child.icon" :src="getIcon(child)" class="category-icon" width="20" height="20">
                  {{ $t(child.filter) }}
                </a>
              </li>
            </ul>

            <a v-if="!category.children" :class="{ 'is-active': isSelected(category) }" @click="selectCategory(category)">
              <img v-if="category.icon" :src="getIcon(category)" class="category-icon" width="20" height="20">
              {{ $t(category.filter) }}
            </a>
          </li>
        </ul>
      </b-tab-item>
    </b-tabs>

    <div class="icons8">
      <a href="https://icons8.com">Icon pack by Icons8</a>
    </div>
  </aside>
</template>

<script>
import Search from './Search/Search'
import CategoryRepository from '../services/CategoryRepository'

export default {
  components: {
    'search': Search
  },
  data: function () {
    return {
      activeTab: 0,
      selectedCategory: null,
      selectedGroup: null,
      tabs: (new CategoryRepository()).getCategoryTabs()
    }
  },
  methods: {
    getIcon: function (category) {
      return `https://png.icons8.com/${ category.icon }/office/20`
    },
    selectCategory: function (category) {
      this.selectedCategory = category
      this.$emit('category-selected', category)
    },
    selectGroup: function (group) {
      if (this.selectedGroup?.equals(group)) {
        this.selectedGroup = null
        return
      }

      this.selectedGroup = group
    },
    isSelected: function (category) {
      return this.selectedCategory?.equals(category)
    }
  }
}
</script>

<style>
.menu {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.icons8 {
  margin-top: auto;
}

.b-tabs .tab-content {
  padding-top: 10px;
}

.category-icon {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
