import React from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Center,
  Link,
  LinkBox,
  LinkOverlay,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { useMe, usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your PlayList",
    icon: MdLibraryMusic,
    route: "/library",
  },
];
const musicMenu = [
  {
    name: "Create PlayList",
    route: "/",
    icon: MdPlaylistAdd,
  },
  {
    name: "Favorites",
    route: "/favorites",
    icon: MdFavorite,
  },
];
//const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);
const Sidebar = () => {
  const { playlist } = usePlaylist();
  const { user } = useMe();
  console.log("usr is", user);

  return (
    <Box
      width={"100%"}
      paddingX="5px"
      height="calc(100vh - 100px)"
      bg="black"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width={"120px"} marginBottom="20px" paddingX={"20px"}>
          <NextImage src={"/logo.svg"} height={60} width={60} />
        </Box>
        <Box marginBottom={"20px"}>
          <List spacing={3}>
            {navMenu.map((menu) => (
              <ListItem paddingX={"20px"} fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight={"20px"}
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color={"green.900"} />
        <Box marginTop={"20px"} marginBottom="20px">
          <List spacing={3}>
            {musicMenu.map((menu) => (
              <ListItem paddingX={"20px"} fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight={"20px"}
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color={"green.500"} />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List>
            {playlist.slice(0, 5).map((playlist) => (
              <ListItem paddingX="20px" key={playlist.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export { Sidebar };
