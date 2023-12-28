import { Component } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProductList from "./Pages/Site/ProductList";
import Cart from "./Pages/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/Error/NotFound";
import Dashboard from "./Pages/Admin/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class App extends Component {
  state = {
    mostLikeds: [],
    categories: [],
    products: [],
    cart: [],
    currentCategory: "All",
    totalCost: 0,
  };

  componentDidMount() {
    this.getCategories();
    this.getProducts();
    this.getMostLiked();
  }

  getCategories = async () => {
    const response = await fetch("http://localhost:3005/categories");
    const responseData = await response.json();
    this.setState({ categories: responseData });
  };

  getProducts = async (id) => {
    let url = "http://localhost:3005/meals";
    if (id) {
      url += "?categoryId=" + id;
    }
    const response = await fetch(url);
    const responseData = await response.json();
    this.setState({ products: responseData });
  };

  getMostLiked = async () => {
    let url = "http://localhost:3005/meals?mostLiked=true";
    const response = await fetch(url);
    const responseData = await response.json();
    this.setState({ mostLikeds: responseData });
  };

  addProduct = async (data) => {
    await fetch("http://localhost:3005/meals", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  };

  deleteProduct = async (id) => {
    await fetch("http://localhost:3005/meals/" + id, {
      method: "DELETE",
    });
  };

  updateProduct = async (data, id) => {
    await fetch("http://localhost:3005/meals/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    const addedProduct = newCart.find((c) => c.product.id === product.id);
    if (addedProduct) {
      addedProduct.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart }, () => {
      this.calculateTotalCost();
    });
    toast.success(product.productName +" added to cart!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart }, () => {
      this.calculateTotalCost();
    });
    toast.warn(product.productName +" removed to cart!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.calculateTotalCost();
    });
    toast.error("Cart cleared!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  calculateTotalCost = () => {
    let totalCost = 0;
    this.state.cart.forEach((cartItem) => {
      if (cartItem.quantity && cartItem.quantity > 1) {
        totalCost += cartItem.quantity * Number(cartItem.product.price);
      } else {
        totalCost += Number(cartItem.product.price);
      }
    });
    this.setState({ totalCost: totalCost });
  };

  render() {
    return (
      <div>
        <BrowserRouter className="App">
          <Header
            cart={this.state.cart}
            totalCost={this.state.totalCost}
            removeFromCart={this.removeFromCart}
            clearCart={this.clearCart}
          />
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  products={this.state.products}
                  mostLikeds={this.state.mostLikeds}
                  addToCart={this.addToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={this.state.cart}
                  totalCost={this.state.totalCost}
                  removeFromCart={this.removeFromCart}
                  clearCart={this.clearCart}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Dashboard
                  categories={this.state.categories}
                  changeCategory={this.changeCategory}
                  products={this.state.products}
                  getProducts={this.getProducts}
                  addProduct={this.addProduct}
                  deleteProduct={this.deleteProduct}
                  updateProduct={this.updateProduct}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
