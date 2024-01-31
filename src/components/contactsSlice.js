import { createSlice } from '@reduxjs/toolkit';

const loadContactsFromLocalStorage = () => {
  const storedContacts = JSON.parse(localStorage.getItem('contacts'));
  return storedContacts ? storedContacts : [];
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: loadContactsFromLocalStorage(),
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('contacts', JSON.stringify(state.items));
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
      localStorage.setItem('contacts', JSON.stringify(state.items));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
