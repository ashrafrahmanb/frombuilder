import {
  ArrowDownCircleIcon,
  LinkIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import axiosClient from "../axios.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ExportToExcel } from "../components/ExportToExcel";

export default function SurveyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [apiData, setApiData] = useState([]);

  const onDelete = () => {};
  const BaseURL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/survey/details/${id}`)
        .then((res) => {
          setLoading(false);
          setData(res.data);
          // reshaping the xlxs array
          const customHeadings = [];
          res.data.answers.map((anss) => {
            var object = Object.assign(
              {},
              ...anss.answers.map((item) => ({
                [item.question.question]: item.answer,
              }))
            );
            customHeadings.push(object);
          });
          setApiData(customHeadings);
          return res;
        })
        .catch((error) => {
          setLoading(false);
          return error;
        });
    }
  }, []);
  console.log(apiData);
  const fileName = data.data?.slug;
  return (
    <PageComponent
      title="Survey Details Information"
      buttons={
        <div className="flex gap-2">
          <ExportToExcel apiData={apiData} fileName={fileName} />
          <TButton color="green" href={`/survey/public/${data.data?.slug}`}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Public Link
          </TButton>
          <TButton color="red" onClick={onDelete}>
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete
          </TButton>
        </div>
      }
    >
      {loading && <div className="text-center text-lg">Loading...</div>}
      {!loading && (
        <div className="sm:columns-2xl lg:columns-5xl xl:columns-7xl shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6 text-center">
            <img
              src={`${BaseURL}/${data.data?.image}`}
              className="w-auto mx-auto"
            />
            <h3 className="font-bold text-xl">{data.data?.title}</h3>
            <p className="text-xl mb-3">{data.data?.description}</p>
            <div className="flex justify-between text-sm mb-1">
              <div>Create Date:</div>
              <div>{data.data?.created_at}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Expire Date:</div>
              <div>{data.data?.expire_date}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Status:</div>
              <div>{data.data?.status ? "Active" : "Draft"}</div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <div>Total Questions:</div>
              <div>
                {data.data?.questions ? data.data?.questions.length : 0}
              </div>
            </div>
            {/* Question data */}
            <div className="card animated fadeInDown">
              <table>
                <thead>
                  <tr>
                    {data.data?.questions
                      ? data.data?.questions.map((q, ind) => (
                          <th key={ind}>{q.question}</th>
                        ))
                      : null}
                  </tr>
                </thead>
                {loading && (
                  <tbody>
                    <tr>
                      <td colSpan="5" class="text-center">
                        Loading...
                      </td>
                    </tr>
                  </tbody>
                )}
                {!loading && (
                  <tbody>
                    {data.answers
                      ? data.answers.map((q, ind) => (
                          <tr key={ind}>
                            {q.answers
                              ? q.answers.map((ans, ind) => (
                                  <td key={ind}>{ans.answer}</td>
                                ))
                              : null}
                          </tr>
                        ))
                      : null}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
