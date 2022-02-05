const resolvers = {
  Query: {
    // returns an array of Tracks for the home page
    tracksForHome: (_, __, { dataSources }) =>
      dataSources.trackApi.getTracksForHome(),
    // get a single track by id, for the Track page
    track: (_, { id }, { dataSources }) => dataSources.trackApi.getTrack(id),
  },
  Track: {
    // returns data for a track's author
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackApi.getAuthor(authorId),
    modules: ({ id }, _, { dataSources }) =>
      dataSources.trackApi.getTrackModules(id),
  },
};

module.exports = resolvers;
