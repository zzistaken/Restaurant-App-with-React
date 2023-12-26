import React, { Component } from "react";
import AddProductForm from "./AddProductForm";
import ProductTable from "./ProductTable";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="flex flex-col items-center bg-slate-100">
        <AddProductForm
          categories={this.props.categories}
          getProducts={this.props.getProducts}
          addProduct={this.props.addProduct}
        />
        <ProductTable
          products={this.props.products}
          getProducts={this.props.getProducts}
          categories={this.props.categories}
          deleteProduct={this.props.deleteProduct}
          updateProduct={this.props.updateProduct}
        />
      </div>
    );
  }
}
