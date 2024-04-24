import React, { useState } from "react";
import axios from "axios";
import "../styles/fileUpload.css";
import "rsuite/dist/rsuite.css";
import { Loader } from "rsuite";
import { TableDataType } from "../App";

interface FileUploadProps {
  setTableData: React.Dispatch<
    React.SetStateAction<TableDataType[] | undefined>
  >;
}

const FileUpload = ({ setTableData }: FileUploadProps) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const handleResumeChange = (event: any) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event: any) => {
    setJobDescriptionFile(event.target.files[0]);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    (document.getElementById("resumeForm") as HTMLFormElement).reset();
  };

  const handleRemoveJobDescription = () => {
    setJobDescriptionFile(null);
    (document.getElementById("descForm") as HTMLFormElement).reset();
  };

  const handleSubmit = async () => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      if (resumeFile) {
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
        setButtonDisabled(false);
      }
    } catch (error) {
      console.error("Error uploading files:");
      alert(error);
    }
  };

  const handleGetResults = async () => {
    try {
      setLoader(true);
      const response = await axios.get("http://localhost:8000/getResults");
      setTableData(response.data.data);
      setLoader(false);
    } catch (error) {
      console.error("Error getting results:");
      alert("Nhi aya result!");
    }
  };
  return (
    <div className="container flex flex-col justify-end">
      {loader && <Loader content="loading..." vertical size="md" />}
      <h2 className="font-sans text-3xl font-semibold text-[#00338D] tracking-tighter">
        Upload Resume and Job Description
      </h2>
      <div className="flex flex-row justify-center items-center space-x-4">
        <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2 pl-4">
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
                  className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm mr-4"
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
        <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2 pl-4">
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
                  className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm mr-4"
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
          className={`w-[8rem] active text-white bg-[#00338D] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 -z-10 ${
            buttonDisabled ? "opacity-60" : "opacity-100"
          }`}
          disabled={buttonDisabled}
          onClick={handleGetResults}
        >
          Get Results
        </button>
      </div>
    </div>
  );
};

export default FileUpload;

//Dummy Data
const rows = [
  {
    jdId: "12345",
    recommendedName: "Example Name",
  },
  {
    jdId: "12346",
    recommendedName: "Sample Name 1",
  },
  {
    jdId: "12347",
    recommendedName: "Sample Name 2",
  },
  {
    jdId: "12348",
    recommendedName: "Sample Name 3",
  },
  {
    jdId: "12349",
    recommendedName: "Sample Name 4",
  },
  {
    jdId: "12350",
    recommendedName: "Sample Name 5",
  },
  {
    jdId: "12351",
    recommendedName: "Sample Name 6",
  },
  {
    jdId: "12352",
    recommendedName: "Sample Name 7",
  },
  {
    jdId: "12353",
    recommendedName: "Sample Name 8",
  },
  {
    jdId: "12354",
    recommendedName: "Sample Name 9",
  },
  {
    jdId: "12355",
    recommendedName: "Sample Name 10",
  },
];
