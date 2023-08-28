import React from 'react';
import { useQuery } from '@apollo/client';
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

const ScreenshotList = ({ kidId }) => {
  const { loading, error, data } = useQuery(GET_KID_SCREENSHOTS, {
    variables: { kidId },
  });

  /** Edge Cases **/

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { kid } = data;

  if (!!kid?.screenshot?.length) return <p>Kid doesn't have any capture</p>;

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>
        Screenshots for {kid.name}
      </h2>

      <table class='rounded-t-lg m-5 w-5/6 mx-auto bg-gray-800 text-gray-200'>
        <tr class='text-left border-b border-gray-300'>
          <th class='px-4 py-3'>Thumbnail</th>
          <th class='px-4 py-3'>Description</th>
        </tr>
        <tbody>
          {kid.screenshots.map((screenshot) => (
            <tr
              class='bg-gray-700 border-b border-gray-600'
              key={screenshot.id}
            >
              <td class='px-4 py-3'>
                <img
                  width={100}
                  height={100}
                  src={screenshot.imageUrl}
                  alt={screenshot.description}
                  className='w-20 h-20 object-cover rounded'
                />
              </td>
              <td class='px-4 py-3'>{screenshot.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreenshotList;
