
export const generateToken = async () => {
  const response = await fetch("/api/generate-token", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Token generation failed");
  }

  const data = await response.json();
  return data.token;
};

