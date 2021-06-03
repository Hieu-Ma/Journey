import React from 'react';
import Journals from '../Journals';
import CreateJournal from '../CreateJournal';
import './Home.css'

const Home = () => {
   return (
      <div id="home">
         <Journals />
         <CreateJournal />
      </div>
   )
}

export default Home;