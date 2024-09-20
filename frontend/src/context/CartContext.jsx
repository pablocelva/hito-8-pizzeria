import { createContext, useState } from "react";
import { pizzaCart } from '../data/pizzas'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    
    // Calcular el total sumando el precio de cada producto multiplicado por su cantidad
    const total = cart?.reduce((acc, item) => acc + (item.price * item.count), 0) || 0

    const agregarAlCarrito = (pizza) => {
        const existingPizza = cart.find(item => item.name === pizza.name)
        if (existingPizza) {
            setCart(cart.map(item =>
                item.name === pizza.name
                    ? { ...item, count: item.count + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { ...pizza, count: 1 }])
        }
    }

    const sumarCantidad = (index) => {
        const newCart = [...cart]
        newCart[index].count += 1
        setCart(newCart)
    }

    const restarCantidad = (index) => {
        const newCart = [...cart]
        if (newCart[index].count > 1) {
            newCart[index].count -= 1
        } else {
            newCart.splice(index, 1)
        }
        setCart(newCart)
    }

    return (
        <CartContext.Provider value={{ cart, setCart, total, agregarAlCarrito, sumarCantidad, restarCantidad }}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider