import React, { useState, useEffect, useRef }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJournal } from '../../store/journals';
// import { createJournalEntry } from '../../store/journals';
import { editUserEntry, getUserEntry } from '../../store/entries';
import ReactQuill, { Quill } from 'react-quill';
import { Editor } from '@tinymce/tinymce-react';
import 'react-quill/dist/quill.snow.css';
import Modal from '@material-ui/core/Modal';
import './EditEntry.css';

const EditEntry = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   const editorRef = useRef(null);

   let { id } = useParams();
   let entryId = Number(id);
   
   // const journal = useSelector(state => state.journals.journal); 
   const entry = useSelector(state => state.entries.entry);
   
   const [description, setDescription] = useState('');
   const [title, setTitle] = useState('');
   
   // saves the value of the word processor
   const log = () => {
      if (editorRef.current) {
         setDescription(editorRef.current.getContent());
      }
   };
   
   useEffect(() => {
      dispatch(getUserEntry(entryId))
   },[dispatch]);

   useEffect(() => {
      if(entry) {
         setTitle(entry.title)
      }
   },[entry]);
   
   if(!entry) return null;

   const updateEntry = (e) => {
      e.preventDefault();
      dispatch(editUserEntry(entryId, title, description))
      history.push(`/journals/${entry?.journal_id}`)
   }

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
            <div id="journal__title">{entry.journal_title}</div>
         </div>
         <div id="entries__container">
            <form onSubmit={updateEntry}>
               <input
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  >
               </input>
               <Editor
                  apiKey='zz6qgaddhlvxbo2qhyr6egdacg5wpc8frh658nppxd7p6z7r'
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={entry.description}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <button type="submit">cancel</button>
               <button type="submit" onClick={log}>submit</button>
            </form>
         </div>
      </div>
   )
}

export default EditEntry;