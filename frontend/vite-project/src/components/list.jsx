import React from 'react';
import Song from './song';

const List = (data) => {
  return (
    <div>
        <h1>{data.title}</h1>
        <Song name="Artist Name"/>
    </div>
  )
}

export default List