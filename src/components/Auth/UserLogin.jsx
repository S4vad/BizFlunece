import React, { useState } from 'react';

const UserLogin = () => {
  const [info, setInfo] = useState({
    email: " ",
    password: " "
  })

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }))
  }

  function submit(event) {
    event.preventDefault();
    console.log("The form submitted ", info)
    setInfo({
      email: "",
      password: ""
    })

  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-900 p-20">
        <form onSubmit={submit} className="flex flex-col items-center justify-center">
          <input
            required
            className="py-3 px-5 border-2 text-xl border-emerald-900 text-white outline-none bg-transparent rounded-full placeholder:gray-700"
            type="email"
            value={info.email}
            onChange={inputHandler}
            placeholder="Enter Your Email"
            name="email"
          />
          <input
            required
            className="py-3 px-5 mt-5 border-2 text-xl border-emerald-900 text-white outline-none bg-transparent rounded-full placeholder:gray-700"
            value={info.password}
            type="password"
            onChange={inputHandler}
            placeholder="Enter Your Password"
            name='password'
          />
          <button
            className="bg-emerald-900 hover:bg-emerald-800 text-xl rounded-full text-white px-5 py-3  mt-7 border-none w-full " type="submit">
            Login
          </button>
          h1
        </form>
      </div>
    </div>
  );
};

export default UserLogin;


