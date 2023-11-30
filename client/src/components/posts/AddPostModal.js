import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import classNames from 'classnames/bind';

import { PostContext } from '~/contexts/postContext';
import styles from './SinglePost.module.scss';

const cx = classNames.bind(styles);
const AddPostModal = () => {
    // Contexts
    const { showAddPostModal, setShowAddPostModal, setShowToast, addPost } = useContext(PostContext);

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    const onChangeNewPostForm = (e) => setNewPost({ ...newPost, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const { success, message } = await addPost(newPost);
        resetAddPostData();
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' });
    };

    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setShowAddPostModal(false);
    };

    const closeDialog = () => {
        resetAddPostData();
    };
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title className={cx('header')}>What do you want to learn ?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className={cx('input')}
                            type="text"
                            placeholder="Youtube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
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

export default AddPostModal;
