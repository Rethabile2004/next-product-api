import Image from "next/image";

export default function TechItem({ src, alt, name }: { src: string; alt: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-3 w-24 md:w-28">
      <div className="w-16 h-16 md:w-20 md:h-20 relative">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 64px, 80px"
        />
      </div>
      <span className="text-sm md:text-base font-medium text-gray-700">
        {name}
      </span>
    </div>
  );
}