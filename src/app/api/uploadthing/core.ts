import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerAuthSession();

      // If you throw, the user will not be able to upload
      if (session === null) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id, currentImageUrl: session.user.image };
    })
    .onUploadComplete(
      async ({ metadata: { userId, currentImageUrl }, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", userId);

        console.log("file url", file.url);

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return {
          userId,
          currentImageUrl,
          newImageUrl: file.url,
        };
      },
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
