'use client';

import Image from 'next/image';
import { useState } from 'react';

interface IdeaImageProps {
  title: string;
  src: string;
}

export function IdeaImage(props: IdeaImageProps) {
  const { title, src } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative h-1/2 min-h-[150px] w-full overflow-hidden rounded-t-lg">
      {/* Next.js Image component is lazy by default */}
      <Image
        alt={title}
        className="object-cover"
        fill
        // If idea image url is forbidden, use placeholder image
        onError={() => setImgSrc('https://placehold.co/300x150/png')}
        src={imgSrc}
      />
    </div>
  );
}
