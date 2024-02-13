import Link from "next/link";

export const FooterNavigation = () => {
  return (
    <>
      {/* footer */}
      <hr className="border-gray-400" />
      <Link href="/" className="text-blue-300 hover:text-blue-500">
        About
      </Link>
      {" / "}
      <Link href="/topics" className="text-blue-300 hover:text-blue-500">
        Other Topics
      </Link>
    </>
  );
};
