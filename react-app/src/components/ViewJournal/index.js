import React, { useState, useEffect }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import { editUserJournal, deleteUserJournal } from '../../store/journals';
import Modal from '@material-ui/core/Modal';
import './ViewJournal.css';
import '../journal.css';

const ViewJournal = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => state.journals.journal); 
   const entries = useSelector(state => state.journals.entries);
   const userId = useSelector(state => state.session.user.id);
   
   const [newTitle, setNewTitle] = useState('');
   const [openDelete, setOpenDelete] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);

   // handles the background colors of the entries

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

   // This handles the edit journal title modal
   const editJournal = (e) => {
      e.preventDefault();
      handleCloseEdit();
      dispatch(editUserJournal(journalId, newTitle));
   }

   const handleOpenEdit = () => {
      setOpenEdit(true);
   }

   const handleCloseEdit = () => {
      setOpenEdit(false);
   }

   const editJournalModal = (
      <div id="edit__journal__container">
         <form id="edit__journal" onSubmit={editJournal}>
            <h1>Edit Journal Title</h1>
            <input             
               type="text"
               name="newTitle"
               onChange={e => setNewTitle(e.target.value)}
               value={newTitle}
               id="insert__title"
               maxlength="20"
               required
            ></input>
            <div id="edit__journal__buttons">
               <button onClick={handleCloseEdit}>cancel</button>
               <button id="submit__new__journal" type="submit">submit</button>
            </div>
         </form>
      </div>
   ) 

   // This handles the delete journal modal

   const deleteJournal = (e) => {
      e.preventDefault();
      dispatch(deleteUserJournal(journalId));
      history.push("/");
   }

   const handleOpenDelete = () => {
      setOpenDelete(true);
   }

   const handleCloseDelete = () => {
      setOpenDelete(false);
   }

   const deleteJournalModal = (
      <div id="delete__journal__container">
         <h1>Do you want to delete {journal?.title}?</h1>
         <div id="delete__journal__buttons">
            <button id="cancel__delete" onClick={handleCloseDelete}>No</button>
            <button id="confirm__delete" onClick={deleteJournal}>Yes</button>
         </div>
      </div>
   )

   useEffect(() => {
      dispatch(getUserJournal(journalId));
   },[dispatch, id]);

   if(!journal || !userId || !entries) return null;
   if(journal.user_id !== userId) return (
      <div>Journal does not belong to current user!</div>
   );

   return (
      <div id="journal">
         <div id="journal__title__container">
               <button id="create__entry">
                  <NavLink to={`/journals/${journalId}/create`} >
                     create entry
                  </NavLink>
               </button>
            <div id="journal__title"><NavLink to={`/journals/${journal.id}`}>{journal.title}</NavLink></div>
         </div>
         <div id="view__entries__container">
            <div id="journal__entries__container">
               <div id="journal__entries">
                  {entries.map(entry => (
                     <NavLink className="entry__link" to={`/entries/${entry.id}`}>
                        <div key={`${entry.id}+${entry.title}` } className="entry" onMouseOver={randomColor} onMouseOut={defaultColor}>{entry.title}</div>
                     </NavLink>
                  ))}
               </div>
            </div>
            <Modal
               open={openEdit}
               onClose={handleCloseEdit}
            >
               {editJournalModal}
            </Modal>
            <Modal
               open={openDelete}
               onClose={handleCloseDelete}
            >
               {deleteJournalModal}
            </Modal>
            <div id="journal__buttons">
               <button id="edit__journal__button" className="journal__button" onClick={handleOpenEdit}>edit journal</button>
               <button className="journal__button" onClick={handleOpenDelete}>delete journal</button>
            </div>
         </div>
      </div>
   )
}

export default ViewJournal;