import { Badge, Button } from "flowbite-react";
import React, { Component } from "react";

export default class ProductList extends Component {
  
  renderProducts = () => {
    return (
      <div className="flex flex-wrap border-gray-200 bg-slate-100 justify-center border-t">
        {this.props.products.map((product) => (
          <div
            key={product.id}
            className="w-52 md:w-60 max-h-[300px] bg-white rounded-md m-2 shadow relative"
          >
            <img
              className="h-48 w-full rounded-t-md object-cover"
              src={product.imageUrl}
              alt={product.productName}
            />
            <h1 className="m-1 text-lg font-semibold truncate">
              {product.productName}
            </h1>
            <p className="m-1 text-sm text-slate-600 truncate">
              {product.ingredients}
            </p>
            <hr className="mx-1" />
            <div className="flex justify-between items-center p-2">
              <Badge size="md" color="success">
                {product.price}
                <span>$</span>
              </Badge>
              <Button
                onClick={() => this.props.addToCart(product)}
                size="xs"
                color="success"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  renderEmpty = () => {
    return (
      <div className="flex justify-center items-center">
        <Badge color="failure">Products not found!</Badge>
      </div>
    );
  };

  render() {
    return (
      <div className="min-h-[83vh] bg-slate-100 ">
        <div className="flex flex-wrap justify-center p-1 lg:justify-between">
          {this.props.categories.map((category) => (
            <Button
              size="xs"
              key={category.id}
              color="dark"
              className="m-1 cursor-pointer uppercase"
              onClick={() => this.props.changeCategory(category)}
            >
              {category.categoryName}
            </Button>
          ))}
        </div>
        <div className="h-14 border-t border-gray-200 bg-slate-100 flex justify-center items-center">
          <h1 className="text-xl font-semibold text-slate-800">
            {this.props.currentCategory}
          </h1>
        </div>
        {this.props.products.length > 0
          ? this.renderProducts()
          : this.renderEmpty()}
      </div>
    );
  }
}