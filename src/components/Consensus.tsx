import { Discussion } from "../lib/data";
import { takeOpinion } from "../lib/takeOpinion";

export const Consensus = ({ discussion }: { discussion: Discussion }) => {
  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);
  // if all is positive
  if (vs.every((v) => v > 0)) {
    return (
      <div className="text-center bg-green-500 p-2 border">
        <p>Consensus: Yes</p>
      </div>
    );
  }
  // if all is negative
  if (vs.every((v) => v < 0)) {
    return (
      <div className="text-center bg-red-500 p-2 border">
        <p>Consensus: No</p>
      </div>
    );
  }
  // if all is positive or neutral
  if (vs.every((v) => v >= 0)) {
    return (
      <div className="text-center bg-green-900 p-2 border">
        <p>Consensus: Weak Yes</p>
      </div>
    );
  }
  // if all is negative or neutral
  if (vs.every((v) => v <= 0)) {
    return (
      <div className="text-center bg-red-900 p-2 border">
        <p>Consensus: Weak No</p>
      </div>
    );
  }
  // else
  return (
    <div className="text-center bg-gray-700 p-2 border">
      <p>Not reaching a consensus</p>
    </div>
  );
};
