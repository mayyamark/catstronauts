const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Get tracks array for homepage grid with pagination"
    tracksForHome(page: Int, offset: Int, limit: Int): TracksForHomeResponse!
    "Fetch a specific track, provided a track's ID"
    track(id: ID): Track
    "Fetch a specific module, provided a module's ID"
    module(id: ID): Module!
  }

  type TracksForHomeResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "An array of tracks for the given page"
    tracks: [Track!]!
    "The total number of tracks"
    tracksCount: Int
    "The current page, passed in the variables"
    currentPage: Int
    "A boolean that describes if there is a next page"
    hasNextPage: Boolean!
    "A boolean that describes if there is a previous page"
    hasPreviousPage: Boolean!
  }

  type Mutation {
    "Increment the views of a track"
    incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
  }

  type IncrementTrackViewsResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    track: Track
  }

  "A track is a group of Modules that teaches about a specific topic"
  type Track {
    id: ID!
    "The track's title"
    title: String!
    "The track's main author"
    author: Author!
    "The track's main illustration to display in track card or track page detail"
    thumbnail: String
    "The full track's duration, in seconds"
    durationInSeconds: Int
    "The track's approximate length to complete, in minutes"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The number of modules this track contains"
    modulesCount: Int
    "The track's complete description, can be in Markdown format"
    description: String
    "The number of times a track has been viewed"
    numberOfViews: Int
    "The track's complete array of Modules"
    modules: [Module!]!
  }

  "A Module is a single unit of teaching. Multiple Modules compose a Track"
  type Module {
    id: ID!
    "The module's title"
    title: String!
    "The full module's duration, in seconds"
    durationInSeconds: Int
    "The module's length in minutes"
    length: Int @deprecated(reason: "Use durationInSeconds")
    "The module's text-based description, can be in markdown format. In case of a video, it will be the enriched transcript"
    content: String
    "The module's video url, for video-based modules"
    videoUrl: String!
  }

  "Author of a complete Track or a Module"
  type Author {
    id: ID!
    "Author's first and last name"
    name: String!
    "Author's profile picture url"
    photo: String!
  }
`;

module.exports = typeDefs;
