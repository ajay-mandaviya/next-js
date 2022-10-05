import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";
export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    const playlists = await prisma.playList.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    res.json(playlists);
  }
);
