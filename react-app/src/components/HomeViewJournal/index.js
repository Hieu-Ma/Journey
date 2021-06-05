import React from 'react';
import Journals from '../Journals';
import ViewJournal from '../ViewJournal';
import './Home.css'

const Home = () => {
   return (
      <div id="home">
         <Journals />
         <ViewJournal />
      </div>
   )
}

export default Home;