import React, { useState }from 'react';
import { useDispatch } from 'react-redux';
import { createUserJournal } from '../../store/journals'
import Modal from '@material-ui/core/Modal';
import './CreateJournal.css';

const CreateJournal = () => {

   const dispatch = useDispatch();

   // This useState handles opening the modal
   const [open, setOpen] = useState(false);

   // This use state handles the value of the title
   const [title, setTitle] = useState('');

   // Opens Modal
   const handleOpen = () => {
      setOpen(true);
   }

   // Closes Modal
   const handleClose = () => {
      setOpen(false);
   }

   // Creates a new journal
   const create = (e) => {
      e.preventDefault();
      dispatch(createUserJournal(title));
      handleClose();
   }

   const modalContent = (
      <form onSubmit={create} id="create__journal__form">
         <h1>New Journal Title</h1>
         <div id="create__input__container">
            <input             
               type="text"
               name="title"
               onChange={e => setTitle(e.target.value)}
               value={title}
               id="create__new__journal"
               maxlength="20"
               required
            ></input>
         </div>
         <div id="create__journal__buttons">
            <button id="cancel__journal" className="create__journal__button" onClick={handleClose}>cancel</button>
            <button id="create__journal" className="create__journal__button" type="submit">create</button>
         </div>
      </form>
   )

   return (
      <div id="journal">
         <div id="journal__border">
            <button id="create__button" onClick={handleOpen}>create a new journal!</button>
         </div>
         <Modal
            open={open}
            onClose={handleClose}
         >
            {modalContent}
         </Modal>
         <div id="journal__benefits">

            <div id="benefits__title">Why Journal?</div>

            <div id="stress__container" className="containers">
               <h3 id="stress__title">Reduces Stress</h3>
               <p id="stress__description">
                  Journaling is a incredible stress management tool, 
                  a good-for-you habit that lessens impact of physical 
                  stressors on your health. Plus, writing about stressful 
                  experiences can help you manage them in a healthy way.
               </p>
            </div>

            <div id="stress__img__container" className="image__container">
               <div id="stress__img" className="images"></div>
            </div>

            <div id="memory__container" className="containers">
               <h3 id="memory__title">Keeps Memory Sharp</h3>
               <p id="memory__description">
                  Journaling helps keep your brain in tip-top shape. 
                  Not only does it boost memory and comprehension, it 
                  also increases working memory capacity, which may reflect 
                  improved cognitive processing.
               </p>
            </div>

            <div id="memory__img__container" className="image__container">
               <div id="memory__img" className="images"></div>
            </div>

            <div id="immune__container" className="containers">
               <h3 id="immune__title">Improves Immune Function</h3>
               <p id="immune__description">
                  Those who journal boast improved immune system
                   functioning (it strengthens immune cells!)
                   as well as lessened symptoms of asthma and 
                   rheumatoid arthritis.
               </p>
            </div>

            <div id="immune__img__container" className="image__container">
               <div id="immune__img" className="images"></div>
            </div>

            <div id="mood__container" className="containers">
               <h3 id="mood__title">Boosts Mood</h3>
               <p id="mood__description">
                  A unique social and behavior outcome of journaling is this:
                  it can improve your mood and give you a greater sense of
                  overall emotional well-being and happiness.
               </p>
            </div>

            <div id="mood__img__container" className="image__container">
               <div id="mood__img" className="images"></div>
            </div>

            <div id="emotion__container" className="containers">
               <h3 id="emotion__title">Strengthens Emotional Functions</h3>
               <p id="emotion__description">
                  As journaling habits are developed, benefits become long-term,
                  meaning that diarists become more in tune with their health
                  by connecting with inner needs and desires.
               </p>
            </div>

            <div id="emotion__img__container" className="image__container">
               <div id="emotion__img" className="images"></div>
            </div>

         </div>
      </div>
   )
}

export default CreateJournal;