import Image from "next/image";
import Link from "next/link";

export default function CarrouselItem({
  href,
  img,
  title,
  episodeNumber,
}: {
  href: string;
  src: string;
  img: string;
  title: string;
  episodeNumber: string;
}) {
  return (
    <div className="carrousel-item expand">
      <Link href={href}>
        <p className="carrousel-text">
          {title} {episodeNumber}
        </p>
        <Image src={img} alt={title} width={800} height={220}></Image>
      </Link>
    </div>
  );
}
