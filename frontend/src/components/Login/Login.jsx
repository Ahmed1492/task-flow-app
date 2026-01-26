

const LoginComp = ({ error, collectDate, handleLogin }) => {
  return (
    <>
      {error && (
        <div
          className="absolute top-[6rem] font-bold left-1/2 transform -translate-x-1/2 
                  text-red-600 text-lg text-center  rounded z-50"
        >
          {error}
        </div>
      )}
      <div className="flex flex-col-reverse xl:flex-row mt-[2rem] py-[2rem] w-full h-[97vh] xl:h-[90vh] items-center">
        <div className="w-full xl:w-[50%] shadow-2xl h-full flex flex-col justify-center">
          <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                onChange={collectDate}
                name="email"
                className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
                type="text"
                placeholder="Enter your Email..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                onChange={collectDate}
                name="password"
                className="bg-slate-200 py-2 px-3 rounded-md text-sm w-full text-gray-700"
                type="text"
                placeholder="Enter Your Password..."
              />
            </div>
            <button
              onClick={handleLogin}
              className="bg-[#FF735C] mt-5 py-2 rounded-lg text-white"
            >
              Login
            </button>
          </div>
        </div>

        <div className="w-[27rem] xl:w-[44%] h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src="/bg2.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default LoginComp;
