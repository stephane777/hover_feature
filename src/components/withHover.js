import React from "react";
import PropTypes from "prop-types";

export function withHover(UserComponent) {
	return class WithHover extends React.Component {
		constructor(props) {
			super(props);

			this.props = props;
		}
		state = { hovering: false };

		handleMouseEnter = (e) => {
			return this.setState({ hovering: true });
		};
		handleMouseLeave = (e) => {
			return this.setState({ hovering: false });
		};
		render() {
			// console.log(UserComponent.name);
			const userProps = {
				hover: this.state.hovering,
				...this.props,
			};
			return (
				<div
					className={
						UserComponent.name === "UserCard" ? "userCard" : "userList"
					}
					// className="toto"
					onMouseLeave={this.handleMouseLeave}
					onMouseEnter={this.handleMouseEnter}
				>
					<UserComponent {...userProps} />
				</div>
			);
		}
	};
}
