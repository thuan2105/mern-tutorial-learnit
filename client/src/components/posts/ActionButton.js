import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import images from '../../assets/images';
import classNames from 'classnames/bind';

import { PostContext } from '~/contexts/postContext';
import styles from './SinglePost.module.scss';

const cx = classNames.bind(styles);

const ActionButton = ({ url, _id }) => {
    const { setShowUpdatePostModal, deletePost, findPost } = useContext(PostContext);

    const choosePost = (postId) => {
        findPost(postId);
        setShowUpdatePostModal(true);
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Button className={cx('post-button')} href={url} target="_blank">
                    <img className={cx('icon')} src={images.playBtn} alt="play" />
                </Button>
                <Button className={cx('post-button')}>
                    <img className={cx('icon')} src={images.pencil} alt="play" onClick={choosePost.bind(this, _id)} />
                </Button>
                <Button className={cx('post-button')} onClick={deletePost.bind(this, _id)}>
                    <img className={cx('icon')} src={images.trash} alt="play" />
                </Button>
            </div>
        </>
    );
};

export default ActionButton;
