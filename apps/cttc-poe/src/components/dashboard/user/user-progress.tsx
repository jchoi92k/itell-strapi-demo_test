import { allPagesSorted } from "@/lib/pages";

export const UserProgress = ({
	pageSlug,
	finished,
}: { pageSlug: string | null; finished: boolean }) => {
	let displayProgress = "0";
	const validPages = allPagesSorted.filter((page) => page.summary);
	const userIndex = validPages.findIndex((page) => page.page_slug === pageSlug);
	const unlockedPages = userIndex === 0 || userIndex === -1 ? 0 : userIndex;
	if (finished) {
		displayProgress = "100";
	} else if (pageSlug) {
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
