import Image from "next/image";
import { BASE_PATH, GITHUB_URL } from "@/lib/site";
import { shell } from "@/lib/styles";

export function SiteFooter() {
  return (
    <footer className="py-12">
      <div className={`${shell} flex flex-wrap items-center justify-between gap-5`}>
        <div className="flex items-center gap-2.5">
          <Image
            className="theme-dark h-[15px] w-auto opacity-85"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-dark.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
          <Image
            className="theme-light h-[15px] w-auto opacity-85"
            src={`${BASE_PATH}/brand/z3rno-wordmark-transparent-light.svg`}
            width={400}
            height={100}
            alt="z3rno"
          />
        </div>
        <div className="flex gap-6 text-[13.5px] text-text-dim">
          <a
            className="no-underline hover:text-text"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="no-underline hover:text-text"
            href={`${GITHUB_URL}-website/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
          >
            License
          </a>
        </div>
        <p className="text-[13px] text-text-dim">Apache-2.0 licensed. Built in the open.</p>
      </div>
    </footer>
  );
}
