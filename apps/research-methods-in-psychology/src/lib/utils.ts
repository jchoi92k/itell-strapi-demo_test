import { env } from "@/env.mjs";
import * as Sentry from "@sentry/nextjs";
import { redirect } from "next/navigation";

export const getYoutubeLinkFromEmbed = (url: string) => {
  // eslint-disable-next-line prefer-named-capture-group
  const regex = /embed\/([\w-]+)\?/;
  const match = regex.exec(url);

  if (match) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }

  return url;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const makeInputKey = (slug: string) => {
  return `${slug}-summary`;
};

export const makePageHref = (slug: string | null, chunk?: string) => {
  if (!slug) {
    return "/";
  }
  return `/${slug}${chunk ? `#${chunk}` : ""}`;
};

export const redirectWithSearchParams = (
  path: string,
  searchParams?: unknown
) => {
  const url = new URL(path, env.NEXT_PUBLIC_HOST);
  if (typeof searchParams === "object" && searchParams !== null) {
    for (const key in searchParams) {
      // @ts-ignore
      url.searchParams.append(key, searchParams[key]);
    }
  }
  return redirect(url.toString());
};

export const scrollToElement = (element: HTMLElement) => {
  // offset to account for the sticky header
  const yOffset = -70;
  const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

export const reportSentry = (msg: string, extra: any) => {
  console.log("reporting to sentry", msg, extra);
  Sentry.captureMessage(msg, {
    extra,
  });
};

export const insertNewline = (textarea: HTMLTextAreaElement) => {
  textarea.value = `${textarea.value}\n`;
  textarea.selectionStart = textarea.value.length;
  textarea.selectionEnd = textarea.value.length;
};
