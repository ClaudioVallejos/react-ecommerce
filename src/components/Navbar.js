import React, {useContext, useEffect} from 'react'
import { Container, Anchor, Icon, Button, Text } from 'atomize'
import { Link } from 'react-router-dom'

//importando contexto
import { ShopContext } from '../context/shopContext'

const Navbar = () => {

    const {openCart} = useContext(ShopContext)

    return (
        <Container d="flex" color="black" flexDir="Row" p="2rem" justify="space-between">
            <Link to="/">
                <Button bg="white"><Icon name="Home" color="black" size="20px" /> </Button>    
            </Link>
            <Anchor onClick={ () => openCart()}>
                <Button bg="pink ">Carro
                <Icon name="Bag" color="white" size="20px" />
                </Button>
            </Anchor>
        </Container>
    )
}

export default Navbar;