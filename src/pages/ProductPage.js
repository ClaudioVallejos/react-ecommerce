import React, { useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {ShopContext} from '../context/shopContext'
import { Text, Div, Button, Row, Col, Container, Icon } from 'atomize'

const ProductPage = () => {

    // obteniendo el parametro /product/${product.id} del url
    let { id } = useParams();

    //seleccionamos las funciones que utilizaremos del contexto
    const { fetchProductWithId, addItemToCheckout, product, openCart} = useContext(ShopContext)

    useEffect(() => {
        fetchProductWithId(id)
        return () => {
        }
    }, [fetchProductWithId, id])

    if (!product.title) return <div> Loading... </div>

    return (

        <div>
           <Container>
               <Row>
                   <Col>
                        <Div bgImg= { product.images[0].src} bgSize="cover" bgPos="center center" h="40rem" />
                   </Col>

                   <Col>
                        <Text> {product.title} </Text>
                        <Text> ${product.variants[0].price} </Text>
                        <Button
                            onClick={ () =>{ addItemToCheckout(
                                    product.variants[0].id, 1)
                                    openCart()
                                    }}>Lo quiero<Icon name="Bag" color="white" size="20px"/>
                            </Button>
                            
                   </Col>
               </Row>
           </Container>
        </div>
    )
}

export default ProductPage
