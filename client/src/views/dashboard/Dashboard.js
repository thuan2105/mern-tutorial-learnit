import { useContext, useEffect } from 'react';
import { Button, Card, Spinner, Row, Col, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import { PostContext } from '~/contexts/postContext';
import { AuthContext } from '~/contexts/authContext';
import SinglePost from '~/components/posts';
import AddPostModal from '~/components/posts/AddPostModal';
import UpdatePostModal from '~/components/posts/UpdatePostModal';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Dashboard = () => {
    // Contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);
    const {
        postState: { post, posts, postLoading },
        showToast: { show, message, type },
        setShowToast,
        getPosts,
        setShowAddPostModal,
    } = useContext(PostContext);

    // Start: Get all posts
    useEffect(() => {
        const fetchData = async () => {
            const response = await getPosts();
            return response;
        };
        fetchData();
        // eslint-disable-next-line
    }, []);
    let body = null;

    if (postLoading) {
        body = (
            <div className={cx('spinner-container')}>
                <Spinner variant="info" animation="border" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <Card className={cx('text-center mx-5 my-5')}>
                <Card.Header as="h1">Hi {username}</Card.Header>
                <Card.Body>
                    <Card.Title className={cx('title')}>Welcome to learnIt</Card.Title>
                    <Card.Text>Click the button below to trash your first skill to learn</Card.Text>
                    <Button className={cx('btn')} variant="primary" onClick={setShowAddPostModal.bind(this, true)}>
                        LearnIt!
                    </Button>
                </Card.Body>
            </Card>
        );
    } else {
        body = (
            <>
                <Row className={cx('row-cols-1 row-cols-md-3 g-4 mx-auto mt-3')}>
                    {posts.map((post) => (
                        <Col key={post._id} className={cx('my-2')}>
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>

                {/* Open add post modal */}
                <OverlayTrigger
                    delay={{ show: 250, hide: 300 }}
                    placement="left"
                    overlay={<Tooltip>Add a new thing to learn.</Tooltip>}
                >
                    <Button className={cx('btn-floating')} onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={images.plusCircleFill} alt="add-post" />
                    </Button>
                </OverlayTrigger>
            </>
        );
    }

    return (
        <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}

            {/* After post is added, show Toast */}
            <Toast
                show={show}
                style={{ position: 'fixed', top: '10%', right: '10px', width: '200px' }}
                className={cx(`bg-${type} text-white`)}
                onClose={setShowToast.bind(this, { show: false, message: '', type: null })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong className={cx('content')}>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    );
};

export default Dashboard;
