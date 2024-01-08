import { DesktopNavigation } from "~/components/desktop-navigation";
import { MobileNavigation } from "~/components/mobile-navigation";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 mx-auto w-full bg-gradient-to-b from-background via-background to-transparent py-6">
      <div className="container">
        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </header>
  );
}
