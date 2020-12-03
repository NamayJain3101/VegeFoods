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

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route path='/' exact component={HomeScreen} />
				<Route path='/about' exact component={AboutScreen} />
				<Route path='/contact' exact component={ContactScreen} />
				<Route path='/shop' exact component={ShopScreen} />
				<Route path='/shop/:id' exact component={ProductScreen} />
				<Route path='/cart/:id?' exact component={CartScreen} />
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}

export default App
