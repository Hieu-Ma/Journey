import React, { useState, useEffect }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import { editUserJournal, deleteUserJournal } from '../../store/journals';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from '@material-ui/core/Modal';
import './CreateEntry.css';

const ViewJournal = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => state.journals.journal); 
   const entries = useSelector(state => state.journals.entries);
   const userId = useSelector(state => state.session.user.id);
   const [text, setText] = useState('')
   console.log(text)

   useEffect(() => {
      dispatch(getUserJournal(journalId));
   },[dispatch, id]);

   if(!journal || !userId || !entries) return null;
   if(journal.user_id !== userId) return (
      <div>Journal does not belong to current user!</div>
   );
   
   const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
    }
  
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent', 'align',
      'link', 'image'
    ]

   return (
      <div id="journal">
         <div id="journal__title__container">
            <button id="create__entry">
               <svg xmlns="http://www.w3.org/2000/svg" width="23.37" height="23" viewBox="0 0 23.37 23">
               <line id="Line_6" data-name="Line 6" y2="21" transform="translate(10.846 1)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
               <line id="Line_7" data-name="Line 7" x2="21.37" transform="translate(1 11.582)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
               </svg>
            </button>
            <div id="journal__title">{journal.title}</div>
         </div>
         <div id="entries__container">
            <form>
               <input
                  placeholder="Title"
               >
               </input>
               <ReactQuill
                  modules={modules}
                  formats={formats}
                  value={text}
                  onChange={setText}
               >
               </ReactQuill>
               <button type="submit">create</button>
            </form>
         </div>
      </div>
   )
}

export default ViewJournal;