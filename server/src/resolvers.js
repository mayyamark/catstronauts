const resolvers = {
  Query: {
    // returns an array of Tracks for the home page
    tracksForHome: (_, __, { dataSources }) =>
      dataSources.trackApi.getTracksForHome(),
  },
  Track: {
    // returns data for a track's author
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackApi.getAuthor(authorId),
  },
};

module.exports = resolvers;
