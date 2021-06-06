import React, { useState, useEffect }from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import './ViewJournal.css';

const ViewJournal = () => {
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => state.journals.journal) 
   const entries = useSelector(state => state.journals.entries)
   const userId = useSelector(state => state.session.user.id)
   
   // This handles the edit journal title modal
   const [openEdit, setOpenEdit] = useState(false);

   const handleOpenEdit = () => {
      setOpenEdit(true);
   }

   const handleCloseEdit = () => {
      setOpenEdit(false);
   }

   const editJournal = (
      <form>
         <h1>New Journal Title</h1>
         <input             
            type="text"
            name="title"
            // onChange={e => setTitle(e.target.value)}
            // value={title}
            required
            ></input>
         <button type="submit">create</button>
      </form>
   ) 

   // This handles the delete journal modal
   const [openDelete, setOpenDelete] = useState(false);

   const handleOpenDelete = () => {
      setOpenDelete(true);
   }

   const handleCloseDelete = () => {
      setOpenDelete(false);
   }

   const deleteJournal = (
      <form>
         <h1>Do you want to delete {journal?.title}?</h1>
         <input             
            type="text"
            name="title"
            // onChange={e => setTitle(e.target.value)}
            // value={title}
            required
            ></input>
         <button type="submit">delete</button>
      </form>
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
            <div id="journal__buttons">
               <button id="edit__journal" className="journal__button">edit</button>
               <button className="journal__button">delete</button>
            </div>
         </div>
      </div>
   )
}

export default ViewJournal;