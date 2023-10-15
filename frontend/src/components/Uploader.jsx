import React, { useRef, useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import axios from "axios";
import { Document, Page } from "react-pdf";
// import authHeader from "../services/auth-header";

const Uploader = () => {
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const [email, setEmail] = useState("");
  const ref = useRef();
  const [success, setSuccess] = useState("");


  async function handleProfileChange(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    // formData.append('email', email)
    // formData.append('fileName', file)
    console.log(formData.get("email"));
    const res = await axios.post("http://127.0.0.1:5000/upload", formData);
    if (res.status == 200) {
        setSuccess("Success!")
    }
    // window.location.reload()
  }

  async function handleEmailChange(e) {
    e.preventDefault()
    setEmail(e.target.value)
  }

  return (
    <>
      <div className="h-screen w-screen grid grid-cols-2 justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center mt-[4rem]">
          <form
            id="edit-profile"
            onClick={() => ref.current.click()}
            onSubmit={handleProfileChange}
            className="flex flex-col justify-center items-center border-[#1475cf]-2 outline-white outline-dashed h-[43rem] w-[500px] rounded-[5px] cursor-pointer radial-gradient opacity-[0.75]"
          >
            <input
              hidden
              ref={ref}
              type="file"
              accept=".pdf"
              onChange={({ target: { files } }) => {
                files[0] && setFileName(files[0].name);
                if (files) {
                  setFile(files[0]);
                  setDisplay(URL.createObjectURL(files[0]));
                }
              }}
            />

            {display ? (
              <object
                data={display}
                type="application/pdf"
                width="100%"
                height="100%"
              ></object>
            ) : (
              <>
                <MdCloudUpload color="white" size={60} />
                <p className="text-white">Browse files to upload</p>
              </>
            )}
          </form>
          <section className="mx-[10px] w-[500px] h-[2rem] flex justify-between items-center px-[15px] py-[20px] rounded-[5px] bottom-radial-gradient">
            <AiFillFileImage color="#1475cf" className="flex items-center" />
            <span className="flex justify-center items-center gap-3">
              {fileName}
              <MdDelete
                onClick={() => {
                  setFileName("No selected file");
                  setImage(null);
                }}
              />
            </span>
          </section>
          <input
            type="text"
            onChange={handleEmailChange}
            placeholder="Email"
            className="border border-slate-200 mx-[10px] w-[500px] h-[2rem] flex justify-between items-center px-[15px] py-[20px] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800"
          />
          <button
            type="submit"
            form="edit-profile"
            className="bottom-radial-gradient text-white w-[8rem] h-[2rem] rounded-[50px]"
          >
            Submit
          </button>
        </div>
        <div className="h-full flex justify-end mr-[8rem] mt-[50%]">
          <div className="flex flex-col items-end">
            <h1>Upload and Relax</h1>
            <p>This process can take up to 15 minutes. </p>
            {success && (<h2>Success!</h2>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Uploader;
