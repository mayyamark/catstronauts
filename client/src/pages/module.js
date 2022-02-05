import React from 'react';
import { Layout, QueryResult, ModuleDetail } from '../components';
import { gql, useQuery } from '@apollo/client';

const GET_MODULE_AND_PARENT_TRACK = gql`
  query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

/**
 * Module page fetches both parent track and module's data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and feeds them to the Module detail component
 */
const Module = ({ trackId, moduleId }) => {
  const { data, loading, error } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: { trackId, moduleId },
  });

  return (
    <Layout fullwidth>
      <QueryResult data={data} loading={loading} error={error}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
