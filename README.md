
# Redux toolkit

## 1.Setup
In `/src` create file `store.js`,in `store.js` create `store`
```js
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {},
});

```
In `index.js` import `store` from `store.js` and `Provider` from `@react-redux`
```js
import { store } from "./store";
import { Provider } from "react-redux";
```
Wrapper `<App/>` into `<Provider>` and add `store` Provider's props equal `store`
```js

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

```
## 2.Create First Slice
In `/src` create folder `/features/cart`,at folder `cart` create `cartSlice .js`.
In `cartSlice.js`,import `createSlice` receive an obj have 2 argument `name` and `initialState`
```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
	amout: 0,
	total: 0,
	isLoading: true,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
});

export default cartSlice.reducer;
```
In `store.js` import `cartSlice` as `cardReducer`
```js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
	reducer: {
		cart: cartReducer,
	},
});

```
## 3. Access data from Slice
In `src` add folder `/components`.at components folder create file `Navbar.js`,add some jsx
```js
import React from "react";
import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
	return (
		<nav>
			<div className="nav-center">
				<h3>redux toolkit</h3>
				<div className="nav-container">
					<CartIcon />
					<div className="amount-container">
						<p className="total-amount">0</p>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
```
Import `useSelector` from `react-redux`,use it to access data from `cartReducer`

```js
import { useSelector } from "react-redux";

const Navbar = () => {
	const { amount } = useSelector((store) => store.cart);// .cart from store.js reducer
	return (
		<nav>
			<div className="nav-center">
				<h3>redux toolkit</h3>
				<div className="nav-container">
					<CartIcon />
					<div className="amount-container">
						<p className="total-amount">{amount}</p>
					</div>
				</div>
			</div>
		</nav>
	);
};
```
## 4.Mock API data
Mock data in `cartItems.js`
```js
const cartItems = [
  {
    id: 'rec1JZlfCIBOPdcT2',
    title: 'Samsung Galaxy S8',
    price: '399.99',
    img: 'https://dl.airtable.com/.attachments/64b266ad865098befbda3c3577a773c9/24497852/yedjpkwxljtb75t3tezl.png',
    amount: 1,
  },
  {
    id: 'recB6qcHPxb62YJ75',
    title: 'google pixel',
    price: '499.99',
    img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
    amount: 1,
  },
  {
    id: 'recdRxBsE14Rr2VuJ',
    title: 'Xiaomi Redmi Note 2',
    price: '699.99',
    img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
    amount: 1,
  },
  {
    id: 'recwTo160XST3PIoW',
    title: 'Samsung Galaxy S7',
    price: '599.99 ',
    img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
    amount: 1,
  },
];

export default cartItems;

```
In `cartSlice.js` import `cartItems`,add `cartItems` to `initialState`
```js
import cartItems from "../../cartItems";

const initialState = {
	cartItems: cartItems,
	amount: 0,
	total: 0,
	isLoading: true,
};
```
## 5.Create Cart container and Cart Item components
Create `CartContainer.jsx` and add this component to `App.js`
```js
import React from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";

const CartContainer = () => {
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
									total <span>${total}</span>
								</h4>
							</div>
							<button className="btn clear-btn">Clear cart</button>
						</footer>
					</section>
				</div>
			)}
		</>
	);
};

export default CartContainer;
```
Create `CartItem.jsx` to show detail data about item cart
```js
import React from "react";
import { ChevronUp, ChevronDown } from "../icons";

const CartItems = ({ id, img, title, price, amount }) => {
	return (
		<article className="cart-item">
			<img src={img} alt={title} />
			<div>
				<h4>{title}</h4>
				<h4 className="item-price">${price}</h4>
				<button className="remove-btn">remove</button>
			</div>
			<div>
				<button className="amount-btn">
					<ChevronUp />
				</button>
				<p className="amount">{amount}</p>
				<button className="amount-btn">
					<ChevronDown />
				</button>
			</div>
		</article>
	);
};

export default CartItems;

```
## 6.Reducers-(Clear Cart/RemoveItem/Increment/Decrement/Calculate Total)
In `cartSlice.js` inside `createSlice()`,add action creator `clearCart`,and export actions
```js
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const { clearCart } = cartSlice.actions;
```
To use `clearCart()`,In `CartContainer.js`,import `useDispatch` from `react-redux`
```js
import { useSelector, useDispatch } from "react-redux";
const CartContainer = () => {
	const dispatch = useDispatch();
	...
}
```
```js
	<button className="btn clear-btn" onClick={() => dispatch(clearCart())}>
		Clear cart
	</button>
```
In `cartSlice.js` ,add action creator `removeItem()` and export it
```js
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		....
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
		},
	},
});

export const { clearCart, removeItem } = cartSlice.actions;
```
In `CartItems.js` import `useDispatch` and use `removeItem`,payload as argument 
in `removeItem` is `id`
```js
<button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
	remove
</button>
```	
Create action creator `increase` and `decrease` in `cartSlice.js`
```js
	increase: (state, action) => {
		const cartItem = state.cartItems.find((item) => item.id === action.payload);
		cartItem.amount += 1;
	},
	decrease: (state, { payload }) => {
		const cartItem = state.cartItems.find((item) => item.id === payload);
		cartItem.amount -= 1;
	},
```
Use 2 action on button,and pass in `id` into action.In button decrease,if item `quantity` 
is `1`,click `decrease` button will `remove` the item
```js
<button className="amount-btn" onClick={() => dispatch(increase(id))}>
					<ChevronUp />
</button>
<p className="amount">{amount}</p>
<button
	className="amount-btn"
	onClick={() => {
		if (amount === 1) {
			dispatch(removeItem(id));
			return;
		}
		dispatch(decrease(id));
	}}>
	<ChevronDown />
</button>
```
Calculate totals quantity item,and count item in cart,create action creator
 `calculateTotals`
 ```js
 calculateTotals: (state) => {
	let amount = 0;
	let total = 0;
	state.cartItems.forEach((i) => {
		amount += i.amount;
		total += i.price * i.amount;
	});
	state.total = total;
	state.amount = amount;
},
 ```
 In `App.js`,use `useEffect` and dispatch `calculateTotals` to calculate totals
