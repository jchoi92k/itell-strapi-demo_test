"use client";

import { SessionUser } from "@/lib/auth";
import { Condition } from "@/lib/control/condition";
import { PageStatus } from "@/lib/page-status";
import { PageData } from "@/lib/utils";
import { SummaryDescription } from "./summary-description";
import { SummaryFormReread } from "./summary-form-reread";
import { SummaryFormSimple } from "./summary-form-simple";
import { SummaryFormStairs } from "./summary-form-stairs";

type Props = {
	user: NonNullable<SessionUser>;
	page: PageData;
	pageStatus: PageStatus;
	condition: string;
};

export const SummaryFormSelector = ({
	user,
	page,
	pageStatus,
	condition,
}: Props) => {
	if (condition === Condition.SIMPLE) {
		return (
			<SummaryFormSimple user={user} pageStatus={pageStatus} page={page} />
		);
	}

	return (
		<section className="grid lg:grid-cols-3 gap-8" id="page-summary">
			<section className="lg:col-span-1">
				<SummaryDescription />
			</section>
			<section className="lg:col-span-2">
				{condition === Condition.RANDOM_REREAD ? (
					<SummaryFormReread user={user} page={page} pageStatus={pageStatus} />
				) : condition === Condition.STAIRS ? (
					<SummaryFormStairs user={user} page={page} pageStatus={pageStatus} />
				) : null}
			</section>
		</section>
	);
};
