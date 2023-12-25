import { Button, Dropdown } from "flowbite-react";
import React, { Component } from "react";
import { IoMdHome } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export default class Navigation extends Component {
  
  render() {
    return (
      <div className="flex items-center justify-between p-1 border-b border-gray-200">
        <div className="flex">
          <Button className="mr-1 h-10" size="sm" color="failure">
            <IoMdHome />
            Home
          </Button>
        </div>
        <div>
          <Dropdown
            color="success"
            size="sm"
            label={
              <>
                <FaUser className="mr-1" /> Account
              </>
            }
            dismissOnClick={false}
          >
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    );
  }
}
