import React, { Component } from 'react'
//importando cliente de shopify
import Client from 'shopify-buy'

const ShopContext = React.createContext();

const client = Client.buildClient({
    domain: 'graphql.myshopify.com',
    storefrontAccessToken: 'dd4d4dc146542ba7763305d71d1b3d38'
})

class ShopProvider extends Component {
    state ={
        products: [],
        product: {},
        checkout: {},
        isCartOpen: false
    }

    componentDidMount() {
      //  this.createCheckOut();

        //verificamos si existe un checkout creado
        if(localStorage.checkout_id){
            this.fetchCheckout(localStorage.checkout_id)
        }else{
            this.createCheckOut();
        }
        //si no hay un checkout en el local storage creamos un nuevo checkout
    }

    createCheckOut = async () => {
        const checkout = await client.checkout.create()
        localStorage.setItem("checkout_id", checkout.id)
        this.setState({checkout: checkout})
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout.fetch(checkoutId).then((checkout) => {
            this.setState({ checkout: checkout})
        }).catch((err => console.log(err)))
    }

    addItemToCheckout = async (variantId, quantity) => {
        const LineItemsToAdd = [{
            variantId,
            quantity: parseInt(quantity, 10)
        }]

        const checkout = await client.checkout.addLineItems(this.state.checkout.id, LineItemsToAdd)
        this.setState({checkout: checkout})
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll()
        this.setState({products: products})
    }

    fetchProductWithId = async (id) => {
        const product = await client.product.fetch(id)
        this.setState({product: product})
    }

    closeCart = async () => {
        this.setState({isCartOpen: false})
    }

    openCart = async () => {
        this.setState({isCartOpen: true})
    }


    //retornando las funciones de la clase para que los otros componentes hijos puedan acceder a ellas
    render() {
        return (
            <ShopContext.Provider value={{
                ... this.state,
                fetchAllProducts: this.fetchAllProducts,
                fetchProductWithId: this.fetchProductWithId,
                closeCart: this.closeCart,
                openCart: this.openCart,
                addItemToCheckout: this.addItemToCheckout
                }}>
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}
//creando un consumidor de la tienda 
const ShopConsumer = ShopContext.ShopConsumer

//xportando el contexto
export {ShopConsumer, ShopContext}

export default ShopProvider;