import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectFilter } from "./filtersSlice";
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload);
      })
      .addMatcher(
        isAnyOf(
          addContact.pending,
          fetchContacts.pending,
          deleteContact.pending
        ),
        (state) => {
          state.error = null;
          state.loading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          fetchContacts.rejected,
          deleteContact.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          fetchContacts.fulfilled,
          deleteContact.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export default contactsSlice.reducer;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectItems = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectItems, selectFilter],
  (items, name) => {
    return name
      ? items.filter((contact) =>
          contact.name.toLowerCase().includes(name.toLowerCase())
        )
      : items;
  }
);
