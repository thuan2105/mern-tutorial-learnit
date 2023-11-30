import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import { PostContext } from '~/contexts/postContext';
import styles from './SinglePost.module.scss';

const cx = classNames.bind(styles);
const UpdatePostModal = () => {
    // Contexts
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        setShowToast,
        updatePost,
    } = useContext(PostContext);

    // State
    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => {
        setUpdatedPost(post);
    }, [post]);

    const { title, description, url, status } = updatedPost;

    const onChangeUpdatedPostForm = (e) => setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };

    // const resetAddPostData = () => {
    //     setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
    //     setShowAddPostModal(false);
    // };

    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };
    return (
        // onHide={closeDialog}
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title className={cx('header')}>Making process !</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className={cx('form-group')}>
                        <Form.Control
                            className={cx('input')}
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className={cx('form-group')}>
                        <Form.Control
                            className={cx('input')}
                            as="textarea"
                            rows={3}
                            type="text"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className={cx('form-group')}>
                        <Form.Control
                            className={cx('input')}
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Select
                            className={cx('select')}
                            name="status"
                            value={status}
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option>Open this select menu</option>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={cx('btn')} variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button className={cx('btn')} variant="primary" type="submit">
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;
