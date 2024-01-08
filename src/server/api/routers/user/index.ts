import { createTRPCRouter } from "~/server/api/trpc";

import { searchProcedure } from "~/server/api/routers/user/search";
import { profileProcedure } from "~/server/api/routers/user/profile";
import { byUsernameProcedure } from "~/server/api/routers/user/by-username";
import { followProcedure } from "~/server/api/routers/user/follow";
import { updateProcedure } from "~/server/api/routers/user/update";

export const userRouter = createTRPCRouter({
  profile: profileProcedure,
  byUsername: byUsernameProcedure,
  search: searchProcedure,
  toggleFollow: followProcedure,
  update: updateProcedure,
});
