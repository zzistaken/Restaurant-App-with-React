import { Badge, Button } from "flowbite-react";
import React, { Component } from "react";

export default class ProductList extends Component {
  
  render() {
    return (
      <div>
        <div className="flex flex-wrap justify-center p-1 bg-slate-100 lg:justify-between">
          {this.props.categories.map((category) => (
            <Button
              size="xs"
              key={category.id}
              color="dark"
              className="m-1 cursor-pointer"
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
        <div className="flex flex-wrap border-gray-200 bg-slate-100 min-h-screen justify-center border-t">
          {this.props.products.map((product) => (
            <div
              key={product.id}
              className="w-52 md:w-60 bg-white rounded-md m-2 shadow relative"
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
      </div>
    );
  }
}
