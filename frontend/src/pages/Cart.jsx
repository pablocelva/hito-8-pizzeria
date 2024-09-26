import { useState, useContext } from 'react'
import { pizzaCart } from '../data/pizzas'
import {Card, Button, Container} from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'


export default function Cart() {
    const { cart, setCart, total, agregarAlCarrito, sumarCantidad, restarCantidad } = useContext(CartContext)
    const { token } = useContext(UserContext)  
    const [successMessage, setSuccessMessage] = useState('')  

    const handleCheckout = async () => {
        console.log({ cart, total })
        try {
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ cart, total }),
            })

            if (response.ok) {
                setSuccessMessage('🍕 Compra realizada con éxito! ✨')
                setCart([])
            } else {
                const errorData = await response.json()
                setSuccessMessage(`Error: ${errorData.message}`)
            }
        } catch (error) {
            setSuccessMessage('Ocurrió un error al procesar la compra.')
        }
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className='cart'>
                <Card.Header>
                    <Card.Title className='text-center p-2'>Carrito de Compras 🛒</Card.Title>
                </Card.Header>
                <Card.Body className='text-center'>
                    {/* <Card.Subtitle>Ingredientes:</Card.Subtitle> */}
                    {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={item.name + index} className='cart-producto d-flex justify-content-between align-items-center my-2'>
                                    <div className="info-cart text-start">
                                        <h6>🍕 Pizza {item.name}</h6>
                                        <p>Precio: ${item.price.toLocaleString()}</p>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <p>Cantidad: {item.count}</p>
                                            <Button variant="outline-dark" size="sm" onClick={() => sumarCantidad(index)}>+</Button>
                                            <Button variant="outline-dark" size="sm" onClick={() => restarCantidad(index)}>-</Button>
                                        </div>
                                    </div>
                                    <img src={item.img} alt="Imagen producto" />
                                </div>
                            ))
                        ) : (
                            <p>El carrito está vacío.</p>
                        )}
                        {successMessage && <p className='text-success'>{successMessage}</p>}
                </Card.Body>
                <Card.Footer className='p-3'>
                    <Card.Title className='text-center'>Total: ${total.toLocaleString()}</Card.Title>
                    <div className="card-btn d-flex gap-2 justify-content-around">
                        <Button 
                        variant="dark"
                        disabled={!token}
                        onClick={handleCheckout}
                        >
                            Pagar 🛒
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    )
}
