import React, { useState, useEffect }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import { createJournalEntry } from '../../store/journals';
import { getUserEntry } from "../../store/entries"
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
   const entries = useSelector(state => state.journals.entries);
   const userId = useSelector(state => state.session.user.id);
   const entry = useSelector(state => state.entries.entry);
   useEffect(() => {
      dispatch(getUserEntry(entryId))
   },[dispatch, id]);

   if(!journal || !userId || !entries || !entry) return null;
   if(journal.user_id !== userId) return (
      <div>Journal does not belong to current user!</div>
   );

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
            <div id="journal__title">{journal.title}</div>
         </div>
         <div id="entries__container">
            <div id="entry__title">{entry.title}</div>
            <div id="entry__description">
               <div dangerouslySetInnerHTML={{__html: entry.description}}></div>
            </div>
         </div>
         <div id="edit__journal__buttons">
               <button>edit</button>
               <button id="submit__new__journal" type="submit">delete</button>
            </div>
      </div>
   )
}

export default ViewEntry;