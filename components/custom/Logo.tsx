"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { SITE } from "@hhs/constants/metadata";
import { useMounted } from "@hhs/hooks/useMounted";

const Logo = () => {
  const mounted = useMounted();
  const { theme: currentTheme } = useTheme();

  if (!mounted) return null;

  return (
    <Image
      src={
        currentTheme === "dark"
          ? "/assets/hhs-white.avif"
          : "/assets/hhs-black.avif"
      }
      alt={SITE.title}
      width={40}
      height={40}
    />
  );
};

export default Logo;
