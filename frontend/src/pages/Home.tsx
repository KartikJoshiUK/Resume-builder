import { useRef } from "react";
import Resume from "../components/Resume";
import { ResumeType } from "../constants/ResumeType";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
type Props = {
  data: ResumeType;
};

export default function Home({ data }: Props) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (resumeRef.current) {
      const printWindow = window.open("", "", "height=800,width=1200");
      printWindow?.document.write(`
        <html>
          <head>
            <title></title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @media print {
                @page {
                  size: letter;
                  margin: 1.5rem 0.5rem;
                }
                header,
                footer{
                  display: none;
                  margin: 2rem 0.5rem;
                }
              }
            </style>
          </head>
          <body>
            ${resumeRef.current?.outerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.focus();
      setTimeout(() => {
        printWindow?.print();
        printWindow?.close();
      }, 1000);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Link
          to={"/edit"}
          className="bg-green-500 text-white p-4 px-6 m-4 transition-colors hover:bg-green-700 rounded-md flex items-center gap-2 font-mono"
        >
          <FaEdit />
          Edit PDF
        </Link>
        <button
          className="bg-red-500 text-white p-4 px-6 m-4 transition-colors hover:bg-red-700 rounded-md flex items-center gap-2 font-mono"
          onClick={handlePrint}
        >
          <FaFilePdf />
          Generate PDF
        </button>
      </div>
      <div className="flex-1 grid place-items-center">
        <div className="border border-black">
        <Resume data={data} ref={resumeRef} />
        </div>
      </div>
    </div>
  );
}
