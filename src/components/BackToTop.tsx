export const BackToTop = () => {
  // This is a simple component that provides a link to the top of the page.
  // Only visible on mobile devices.
  return (
    <div className="text-center mt-4 md:hidden">
      <a
        href="#top"
        className="hover:underline flex justify-center items-center"
      >
        <span>Back to Top</span>
      </a>
    </div>
  );
};
