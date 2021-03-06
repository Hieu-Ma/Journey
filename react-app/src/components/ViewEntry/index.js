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

   // This useState handles opening the modal
   const [open, setOpen] = useState(false);

   // Opens Modal
   const handleOpen = () => {
      setOpen(true);
   }

   // Closes Modal
   const handleClose = () => {
      setOpen(false);
   }

   useEffect(() => {
      dispatch(getUserEntry(entryId))
   },[dispatch, id, journal]);

   if(!entry) return null;

   const deleteEntry = (e) => {
      e.preventDefault();
      dispatch(deleteUserEntry(entryId))
      history.push(`/journals/${entry?.journal_id}`)
   }

   const deleteEntryModal = (
      <div id="delete__journal__container">
         <h1>Do you want to delete {entry.title}?</h1>
         <div id="delete__journal__buttons">
            <button id="cancel__delete__entry" onClick={handleClose}>No</button>
            <button id="confirm__delete__entry" onClick={deleteEntry}>Yes</button>
         </div>
      </div>
   )


   return (
      <div id="journal">
         <div id="journal__title__container">
               <button id="create__entry">
                  <NavLink to={`/journals/${entry.journal_id}/create`} >
                     create entry
                  </NavLink>
               </button>
            <div id="journal__title"><NavLink to={`/journals/${entry.journal_id}`}>{entry.journal_title}</NavLink></div>         </div>
            <div id="view__entry__container">
               <div id="entry__title">{entry.title}</div>
               <div id="entry__description">
                  <div dangerouslySetInnerHTML={{__html: entry.description}}></div>
               </div>
            </div>
            <Modal
               open={open}
               onClose={handleClose}
            >
               {deleteEntryModal}
            </Modal>
            <div id="edit__entry__buttons">
               <button className="entry__button" id="edit__entry__button">
                  <NavLink to={`/entries/${entry.id}/edit`}>edit entry</NavLink>
               </button>
               <button id="submit__new__journal" onClick={handleOpen} id="delete__entry__button" className="entry__button">delete entry</button>
            </div>
      </div>
   )
}

export default ViewEntry;