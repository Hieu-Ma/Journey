import React from 'react';
import Journals from '../Journals';
import ViewEntry from '../ViewEntry';
import './HomeViewEntry.css'

const Home = () => {
   return (
      <div id="home">
         <Journals />
         <ViewEntry />
      </div>
   )
}

export default Home;