import logo from "@/assets/teacherspoints-logo.png";
import { cn } from "@/lib/utils";

const sizeClass = {
  header: "h-12 sm:h-14 w-auto max-w-[12rem] sm:max-w-[15rem]",
  footer: "h-12 w-auto max-w-[14rem]",
  login: "h-16 sm:h-[4.5rem] w-auto max-w-[18rem]",
  sidebar: "h-10 w-auto max-w-[10rem]",
} as const;

export function BrandLogo({
  size = "header",
  className,
}: {
  size?: keyof typeof sizeClass;
  className?: string;
}) {
  return (
    <img
      src={logo}
      alt="TeachersPoints"
      className={cn("object-contain object-left shrink-0", sizeClass[size], className)}
    />
  );
}
