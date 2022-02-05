const resolvers = {
  Query: {
    // returns an array of Tracks for the home page
    tracksForHome: (_, __, { dataSources }) =>
      dataSources.trackApi.getTracksForHome(),
    // get a single track by id, for the Track page
    track: (_, { id }, { dataSources }) => dataSources.trackApi.getTrack(id),
    module: (_, { id }, { dataSources }) => dataSources.trackApi.getModule(id),
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackApi.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}!`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },

  Track: {
    // returns data for a track's author
    author: ({ authorId }, _, { dataSources }) =>
      dataSources.trackApi.getAuthor(authorId),
    // returns data for a track's modules
    modules: ({ id }, _, { dataSources }) =>
      dataSources.trackApi.getTrackModules(id),
    durationInSeconds: ({ length }) => length,
  },

  Module: {
    durationInSeconds: ({ length }) => length,
  },
};

module.exports = resolvers;
