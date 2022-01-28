import React from 'react';
import { Layout } from '../components';
import TrackCard from '../containers/track-card';
import { gql, useQuery } from '@apollo/client';

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

  if (loading) return 'Loading...';

  if (error) return `Error: ${error}!`;

  return (
    <Layout grid>
      {data?.tracksForHome?.map((track) => (
        <TrackCard track={track} key={track.id} />
      ))}
    </Layout>
  );
};

export default Tracks;
