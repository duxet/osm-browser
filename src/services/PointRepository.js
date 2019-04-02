import Axios from 'axios'
import Point from '../models/Point'

export default class {
  constructor(baseURL = window.serverData.pointsApiUrl) {
    this.client = Axios.create({ baseURL })
  }

  getPoints(bbox, type, subtype) {
    bbox = [
      bbox.getSouthWest().lat,
      bbox.getSouthWest().lng,
      bbox.getNorthEast().lat,
      bbox.getNorthEast().lng
    ].join(',')

    return this.client.get('points', {
      params: { bbox, type, subtype }
    }).then((response) => {
      return response.data.map(element => new Point(element))
    })
  }
}
