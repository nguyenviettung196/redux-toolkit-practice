import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems, dispatch]);
	useEffect(() => {
		dispatch(getCartItems());
	}, [dispatch]);

	return (
		<>
			{isLoading ? (
				<div className="loading">
					<h2>Loading...</h2>
				</div>
			) : (
				<>
					{isOpen && <Modal />}
					<Navbar />
					<CartContainer />
				</>
			)}
		</>
	);
}
export default App;
