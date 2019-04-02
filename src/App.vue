<template>
  <div id="app-root" class="is-flex">
    <navbar />

    <div id="app-container" class="columns is-gapless is-mobile">
      <div id="app-sidebar" class="column is-one-quarter is-hidden-mobile">
        <sidebar @category-selected="categoryChanged" />
      </div>

      <div class="column" style="display: flex; flex-direction: column">
        <v-map ref="map" :maxZoom=19
          :options="{ zoomControl: false }"
          :center="location.coordinates"
          :zoom="location.zoom"
          @l-moveend="mapMoved">
          <v-marker-cluster :options="{ disableClusteringAtZoom: 14 }">
            <v-marker v-for="point in points"
              :key="point.id"
              :lat-lng="point.location"
              :icon="getIcon(point)"
              :options="{ title: point.name }"
              @click="selectedPoint = point"
            />
          </v-marker-cluster>
          <v-control-zoom />
        </v-map>

        <point-info v-if="selectedPoint" :point="selectedPoint" @closed="selectedPoint = null" />
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import AwesomeMarker from 'drmonty-leaflet-awesome-markers'
import LeafletProviders from 'leaflet-providers'
import LocateControl from 'leaflet.locatecontrol'

import PointRepository from './services/PointRepository'
import Storage from './services/Storage'
import Point from './models/Point'
import PointInfo from './components/PointInfo'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default {
  components: {
    'point-info': PointInfo,
    'sidebar': Sidebar,
    'navbar': Navbar
  },
  data: function () {
    return {
      repository: new PointRepository(),
      points: [],
      selectedCategory: null,
      selectedPoint: null,
      location: {
        coordinates: Storage.getObject('location.coordinates', window.serverData.coordinates),
        zoom: Storage.getNumber('location.zoom', 13)
      }
    }
  },
  mounted: function () {
    (new LocateControl({ drawCircle: false, position: 'topright' })).addTo(this.$refs.map.mapObject)
    L.tileLayer.provider('OpenStreetMap').addTo(this.$refs.map.mapObject)
  },
  methods: {
    loadPoints: function () {
      if (!this.selectedCategory) {
        return
      }

      let bbox = this.$refs.map.mapObject.getBounds()
      let [type, subtype] = this.selectedCategory.filter.split('=')

      this.repository.getPoints(bbox, type, subtype).then((points) => {
        this.points = points
      })
    },
    mapMoved: function () {
      this.loadPoints()

      let map = this.$refs.map.mapObject
      Storage.set('location.coordinates', [map.getCenter().lat, map.getCenter().lng])
      Storage.set('location.zoom', map.getZoom())
    },
    categoryChanged: function (category) {
      this.points = []
      this.selectedCategory = category
      this.loadPoints()
    },
    getIcon: function (point) {
      return L.AwesomeMarkers.icon({ icon: 'map-marker', 'prefix': 'fa' })
    }
  }
}
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  // Customization goes here

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  @import "~leaflet/dist/leaflet.css";
  @import "~drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css";
  @import "~leaflet.locatecontrol/dist/L.Control.Locate.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  @import "~font-awesome/css/font-awesome.css";

  html {
    overflow: hidden;
  }

  #app-root {
    flex-direction: column;
    height: 100vh;
  }

  #app-container {
    height: 100vh;
  }

  #app-sidebar {
    resize: horizontal;
    overflow: auto;
  }
</style>
