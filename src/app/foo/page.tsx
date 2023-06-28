import { Blue } from "@/blue";
import { wait } from "@/util";

export const dynamic = "force-dynamic";

export default function Home() {
  return <Test />;
}

async function Test() {
  await wait(750);
  return <Blue id="test-component-blue">test component blue</Blue>;
}
