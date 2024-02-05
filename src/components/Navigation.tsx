export const Navigation = () => {
  return (
    <nav className="flex flex-wrap items-center space-x-2 text-sm">
      <a href="/" className="hover:underline">
        Plural Viewpoints
      </a>
      <span className="whitespace-nowrap">{">"}</span>
      <a
        href="/#political-ideologies-for-the-21st-century"
        className="font-bold hover:underline"
      >
        POLITICAL IDEOLOGIES FOR THE 21ST CENTURY
      </a>
    </nav>
  );
};
