import { Button } from "@/modules/common/components/ui/button";
import { ButtonGroup } from "@/ui/button-group";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-center w-full">
        <ButtonGroup className="mb-6">
          <Button asChild>
            <Link href="/client">Client list</Link>
          </Button>
          <Button asChild>
            <Link href="/server">Server list</Link>
          </Button>
        </ButtonGroup>
      </div>
      <div>{children}</div>
    </>
  );
}
