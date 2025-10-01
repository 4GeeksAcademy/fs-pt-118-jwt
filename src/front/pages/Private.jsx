import { useEffect } from "react"
import userServices from "../services/userServices"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

const Private = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate()
    useEffect(() => {
        userServices.private().then(data => {
     
            if (!data) navigate('/login')
            dispatch({
                type: "save_user",
                payload: data.data
            })
        })
    }, [])

    const handleLogout = () => {
        dispatch({type:"user_logged_out"})
        navigate('/')
    }

    return (
        <>
        <h1>This is private!</h1>
        <h2>only for the eyes of {store.user?.email}</h2>
        <button onClick={handleLogout}>log out</button>
        </>

    )

}

export default Private