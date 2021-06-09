import React, { useState, useEffect }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import { createJournalEntry } from '../../store/journals';
import { getUserEntry, deleteUserEntry } from "../../store/entries"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from '@material-ui/core/Modal';
import 'react-quill/dist/quill.snow.css'; // ES6
import './ViewEntry.css';

const ViewEntry = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   let { id } = useParams();
   let entryId = Number(id);
   const journal = useSelector(state => state.journals.journal); 
   const entry = useSelector(state => state.entries.entry);

   useEffect(() => {
      dispatch(getUserEntry(entryId))
   },[dispatch, id]);

   if(!entry) return null;

   const deleteEntry = (e) => {
      e.preventDefault();
      dispatch(deleteUserEntry(entryId))
      history.push(`/journals/${entry?.journal_id}`)
   }

   return (
      <div id="journal">
         <div id="journal__title__container">
            <NavLink to={`/journals/${entry.journal_id}/create`} >
               <button id="create__entry">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23.37" height="23" viewBox="0 0 23.37 23">
                  <line id="Line_6" data-name="Line 6" y2="21" transform="translate(10.846 1)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
                  <line id="Line_7" data-name="Line 7" x2="21.37" transform="translate(1 11.582)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
                  </svg>
               </button>
            </NavLink>
            <div id="journal__title"><NavLink to={`/journals/${entry.journal_id}`}>{entry.journal_title}</NavLink></div>         </div>
            <div id="view__entry__container">
               <div id="entry__title">{entry.title}</div>
               <div id="entry__description">
                  <div dangerouslySetInnerHTML={{__html: entry.description}}></div>
               </div>
            </div>
            <div id="edit__entry__buttons">
               <NavLink to={`/entries/${entry.id}/edit`}><button className="entry__button" id="edit__entry__button">edit entry</button></NavLink>
               <button id="submit__new__journal" onClick={deleteEntry} className="entry__button">delete entry</button>
            </div>
      </div>
   )
}

export default ViewEntry;