import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    postLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
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
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    </div>
  );
}
