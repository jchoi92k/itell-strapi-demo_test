import { allPagesSorted } from "@/lib/pages";
import { User } from "@prisma/client";

export const UserProgress = ({ user }: { user: User }) => {
	let displayProgress = "0";
	const validPages = allPagesSorted.filter((page) => page.summary);
	const userIndex = validPages.findIndex(
		(page) => page.page_slug === user.pageSlug,
	);
	const unlockedPages = userIndex === 0 ? 0 : userIndex;
	if (user.finished) {
		displayProgress = "100";
	} else if (user.pageSlug) {
		displayProgress = ((unlockedPages / validPages.length) * 100).toFixed(0);
	} else {
		displayProgress = "0";
	}
	// if user is at the first page, progress is 0
	return (
		<div className="flex items-center gap-4">
			<p className="text-muted-foreground">
				{displayProgress}% completed, {unlockedPages}/{validPages.length}{" "}
				chapters
			</p>
		</div>
	);
};
