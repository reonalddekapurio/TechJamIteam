import GetStore from "@/app/components/store/get-store";
import { GoodButton } from "@/components/features/GoodButton";
import { FooterNavItem } from "@/components/shared/FooterNavItem";

export default function StorePage() {
  return (
    <div>
      <GetStore />
      <div className="mt-[-198] flex justify-end mr-4">
        <GoodButton />
      </div>
      <div>
        <FooterNavItem />
      </div>
    </div>
  );
}
