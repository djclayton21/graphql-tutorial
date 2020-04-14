import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { FEED_QUERY } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
      votes {
        id
        user {
          id
        }
      }
      postedBy {
        id
        name
      }
    }
  }
`;

export default function CreateLink({ history }) {
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          placeholder="Description"
        />
        <input
          className="mb2"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          type="text"
          placeholder="url"
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => history.push('/new/1')}
          update={(store, { data: { postLink } }) => {
            const first = LINKS_PER_PAGE;
            const skip = 0;
            const orderBy = 'createdAt_DESC';
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(postLink);
            store.writeQuery({
              query: FEED_QUERY,
              data,
              variables: { first, skip, orderBy },
            });
          }}
        >
          {(postMutation) => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}
