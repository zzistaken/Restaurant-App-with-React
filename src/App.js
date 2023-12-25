import { Component } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProductList from "./Components/ProductList";

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
        <div className="App">
          <Header
            cart={this.state.cart}
            totalCost={this.state.totalCost}
            removeFromCart={this.removeFromCart}
            clearCart={this.clearCart}
          />
          <ProductList
            categories={this.state.categories}
            currentCategory={this.state.currentCategory}
            changeCategory={this.changeCategory}
            products={this.state.products}
            addToCart={this.addToCart}
          />
          <Footer />
        </div>
      </div>
    );
  }
}
