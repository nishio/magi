// minimum page
import React from "react";

export default function Home() {
  const [result, setResult] = React.useState("");

  const onClick = () => {
    console.log("clicked");
    fetch("/api/t", {
      body: JSON.stringify({ q: document.querySelector("textarea")!.value }),
      method: "POST",
    }).then((res) => {
      console.log(res);
      res.json().then(({ response }) => {
        setResult(response);
        console.log(response);
      });
    });
  };

  return (
    <div className="p-5 border border-gray-300 rounded bg-gray-100">
      send a question to the three virtual personalities, return JSON in PRE.
      <textarea className="mb-5 p-2"></textarea>
      <button
        onClick={onClick}
        className="p-4 bg-blue-500 text-white border-none rounded"
      >
        Submit
      </button>
      <pre className="mt-5 p-4 bg-white border border-gray-300 rounded">
        {result}
      </pre>
    </div>
  );
}
