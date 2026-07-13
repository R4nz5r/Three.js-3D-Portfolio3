import React, { useState } from "react";

const DownloadCVButton = () => {
  const cvPath = "/assets/Ragib_Shahrier_CV.pdf";
  const cvUrl = "https://www.ragibshahrier.com/assets/Ragib_Shahrier_CV.pdf";
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Ragib_Shahrier_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ragib Shahrier - Resume",
          text: "Check out my resume",
          url: cvUrl,
        });
      } catch (err) {
        // user cancelled, do nothing
        console.error("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(cvUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleDownload}
        title="Download CV"
        className="flex items-center justify-center transition rounded-full cursor-pointer size-12 bg-white/10 hover:bg-white/20 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>

      <button
        onClick={handleShare}
        title={copied ? "Link Copied!" : "Share CV"}
        className="flex items-center justify-center transition rounded-full cursor-pointer size-12 bg-white/10 hover:bg-white/20 hover:scale-105"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default DownloadCVButton;
