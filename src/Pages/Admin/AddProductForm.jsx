import React, { Component } from "react";
import { Badge, Button, Dropdown, TextInput } from "flowbite-react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { FaImage } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

export default class AddProductForm extends Component {
  state = {
    productToBeAdded: {
      categoryId: 0,
      productName: "",
      ingredients: "",
      imageUrl: "",
      price: 0,
    },
    isDropdownOpen: false,
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      productToBeAdded: {
        ...prevState.productToBeAdded,
        [id]: value,
      },
    }));
  };

  handleDropdownToggle = (isOpen) => {
    this.setState({ isDropdownOpen: isOpen });
  };

  handleCategorySelect = (category) => {
    this.setState((prevState) => ({
      productToBeAdded: {
        ...prevState.productToBeAdded,
        categoryId: category.id,
      },
      isDropdownOpen: false,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props
      .addProduct(this.state.productToBeAdded)
      .then(() => this.props.getProducts());

    this.setState({
      productToBeAdded: {
        categoryId: 1,
        productName: "",
        ingredients: "",
        imageUrl: "",
        price: 0,
      },
    });
  };

  render() {
    return (
      <div className="w-full flex flex-col items-center border-gray-200 bg-slate-100 border-b p-2">
        <h1 className="font-semibold ml-2">Product Addition Form</h1>
        <form
          className="flex flex-wrap justify-center items-center w-full"
          onSubmit={this.handleSubmit}
        >
          <TextInput
            id="productName"
            type="text"
            icon={MdDriveFileRenameOutline}
            placeholder="Name"
            required
            className="m-1"
            value={this.state.productToBeAdded.productName}
            onChange={this.handleChange}
          />
          <TextInput
            id="ingredients"
            type="text"
            icon={PiCookingPotBold}
            placeholder="Ingredients"
            required
            className="m-1"
            value={this.state.productToBeAdded.ingredients}
            onChange={this.handleChange}
          />
          <TextInput
            id="imageUrl"
            type="url"
            icon={FaImage}
            placeholder="Image Url"
            required
            className="m-1"
            value={this.state.productToBeAdded.imageUrl}
            onChange={this.handleChange}
          />
          <TextInput
            id="price"
            type="number"
            icon={AiFillDollarCircle}
            placeholder="Price"
            required
            className="m-1"
            value={this.state.productToBeAdded.price}
            onChange={this.handleChange}
          />
          <div className="m-1">
            <Dropdown
              color="light"
              size="sm"
              label="Select category"
              dismissOnClick={true}
              onToggle={this.handleDropdownToggle}
            >
              {this.props.categories.map((category) => (
                <Dropdown.Item
                  onClick={() => this.handleCategorySelect(category)}
                  key={category.id}
                >
                  <Badge color="success" className="mr-1 text-xs">
                    ID: {category.id}
                  </Badge>
                  {category.categoryName}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <Button type="submit" className="m-1" color="success" size="sm">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
