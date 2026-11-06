import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-CPIdwycX.js
var $$splitComponentImporter = () => import("./reset-password-BL2X_8lH.mjs");
var Route = createFileRoute("/reset-password")({
	validateSearch: (search) => ({
		token: typeof search["token"] === "string" ? search["token"] : void 0,
		email: typeof search["email"] === "string" ? search["email"] : void 0
	}),
	head: () => ({ meta: [
		{ title: "Set new password — CampusPulse" },
		{
			name: "description",
			content: "Create a new secure password for your CampusPulse account."
		},
		{
			property: "og:title",
			content: "Set new password — CampusPulse"
		},
		{
			property: "og:description",
			content: "Reset your CampusPulse password securely."
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
