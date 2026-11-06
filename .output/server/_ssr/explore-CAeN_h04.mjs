import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-CAeN_h04.js
var $$splitComponentImporter = () => import("./explore-Dhq2iFPj.mjs");
var Route = createFileRoute("/explore")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" ? search["q"] : void 0,
		category: typeof search["category"] === "string" ? search["category"] : void 0,
		university: typeof search["university"] === "string" ? search["university"] : void 0,
		organization: typeof search["organization"] === "string" ? search["organization"] : void 0,
		mode: typeof search["mode"] === "string" ? search["mode"] : void 0,
		opportunityType: typeof search["opportunityType"] === "string" ? search["opportunityType"] : void 0,
		participationScope: typeof search["participationScope"] === "string" ? search["participationScope"] : void 0,
		musicGenre: typeof search["musicGenre"] === "string" ? search["musicGenre"] : void 0,
		dramaGenre: typeof search["dramaGenre"] === "string" ? search["dramaGenre"] : void 0,
		programType: typeof search["programType"] === "string" ? search["programType"] : void 0,
		fundingType: typeof search["fundingType"] === "string" ? search["fundingType"] : void 0,
		courseLevel: typeof search["courseLevel"] === "string" ? search["courseLevel"] : void 0,
		sort: [
			"recommended",
			"deadline",
			"newest",
			"trending"
		].includes(search["sort"]) ? search["sort"] : "recommended"
	}),
	head: () => ({ meta: [
		{ title: "Explore Opportunities — CampusPulse" },
		{
			name: "description",
			content: "Search and discover university music shows, drama performances, MSc/PhD higher studies, university courses, hackathons, and campus opportunities."
		},
		{
			property: "og:title",
			content: "Explore Opportunities — CampusPulse"
		},
		{
			property: "og:description",
			content: "Discover music, drama, higher studies, university courses and competitions across universities."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
