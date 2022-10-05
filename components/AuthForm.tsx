import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutation";

interface AuthProps {
  mode: "signin" | "signup";
}
const AuthForm: FC<AuthProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await auth(mode, { email, password });
      router.push("/");
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <Box height={"100vh"} width="100vw" bg={"black"}>
      <Flex
        justify={"center"}
        align="center"
        height={"100px"}
        borderBottom="white 1px solid"
      >
        Welcome To App
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding={"60px"} bg={"gray.900"} borderRadius="3px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Enter your Email"
              type={"email"}
              color={"white"}
              marginBottom="2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              color={"white"}
              placeholder="Enter your Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              bg={"green.400"}
              isLoading={isLoading}
              marginTop="10px"
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export { AuthForm };
