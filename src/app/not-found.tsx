import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="grid h-[60vh] w-full place-items-center text-center">
      <div>
        <h2 className=" text-xl font-black sm:text-3xl md:text-4xl">
          Page was not found
        </h2>
        <Button variant="link">
          <Link href="/">Go back to home</Link>
        </Button>
      </div>
    </div>
  );
}
