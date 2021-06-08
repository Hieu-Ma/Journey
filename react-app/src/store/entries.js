//constants
const GET_ENTRY = 'entries/GET_ENTRY'

const getEntry = (entry) => ({
   type: GET_ENTRY,
   entry
})

export const getUserEntry = (id) => async (dispatch) => {
   const response = await fetch(`/api/entries/${id}`);
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(getEntry(data));
}

export default function reducer(state={}, action) {
   let newState = {...state}
   switch (action.type) {
      case GET_ENTRY:
         newState["entry"] = action.entry.entry;
         return newState;
      default:
         return state;
   }
}