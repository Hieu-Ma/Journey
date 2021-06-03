import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Journals.css';

const Journals = () => {

  const user = useSelector(state => state.session.user)

  return (
    <div id="journals">
      <div id="journals__title">Journals</div> 
    </div>
  );
}

export default Journals;