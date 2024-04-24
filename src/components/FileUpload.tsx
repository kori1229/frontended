import React, { useState } from "react";
import axios from "axios";
import './fileUpload.css';
import "rsuite/dist/rsuite.css";
import { Loader, Placeholder } from "rsuite";

interface FileUploadProps {
  tableData: any;
  setTableData: any;
}

// function FileUpload() {
const FileUpload = ({ tableData, setTableData }: FileUploadProps) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [jdUploaded, setJDUploaded] = useState(false);
  const [loader, setLoader] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleResumeChange = (event: any) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event: any) => {
    setJobDescriptionFile(event.target.files[0]);
    setJDUploaded(true);
  };

  const handleRemoveResume = (e: any) => {
    setResumeFile(null);
    // document.getElementById("resumeForm").reset()
  };

  const handleRemoveJobDescription = () => {
    setJobDescriptionFile(null);
    setJDUploaded(false);

    // document.getElementById("descForm").reset()
  };

  const handleSubmit = async (event: any) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      if (resumeFile) {
        // setUploadFailed(false);
        await axios.post(
          "http://localhost:8000/uploadcv/",
          { file: resumeFile },
          config
        );

      }

      if (jobDescriptionFile) {
        await axios.post(
          "http://localhost:8000/uploadjd/",
          { file: jobDescriptionFile },
          config
        );

        setJDUploaded(true);
        setButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(error);
      console.log(error);
      setButtonDisabled(false);
    }
  };

  const handleGetResults = async () => {
    try {
      setLoader(true)
      const response = await axios.get('http://localhost:8000/getResults');
      setTableData(response.data.data)

      setLoader(false)
      // Handle the response as needed
    } catch (error) {
      console.error("Error getting results:", error);
    }
  };
  return (
    <div className="container flex flex-col justify-end">
      {loader && <Loader backdrop content="loading..." vertical size="md" />}
      <h2 className="font-sans text-3xl font-semibold text-[#00338D] tracking-tighter">
        Upload Resume and Job Description
      </h2>
      <div className="flex flex-row justify-center items-center space-x-4">
        <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2">
          <form id="resumeForm" className="w-[35vw]">
            <div className="flex justify-center items-center w-full">
              <h3 className="font-sans text-2xl font-semibold text-[#00338D] tracking-tighter mb-2">
                Add Resume
              </h3>
            </div>
            <div className="flex">
              <input
                className="mr-4 w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-[#F9FAFB] file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-[#374151] file:text-white file:mr-4 file:py-2.5 file:px-8"
                type="file"
                onChange={handleResumeChange}
              />
              {resumeFile && (
                <button
                  className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm"
                  type="button"
                  onClick={handleRemoveResume}
                >
                  Remove
                </button>
              )}
            </div>
            <h3 className="text-neutral-500 text-sm">
              Upload Resume to Database
            </h3>
          </form>
        </div>
        <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2">
          <form id="descForm" className="w-[35vw]">
            <div className="flex flex-row justify-center items-center w-full">
              <h3 className="font-sans text-2xl font-semibold text-[#00338D] tracking-tighter mb-2">
                Add Job Description
              </h3>
            </div>
            <div className="flex">
              <input
                className="mr-4 w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-[#F9FAFB] file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-[#374151] file:text-white file:mr-4 file:py-2.5 file:px-8"
                type="file"
                onChange={handleJobDescriptionChange}
              />
              {jobDescriptionFile && (
                <button
                  className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm"
                  onClick={handleRemoveJobDescription}
                >
                  Remove
                </button>
              )}
            </div>
            <h3 className="text-neutral-500 text-sm">
              Upload Job Description to Start Process
            </h3>
          </form>
        </div>
      </div>
      <div className="flex justify-evenly	">
        <button
          className={`active text-white bg-[#005EB8] hover:bg-[#00338D] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[8rem] `}
          onClick={handleSubmit}
          type="submit"
        >
          Upload
        </button>
        <button
          type="button"
          className={`w-[8rem] active text-white bg-[#00338D] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ${
            buttonDisabled ? "opacity-60" : "opacity-100"
          }`}
          disabled={buttonDisabled}
          onClick={handleGetResults}
        >
          Get Results
        </button>

        {/* Additional buttons and messages */}
      </div>
    </div>
  );
};

export default FileUpload;
