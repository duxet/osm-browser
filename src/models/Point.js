export default class Point {
  constructor(params) {
    let tags = {};
    params.tags.map(tag => tags[tag.key] = tag.value);
    params.tags = tags;

    Object.assign(this, params)
  }

  get address() {
    let firstLine = [
      this.tags['addr:street'],
      this.tags['addr:housenumber']
    ].join(' ').trim()

    let secondLine = [
      this.tags['addr:postcode'],
      this.tags['addr:city']
    ].join(' ').trim()

    return [firstLine, secondLine]
  }
}
