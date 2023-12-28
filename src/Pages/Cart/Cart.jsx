import { Badge, Button, Table } from "flowbite-react";
import React, { Component } from "react";
import { FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  renderSummary = () => {
    return (
      <div className="flex justify-end mx-2 flex-col-reverse md:flex-row md:justify-center min-h-[82vh] bg-slate-100">
        <div className="flex justify-center overflow-x-auto p-2">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>QTY</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Remove</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {this.props.cart.map((cartItem) => (
                <Table.Row
                  key={cartItem.product.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="max-w-32">
                    {cartItem.product.productName}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      className="h-16 w-20 rounded-md object-cover"
                      src={cartItem.product.imageUrl}
                      alt={cartItem.product.productName}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="success" className="mr-1 text-xs">
                      x{cartItem.quantity}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color="gray" className="mr-1 text-xs">
                      {cartItem.product.price * cartItem.quantity}$
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() =>
                        this.props.removeFromCart(cartItem.product)
                      }
                      size="sm"
                      color="failure"
                    >
                      <FaTrash />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="my-2">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Cart Details</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell className="font-semibold">
                  Total Cost:
                  <Badge className="max-w-fit" size="sm" color="success">
                    {this.props.totalCost}$
                  </Badge>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-semibold">
                  <Button size="sm" color="success">
                    Proceed to Payment
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  };

  renderEmptyCart = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-[82vh] bg-slate-100">
        <Badge size="sm" color="failure">
          Empty Cart
        </Badge>
        <Link to="/">
          <Button className="m-2" size="sm" color="light">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}
