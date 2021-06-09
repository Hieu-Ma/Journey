//constants
const GET_ENTRY = 'entries/GET_ENTRY';
const EDIT_ENTRY = 'entries/EDIT_ENTRY';
const DELETE_ENTRY ='entries/DELETE_ENTRY';

const getEntry = (entry) => ({
   type: GET_ENTRY,
   entry
});

const editEntry = (entry) => ({
   type: EDIT_ENTRY,
   entry
});

const deleteEntry = (entry) => ({
   type: DELETE_ENTRY,
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

export const editUserEntry = (id, title, description) => async (dispatch) => {
   const response = await fetch(`/api/entries/${id}/edit`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         title,
         description
      }),
   });
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(editEntry(data));
}

export const deleteUserEntry = (id) => async (dispatch) => {
   const response = await fetch(`/api/entries/${id}`, {
      method: "DELETE",
   });
   const data = await response.json();
   if(data.errors) {
      return data;
   }
   dispatch(deleteEntry(data));
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