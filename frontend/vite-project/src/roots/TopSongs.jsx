import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export const TopSongs = () => {
  const { tokens } = useContext(AuthContext);
  return (
    <div>
      <h1>Top Songs Page</h1>
      <h2>{tokens.access_token}</h2>
      <h2>{tokens.refresh_token}</h2>
    </div>
  )
}

export default TopSongs;
