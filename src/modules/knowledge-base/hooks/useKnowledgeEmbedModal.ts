import axios from "axios";
import { useState } from "react";

export function useKnowledgeEmbed() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (file, jsonData) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Append JSON data as a separate field
      if (jsonData) {
        formData.append("data", JSON.stringify(jsonData));
      }

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response here as needed
      console.log(response.data);

      setIsLoading(false);
    } catch (error_) {
      setError(error_.message);
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    upload,
  };
}
