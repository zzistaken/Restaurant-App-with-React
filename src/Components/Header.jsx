import React, { Component } from "react";
import Logo from "../Assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import Navigation from "./Navigation";
import { Badge, Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { FaTrash } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Header extends Component {
  renderSummary = () => {
    return (
      <div className="flex m-1">
        <Dropdown
          label={
            <>
              <FaCartShopping className="mr-1" /> Cart ({this.props.cart.length}
              )
            </>
          }
          dismissOnClick={false}
          color="light"
          size="sm"
        >
          <Link to="/cart">
            <DropdownItem className="flex justify-end items-center font-semibold hover:text-green-600">
              View Cart <FaEye className="ml-1 text-green-600" />
            </DropdownItem>
          </Link>
          <DropdownDivider />
          {this.props.cart.map((cartItem) => (
            <Dropdown.Item
              className="flex justify-end"
              key={cartItem.product.id}
            >
              {cartItem.product.productName}
              <Badge className="mx-1" color="success">
                x{cartItem.quantity}
              </Badge>
              <Badge className="mr-1" color="failure">
                {cartItem.quantity * cartItem.product.price}$
              </Badge>
              <FaTrash
                onClick={() => this.props.removeFromCart(cartItem.product)}
                className="hover:text-rose-600"
              />
            </Dropdown.Item>
          ))}
          <DropdownDivider />
          <DropdownItem className="flex justify-end font-semibold">
            Total Cost:
            <Badge className="ml-1" color="gray" size="sm">
              {this.props.totalCost}$
            </Badge>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            onClick={() => this.props.clearCart()}
            className="flex justify-end items-center hover:text-rose-600"
          >
            Clear
            <MdOutlineCleaningServices className="ml-1 text-rose-600" />
          </DropdownItem>
        </Dropdown>
      </div>
    );
  };

  renderEmptyCart = () => {
    return (
      <Dropdown
        label={
          <>
            <FaCartShopping className="mr-1" /> Cart ({this.props.cart.length})
          </>
        }
        disabled
        color="light"
        size="sm"
      ></Dropdown>
    );
  };

  render() {
    return (
      <div className="bg-slate-100">
        <div className="flex justify-between items-center border-b border-gray-200 p-1">
          <Link to="/">
            <img className="h-16 md:h-20" src={Logo} alt="Logo" />
          </Link>
          <div className="flex m-1">
            <input
              className="w-28 h-10 text-gray-700 border border-gray-300 px-2 rounded-l-md sm:w-48  md:w-72 lg:w-96 text-sm focus:border-none focus:outline-none"
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="What do you want to eat?"
            />
            <button className="w-10 h-10 flex justify-center items-center rounded-r-md bg-slate-600 text-white">
              <IoMdSearch className="text-2xl" />
            </button>
          </div>
          <div>
            {this.props.cart.length > 0
              ? this.renderSummary()
              : this.renderEmptyCart()}
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}
