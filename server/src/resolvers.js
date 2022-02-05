const resolvers = {
  Query: {
    // returns an array of Tracks for the home page
    tracksForHome: async (
      _,
      { page = 1, offset = 0, limit = 13 },
      { dataSources }
    ) => {
      try {
        const tracks = await dataSources.trackApi.getTracksForHome();

        return {
          code: 200,
          success: true,
          message: `${tracks.length} tracks found!`,
          tracks,
          tracksCount: tracks.length,
          currentPage: page,
          hasPreviousPage: offset + limit < tracks.length,
          hasNextPage: page > 1,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          tracks: [],
          tracksCount: 0,
          currentPage: 0,
          hasPreviousPage: false,
          hasNextPage: false,
        };
      }
    },
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
