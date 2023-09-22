import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import {
  discountedPrice,
  formatDisplayDateAndTime,
} from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div>
      {orders.length <= 0 ? (
        <h3 className="flex flex-1 text-xl font-normal tracking-tight text-grey-300 mt-2 justify-center">
          Nothing Ordred Yet
        </h3>
      ) : (
        orders.map((order) => {
          return (
            <div
              className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8"
              key={order.id}
            >
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Order Number : #{order.id}
                </h1>
                <h3 className="text-xl font-normal tracking-tight text-grey-500 mt-2">
                  Order Date: {formatDisplayDateAndTime(order.date)}
                </h3>
                <h3 className="text-xl font-bold tracking-tight text-red-900 mt-2">
                  Order Status: {order.status}
                </h3>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>
                                  {item.product.title}
                                </a>
                              </h3>
                              <div>
                                <p className="ml-4 text-sm line-through text-gray-500">
                                  $ {item.product.price}
                                </p>
                                <p className="ml-4">
                                  $ {discountedPrice(item.product)}
                                </p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-500">
                  <p>Total items </p>
                  <p> {order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address:
                </p>
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 rounded-xl mt-5">
                  <div className="flex items-center gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Name: {order.selectedAdress.name}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        Address: {order.selectedAdress.streetAdress}
                      </p>
                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                        Pin / Zip Code: {order.selectedAdress.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {order.selectedAdress.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      City: {order.selectedAdress.city}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      Province: {order.selectedAdress.region}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
