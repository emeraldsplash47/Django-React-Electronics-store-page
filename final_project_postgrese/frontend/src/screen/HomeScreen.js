// import React, {useState, useEffect} from 'react'
// import { Row, Col } from 'react-bootstrap'
// import Product from '../component/Product'
// import axios from 'axios'



// function HomeScreen() {
//   const [products, setProducts] = useState([])

//   useEffect(() => {
//       async function fetchProducts(){

//         const {data} = await axios.get('/api/products/')
//         setProducts(data)

//       }

//       fetchProducts()

//   }, [])

//   return (
//     <div>
//       <h1>Latest Products</h1>
//       <Row>
//         {products.map(product => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//             </Col>
//         ))}
//       </Row>
//     </div>
//   )
// }

// export default HomeScreen



import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction'
import { useSearchParams, useNavigate } from 'react-router-dom';




function HomeScreen({ history }) {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products } = productList

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get('keyword');
  console.log(keyword)

  useEffect(() => {

    dispatch(listProducts(keyword));
  }, [dispatch, searchParams]);


  return (
    <div>
      <h1>Welcome</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products && products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default HomeScreen
