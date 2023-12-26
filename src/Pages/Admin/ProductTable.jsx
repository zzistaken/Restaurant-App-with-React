import {
  Badge,
  Button,
  Dropdown,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import React, { Component } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiCookingPotBold } from "react-icons/pi";
import { FaImage } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";

export default class ProductTable extends Component {
  state = {
    productToBeUpdated: {
      id: null,
      categoryId: 0,
      productName: "",
      ingredients: "",
      imageUrl: "",
      price: 0,
    },
    isDropdownOpen: false,
    openModal: false,
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => ({
      productToBeUpdated: {
        ...prevState.productToBeUpdated,
        [id]: value,
      },
    }));
  };

  handleDropdownToggle = (isOpen) => {
    this.setState({ isDropdownOpen: isOpen });
  };

  handleCategorySelect = (category) => {
    this.setState((prevState) => ({
      productToBeUpdated: {
        ...prevState.productToBeUpdated,
        categoryId: category.id,
      },
      isDropdownOpen: false,
    }));
  };

  handleEdit = (product) => {
    this.setState({
      openModal: true,
      productToBeUpdated: {
        id: product.id,
        categoryId: product.categoryId,
        productName: product.productName,
        ingredients: product.ingredients,
        imageUrl: product.imageUrl,
        price: product.price,
      },
    });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    this.props
      .updateProduct(
        this.state.productToBeUpdated,
        this.state.productToBeUpdated.id
      )
      .then(() => this.props.getProducts());

    this.setState({
      openModal: false,
      productToBeUpdated: {
        id: null,
        categoryId: 0,
        productName: "",
        ingredients: "",
        imageUrl: "",
        price: 0,
      },
    });
  };

  render() {
    return (
      <div className="flex flex-col items-center overflow-x-auto w-full p-1">
        <div className="flex flex-wrap justify-center p-1 lg:justify-between items-center">
          {this.props.categories.map((category) => (
            <Button
              size="xs"
              key={category.id}
              color="light"
              className="m-1 cursor-pointer uppercase"
              onClick={() => this.props.changeCategory(category)}
            >
              {category.categoryName}
            </Button>
          ))}
        </div>
        <Table className="max-w-5xl" striped>
          <Table.Head>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Ingredients</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Category Id</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {this.props.products.map((product) => (
              <Table.Row
                key={product.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="max-w-32">
                  {product.productName}
                </Table.Cell>
                <Table.Cell>{product.ingredients}</Table.Cell>
                <Table.Cell>
                  <img
                    className="max-h-16 max-w-20 rounded-md"
                    src={product.imageUrl}
                    alt={product.productName}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Badge color="gray" className="mr-1 text-xs">
                    {product.price}$
                  </Badge>
                </Table.Cell>
                <Table.Cell>{product.categoryId}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => this.handleEdit(product)}
                    size="sm"
                    color="warning"
                  >
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete " +
                            product.productName +
                            " ?"
                        )
                      )
                        this.props
                          .deleteProduct(product.id)
                          .then(() => this.props.getProducts());
                    }}
                    size="sm"
                    color="failure"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Modal
          show={this.state.openModal}
          onClose={() =>
            this.setState({
              openModal: false,
              productToBeUpdated: {
                id: null,
                categoryId: 0,
                productName: "",
                ingredients: "",
                imageUrl: "",
                price: 0,
              },
            })
          }
        >
          <Modal.Header>Product Edit Form</Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleUpdate} className="w-full">
              <TextInput
                id="productName"
                type="text"
                icon={MdDriveFileRenameOutline}
                placeholder="Name"
                required
                className="m-1"
                value={this.state.productToBeUpdated.productName}
                onChange={this.handleChange}
              />
              <TextInput
                id="ingredients"
                type="text"
                icon={PiCookingPotBold}
                placeholder="Ingredients"
                required
                className="m-1"
                value={this.state.productToBeUpdated.ingredients}
                onChange={this.handleChange}
              />
              <TextInput
                id="imageUrl"
                type="url"
                icon={FaImage}
                placeholder="Image Url"
                required
                className="m-1"
                value={this.state.productToBeUpdated.imageUrl}
                onChange={this.handleChange}
              />
              <TextInput
                id="price"
                type="number"
                icon={AiFillDollarCircle}
                placeholder="Price"
                required
                className="m-1"
                value={this.state.productToBeUpdated.price}
                onChange={this.handleChange}
              />
              <div className="m-1">
                <Dropdown
                  color="light"
                  size="sm"
                  label="Change category"
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
