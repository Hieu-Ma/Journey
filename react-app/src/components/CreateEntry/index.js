import React, { useState, useEffect, useRef }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
import { createJournalEntry } from '../../store/journals';
import ReactQuill, { Quill } from 'react-quill';
import { Editor } from '@tinymce/tinymce-react';
import 'react-quill/dist/quill.snow.css';
import Modal from '@material-ui/core/Modal';
import './CreateEntry.css';

const CreateEntry = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   let { id } = useParams();
   let journalId = Number(id);
   const journal = useSelector(state => state.journals.journal); 
   const entries = useSelector(state => state.journals.entries);
   const userId = useSelector(state => state.session.user.id);
   const [description, setDescription] = useState('');
   const [title, setTitle] = useState('');
   const editorRef = useRef(null);
   console.log(description)
   const log = () => {
     if (editorRef.current) {
       setDescription(editorRef.current.getContent());
     }
   };

   useEffect(() => {
      dispatch(getUserJournal(journalId));
   },[dispatch, id]);

   if(!journal || !userId || !entries) return null;
   if(journal.user_id !== userId) return (
      <div>Journal does not belong to current user!</div>
   );
  
   const createEntry = (e) => {
      e.preventDefault();
      dispatch(createJournalEntry(journalId, title, description))
      history.push(`/journals/${journalId}`)
   }

   const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
    }
  
    const formats = [
      'header',
      'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent', 'align',
      'link', 'image'
    ]

   return (
      <div id="journal">
         <div id="journal__title__container">
            <button id="create__entry">
               <NavLink to={`/journals/${journalId}/create`} >
               <svg xmlns="http://www.w3.org/2000/svg" width="23.37" height="23" viewBox="0 0 23.37 23">
               <line id="Line_6" data-name="Line 6" y2="21" transform="translate(10.846 1)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
               <line id="Line_7" data-name="Line 7" x2="21.37" transform="translate(1 11.582)" fill="none" stroke="#646464" stroke-linecap="round" stroke-width="2"/>
               </svg>
               </NavLink>
            </button>
            <div id="journal__title"><NavLink to={`/journals/${journal.id}`}>{journal.title}</NavLink></div></div>
         <div id="entries__container">
            <form onSubmit={createEntry}>
               <input
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  maxlength="20"
                  required
               >
               </input>
               <div id="editor__container">
                  <Editor
                     apiKey='zz6qgaddhlvxbo2qhyr6egdacg5wpc8frh658nppxd7p6z7r'
                     onInit={(evt, editor) => editorRef.current = editor}
                     init={{
                       height: 439,
                       menubar: false,
                       plugins: [
                         'advlist autolink lists link image charmap print preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                       ],
                       toolbar: 'undo redo | formatselect | ' +
                       'backcolor | alignleft aligncenter ' +
                       'alignright alignjustify | bullist numlist outdent indent | ' +
                       'removeformat | help',
                       content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                     }}
                  />
                </div>
               <div id="create__entry__buttons">
                  <button type="submit" onClick={log}>create</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default CreateEntry;