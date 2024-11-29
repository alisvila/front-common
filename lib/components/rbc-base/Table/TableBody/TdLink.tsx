import { FC } from "react";
// import Link from "next/link";

interface Props {
  data: string;
  href?: string;
}

const TdLink: FC<Props> = ({ data }) => { 
   
  return (
    <>
      {data === "-" ? (
        <div>{data}</div>
      ) : (
        <></>
        // <Link href={href || '#'} className="rbc-text-primary rbc-underline rbc-underline-offset-8" dir="ltr">
        //   {data}
        // </Link>
      )}
    </>
  );
};

export default TdLink;
