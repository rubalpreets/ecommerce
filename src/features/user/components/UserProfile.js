import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const [selectedEditIndex, setselectedEditIndex] = useState(-1);
  const [addAddress, setAddAddress] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issu we deep copied the newuser
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEdit = (updateData, index) => {
    console.log(updateData);
    const newUser = { ...user, addresses: [...user.addresses] }; // for shallow copy issu we deep copied the newuser
    newUser.addresses.splice(index, 1, updateData);
    dispatch(updateUserAsync(newUser));
    setselectedEditIndex(-1);
  };

  const handleAdd = (updateData) => {
    console.log(updateData);
    const newUser = { ...user, addresses: [...user.addresses, updateData] }; // for shallow copy issu we deep copied the newuser
    dispatch(updateUserAsync(newUser));
    setselectedEditIndex(-1);
    setAddAddress(false);
  };

  const handleEditForm = (index) => {
    setselectedEditIndex(index);
    setAddAddress(false);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("country", address.country);
    setValue("streetAdress", address.streetAdress);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("pinCode", address.pinCode);
  };

  const AddressForm = ({
    handleSubmitFunction,
    submitButtonText,
    headerText,
  }) => {
    return (
      <form
        className="bg-white px-5 py-0 mt-6 "
        onSubmit={handleSubmitFunction}
        noValidate
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              {headerText} Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("name", {
                      required: "name is required",
                    })}
                    id="name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "email is required",
                    })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    {...register("phone", {
                      required: "phone is required",
                    })}
                    type="number"
                    autoComplete="phone"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country", {
                      required: "country is required",
                    })}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    <option>India</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="streetAdress"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("streetAdress", {
                      required: "street address is required",
                    })}
                    id="streetAdress"
                    autoComplete="streetAdress"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city", {
                      required: "city is required",
                    })}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("region", {
                      required: "state / province is required",
                    })}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("pinCode", {
                      required: "postal code is required",
                    })}
                    id="pinCode"
                    autoComplete="pinCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={(e) => setselectedEditIndex(-1)}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Name: Guest User
          </h1>
          <h3 className="text-xl font-bold tracking-tight text-red-900 mt-2">
            Email Address: {user.email}
          </h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex flex-1 justify-between items-center">
            <p className="mt-0.5 text-sm text-gray-500">My Address:</p>
            <button
              onClick={(e) => {
                setAddAddress((addAddress) => !addAddress);
                setValue("name", "");
                setValue("email", "");
                setValue("phone", "");
                setValue("country", "");
                setValue("streetAdress", "");
                setValue("city", "");
                setValue("region", "");
                setValue("pinCode", "");
                setselectedEditIndex(-1);
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>
          </div>
          {addAddress && (
            <AddressForm
              submitButtonText="Add New Address"
              headerText="Add New"
              handleSubmitFunction={handleSubmit((data) => {
                handleAdd(data);
                // reset();
              })}
            />
          )}
          {user.addresses.map((address, index) => {
            return (
              <>
                <div className="border-solid border-2 border-gray-200 rounded-xl hover:shadow-lg mt-5">
                  {selectedEditIndex === index && (
                    // <div className="flex flex-col items-center w-full">
                    <AddressForm
                      handleSubmitFunction={handleSubmit((data, index) =>
                        handleEdit(data, index)
                      )}
                      submitButtonText="Update Address"
                      headerText="Edit"
                    />
                    // </div>
                  )}
                  <div
                    className="flex justify-between gap-x-6 px-5 py-5  "
                    key={index}
                  >
                    <div className="flex items-center gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          Name: {address.name}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          Street: {address.streetAdress}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          Pin / Zip Code: {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-start">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        City: {address.city}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        Province: {address.region}
                      </p>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
