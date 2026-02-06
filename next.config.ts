import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: "yvxmjnhe4p.ufs.sh" }],
  },
};

export default nextConfig;
