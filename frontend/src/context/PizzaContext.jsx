import { createContext, useState, useEffect } from "react";
import { pizzas as localPizzas } from '../data/pizzas'

export const PizzaContext = createContext()

const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([])
    const [pizza, setPizza] = useState({})
    const [error, setError] = useState(null)
    
    const getPizzas = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas"
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            setPizzas(data)

        } catch (err) {
            setError(err.message)
            setPizzas(localPizzas)
        }
    }
    
    const getPizza = async (id) => {
        try {
            const url = `http://localhost:5000/api/pizzas/${id}`
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            return data

        } catch (err) {
            setError(err.message)
            return localPizzas.find(p => p.id === id)
        }
    }

    useEffect(() => {
        getPizzas()
    }, [])

    return (
        <PizzaContext.Provider value={{ pizzas, setPizzas, error, setError, pizza, setPizza, getPizza }}>
            {children}
        </PizzaContext.Provider>
    )
}

export default PizzaProvider