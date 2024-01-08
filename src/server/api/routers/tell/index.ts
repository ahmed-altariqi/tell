import { createTRPCRouter } from "~/server/api/trpc";

import { unansweredProcedure } from "~/server/api/routers/tell/unanswered";
import { sendProcedure } from "~/server/api/routers/tell/send";
import { replyProcedure } from "~/server/api/routers/tell/reply";
import { deleteProcedure } from "~/server/api/routers/tell/delete";
import { infiniteTellsProcedure } from "~/server/api/routers/tell/infinite-tells";

export const tellRouter = createTRPCRouter({
  send: sendProcedure,
  reply: replyProcedure,
  delete: deleteProcedure,
  unanswered: unansweredProcedure,
  infiniteTells: infiniteTellsProcedure,
});
