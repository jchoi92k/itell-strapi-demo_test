import "@/styles/globals.css";

import { GeistSans as FontSans } from "geist/font/sans";
import { Roboto_Slab as FontSerif } from "next/font/google";

import { RootProvider } from "@/components/provider/root-provider";
import { SiteConfig } from "@/config/site";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth";
import { isProduction } from "@/lib/constants";
import { cn } from "@itell/core/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: {
			default: SiteConfig.title,
			template: `%s | ${SiteConfig.title}`,
		},
		description: SiteConfig.description,
		metadataBase: new URL(env.HOST),
		openGraph: {
			title: SiteConfig.title,
			description: SiteConfig.description,
			type: "article",
			url: env.HOST,
			images: [
				{
					url: "/og",
				},
			],
		},
	};
}

const fontSerif = FontSerif({
	subsets: ["latin"],
	variable: "--font-serif",
});

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	const session = await getSession();

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" type="image/x-icon" href={SiteConfig.favicon} />
				{SiteConfig.latex && (
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
						integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
						crossOrigin="anonymous"
					/>
				)}
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					FontSans.className,
					fontSerif.variable,
				)}
			>
				<RootProvider session={session}>
					<TailwindIndicator />
					<main> {children} </main>
				</RootProvider>
			</body>
		</html>
	);
}

const TailwindIndicator = () => {
	if (isProduction) return null;

	return (
		<div className="fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
			<div className="block sm:hidden">xs</div>
			<div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
				sm
			</div>
			<div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
			<div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
			<div className="hidden xl:block 2xl:hidden">xl</div>
			<div className="hidden 2xl:block">2xl</div>
		</div>
	);
};
