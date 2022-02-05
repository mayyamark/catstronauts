import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout } from '../components';
import TrackCard from '../containers/track-card';
import QueryResult from '../components/query-result';

const TRACKS = gql`
  query TracksForHome($page: Int, $offset: Int, $limit: Int) {
    tracksForHome(page: $page, offset: $offset, limit: $limit) {
      tracks {
        id
        title
        author {
          id
          name
          photo
        }
        thumbnail
        length
        modulesCount
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS, {
    variables: {
      page: 1,
      limit: 13,
      offset: 0,
    },
  });

  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.tracks?.map((track) => (
          <TrackCard track={track} key={track.id} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
