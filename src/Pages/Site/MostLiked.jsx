import { Badge, Button } from "flowbite-react";
import React, { Component } from "react";
import { FaStar } from "react-icons/fa6";

export default class MostLiked extends Component {
  render() {
    return (
      <div className="flex flex-wrap border-gray-200 bg-slate-100 justify-center border-b">
        {this.props.mostLikeds.map((product) => (
          <div
            key={product.id}
            className="product-item-container w-52 md:w-60 max-h-[300px] bg-white rounded-md m-2 shadow cursor-pointer"
          >
            <div className="product-item relative">
              <img
                className="h-48 w-full rounded-t-md object-cover productImage"
                src={product.imageUrl}
                alt={product.productName}
              />
              <div className="product-details">
                <h1 className="m-1 text-lg font-semibold truncate productName">
                  {product.productName}
                </h1>
                <h1 className="m-1 text-lg font-semibold Ingredients hidden">
                  Ingredients
                  <hr />
                </h1>
                <p className="m-1 text-sm text-slate-600 productIngredients hidden">
                  {product.ingredients}
                </p>
                <hr className="mx-1 productName" />
                <div className="flex justify-between items-center p-2 addToCartDiv">
                  <Badge className="productPrice" size="md" color="pink">
                    {product.price}
                    <span>$</span>
                  </Badge>
                  <Button
                    className="addToCartButton hidden"
                    onClick={() => this.props.addToCart(product)}
                    size="xs"
                    color="success"
                  >
                    Add to Cart
                  </Button>
                </div>
                <div className="flex justify-center items-center bg-slate-900 rounded-md w-6 h-6 absolute top-1 right-1 productStar">
                  <FaStar className="text-lg text-yellow-300 " />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
