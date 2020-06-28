import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import { Div, SideDrawer, Icon, Text, Col, Row, Button, Anchor } from 'atomize'

const Cart = () => {

    const { isCartOpen, closeCart, checkout } = useContext(ShopContext)
    
    return (
        <SideDrawer bg="pink" isOpen={isCartOpen} onClose= {closeCart} >
                <Div d="flex" m= {{b:"4rem"}} >
                    <Icon name="Bag" color="#01B0BB"/>
                    <Text p= {{l: "0.5rem", t:"0.25rem"}} color="#01B0BB" >Carrito de compras</Text>
                </Div> 
                <Div d="flex" flexDir="Column" m= {{ b:"4rem"}} >
                    
                    {checkout.lineItems && checkout.lineItems.map(item => (
                        
                            <Row key={item.id}>
                                <Col>
                                    <Div bgImg={item.variant.image.src} bgSize="cover" bgPos="center center" h="5rem" w="4rem"/>
                                </Col>
                                <Col>
                                    <Text>{item.title}</Text>
                                    <Text>{item.variant.title}</Text>
                                    <Text>{item.quantity}</Text>
                                </Col>
                                <Col>
                                    <Text> {item.variant.price} </Text>
                                </Col>
                            </Row>
                       
                    ))}
                </Div>
                <Div d="flex" justify="flex-end">
                    <Button
                        onClick= {closeCart}
                        bg="pink"
                        textColor="White"
                        m={{r:"1rem"}}
                    >
                    Cancelar
                    </Button>    
                    <Anchor textColor="Black" href={checkout.webUrl} target="_blank">Pagar <Icon name="Card" bg="#B2B3A1" size="20px"/></Anchor>
                </Div>
            </SideDrawer>
    )
}

export default Cart