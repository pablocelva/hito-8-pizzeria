import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [email, setEmail] = useState(null)
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState(null)

    //Método para login
    const handleLogin = async (loginData) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            })
            const data = await response.json()

            if (response.ok) {
                setToken(data.token)
                setEmail(data.email)
                localStorage.setItem("token", data.token)
            } else {
                setError(data.error || "Login fallido")
            }
        } catch (err) {
            setError("Ha ocurrido un error dutante el login")
        }
    }

    //Método para Registro
    const handleRegister = async (registerData) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            })
            const data = await response.json()

            if (response.ok) {
                setToken(data.token)
                setEmail(data.email)
                localStorage.setItem("token", data.token)
            } else {
                setError(data.error || "Registro fallido")
            }
        } catch (err) {
            setError("Ha ocurrido un error durante el registro")
        }
    }

    //Método para Logout
    const handleLogout = () => {
        setToken(null)
        setEmail(null)
        setProfile(null)
        localStorage.removeItem("token")
    }

    //Método para obtener perfil autenticado
    const fetchProfile = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()

            if (response.ok) {
                setProfile(data)
            } else {
                setError(data.error || "Falla al llamar al perfil")
            }
        } catch (err) {
            setError("Ha ocurrido un error con el llamado del perfil")
        }
    }

    return (
        <UserContext.Provider value={{ token, email, profile, error, setToken, handleLogin, handleRegister, handleLogout, fetchProfile }}>
            {children}
        </UserContext.Provider>
    )
}
