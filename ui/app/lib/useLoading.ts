import { useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false);

  async function withLoading(promise: Promise<unknown>) {
    setLoading(true);
    await promise;
    setLoading(false);
  }

  return [loading, withLoading] as [
    boolean,
    (promise: Promise<unknown>) => Promise<void>
  ];
}
