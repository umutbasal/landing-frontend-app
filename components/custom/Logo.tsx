"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { SITE } from "@hhs/constants/metadata";
import { useMounted } from "@hhs/hooks/useMounted";
import { motion } from 'framer-motion';

interface WrapperProps extends React.PropsWithChildren {
  className?: string;
}

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

export function AsciiLogo({ className }: WrapperProps) {
  const asciiArt = `
             .*@@@@@@@%.
             .%@@@@@@@@.            
              #@@@@@@@@.            
             .#@@@@@@@@.            
             .#@@@@@@@#.            
                      .*@@@@@@@*    
                       %@@@@@@@*.   
                       #@@@@@@@%.   
                       #@@@@@@@#    
                      .#@@@@@@@+    
    .%@@@@@@#.#@@@@@@%:-%@@@@@@+    
    +@@@@@@@@.@@@@@@@@-%@@@@@@@*    
    =@@@@@@@@.@@@@@@@@=#@@@@@@@@.   
    =@@@@@@@@.@@@@@@@@-#@@@@@@@#.   
   .=@@@@@@@@.@@@@@@@@-*@@@@@@@*    
       .....   ......   ......      
                                    
`;

  const lines = asciiArt.split('\n');
  return (
    <div className={className}>
      {lines.map((line, index) => {
        return (
          <motion.pre
            key={index}
            className='text-primary text-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {line}
          </motion.pre>
        );
      })}
    </div>
  );
}

export default Logo;
