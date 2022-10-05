import { Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";
import React from "react";

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height={"100%"}
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15% ,${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align={"end"}>
        <Box padding={"20px"}>
          <Image
            boxSize={"160px"}
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "4px"}
          />
        </Box>
        <Box padding={"20px"} lineHeight="40px" color={"white"}>
          <Text fontSize={"xx-small"} fontWeight="bold" casing={"uppercase"}>
            {subtitle}
          </Text>
          <Text fontSize={"6xl"}>{title}</Text>
          <Text fontSize={"xx-small"} fontWeight="100" marginTop={"1"}>
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY={"50px"}>{children}</Box>
    </Box>
  );
};

export { GradientLayout };
