import React from "react";
import sprite from "../assets/sprite.svg";

const Banner = () => {
	return (
		<div className="banner">
			<svg className="banner__icon-user">
				<use href={`${sprite}#icon-switch_account`}></use>
			</svg>
			<h1 className="banner__heading">Account Manager</h1>
		</div>
	);
};

export default Banner;
