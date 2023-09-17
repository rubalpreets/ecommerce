import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrdersCount,
  updateOrderAsync,
} from "../../order/orderSlice";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [editTableOrderId, setEditTableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const limit = ITEMS_PER_PAGE;

  const orders = useSelector(selectAllOrders);
  const totalOrdersCount = useSelector(selectTotalOrdersCount);

  const dispatch = useDispatch();

  const handleEdit = (order) => {
    setEditTableOrderId(order.id);
  };
  const handleShow = () => {};

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditTableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const orderStatusColor = (status) => {
    if (status === "pending") {
      return "bg-amber-200 text-amber-600";
    }
    if (status === "dispatched") {
      return "bg-cyan-200 text-cyan-600";
    }
    if (status === "delivered") {
      return "bg-green-200 text-green-600";
    }
    if (status === "canceled") {
      return "bg-red-200 text-red-600";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left hover:cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Number
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center hover:cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 text-sm font-light">
                  {orders.map((order) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={order.id}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center" key={item.id}>
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - {item.quantity} - ${" "}
                              {discountedPrice(item)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center ">
                          $ {order.totalAmount}
                        </div>
                      </td>

                      <td className="py-3 px-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <strong>{order.selectedAdress.name}</strong>
                          <div>{order.selectedAdress.streetAdress}</div>
                          <div>{order.selectedAdress.city}</div>
                          <div>{order.selectedAdress.region}</div>
                          <div>{order.selectedAdress.country}</div>
                          <div>{order.selectedAdress.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editTableOrderId ? (
                          <select
                            onChange={(e) => handleUpdate(e, order)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="canceled">Canceled</option>
                          </select>
                        ) : (
                          <span
                            className={`${orderStatusColor(
                              order.status
                            )} py-1 px-3 rounded-full text-md`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div
                            className="w-6 mr-2 transform hover:text-indigo-500 hover:scale-110 hover:cursor-pointer"
                            title="View Order"
                            onClick={(e) => handleShow(order)}
                          >
                            <EyeIcon />
                          </div>
                          <div
                            className="w-6 mr-2 transform hover:text-indigo-500 hover:scale-110 hover:cursor-pointer"
                            title="Edit Order"
                            onClick={(e) => handleEdit(order)}
                          >
                            <PencilIcon />
                          </div>
                          {/* <div className="w-4 mr-2 transform hover:text-indigo-500 hover:scale-110">
                            <TrashIcon />
                          </div> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrdersCount}
        />
      </div>
    </>
  );
};

export default AdminOrders;
