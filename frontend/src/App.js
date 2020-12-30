import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import HomeScreen from './Screens/HomeScreen'
import AboutScreen from './Screens/AboutScreen'
import ContactScreen from './Screens/ContactScreen'
import ShopScreen from './Screens/ShopScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen'
import AccountPage from './Screens/AccountPage'
import WishlistScreen from './Screens/WishlistScreen'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceOrderScreen'
import OrderScreen from './Screens/OrderScreen'
import MyOrdersScreen from './Screens/MyOrdersScreen'
import AdminScreen from './Screens/AdminScreen'
import Statistics from './Screens/StatisticsScreen'
import UserListScreen from './Screens/UserListScreen'
import OrderListScreen from './Screens/OrderListScreen'
import ProductListScreen from './Screens/ProductListScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import WalletScreen from './Screens/WalletScreen'
import PrintInvoiceScreen from './Screens/PrintInvoiceScreen'
import CouponListScreen from './Screens/CouponListScreen'
import CouponCreateScreen from './Screens/CouponCreateScreen'
import MyCouponsScreen from './Screens/MyCouponsScreen'

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path='/' exact component={HomeScreen} />
				<Route path='/about' exact component={AboutScreen} />
				<Route path='/admin' exact component={AdminScreen} />
				<Route path='/admin/statistics' exact component={Statistics} />
				<Route path='/admin/userlist' exact component={UserListScreen} />
				<Route path='/admin/userlist/:id/edit' exact component={UserEditScreen} />
				<Route path='/admin/orderlist' exact component={OrderListScreen} />
				<Route path='/admin/couponlist' exact component={CouponListScreen} />
				<Route path='/admin/couponlist/create' exact component={CouponCreateScreen} />
				<Route path='/admin/productlist' exact component={ProductListScreen} />
				<Route path='/admin/productlist/:id/edit' exact component={ProductEditScreen} />
				<Route path='/contact' exact component={ContactScreen} />
				<Route path='/shop' exact component={ShopScreen} />
				<Route path='/shop/:id' exact component={ProductScreen} />
				<Route path='/cart/:id?' exact component={CartScreen} />
				<Route path='/login' exact component={LoginScreen} />
				<Route path='/register' exact component={RegisterScreen} />
				<Route path='/my-account/profile' exact component={ProfileScreen} />
				<Route path='/my-account/myOrders' exact component={MyOrdersScreen} />
				<Route path='/my-account/myCoupons' exact component={MyCouponsScreen} />
				<Route path='/my-account' exact component={AccountPage} />
				<Route path='/my-wallet' exact component={WalletScreen} />
				<Route path='/wishlist' exact component={WishlistScreen} />
				<Route path='/shipping' exact component={ShippingScreen} />
				<Route path='/payment' exact component={PaymentScreen} />
				<Route path='/place-order' exact component={PlaceOrderScreen} />
				<Route path='/orders/:id' exact component={OrderScreen} />
				<Route path='/orders/:id/print' exact component={PrintInvoiceScreen} />
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}

export default App
