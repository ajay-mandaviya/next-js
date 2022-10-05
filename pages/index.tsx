import React from "react";
import { GradientLayout } from "../components";
import { Box, Center, Image, Flex, Badge, Text } from "@chakra-ui/react";
import prisma from "../lib/prisma";
const Home = (props: any) => {
  return (
    <GradientLayout
      image={
        "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1650457790/baatchit/man_3_dfq8h3.png"
      }
      roundImage={true}
      color={"green"}
      subtitle={"profile"}
      title="Ajay Mandaviya"
      description="10 Public Playlist"
    >
      <Box color={"white"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight="bold">
            Top Artist this Month
          </Text>
        </Box>
        <Flex>
          {props.artists.map((ar) => {
            return (
              <Box paddingX={"20px"} width="20%" key={ar.id}>
                <Box
                  bg={"gray.900"}
                  borderRadius={"4px"}
                  padding="15px"
                  width={"100%"}
                >
                  <Image
                    src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1650457790/baatchit/man_3_dfq8h3.png"
                    borderRadius={"100%"}
                  />
                  <Box marginTop={"10px"}>
                    <Text fontSize={"x-large"}>{ar.name}</Text>
                    <Text fontSize={"x-small"}>Artist</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: {
      artists,
    },
  };
};

export default Home;
