//constants
const GET_JOURNALS = 'journals/GET_JOURNALS';

const getJournals = (journals) => ({
   type: GET_JOURNALS,
   journals
})

export const userJournals = () => async (dispatch) => {
   const response = await fetch('/api/journals');
   const data = await response.json();
   console.log(data)
   if(data.errors) {
      return data;
   }
   return dispatch(getJournals(data))
}

export default function reducer(state={}, action) {
   switch (action.type) {
       case GET_JOURNALS:
           return action.journals;
       default:
           return state;
   }
}