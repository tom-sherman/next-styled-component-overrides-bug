import { Red } from "@/red";
import { wait } from "@/util";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Test />
      {children}
    </>
  );
}

async function Test() {
  await wait(500);
  return <Red id="test-component-red">test component red</Red>;
}
