import { useContext, useEffect, useState } from 'react'
import { Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import { PizzaContext } from '../context/PizzaContext'
import { useParams } from 'react-router-dom'

export const Pizza = () => {
    const { agregarAlCarrito } = useContext(CartContext)
    const { getPizza, pizzas, error } = useContext(PizzaContext)
    const { id } = useParams()
    const [selectedPizza, setSelectedPizza] = useState(null);

    useEffect(() => {
        const fetchPizza = async () => {
            const pizza = await getPizza(id);
            setSelectedPizza(pizza);
        };
        fetchPizza();
    }, [id, getPizza]);

    return (
    <>
        {error ? (
            <p>Error:{error}</p>
        ) : (
            selectedPizza ? (
                <Card 
                className="pizza-page mx-auto my-5 p-3" 
                style={{ maxWidth: '1200px' }}
                >
                    <Row>
                        {/* Imagen a la izquierda */}
                        <Col md={6}>
                            <Card.Img
                            src={selectedPizza.img} 
                            alt={selectedPizza.name}
                            
                            />
                        </Col>

                        {/* Contenido a la derecha */}
                        <Col md={6}>
                            <Card.Body>
                                <Card.Title>🍕 Pizza {selectedPizza.name || "Nombre del producto"}</Card.Title>
                                <Card.Text>
                                {selectedPizza.desc || "Descripción del producto"}
                                </Card.Text>

                                {/* Lista de ingredientes */}
                                {selectedPizza.ingredients && (
                                <ListGroup variant="flush">
                                    {selectedPizza.ingredients.map((ingredient, index) => (
                                    <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                                )}

                                {/* Precio y botón */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                <h4>Precio: ${selectedPizza.price || "Precio"}</h4>
                                <Button variant="dark" onClick={() => agregarAlCarrito(selectedPizza)}>Añadir al carrito</Button>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <p>Pizza no encontrada</p>
            )
        )}
    </>
    )
}