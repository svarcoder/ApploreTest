import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Instance from "../../Instance";

const Header = () => {
	const history = useHistory();

	const HandleLogout = () => {
		localStorage.removeItem("token$");
		return history.push("/");
	};

	const [oneview, setOneView] = useState(null);

	useEffect(() => {
		Instance.get(`/api-single-user-view`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("user", data);
				setOneView(data?.userData);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
			});
	}, []);

	return (
		<>
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<h2 className='text-left ml-4'>Dashboard</h2>
					<div className='card-body'>
						<nav
							className='navbar navbar-expand-lg navbar-light '
							style={{ backgroundColor: "#e3f2fd" }}>
							<Link className='navbar-brand' to='/admin/dashboard'>
								Home
							</Link>
							{oneview?.role === "Admin" ? (
								<Link className='navbar-brand' to='/view/content'>
									Content-Writer
								</Link>
							) : (
								""
							)}
							<Link className='navbar-brand' to='/view/blog'>
								Blog
							</Link>
							<div className='form-inline my-2 my-lg-0'>
								<Link
									to='#'
									className='navbar-brand text-right'
									onClick={(e) => HandleLogout(e)}>
									Log Out
								</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
