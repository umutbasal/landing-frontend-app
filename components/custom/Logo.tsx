"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { SITE } from "@hhs/constants/metadata";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  const darkLogoSrc = "/assets/hhs-white.avif";
  const lightLogoSrc = "/assets/hhs-black.avif";

  const initialLogoSrc =
    SITE.colorScheme === "dark" ? darkLogoSrc : lightLogoSrc;
  const [logoSrc, setLogoSrc] = React.useState(initialLogoSrc);
  const currentTheme = resolvedTheme || SITE.colorScheme;

  React.useEffect(() => {
    setLogoSrc(currentTheme === "dark" ? darkLogoSrc : lightLogoSrc);
  }, [resolvedTheme, currentTheme]);

  return <Image src={logoSrc} width={40} height={40} alt={SITE.title} />;
};

export default Logo;
