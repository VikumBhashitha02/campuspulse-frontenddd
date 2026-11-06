import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.teams._id-CMSJ7iPB.js
var $$splitComponentImporter = () => import("./account.teams._id-DvoYgMR6.mjs");
var Route = createFileRoute("/account/teams/$id")({
	head: () => ({ meta: [
		{ title: "Squad Details & Roster — CampusPulse" },
		{
			name: "description",
			content: "Squad lineup, open positions, leader applicant review, and team joining."
		},
		{
			property: "og:title",
			content: "Squad Details — CampusPulse"
		},
		{
			property: "og:description",
			content: "Team members, open roles and applicant review."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
