
const Register = () => {
  return (
    <div className="flex  flex-col-reverse xl:flex-row mt-[2rem] py-[2rem] w-full   items-center">
      <div className=" w-[100%]   xl:w-[50%]  shadow-2xl py-[2rem] h-full flex flex-col justify-center">
        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
          <h2 className="text-2xl  font-semibold  mb-6">Register</h2>
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              // onChange={collectDate}
              name="email"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Enter your Email..."
            />
          </div>
          {/* content */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              // onChange={collectDate}
              name="password"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Enter Your Password.."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              // onChange={collectDate}
              name="password"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Enter Your Password.."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              // onChange={collectDate}
              name="password"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Enter Your Password.."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              // onChange={collectDate}
              name="password"
              className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
              type="text"
              placeholder="Enter Your Password.."
            />
          </div>

          <button className="bg-[#FABA01] mt-5 py-2 rounded-lg text-white">
            Add
          </button>
        </div>
      </div>
      <div className=" w-[18rem]  xl:w-[50%] h-full">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="/bg1.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
