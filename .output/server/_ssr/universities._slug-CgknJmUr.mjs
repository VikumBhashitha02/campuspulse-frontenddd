import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/universities._slug-CgknJmUr.js
var $$splitComponentImporter = () => import("./universities._slug-BOK4GOVH.mjs");
var $$splitNotFoundComponentImporter = () => import("./universities._slug-BJm0Mu4a.mjs");
var Route = createFileRoute("/universities/$slug")({
	loader: async ({ params }) => {
		const university = await directoryApi.university(params.slug);
		if (!university) throw notFound();
		return { university };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "University not found — CampusPulse" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { university } = loaderData;
		return { meta: [
			{ title: `${university.name} — CampusPulse` },
			{
				name: "description",
				content: university.about
			},
			{
				property: "og:title",
				content: `${university.name} — CampusPulse`
			},
			{
				property: "og:description",
				content: university.about
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
