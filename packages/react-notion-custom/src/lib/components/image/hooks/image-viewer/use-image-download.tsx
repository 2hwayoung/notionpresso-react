import { useCallback } from "react";

export const useImageDownload = (url: string) => {
  const handleDownload = useCallback(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function () {
      const blob = xhr.response;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "";
      link.click();
      window.URL.revokeObjectURL(link.href);
    };
    xhr.send();
  }, [url]);

  return { handleDownload };
};
