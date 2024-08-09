import NextImage from "next/image";
import Link from "next/link";

import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function CarrouselItem({
  href,
  img,
  title,
  episodeNumber,
}: {
  href: string;
  img: string;
  title: string;
  episodeNumber: string;
}) {
  return (
    <Card
      isFooterBlurred
      className="border-none expand z-0"
      as={Link}
      href={href}
    >
      <Image
        as={NextImage}
        alt="Woman listing to music"
        className="object-cover"
        height={400}
        src={img}
        width={230}
      />
      <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-sm text-white/90">{title}</p>
      </CardFooter>
    </Card>
  );
}
