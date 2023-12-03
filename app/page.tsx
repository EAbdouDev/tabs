import HomeNavBar from "@/components/Navigations/HomeNavBar";
import ThemeSwitcher from "@/components/Themes/ThemeSwitcher";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav>
        <HomeNavBar />
      </nav>

      <main>Helloo</main>
    </div>
  );
}