when component re-render or `cartItems` has been updated
```js
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./features/cart/cartSlice";

function App() {
	const { cartItems } = useSelector((store) => store.cart);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems, dispatch]);
	....
}
```
## 7.Create Modal Slice
In `/components` create `Modal.js`
```js
import React from "react";

const Modal = () => {
	return (
		<aside className="modal-container">
			<div className="modal">
				<h4>Remove all items from your shopping cart?</h4>
				<div className="btn-container">
					<button type="button" className="btn confirm-btn">
						comfirm
					</button>
					<button type="button" className="btn clear-btn">
						cancel
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Modal;
```
In `/features` create new folder `/modal`,create new file `modalSlice.js`
```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
		},
		closeModal: (state, action) => {
			state.isOpen = false;
		},
	},
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;

```
To show/hidden `Modal` in `App.js` use `isOpen`
```js
function App() {
	...
	const { isOpen } = useSelector((state) => state.modal);
	...
	return (
		<>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</>
	);
}
``` 
When click `clear cart` button open modal,confirm button to call `clearCart()`,
cancel button to call `closeModal()`
```js
<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
	Clear cart
</button>
```
```js
const Modal = () => {
	const dispatch = useDispatch();
	return (
		<aside className="modal-container">
			<div className="modal">
				<h4>Remove all items from your shopping cart?</h4>
				<div className="btn-container">
					<button
						type="button"
						className="btn confirm-btn"
						onClick={() => {
							dispatch(clearCart());
							dispatch(closeModal());
						}}>
						comfirm
					</button>
					<button
						type="button"
						className="btn clear-btn"
						onClick={() => dispatch(closeModal())}>
						cancel
					</button>
				</div>
			</div>
		</aside>
	);
};
```
Done !!!


# createAsyncThunk

In `cartSlice.js` import `createAsyncThunk`,create function `getCartItems()` to fetch data form `url`
```js
const url = "https://course-api.com/react-useReducer-cart-project";

//https://redux-toolkit.js.org/api/createAsyncThunk
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
		return fetch(url).then((res)=>res.json()).catch((err)=>console.log(err));
});
```
Setup `extraReducers` property,in order to access lifecycle actions
```js
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		....
	},
	//get lifecycle actions
	extraReducers: {
		[getCartItems.pending]: (state) => {
			state.isLoading = true;
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.cartItems = action.payload;
		},
		[getCartItems.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});
```
In `App.js` import `getCartItems` and dispatch `getCartItems` use a new `useEffect`,and grab `isLoading`
from `state`
```js
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	const dispatch = useDispatch();

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
```


