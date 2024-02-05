export const YesNo = ({ v }: { v: number }) => {
  if (v === 2) {
    return (
      <div className="bg-green-500 p-2">
        <p className="text-lg md:text-xl">STRONG YES</p>
      </div>
    );
  } else if (v == 1) {
    return (
      <div className="bg-green-700 p-2">
        <p className="text-lg md:text-xl">Yes</p>
      </div>
    );
  } else if (v == 0) {
    return (
      <div className="bg-gray-700 p-2">
        <p className="text-lg md:text-xl">Neutral</p>
      </div>
    );
  } else if (v == -1) {
    return (
      <div className="bg-red-700 p-2">
        <p className="text-lg md:text-xl">No</p>
      </div>
    );
  } else if (v == -2) {
    return (
      <div className="bg-red-500 p-2">
        <p className="text-lg md:text-xl">STRONG NO</p>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-700 p-2">
        <p className="text-lg md:text-xl">System Error</p>
      </div>
    );
  }
};
