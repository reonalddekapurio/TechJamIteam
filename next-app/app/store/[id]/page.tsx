import GetStore from "@/app/components/store/get-store";
import { FooterNavItem } from "@/components/shared/FooterNavItem";

export default function StorePage() {
  return (
    <div>
      <GetStore />
      <div>
        <FooterNavItem />
      </div>
    </div>
  );
}
