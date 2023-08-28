import React from 'react';
import { useQuery } from '@apollo/client';
import GET_KID_SCREENSHOTS from './KidScreenshots.graphql';
import gql from 'graphql-tag';

export const GET_KID_SCREENSHOTS = gql`
  query GetKidScreenshots($kidId: ID!) {
    kid(id: $kidId) {
      id
      name
      screenshots {
        id
        imageUrl
        description
      }
    }
  }
`;

export const ScreenshotList = ({ kidId }) => {
  const { loading, error, data } = useQuery(GET_KID_SCREENSHOTS, {
    variables: { kidId },
  });

  /** Edge Cases **/

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { kid } = data;

  if (!!kid.screenshot.length) return <p>Kid doesn't have any capture</p>;

  return (
    <div>
      <h2>Screenshots for {kid.name}</h2>
      <ul>
        {kid.screenshots.map((screenshot) => (
          <li key={screenshot.id}>
            <img src={screenshot.imageUrl} alt={screenshot.description} />
            <p>{screenshot.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
