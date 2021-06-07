//constants
const GET_JOURNALS = 'journals/GET_JOURNALS';
const CREATE_JOURNAL = 'journals/CREATE_JOURNAL';
const EDIT_JOURNAL = 'journals/EDIT_JOURNAL';
const DELETE_JOURNAL = 'journals/DELETE_JOURNAL';
const GET_JOURNAL = 'journals/GET_JOURNAL';

const getJournals = (journals) => ({
   type: GET_JOURNALS,
   journals
})

const createJournal = (journal) => ({
   type: CREATE_JOURNAL,
   journal
})

const editJournal = (journal) => ({
   type: EDIT_JOURNAL,
   journal
})

const deleteJournal = (journal) => ({
   type: DELETE_JOURNAL,
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

export const editUserJournal = (id, title) => async (dispatch) => {
   const response = await fetch(`/api/journals/${id}`, {
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
   dispatch(editJournal(data));
}

export const deleteUserJournal = (id) => async (dispatch) => {
   const response = await fetch(`/api/journals/${id}`, {
      method: "DELETE",
   });
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(deleteJournal(data));
}

export default function reducer(state={}, action) {
   let newState = {...state}
   switch (action.type) {
       case GET_JOURNALS:
           newState["journals"] = action.journals.journals;
           return newState;
       case CREATE_JOURNAL:
           newState["journals"] = [...state.journals, action.journal.created];
           newState["journal"] = action.journal.created;
           return newState;
       case EDIT_JOURNAL:
          let updatedJournalsEdit = state.journals.filter(obj => obj.id !== action.journal.journal.id)
          newState["journals"] = [ action.journal.journal, ...updatedJournalsEdit];
          newState["journal"] = action.journal.journal;
          return newState;
      case DELETE_JOURNAL:
          let updatedJournalsDelete = state.journals.filter(obj => obj.id !== action.journal.journal.id)
          newState["journals"] = [...updatedJournalsDelete];
          newState["deleted"] = action.journal.journal;
       case GET_JOURNAL:
           newState["journal"] = action.journal.journal;
           newState["entries"] = action.journal.entries;
           return newState
       default:
           return state;
   }
}