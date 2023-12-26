import { Component } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProductList from "./Pages/Site/ProductList";
import Cart from "./Pages/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Admin/Dashboard";

export default class App extends Component {
  state = {
    categories: [],
    products: [],
    cart: [],
    currentCategory: "All",
    totalCost: 0,
  };

  componentDidMount() {
    this.getCategories();
    this.getProducts();
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
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart }, () => {
      this.calculateTotalCost();
    });
  };

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.calculateTotalCost();
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
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  products={this.state.products}
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
