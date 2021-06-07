import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userJournals } from '../../store/journals';
import './Journals.css';

const Journals = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const journals = useSelector(state => state?.journals?.journals);

  useEffect(() => {
    dispatch(userJournals())
  },[dispatch]);

  if(!journals) return null;

  return (
    <div id="journals">
      <div id="journals__title">Journals</div>
      <div id="journals__container">
        {journals.map(journal => (
          <NavLink  key={journal.id} to={`/journals/${journal.id}`}><div className="journal">{journal.title}</div></NavLink>
        ))}
      </div>
    </div>
  );
}

export default Journals;