import { useState } from "react"
import userServices from "../services/userServices";


const Register = () => {

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
         userServices.register(formData).then(data=> console.log(data))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={formData.email} name="email" onChange={handleChange} />
            <input type="password" value={formData.password} name="password" onChange={handleChange}/>
            <input type="submit" />
        </form>
    )
}


export default Register