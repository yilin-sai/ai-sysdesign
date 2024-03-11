/* eslint-disable @next/next/no-img-element */

"use client";

import { FormEvent, useState } from "react";
import clsx from "clsx";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { getSysDesign } from "./lib/api";
import { AxiosError } from "axios";
import useLoading from "./lib/useLoading";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const [diagramUrl, setDiagramUrl] = useState();
  const [users, setUsers] = useState("");
  const [fr, setFr] = useState("");
  const [nfr, setNfr] = useState("");
  const [other, setOther] = useState("");
  const [err, setErr] = useState({
    title: "",
    message: "",
  });
  const [loading, withLoading] = useLoading();

  async function generateDiagram(e: FormEvent) {
    e.preventDefault();
    await getSysDesign({
      users,
      functionalReq: fr,
      nonfunctionalReq: nfr,
      other,
    })
      .then((res) => {
        if (res.data.status === "OK") {
          setDiagramUrl(res.data.diagramUrl);
        } else if (res.data.status === "REFUSED") {
          setDiagramUrl(undefined);
          setErr({
            title: "ChatGPT refused to generate diagram",
            message: res.data.answer,
          });
        }
      })
      .catch((error: AxiosError) => {
        setDiagramUrl(undefined);
        if (error.response?.status === 500)
          setErr({
            title: "ChatGPT generated problematic code. Please try again.",
            message: "",
          });
        else setErr({ title: "Error", message: error.message });
      });
  }

  return (
    <main className="flex flex-col min-h-screen md:flex-row">
      <div className="flex flex-col basis-2/5 p-8 bg-white">
        <div className="flex items-center min-h-24">
          <h1 className={`text-2xl font-medium`}>
            Generate Your System Architecture
          </h1>
        </div>
        <div>
          <form onSubmit={(e) => withLoading(generateDiagram(e))}>
            <div className="space-y-12">
              <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Users:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="users"
                        name="users"
                        required
                        rows={3}
                        value={users}
                        onChange={(e) => setUsers(e.target.value)}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Functional requirements:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="fr"
                        name="fr"
                        rows={3}
                        required
                        value={fr}
                        onChange={(e) => setFr(e.target.value)}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Non-functional requirements:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="nfr"
                        name="nfr"
                        rows={3}
                        required
                        value={nfr}
                        onChange={(e) => setNfr(e.target.value)}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Other considerations:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="other"
                        name="other"
                        rows={3}
                        value={other}
                        onChange={(e) => setOther(e.target.value)}
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => {
                  setUsers("");
                  setFr("");
                  setNfr("");
                  setOther("");
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={clsx("basis-3/5 p-8", {
          hidden: loading,
        })}
      >
        <div
          className={clsx("flex items-center justify-center", {
            hidden: diagramUrl === undefined,
          })}
        >
          <img src={diagramUrl} alt="system diagram" />
        </div>
        <div
          className={clsx({
            hidden: diagramUrl !== undefined,
          })}
        >
          <div style={{ height: "40vh" }}></div>
          <div>
            {err.title !== "" ? (
              <Alert severity="error">
                <AlertTitle>{err.title}</AlertTitle>
                {err.message}
              </Alert>
            ) : (
              <Alert variant="filled" severity="info">
                Your system diagram will be shown here.
              </Alert>
            )}
          </div>
          <div style={{ height: "40vh" }}></div>
        </div>
      </div>
      <div
        className={clsx("basis-3/5 p-8 flex items-center justify-center", {
          hidden: !loading,
        })}
      >
        <div>
          <CircularProgress
            size={48}
            sx={{
              color: "primary",
            }}
          />
        </div>
      </div>
    </main>
  );
}
