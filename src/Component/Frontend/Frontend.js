import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Instance from "../../Instance";

const Frontend = () => {
	const [blogData, setBlogData] = useState(null);
	const history = useHistory();

	useEffect(() => {
		Instance.get(`/api-get-approved-blog`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("userData", data);
				setBlogData(data?.data);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
			});
	}, []);

	return (
		<>
			<div className='d-flex flex-row p-0 justify-content-end align-items-center mt-5 mr-4'>
				<button
					type='submit'
					className='themeButton loginButton mr-2'
					onClick={() => history.push("/admin/login")}>
					Admin Log In
				</button>
				<button
					type='submit'
					className='themeButton loginButton'
					onClick={() => history.push("/login/content")}>
					Content Log In
				</button>
			</div>
			<div className='row mx-0'>
				{blogData &&
					blogData.map((value, i) => (
						<div className=' d-flex justify-content-center mt-5 ml-4' key={i}>
							<div
								className='card w-100 loginCard'
								style={{ maxWidth: "400px" }}>
								<h2>{value.blogTitle}</h2>
								<img
									src={`https://sdccrudbackend.herokuapp.com/Images/${value.blogImage}`}
									className='card-img-top'
									alt='...'
									style={{ height: "100px", width: "200px" }}
								/>
								<div className='card-body text-left'>
									{value.blogDescription}
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Frontend;
