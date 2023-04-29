// import React, {useState, useEffect} from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap' 
// import  Rating  from '../component/Rating'
// import axios from 'axios'

// function ProductScreen() {
//     const {id} = useParams();
//     const [product, setProduct] = useState([])

//     useEffect(() => {
//         async function fetchProduct(){

//           const {data} = await axios.get(`/api/products/${id}`)
//           setProduct(data)

//         }
//         fetchProduct()
//     }, [])
//     return (
//         <div>
//             <Link to='/' className='btn btn-light my-3'>Go BacK</Link>
//             <Row>
//                 <Col md={6}>
//                     <Image src={product.image} alt={product.name} fluid />
//                 </Col>
//                 <Col md={3}>
//                     <ListGroup variant='flush'>
//                         <ListGroup.Item>
//                             <h3>{product.name}</h3>
//                         </ListGroup.Item>

//                         <ListGroup.Item>
//                             < Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`} />
//                         </ListGroup.Item>

//                         <ListGroup.Item>
//                             Price: ${product.price}
//                         </ListGroup.Item>

//                         <ListGroup.Item>
//                             Description: {product.description}
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </Col>  


//                 <Col md={3}>
//                     <Card>
//                         <ListGroup variant='flush'>
//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>
//                                         Price: 
//                                     </Col>
//                                     <Col>
//                                         <strong>${product.price}</strong>
//                                     </Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroup.Item>
//                                 <Row>
//                                     <Col>
//                                         Status 
//                                     </Col>
//                                     <Col>
//                                         {product.countInStock > 0 ? 'In Stock' : "Out of Stock"}
//                                     </Col>
//                                 </Row>
//                             </ListGroup.Item>

//                             <ListGroupItem>
//                                 <Button className='btn-block' disabled={product.countInStock === 0} type='button'>
//                                     Add to Cart
//                                 </Button>
//                             </ListGroupItem>
//                         </ListGroup>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default ProductScreen



import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../component/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetail, createProductReview } from '../action/productAction'

function ProductScreen() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { id } = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate



    useEffect(() => {
        // if (successProductReview) {
        //     setRating(0)
        //     setComment('')
        //     dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        // }

        dispatch(listProductDetail({ id }))

    }, [dispatch, id, successProductReview])

    const navigate = useNavigate()

    const addToCartHandler = () => (
        navigate(`/cart/${id}?qty=${qty}`)
    )

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            { id }, {
            rating,
            comment
        }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <h2>Loading</h2>
                : error
                    ? <h2>{error}</h2>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>


                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${product.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>


                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        <strong>${product.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}


                                            <ListGroup.Item>
                                                <Button
                                                    onClick={addToCartHandler}
                                                    className='btn-block'
                                                    disabled={product.countInStock === 0}
                                                    type='button'>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {product.reviews.length === 0 && <h2>No Message</h2>}

                                    <ListGroup variant='flush'>
                                        {product.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825' />
                                                <p>{review.createdAt.substring(0, 10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))}

                                        <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingProductReview && <h2>Loading</h2>}
                                            {successProductReview && <h2>Review Submitted</h2>}
                                            {errorProductReview && <h2>{error}</h2>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Select

                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                <h2 variant='info'>Please <Link to='/login'>login</Link> to write a review</h2>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}

export default ProductScreen
