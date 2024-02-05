// minimum page
import { Navigation } from "@/components/Navigation";
import React, { useEffect } from "react";
import "../app/globals.css";
import { DiscussionView } from "@/components/DiscussionView";

import { app } from "../lib/firestore_app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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

  useEffect(() => {
    setKey(localStorage.getItem("openai-api-key") || "");
  }, []);

  const submitTopic = () => {
    setIsLoading(true);

    const elem = document.getElementById("topic")! as HTMLInputElement;
    const topic = elem.value;
    fetch("/api/get_answer", {
      body: JSON.stringify({ q: topic }),
      method: "POST",
    }).then((res) => {
      console.log(res);
      res.json().then(({ response }) => {
        setResult(response);
        setIsLoading(false);
      });
    });
  };

  const saveToDatabase = async () => {
    const obj =
      JSON.parse(`{"id":"","topic":"Nations will be divided into smaller, overlapping communities.","viewpoints":[{"name":"Synthetic Technocracy","text":"Yes, nations being divided into smaller, overlapping communities can foster a sense of local identity and community engagement. It allows for more localized decision-making and involvement, which can lead to greater satisfaction and collaboration among community members. This approach encourages a sense of ownership and responsibility for the well-being of the community, promoting social cohesion and resilience. However, it is important to ensure that these communities are inclusive, diverse, and do not lead to the exclusion or marginalization of certain groups."},{"name":"Corporate Libertarianism","text":"No, nations should strive for unity and collaboration rather than division. Smaller, overlapping communities can lead to fragmentation and lack of cohesion among the people. It is important for nations to work together and establish common goals in order to foster stability and progress."},{"name":"Digital Democracy","text":"Yes, nations will be divided into smaller, overlapping communities. This decentralization of power and decision-making allows citizens to have a more direct say in matters that affect them. It fosters a sense of belonging and ownership over the decisions that shape their lives. Smaller communities also provide opportunities for localized solutions to unique challenges and promote inclusivity by ensuring that the diverse needs and voices of individuals are heard and represented. Overall, this shift towards smaller, overlapping communities can strengthen democracy and enable more effective governance."}]}
`);
    // if (!result) return;
    const firestore = getFirestore(app);
    try {
      obj.createdAt = serverTimestamp();
      const docRef = await addDoc(collection(firestore, "topics"), obj);

      console.log("Document written with ID: ", docRef.id);
      const shareableUrl = `${window.location.origin}/d/${docRef.id}`;
      console.log("Shareable URL: ", shareableUrl);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
          />
        </div>
      </div>
    </div>
  );
}
/*
    // <div className="p-5 border border-gray-300 rounded bg-gray-100">
    //   send a question to the three virtual personalities, return JSON in PRE.
    //   <textarea className="mb-5 p-2"></textarea>
    //   <button
    //     onClick={onClick}
    //     className="p-4 bg-blue-500 text-white border-none rounded"
    //   >
    //     Submit
    //   </button>
    //   <pre className="mt-5 p-4 bg-white border border-gray-300 rounded">
    //     {result}
    //   </pre>
    // </div>

*/
