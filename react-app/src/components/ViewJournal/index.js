import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import Modal from '@material-ui/core/Modal';
import './ViewJournal.css';

const ViewJournal = () => {
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => state.journals.journal) 
   const entries = useSelector(state => state.journals.entries)
   const userId = useSelector(state => state.session.user.id)
   
   const [newTitle, setNewTitle] = useState('');
   const [openDelete, setOpenDelete] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);

   // This handles the edit journal title modal
   const handleOpenEdit = () => {
      setOpenEdit(true);
   }

   const handleCloseEdit = () => {
      setOpenEdit(false);
   }

   const editJournal = (
      <div id="edit__journal__container">
         <form id="edit__journal">
            <h1>New Journal Title</h1>
            <input             
               type="text"
               name="newTitle"
               onChange={e => setNewTitle(e.target.value)}
               value={newTitle}
               required
            ></input>
            <div id="edit__journal__buttons">
               <button >cancel</button>
               <button id="submit__new__journal" type="submit">submit</button>
            </div>
         </form>
      </div>
   ) 

   // This handles the delete journal modal
   const handleOpenDelete = () => {
      setOpenDelete(true);
   }

   const handleCloseDelete = () => {
      setOpenDelete(false);
   }

   const deleteJournal = (
      <div id="delete__journal__container">
         <h1>Do you want to delete {journal?.title}?</h1>
         <div id="delete__journal__buttons">
            <button id="cancel__delete">No</button>
            <button id="confirm__delete">Yes</button>
         </div>
      </div>
   )

   useEffect(() => {
      dispatch(getUserJournal(journalId))
   },[dispatch, id])

   if(!journal || !userId || !entries) return null;
   if(journal.user_id !== userId) return (
      <div>Journal does not belong to current user!</div>
   );

   return (
      <div id="journal">
         <div id="journal__title">
            {journal.title}
         </div>
         <div id="entries__container">
            <div id="journal__entries__container">
               <div id="journal__entries">
                  {entries.map(entry => (
                     <div key={`${entry.id}+${entry.title}` } className="entry">{entry.title}</div>
                  ))}
               </div>
            </div>
            <Modal
               open={openEdit}
               onClose={handleCloseEdit}
            >
               {editJournal}
            </Modal>
            <Modal
               open={openDelete}
               onClose={handleCloseDelete}
            >
               {deleteJournal}
            </Modal>
            <div id="journal__buttons">
               <button id="edit__journal__button" className="journal__button" onClick={handleOpenEdit}>edit</button>
               <button className="journal__button" onClick={handleOpenDelete}>delete</button>
            </div>
         </div>
      </div>
   )
}

export default ViewJournal;