import React, { useState, useEffect, useRef }from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editUserEntry, getUserEntry } from '../../store/entries';
import { Editor } from '@tinymce/tinymce-react';
import 'react-quill/dist/quill.snow.css';
import './EditEntry.css';

const EditEntry = () => {
   let history = useHistory();
   const dispatch = useDispatch();
   const editorRef = useRef(null);

   let { id } = useParams();
   let entryId = Number(id);
   
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
                  <NavLink to={`/journals/${entry.journal_id}/create`} >
                     create entry
                  </NavLink>
               </button>
            <div id="journal__title"><NavLink to={`/journals/${entry.journal_id}`}>{entry.journal_title}</NavLink></div>
         </div>
         <div id="entries__container">
            <form onSubmit={updateEntry}>
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
                     initialValue={entry.description}
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
               <div id="edit__buttons">
                  <button type="submit" id="cancel__edit" className="edit__button">
                     <NavLink to={`/entries/${entry.id}`}>
                        cancel
                     </NavLink>
                  </button>
                  <button type="submit" onClick={log} className="edit__button">submit</button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default EditEntry;