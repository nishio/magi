// minimum page
import { Navigation } from "@/components/Navigation";
import React, { useEffect } from "react";
import "../app/globals.css";
import { DiscussionView } from "@/components/DiscussionView";

import { firebaseConfig } from "../lib/firestore_app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Link from "next/link";
import { initializeApp } from "firebase/app";

// make spinner component
const Spinner = () => {
  return (
    <div className="spinner-border" role="status">
      <span>Generating...</span>
    </div>
  );
};

export default function AddTopic() {
  const [result, setResult] = React.useState("");
  const [key, setKey] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");

  useEffect(() => {
    setKey(localStorage.getItem("openai-api-key") || "");
  }, []);

  const submitTopic = () => {
    setIsLoading(true);

    const elem = document.getElementById("topic")! as HTMLInputElement;
    const topic = elem.value;
    fetch("/api/get_answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: topic }),
    }).then((res) => {
      console.log(res);
      res.json().then(({ response }) => {
        setResult(response);
        setIsLoading(false);
      });
    });
  };

  const saveToDatabase = async () => {
    if (!result) return;
    const obj = JSON.parse(result);
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    obj.createdAt = serverTimestamp();
    const docRef = await addDoc(collection(firestore, "topics"), obj);

    console.log("Document written with ID: ", docRef.id);
    const shareableUrl = `/t/${docRef.id}`;
    setUrl(shareableUrl);
  };
  return (
    <div className="bg-slate-800 text-white min-h-screen">
      <div className="md:mx-4 md:my-4">
        <Navigation />

        <div className="mt-4">
          <h1 className="text-3xl font-bold">Add a Topic</h1>
          <h2 className="text-xl font-semibold mt-4">OpenAI API Key</h2>
          <input
            className="w-full p-2 mt-2 bg-gray-900"
            type="password"
            placeholder="OpenAI API Key"
            id="openai-api-key"
            defaultValue={key}
          />
          <div className="mt-4">
            <button
              className="mr-4 px-4 py-2 bg-blue-900 text-white rounded"
              onClick={() => {
                const elem = document.getElementById(
                  "openai-api-key"
                )! as HTMLInputElement;
                const key = elem.value;
                localStorage.setItem("openai-api-key", key);
                setKey(key);
              }}
            >
              Save to LocalStorage
            </button>
            <button
              className="px-4 py-2 bg-red-900 text-white rounded"
              onClick={() => {
                localStorage.removeItem("openai-api-key");
                setKey("");
              }}
            >
              Clear from LocalStorage
            </button>
          </div>
          <p className="mt-4">
            The server does not save the key. You can store the key in the local
            storage of your browser (for your convinience, optional) and clear
            it.
          </p>

          {/* Set Topic */}

          <h2 className="text-xl font-semibold mt-4">Set Topic</h2>
          <input
            className="w-full p-2 mt-2 bg-gray-900"
            type="text"
            placeholder="Topic"
            id="topic"
          />
          <p className="mt-4">
            Topics are used to start a discussion. Topics should be a statement
            or question, which can be answered with a yes or no.
          </p>
          <div className="flex items-center">
            <button
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={submitTopic}
            >
              Submit Topic
            </button>
            {isLoading && <Spinner />}
          </div>
          <p className="mt-4">
            It calls GPT-4 three times to generate answer from three different
            viewpoints. It takes a minute.
          </p>

          {/* Result */}

          <h2 className="text-xl font-semibold mt-4">Results</h2>

          {result && <DiscussionView discussion={JSON.parse(result)} />}
          <div>
            Raw output for debugging:
            <pre className="mt-5 p-4 border border-gray-300 rounded bg-gray-900">
              {result}
            </pre>
          </div>

          {/* Save */}

          <h2 className="text-xl font-semibold mt-4">Save and publish</h2>
          <p className="mt-4">
            You can save the topic and responses to the database and publish it.
            After save it, you can get link to share it.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={saveToDatabase}
          >
            Save to Database
          </button>
          <input
            className="w-full p-2 mt-2 bg-gray-900"
            type="text"
            placeholder="URL to share"
            defaultValue={url && window.location.origin + url}
          />
          {url && (
            <Link href={url}>
              {window.location.origin}
              {url}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
