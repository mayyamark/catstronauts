import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout } from '../components';
import TrackCard from '../containers/track-card';
import QueryResult from '../components/query-result';

const TRACKS = gql`
  query TracksForHome {
    tracksForHome {
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
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS);
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => (
          <TrackCard track={track} key={track.id} />
        ))}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
