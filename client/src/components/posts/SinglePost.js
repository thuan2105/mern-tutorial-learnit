import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './SinglePost.module.scss';
import ActionButton from './ActionButton';

const cx = classNames.bind(styles);
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    return (
        <Card
            className={cx('shadow')}
            border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col sm={8}>
                            <p className={cx('post-title')}>{title}</p>
                            <Badge
                                className={cx('badge')}
                                pill
                                bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}
                            >
                                {status}
                            </Badge>
                        </Col>
                        <Col sm={4}>
                            <ActionButton url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text className={cx('description')}>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
