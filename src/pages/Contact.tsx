const Contact = () => {
  const handleResumeDownload = () => {
    window.open("/resume.pdf", "_blank");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-background-secondary shadow-md rounded-lg text-center">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">About Me</h1>
      <p className="text-md text-text-primary mb-6">
        Hi, I'm Tannaz Shirzadi! I'm a passionate and experienced Front-End
        Developer with over 5 years of expertise in building interactive,
        user-friendly web applications using React.js, Next.js, and TypeScript.
        I enjoy crafting elegant and functional user experiences, collaborating
        with teams, and staying up-to-date with the latest technologies.
      </p>
      <h2 className="text-lg font-semibold text-text-primary mb-2">
        Contact Me
      </h2>
      <p className="text-md text-text-primary mb-6">
        Email:{" "}
        <a
          href="mailto:tia.shr97@gmail.com"
          className="text-highlight underline"
        >
          tia.shr97@gmail.com
        </a>
      </p>
      <button
        onClick={handleResumeDownload}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Download My Resume
      </button>
    </div>
  );
};

export default Contact;
