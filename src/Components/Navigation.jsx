import { Button, Dropdown } from "flowbite-react";
import React, { Component } from "react";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <div className="flex items-center justify-between p-1 border-b border-gray-200">
        <div className="flex">
          <Link to="/">
            <Button className="mr-1 h-10" size="sm" color="failure">
              <IoMdHome />
              Home
            </Button>
          </Link>
        </div>
        <div>
          <Dropdown
            color="success"
            size="sm"
            label={
              <>
                <FaUser className="mr-1" /> Admin
              </>
            }
            dismissOnClick={false}
          >
            <Link to="/admin">
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
          </Dropdown>
        </div>
      </div>
    );
  }
}
