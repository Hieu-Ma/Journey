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
   
   useEffect(() => {
      dispatch(getUserJournal(journalId))
   },[dispatch, id])

   if(!journal) return null;

   return (
      <div id="create__journal">
         <div id="journal__border">
            {journal.title}
         </div>
 
         <div id="journal__entries">

         </div>
      </div>
   )
}

export default ViewJournal;