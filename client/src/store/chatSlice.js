import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [], // all chat users
    messages: [], // messages of current chat
    currentChatId: null, // selected chat user id
    onlineUsers: [], // currently online users
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setCurrentChat(state, action) {
      state.currentChatId = action.payload;
      state.messages = [];
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const {
  setUsers,
  setCurrentChat,
  setOnlineUsers,
  setMessages,
  addMessage,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
