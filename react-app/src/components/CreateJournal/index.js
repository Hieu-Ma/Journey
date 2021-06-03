import React from 'react';
import './CreateJournal.css'

const CreateJournal = () => {
   return (
      <div id="create__journal">
         <div id="journal__border">
            <div id="create__button">create a new journal!</div>
         </div>
         <div id="journal__benefits">
            <div id="benefits__title">Why Journal?</div>
            <div id="stress__container">
               <h3 id="stress__title">Reduces Stress</h3>
               <p id="stress__description">
                  Journaling is a incredible stress management tool, 
                  a good-for-you habit that lessens impact of physical 
                  stressors on your health. Plus, writing about stressful 
                  experiences can help you manage them in a healthy way.
               </p>
            </div>
            <div id="stress__img"></div>
            <div id="memory__img"></div>
            <div id="memory__container">
               <h3 id="memory__title">Keeps Memory Sharp</h3>
               <p id="memory__description">
                  Journaling helps keep your brain in tip-top shape. 
                  Not only does it boost memory and comprehension, it 
                  also increases working memory capacity, which may reflect 
                  improved cognitive processing.
               </p>
            </div>
         </div>
      </div>
   )
}

export default CreateJournal;