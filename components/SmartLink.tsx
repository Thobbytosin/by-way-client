"use client";

import { useRouteLoader } from "@/providers/RouteLoadingProvider";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type SmartLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export default function SmartLink({
  href,
  children,
  className,
  ...rest
}: SmartLinkProps) {
  const { setLoading } = useRouteLoader();

  return (
    <Link
      href={href}
      {...rest}
      className={className}
      onClick={() => {
        setLoading(true);
      }}
    >
      {children}
    </Link>
  );
}
