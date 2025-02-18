import React from "react";

const AiMail = () => {
  return (
    <div className="w-full container items-center ">
      <div className="flex flex-col w-4/5 p-4 mx-12  ">
        <p className="font-semibold"> AI Mail Send </p>

        <form className="py-2 mt-1 ">
          <div className=" my-2">
            <p>Recipient's Email</p>
            <input
              type="text"
              placeholder="john@example.com"
              className="w-1/2 py-2 pl-2 pr-8  bg-slate-300 rounded-md outline-none"
            />
          </div>

          <div className="my-3">
            <p>Enter Mail Subject</p>
            <input
              type="text"
              placeholder="Enter Mail Subject"
              className="w-1/2 py-2 pl-2 pr-8  bg-slate-300 rounded-md outline-none"
            />
          </div>

          <div className=" flex-col mt-2">
            <p>Enter Promt</p>
            <textarea
              placeholder="Enter your prompt for AI email generation..."
              className="w-1/2 h-24 py-2 pl-2 pr-8  bg-slate-300 rounded-md outline-none"
            />
          </div>
          <button className="p-2.5  text-white bg-gray-700 font-semibold rounded-lg cursor-pointer px-4">
            Generate Email body
          </button>
          <div className=" flex-col my-4">
            <textarea
              placeholder="Generated Email"
              className="w-1/2 h-60 py-2 pl-2 pr-8  bg-slate-300 rounded-md outline-none"
            />
          </div>

          <button className="p-2.5  text-white bg-gray-700 font-semibold rounded-lg cursor-pointer px-4">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiMail;
