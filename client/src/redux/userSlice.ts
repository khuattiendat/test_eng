import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    phone: "",
    avatar: "",
    role: "",
    socketConnection: null,
    userOnline: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action?.payload?._id;
            state.name = action?.payload?.name;
            state.avatar = action?.payload?.avatar;
            state.phone = action?.payload?.phone;
            state.role = action?.payload?.role
        },
        logout: (state) => {
            state._id = "";
            state.name = "";
            state.phone = "";
            state.avatar = "";
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload;
        },
        setOnlineUser: (state, action) => {
            state.userOnline = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {setUser, logout, setOnlineUser, setSocketConnection} =
    userSlice.actions;

export default userSlice.reducer;
