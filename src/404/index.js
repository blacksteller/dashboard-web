import React from "react";
import { Link } from "react-router-dom";

function Page404() {
	return (
		<>
			<div className="w-full h-full bg-transparent flex items-center justify-center">
				{/* Centered Grids */}
				<div className="h-auto grid justify-items-center gap-14">
					{/* Penguin GIF Image */}
					<img
						src="/images/404/penguin-hi-404.gif"
						alt="penguin-hi-404"
						className="w-52 h-auto flex items-center justify-center"
					/>

					<div className="h-auto grid gap-6">
						{/* 404 Large Heading */}
						<div className="flex items-center gap-5">
							<div className="heading-404">404</div>
							<div className="text-5xl text-gray-700 font-robotoUIBlack">
								Page Not Found
							</div>
						</div>

						{/* Back To HomePage Button */}
						<div className="h-auto grid gap-2 justify-items-center">
							<p>
								<span className="text-gray-800 font-robotoUIMedium">Hey,</span>{" "}
								<span className="text-gray-700 capitalize text-sm">
									You got lost{" "}
								</span>
							</p>

							{/* Link to HomePage */}
							<Link
								to={"/"}
								className="h-11 px-10 rounded-xl bg-rose-500 text-white flex items-center justify-center">
								<span>Let me guide you 🥰</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page404;
