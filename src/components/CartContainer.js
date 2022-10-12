import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import CartItems from "./CartItems";

const CartContainer = () => {
	const dispatch = useDispatch();
	const { cartItems, total, amount } = useSelector((store) => store.cart);

	return (
		<>
			{amount < 1 ? (
				<section className="cart">
					<header>
						<h2>Your bag</h2>
						<h4 className="empty-cart">is currently empty</h4>
					</header>
				</section>
			) : (
				<div>
					<section className="cart">
						<header>
							<h2>your bag</h2>
						</header>
						<div>
							{cartItems.map((cartItem) => (
								<CartItems key={cartItem.id} {...cartItem}></CartItems>
							))}
						</div>
						<footer>
							<hr />
							<div className="cart-total">
								<h4>
									total <span>${total.toFixed(2)}</span>
								</h4>
							</div>
							<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
								Clear cart
							</button>
						</footer>
					</section>
				</div>
			)}
		</>
	);
};

export default CartContainer;
