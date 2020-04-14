import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { FEED_QUERY } from './LinkList';

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
          onChange={event => setDescription(event.target.value)}
          type="text"
          placeholder="Description"
        />
        <input
          className="mb2"
          value={url}
          onChange={event => setUrl(event.target.value)}
          type="text"
          placeholder="url"
        />
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => history.push('/')}
          update={(store, { data: { postLink } }) => {
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.push(postLink);
            store.writeQuery({ query: FEED_QUERY }, data);
          }}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}
