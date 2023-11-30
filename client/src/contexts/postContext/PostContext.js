import { createContext, useReducer, useState } from 'react';
import { postReducer } from '~/reducers/postReducer';
import * as postService from '~/Services/postService';
import {
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    FIND_POST,
} from '~/Services/constants';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });

    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true,
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const response = await postService.getPosts();
            if (response.success) {
                dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.posts });
            }
        } catch (error) {
            dispatch({ type: POSTS_LOADED_FAIL });
        }
    };

    // Add post
    const addPost = async (newPost) => {
        const response = await postService
            .sendPost(newPost)
            .then((response) => {
                dispatch({ type: ADD_POST, payload: response.post });
                return response;
            })
            .catch((error) => (error.response ? error.response : { success: false, message: 'Server error' }));

        return response;
    };

    //
    const findPost = (postId) => {
        const post = postState.posts.find((post) => post._id === postId);
        dispatch({ type: FIND_POST, payload: post });
    };

    // Update post
    const updatePost = async (updatedPost) => {
        const response = await postService
            .updatePost(updatedPost._id, updatedPost)
            .then((response) => {
                if (response.success) {
                    dispatch({ type: UPDATE_POST, payload: response.post });
                }
                return response;
            })
            .catch((error) => (error.response ? error.response : { success: false, message: 'Server error' }));
        return response;
    };

    // Delete post
    const deletePost = async (postId) => {
        await postService
            .deletePost(postId)
            .then((response) => {
                if (response.success) {
                    dispatch({ type: DELETE_POST, payload: postId });
                }
            })
            .catch((error) => console.log(error));
    };

    // Post context data
    const postContextData = {
        postState,
        showToast,
        setShowToast,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        getPosts,
        addPost,
        findPost,
        updatePost,
        deletePost,
    };
    return <PostContext.Provider value={postContextData}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
