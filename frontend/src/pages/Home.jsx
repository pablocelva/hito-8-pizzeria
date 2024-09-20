import { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../components/Header'
import CardPizza from '../components/CardPizza'
import { CartContext } from '../context/CartContext'
import { PizzaContext } from '../context/PizzaContext'
//import Cart from './Cart'

export default function Home() {
    const { agregarAlCarrito } = useContext(CartContext)
    const { pizzas, error } = useContext(PizzaContext)
    
    return (
        <>
            <Header/>
            <Container fluid className="productos my-5 border-warning">
                {error && <p>Error: {error}</p>}
                <Row className="cards d-flex margin-cards">
                    {pizzas.map((pizza, index) => (
                        <Col key={index} xs={12} sm={6} lg={4} className="d-flex justify-content-center">
                            <CardPizza
                                id={pizza.id}
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                                onAddToCart={() => agregarAlCarrito(pizza)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* <Cart 
                cart={cart}
                onSuma={sumarCantidad}
                onResta={restarCantidad}
            /> */}
        </>
    )
}
