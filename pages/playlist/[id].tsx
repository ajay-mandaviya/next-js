import { Box } from "@chakra-ui/react";
import { JwtPayload } from "jsonwebtoken";
import React from "react";
import { GradientLayout, SongTable } from "../../components";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
const PlayList = ({ playlist }) => {
  console.log("props is", playlist);

  const getBgColor = (id: any) => {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple",
      "gray",
      "teal",
      "yellow",
    ];
    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
  };
  const color = getBgColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist?.name}
      subtitle={"Playlist"}
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user: any;
  try {
    user = validateToken(req.cookies.NEXT_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playList.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default PlayList;
