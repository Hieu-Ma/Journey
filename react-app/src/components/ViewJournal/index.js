import React, { useEffect }from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import './ViewJournal.css';

const ViewJournal = () => {
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => (state.journals.journal)) 
   const userId = useSelector(state => (state.sessions.user.id))
   useEffect(() => {
      dispatch(getUserJournal(journalId))
   },[dispatch, id])

   if(!journal || !userId) return null;
   // if(journal)

   return (
      <div id="journal">
         <div id="journal__title">
            {journal.title}
         </div>
 
         <div id="journal__entries">

         </div>
      </div>
   )
}

export default ViewJournal;