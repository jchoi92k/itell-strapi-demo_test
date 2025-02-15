import { cn } from "@itell/utils";

interface BlockquoteProps extends React.ComponentPropsWithoutRef<"figure"> {
	children: React.ReactNode;
	className?: string;
	author?: string;
	role?: string;
}

export declare namespace Blockquote {
	export type Props = BlockquoteProps;
}

export const Blockquote = ({
	children,
	className,
	author,
	role,
	...rest
}: BlockquoteProps) => {
	return (
		<figure
			className={cn("max-w-screen-md mx-auto text-center", className)}
			{...rest}
		>
			<svg
				aria-hidden="true"
				className="size-4 mx-auto mb-3"
				viewBox="0 0 24 27"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
					fill="currentColor"
				/>
			</svg>
			<blockquote className="border-none">
				<div className="text-lg italic font-medium">{children}</div>
			</blockquote>
			<figcaption className="flex items-center justify-center mt-4 space-x-3 text-lg">
				<div className="flex items-center divide-x-2">
					{author && <cite className="pr-3 font-medium">{author}</cite>}
					{role && <cite className="pl-3 text-muted-foreground ">{role}</cite>}
				</div>
			</figcaption>
		</figure>
	);
};
