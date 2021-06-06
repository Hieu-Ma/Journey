import React, { useEffect }from 'react';
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
                     <div className="entry">{entry.title}</div>
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