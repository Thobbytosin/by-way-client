"use client";

import { useState } from "react";

export function useRouteLoading() {
  const [loading, setLoading] = useState(false);

  return { loading, setLoading };
}
