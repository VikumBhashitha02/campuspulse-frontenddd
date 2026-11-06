import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as directoryApi } from "./directory-BaY2c_G3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/organizations._slug-1Pf8pINv.js
var $$splitComponentImporter = () => import("./organizations._slug-nU2NFMo4.mjs");
var $$splitNotFoundComponentImporter = () => import("./organizations._slug-BJBKfkI6.mjs");
var Route = createFileRoute("/organizations/$slug")({
	loader: async ({ params }) => {
		let organization = await directoryApi.organization(params.slug);
		if (!organization) {
			const all = await directoryApi.organizations();
			organization = all.find((o) => o.slug === params.slug) ?? all.find((o) => o.id === params.slug) ?? null;
		}
		if (!organization) throw notFound();
		return { organization };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Organisation not found — CampusPulse" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { organization } = loaderData;
		return { meta: [
			{ title: `${organization.name} — CampusPulse` },
			{
				name: "description",
				content: organization.description
			},
			{
				property: "og:title",
				content: `${organization.name} — CampusPulse`
			},
			{
				property: "og:description",
				content: organization.description
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
