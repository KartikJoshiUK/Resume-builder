import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import initialData from "../constants/InitialResumeData.json";
import { useAuth } from "@clerk/clerk-react";
import Edit from "../pages/Edit";
import { ResumeType } from "../constants/ResumeType";

type Props = {};

export default function SignedInRoutes({}: Props) {
  const user = useAuth();
  const [data, setData] = useState<ResumeType>(initialData);
  const fetchResumeData = async (): Promise<void> => {
    const resumeData = await fetch("http://localhost:3000/api/getResume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.userId }),
    });
    const data = await resumeData.json();
    console.log(data?.data?.header);
    setData(data.data);
  };
  useEffect(() => {
    fetchResumeData();
  }, []);

  return (
    <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="/edit"
          element={<Edit data={data} setData={setData} />}
        />
      </Routes>
    </div>
  );
}
