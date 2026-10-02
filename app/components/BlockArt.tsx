import Image from "next/image";

type BlockArtProps = {
  accent?: "coral" | "brick" | "wine" | "sand";
  compact?: boolean;
  image?: string;
  alt?: string;
};

export function BlockArt({ accent = "coral", compact = false, image, alt = "تصویر معماری پروژهٔ نمونه" }: BlockArtProps) {
  if (image) {
    return (
      <div className={`block-art image-art accent-${accent} ${compact ? "compact" : ""}`}>
        <Image src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        <span className="image-art-shade" />
      </div>
    );
  }

  return (
    <div className={`block-art accent-${accent} ${compact ? "compact" : ""}`}>
      <span className="art-sun" />
      <span className="art-block art-block-a" />
      <span className="art-block art-block-b" />
      <span className="art-block art-block-c" />
      <span className="art-block art-block-d" />
      <span className="art-window art-window-a" />
      <span className="art-window art-window-b" />
      <span className="art-ground" />
      <span className="art-code">KH / 0{accent === "coral" ? "1" : accent === "brick" ? "2" : accent === "wine" ? "3" : "4"}</span>
    </div>
  );
}
