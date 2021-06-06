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

   // console.log(entries)
   // let test = entries.map( entry => {
   //    console.log(entry.title)
   // })

   return (
      <div id="journal">
         <div id="journal__title">
            {journal.title}
         </div>
 
         <div id="journal__entries">
            {entries.map(entry => (
               <div className="entry">{entry.title}</div>
            ))}
         </div>
      </div>
   )
}

export default ViewJournal;