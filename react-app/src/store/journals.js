//constants
const GET_JOURNALS = 'journals/GET_JOURNALS';
const CREATE_JOURNAL = 'journals/CREATE_JOURNAL';

const getJournals = (journals) => ({
   type: GET_JOURNALS,
   journals
})

const createJournal = (journal) => ({
   type: CREATE_JOURNAL,
   journal
})

export const userJournals = () => async (dispatch) => {
   const response = await fetch('/api/journals');
   const data = await response.json();
   console.log(data)
   if(data.errors) {
      return data;
   }
   dispatch(getJournals(data))
}

export const createUserJournal = (title) => async (dispatch) => {
   const response = await fetch('/api/journals', {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         title
      }),
   });
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(createJournal(data));
}

export default function reducer(state={}, action) {
   switch (action.type) {
       case GET_JOURNALS:
           return action.journals.journals;
       case CREATE_JOURNAL:
           let newState = [...state, action.journal.created]
           return newState;
       default:
           return state;
   }
}