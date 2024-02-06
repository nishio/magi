export const YesNoSpan = ({ v }: { v: number }) => {
  if (v === 2) {
    return <span className="bg-green-700 px-1 mx-1">STRONG YES</span>;
  } else if (v == 1) {
    return <span className="bg-green-900 px-1 mx-1">Yes</span>;
  } else if (v == 0) {
    return <span className="bg-gray-700 px-1 mx-1">Neutral</span>;
  } else if (v == -1) {
    return <span className="bg-red-900 px-1 mx-1">No</span>;
  } else if (v == -2) {
    return <span className="bg-red-700 px-1 mx-1">STRONG NO</span>;
  } else {
    return <span className="bg-gray-700 px-1 mx-1">System Error</span>;
  }
};
