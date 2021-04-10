import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import SigninScreen from './Screens/SigninScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ShippingScreen from './Screens/ShippingScreen'
import Navbar from './components/Navbar'
import storePage from './Feature/storePage'

 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/location" component={storePage}/>
            <Route path="/" exact={true} component={HomeScreen}/>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingScreen} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;



