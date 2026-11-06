import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as eventsApi } from "./events-Dtjwkx07.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events._slug-CqaAPIwi.js
var $$splitComponentImporter = () => import("./events._slug-DReAYS7o.mjs");
var $$splitErrorComponentImporter = () => import("./events._slug-BoSsfi16.mjs");
var $$splitNotFoundComponentImporter = () => import("./events._slug-06JaGm_8.mjs");
var Route = createFileRoute("/events/$slug")({
	loader: async ({ params }) => {
		const event = await eventsApi.bySlug(params.slug);
		if (!event) throw notFound();
		return { event };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Opportunity not found — CampusPulse" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { event } = loaderData;
		return { meta: [
			{ title: `${event.title} — CampusPulse` },
			{
				name: "description",
				content: event.summary
			},
			{
				property: "og:title",
				content: `${event.title} — CampusPulse`
			},
			{
				property: "og:description",
				content: event.summary
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
