const resolvers = {
  Query: {
    // returns an array of Tracks for the home page
    tracksForHome: (parent, args, context, info) =>
      // trackAPI with lowercase (it's an instance of the class)
      context.dataSources.trackAPI.getTracksForHome(),
  },
  Track: {
    // when querying tracksForHome, we need the data for the author => define a resolver for it as well
    author: (parent, args, context, info) =>
      context.dataSources.trackAPI.getAuthor(parent.authorId),
  },
};

module.exports = resolvers;
