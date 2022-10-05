import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Player } from "./Player";
import { useStoreState } from "easy-peasy";
const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box height={"100px"} width="100vw" bg={"green.900"} padding="10px">
      <Flex align={"center"}>
        {activeSong && (
          <Box padding={"20px"} color="white" width={"30%"}>
            <Text fontSize={"large"}>{activeSong.name}</Text>
            <Text fontSize={"sm"}>{activeSong.artist.name}</Text>
          </Box>
        )}
        <Box width={"40%"} color="white">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export { PlayerBar };
