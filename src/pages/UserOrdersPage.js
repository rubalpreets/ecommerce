import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-2xl font-bold tracking-tight text-gray-500">
          My Orders
        </h1>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrdersPage;
