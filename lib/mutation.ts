import featcher from "./featcher";
export const auth = (
  mode: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return featcher(`/${mode}`, body);
};
