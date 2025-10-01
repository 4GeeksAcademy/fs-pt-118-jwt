import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<Link to="/register">
					<span className="navbar-brand mb-0 h1">register</span>
				</Link>
				<Link to="/login">
					<span className="navbar-brand mb-0 h1">login</span>
				</Link>
				{store.auth && <Link to="/private">
					<span className="navbar-brand mb-0 h1">private</span>
				</Link>}
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};