import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/UserActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingadressScreen from "./screens/ShippingadressScreen";
import SignInScreen from "./screens/SignInScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import {
  listProductBrands,
  listProductCategories,
} from "./actions/ProductActions";
import LoadingBox from "./components/Loading";
import MessageBox from "./components/Message";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    categories,
    error: errorCategories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const productBrandList = useSelector((state) => state.productBrandList);
  const {
    loading: loadingBrands,
    brands,
    error: errorBrands,
  } = productBrandList;
  useEffect(() => {
    dispatch(listProductBrands());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="navbar">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              <img
                className="maddogs"
                src="/images/maddogspng.png"
                alt="Angry Wolf"
              />
              <p className="text-brand">MAD WOLF</p>
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              <i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <i className="fa fa-user fa-lg" aria-hidden="true"></i> Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/search/category/${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))
            )}
          </ul>
          <ul className="brands">
            <li>
              <strong>Brands</strong>
            </li>
            {loadingBrands ? (
              <LoadingBox />
            ) : errorBrands ? (
              <MessageBox variant="danger">{errorBrands}</MessageBox>
            ) : (
              brands.map((brand) => (
                <li key={brand}>
                  <Link
                    to={`/search/brand/${brand}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {brand}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingadressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name" component={SearchScreen} exact></Route>
          <Route
            path="/search/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/brand/:brand"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/brand/:brand/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>

          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <Route exact path="/" component={HomeScreen}></Route>
        </main>
        <footer>
          <div className="footercontainer">
            <div className="footer-left">
              <div className="socialcontainer">
                <h3 className="title2">Social Media</h3>
                <ul>
                  <li className="itemsicons fb">
                    <i className="fa fa-brands fa-facebook fa-1x"></i>
                  </li>
                  <li className="itemsicons ig">
                    <i className="fa fa-brands fa-instagram fa-1x"></i>
                  </li>
                  <li className="itemsicons tw">
                    <i className="fa fa-brands fa-twitter fa-1x"></i>
                  </li>
                  <li className="itemsicons pi">
                    <i className="fa fa-brands fa-pinterest fa-1x"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-center">
              <h3 className="title2">Useful Links</h3>
              <ul className="lista">
                <Link to="/">
                  <li className="itemslista">Home</li>
                </Link>
                <Link to="/cart">
                  <li className="itemslista">Cart</li>
                </Link>
                <Link to="/search/name/">
                  <li className="itemslista">All Products</li>
                </Link>

                <Link to="/profile">
                  <li className="itemslista">User Profile</li>
                </Link>
              </ul>
            </div>
            <div className="footer-right">
              <h3 className="title2">Contact Us</h3>
              <div className="contact-item">
                <i className="fa fa-solid fa-map-pin fa-2x"></i>
                <p className="text-footer">
                  {" "}
                  Av. Libertador 1234, Buenos Aires, Argentina
                </p>
              </div>
              <div className="contact-item">
                <i className="fa fa-solid fa-phone fa-2x"></i>
                <p className="text-footer"> +1 234 56 78</p>
              </div>
              <div className="contact-item">
                <i className="fa fa-solid fa-envelope fa-2x"></i>
                <p className="text-footer"> madwolf@gmail.com</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
