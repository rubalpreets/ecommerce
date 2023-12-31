import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { discountedPrice } from "../../app/constants";

export default function Cart() {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const items = useSelector(selectItems);

  const totalAmount = items.reduce((acc, item) => {
    acc += discountedPrice(item.product) * item.quantity;
    return acc;
  }, 0);

  const totalItems = items.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value })); // +changes to integer
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Cart
        </h1>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          {items.length === 0 && (
            <h1 className="text-xl font-normal tracking-tight text-gray-400 my-2">
              Cart is empty
            </h1>
          )}
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
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
                        <a href={item.product.href}>{item.product.title}</a>
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
                        Qty
                      </label>
                      <select
                        className="rounded-xl"
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                        onClick={(e) => handleRemove(e, item.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
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
          <p>$ {totalAmount}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-500">
          <p>Total items in cart </p>
          <p> {totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          {items.length === 0 ? (
            <Link
              to="/"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          ) : (
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          )}
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          {items.length > 0 && (
            <p>
              or
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
