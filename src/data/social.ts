import type { ComponentType, SVGProps } from "react";
import { IconGithub, IconLinkedin, IconMail, IconX } from "../components/icons";

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:harkirat.hira@gmail.com",
    handle: "harkirat.hira@gmail.com",
    icon: IconMail,
  },
  {
    label: "GitHub",
    href: "https://github.com/harkirat155",
    handle: "@harkirat155",
    icon: IconGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harkirat155",
    handle: "in/harkirat155",
    icon: IconLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/Harkirat155",
    handle: "@Harkirat155",
    icon: IconX,
  },
];
