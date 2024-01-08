import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import { Breadcrumb } from "~/components/breadcrumb";
import { EditProfileForm } from "~/components/user/edit-profile-form";

export default async function EditPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="w-full space-y-12">
      <Breadcrumb />

      <EditProfileForm />
    </div>
  );
}
