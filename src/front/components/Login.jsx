import { useState } from "react"
import userServices from "../services/userServices";
import useGlobalReducer from "../hooks/useGlobalReducer";


const Login = () => {
    const {store, dispatch} = useGlobalReducer()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
         userServices.login(formData).then(data=> {
            if (data.success){
                //en localStorage la info persiste aunque se cierre el navegador o se recargue la pagina
                localStorage.setItem('token', data.token)
                dispatch({type:"user_logged_in"})
            }
         })
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={formData.email} name="email" onChange={handleChange} />
            <input type="password" value={formData.password} name="password" onChange={handleChange}/>
            <input type="submit" />
        </form>
    )
}


export default Login