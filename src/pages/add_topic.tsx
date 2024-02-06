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
import { prompts } from "@/lib/prompts";

// const model = "gpt-3.5-turbo"; // for local rapid test
const model = "gpt-4";

const call_gpt = async (system: string, prompt: string, key: string) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };
  const data = {
    model,
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };
  console.log("before fetch");
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  console.log("after fetch");
  // console.log(responseData);
  return responseData.choices[0].message.content;
};

// make spinner component
const Spinner = ({ state }: { state: string }) => {
  if (state === "running") {
    return <span className="animate-spin">🤔</span>;
  } else if (state === "done") {
    return <span>✅</span>;
  } else if (state === "error") {
    return <span>❌</span>;
  } else {
    return null;
  }
};

export default function AddTopic() {
  const [result, setResult] = React.useState("");
  const [key, setKey] = React.useState("");
  const [state1, setState1] = React.useState("");
  const [state2, setState2] = React.useState("");
  const [state3, setState3] = React.useState("");
  const [url, setUrl] = React.useState("");

  useEffect(() => {
    setKey(localStorage.getItem("openai-api-key") || "");
  }, []);

  const getKey = () => {
    const elem = document.getElementById("openai-api-key")! as HTMLInputElement;
    return elem.value;
  };

  const submitTopic = () => {
    setState1("running");
    setState2("running");
    setState3("running");
    const key = getKey();
    const elem = document.getElementById("topic") as HTMLInputElement;
    const topic = elem.value;

    Promise.all([
      call_gpt(prompts[0], topic, key)
        .then((response) => {
          setState1("done");
          return response;
        })
        .catch((e) => {
          setState1("error");
          console.error(e);
          return "";
        }),
      call_gpt(prompts[1], topic, key)
        .then((response) => {
          setState2("done");
          return response;
        })
        .catch((e) => {
          setState2("error");
          console.error(e);
          return "";
        }),
      call_gpt(prompts[2], topic, key)
        .then((response) => {
          setState3("done");
          return response;
        })
        .catch((e) => {
          setState3("error");
          console.error(e);
          return "";
        }),
    ]).then((results) => {
      setResult(
        JSON.stringify({
          id: "",
          topic,
          viewpoints: [
            {
              name: "Synthetic Technocracy",
              text: results[0],
            },
            {
              name: "Corporate Libertarianism",
              text: results[1],
            },
            {
              name: "Digital Democracy",
              text: results[2],
            },
          ],
        })
      );
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
    const shareableUrl = `https://magi-nishio.vercel.app/t/${docRef.id}`;
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
                const key = getKey();
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
            <Spinner state={state1} />
            <Spinner state={state2} />
            <Spinner state={state3} />
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
            defaultValue={url}
          />
          {url && <Link href={url}>{url}</Link>}
        </div>
      </div>
    </div>
  );
}
