import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req: any, res: any, user: any) => {
  const playListCount = await prisma.playList.count({
    where: {
      userId: user.id,
    },
  });
  res.json({ ...user, playListCount });
});
