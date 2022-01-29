const { RESTDataSources } = require('apollo-datasource-rest');

class TrackAPI extends RESTDataSources {
  constructor() {
    super();
    this.baseURL = 'https://odyssey-lift-off-rest-api.herokuapp.com/';
  }

  getTracksForHome() {
    return this.getTracksForHome('tracks');
  }

  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }
}

module.exports = TrackAPI;
