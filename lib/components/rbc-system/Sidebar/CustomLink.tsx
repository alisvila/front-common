

// // CustomLink.tsx
// import { ReactNode } from "react";
// // import { Link as NextLink } from "next/link";
// // import { Link as ReactLink, useLocation } from "react-router-dom";

// type CustomLinkProps = {
//   href: string;
//   children: ReactNode;
//   className?: string;
// };

// const CustomLink = ({ href, children, className }: CustomLinkProps) => {
//   const isNextJs = typeof window !== "undefined" && window.location?.origin.includes("next");

//   return isNextJs ? (
//     <NextLink href={href} className={className}>
//       {children}
//     </NextLink>
//   ) : (
//     <ReactLink to={href} className={className}>
//       {children}
//     </ReactLink>
//   );
// };

// export default CustomLink;