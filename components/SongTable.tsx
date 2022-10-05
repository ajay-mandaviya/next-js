import React from "react";
import { Box } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
  Tab,
} from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formateDate, formatTime } from "../lib/formater";
import { useStoreActions } from "easy-peasy";

const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.chaneActiveSong);

  const handlePlay = (activeSong?: any) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg={"transparent"} color="white">
      <Box padding={"10px"} marginBottom="20px">
        <Box marginBottom={"20px"}>
          <IconButton
            aria-label="play"
            icon={<BsFillPlayFill fontSize={"30px"} />}
            colorScheme="green"
            size={"lg"}
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant={"unstyled"}>
          <Thead
            borderBottom={"1px solid"}
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => {
              return (
                <Tr
                  key={song.id}
                  onClick={() => handlePlay(song)}
                  cursor="pointer"
                  sx={{
                    transition: "all .3s",
                    "&:hover": {
                      bg: "rgba(255, 255 , 255 ,0.1)",
                    },
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td> {formateDate(song.createdAt)}</Td>
                  <Td>{formatTime(song.duration)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
export { SongTable };
