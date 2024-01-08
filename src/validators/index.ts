import { z } from "zod";

// Shared validation logic
export const genericValidation = z
  .string()
  .min(2, { message: "Please enter at least 2 characters." })
  .max(1000, { message: "Maximum length is 1000 characters." })
  .refine(
    (value) => {
      const alphanumericCount = (
        value.match(/[\p{Script=Arabic}\p{Script=Latin}1-9]/gu) ?? []
      ).length;
      return alphanumericCount >= 2;
    },
    {
      message: "Content must be at least 2 alphanumeric characters",
    },
  );

// Client Schema
export const ContentSchema = z.object({
  content: genericValidation,
});

export const SearchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Please enter at least one character." })
    .max(20, { message: "Maximum length is 20 characters." }),
});

export const EditUserInfoSchema = z.object({
  name: genericValidation,
  username: genericValidation,
});

// Server Schemas
export const TellSchema = z.object({
  tellContent: genericValidation,
  tellRecipientId: z.string().min(1),
  tellAuthorId: z.string().nullable(),
  tellAuthorUsername: z.string().nullable(),
});

export const ReplySchema = z.object({
  tellId: z.string().min(1),
  replyContent: genericValidation,
});

export const InfiniteTellsSchema = z.object({
  limit: z.number().optional(),
  cursor: z
    .object({
      id: z.string(),
      createdAt: z.date(),
    })
    .optional(),
});
