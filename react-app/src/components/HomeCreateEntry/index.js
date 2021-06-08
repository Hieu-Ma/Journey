import React from 'react';
import Journals from '../Journals';
import CreateEntry from '../CreateEntry';
import './HomeCreateEntry.css'

const Home = () => {
   return (
      <div id="home">
         <Journals />
         <CreateEntry />
      </div>
   )
}

export default Home;