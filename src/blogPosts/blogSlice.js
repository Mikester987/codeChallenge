import { createSlice } from '@reduxjs/toolkit';
import NewPostForm from './NewPostForm';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    postsArray: [],
    isLoading: true,
    errMsg: ''
};

export const fetchPosts = createAsyncThunk(
    async () => {
        const response = await fetch('https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

export const fetchPost = createAsyncThunk(
    async (postId) => {
        const response = await fetch('https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba/' + postId);
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

export const addNewPost = createAsyncThunk(
    async (post = NewPostForm(post.title, post.text, post.timestamp), {dispatch}) => {
        const response = await fetch(
            'https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba',
            object(method='POST', body=JSON.stringify(post), headers={'Content-Type':'application/json'})
            );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addPost(data));
    }
);

export const updatePost = createAsyncThunk(
    async (post = NewPostForm(post.title, post.text, post.timestamp), {dispatch}) => {
        const response = await fetch(
            'https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba/' + post.id,
            object(method='PUT', body=JSON.stringify(post), headers={'Content-Type':'application/json'})
            );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addPost(data));
    }
);

export const deletePosts = createAsyncThunk(
    async ({dispatch}) => {
        const response = await fetch(
            'https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba/',
            object(method='DELETE', headers={'Content-Type':'application/json'})
            );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addPost(data));
    }
);

export const deleteOnePost  = createAsyncThunk(
    async (postId, {dispatch}) => {
        const response = await fetch(
            'https://us-central1-mbtcandidate.cloudfunctions.net/posts/mbarba/' + postId,
            object(method='DELETE', headers={'Content-Type':'application/json'})
            );
        if (!response.ok) {
            return Promise.reject(response.status);
        }
        const data = await response.json();
        dispatch(addPost(data));
    }
);

const blogSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            const newPost = {
                ...action.payload
            };
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.postsArray = (action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [addNewPost.reject]: (state, action) => {
            alert(
                'Your post could not be posted/nError:' +
                (action.error ? action.error.message : 'Fetch failed')
            )
        }}
    });



export const postsReducer = blogSlice.reducer;

export const { addPost } = blogSlice.actions;