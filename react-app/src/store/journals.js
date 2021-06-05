//constants
const GET_JOURNALS = 'journals/GET_JOURNALS';
const CREATE_JOURNAL = 'journals/CREATE_JOURNAL';
const GET_JOURNAL = 'journals/GET_JOURNAL';

const getJournals = (journals) => ({
   type: GET_JOURNALS,
   journals
})

const createJournal = (journal) => ({
   type: CREATE_JOURNAL,
   journal
})

const getJournal = (journal) => ({
   type: GET_JOURNAL,
   journal
})

export const userJournals = () => async (dispatch) => {
   const response = await fetch('/api/journals');
   const data = await response.json();
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

export const getUserJournal = (id) => async (dispatch) => {
   const response = await fetch(`/api/journals/${id}`);
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(getJournal(data))
}

export default function reducer(state={}, action) {
   let newState = {...state}
   switch (action.type) {
       case GET_JOURNALS:
           newState["journals"] = action.journals.journals;
           return newState;
       case CREATE_JOURNAL:
           newState["journals"] = [...state.journals, action.journal.created];
           return newState;
       case GET_JOURNAL:
           newState["journal"] = action.journal.journal;
           return newState
       default:
           return state;
   }
}