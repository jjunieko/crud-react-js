import React from 'react';
import AllUsers from './AllUsers';

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map(user =>  <AllUsers key={user.id} user={user} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;