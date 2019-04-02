import Axios from 'axios'
import Point from '../models/Point'

export default class {
  constructor(baseURL = window.serverData.pointsApiUrl) {
    this.client = Axios.create({ baseURL })
  }

  getAutocomplete(query) {
    query = query + ':**';

    return this.client.get('points', {
      params: { query }
    }).then((response) => {
      return response.data.map(element => new Point(element))
    });
  }
}
