import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userJournals } from '../../store/journals';
import './Journals.css';

const Journals = () => {

  const dispatch = useDispatch();
  const journals = useSelector(state => state?.journals?.journals);

  function randomColor(e) {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const op = 0.3;
    const color = "rgb(" + x + "," + y + "," + z + "," + op + ")";
    e.target.style.backgroundColor = color;
  }

  function defaultColor(e) {
    e.target.style.backgroundColor = "white";
  }

  useEffect(() => {
    dispatch(userJournals())
  },[dispatch]);

  if(!journals) return null;

  return (
    <div id="journals">
      <NavLink to="/">
        <div id="journals__title">Journals</div>
      </NavLink>
      <div id="journals__container">
        {journals.map(journal => (
          <NavLink key={journal.id} to={`/journals/${journal.id}`}>
            <div className="journal" onMouseOver={randomColor} onMouseOut={defaultColor}>{journal.title}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Journals;