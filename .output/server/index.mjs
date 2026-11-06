globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-10-03T17:58:52.733Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1dbc-V5LatsYP6ADlw6KuxY05GGRQoiU\"",
		"mtime": "2026-10-03T17:58:52.726Z",
		"size": 7612,
		"path": "../public/favicon.png"
	},
	"/brand/campuspulse-logo.jpg": {
		"type": "image/jpeg",
		"etag": "\"12696-USHEBmYnZ6PpKPEmHkT6JxNRINg\"",
		"mtime": "2026-11-05T19:32:46.859Z",
		"size": 75414,
		"path": "../public/brand/campuspulse-logo.jpg"
	},
	"/assets/account.calendar-BWp3KMyC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cdd-3VJFXACkJuFGhtg/hkAvG3+bmX8\"",
		"mtime": "2026-11-05T19:44:59.102Z",
		"size": 7389,
		"path": "../public/assets/account.calendar-BWp3KMyC.js"
	},
	"/assets/account-B3PQsivb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98f-gsRrxdyIy8N8k7sC5x9c6+Uj9tM\"",
		"mtime": "2026-11-05T19:44:59.100Z",
		"size": 2447,
		"path": "../public/assets/account-B3PQsivb.js"
	},
	"/assets/account.payments-CnWK7CSC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a5b-qwHsPX3PDvDbuhoks479cuH8fWY\"",
		"mtime": "2026-11-05T19:44:59.128Z",
		"size": 19035,
		"path": "../public/assets/account.payments-CnWK7CSC.js"
	},
	"/assets/account.index-DRK0OvE-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a6d-zV5/1Ztn3+hwk2vC4hGnUXW/Raw\"",
		"mtime": "2026-11-05T19:44:59.117Z",
		"size": 10861,
		"path": "../public/assets/account.index-DRK0OvE-.js"
	},
	"/assets/account.registrations-D7WdK-MY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36c6-pDROnRtPuaNMJG0TVuxUKOOcC9w\"",
		"mtime": "2026-11-05T19:44:59.199Z",
		"size": 14022,
		"path": "../public/assets/account.registrations-D7WdK-MY.js"
	},
	"/assets/account.profile--AvKS1Oe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8984-rfhN7rP1R+FqtvhGAlNWPNlYljY\"",
		"mtime": "2026-11-05T19:44:59.147Z",
		"size": 35204,
		"path": "../public/assets/account.profile--AvKS1Oe.js"
	},
	"/assets/account.teams.index-prTm0yYW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7768-SOFWg7axv52l7ditpglEitGa55Y\"",
		"mtime": "2026-11-05T19:44:59.244Z",
		"size": 30568,
		"path": "../public/assets/account.teams.index-prTm0yYW.js"
	},
	"/assets/account.notifications-FhlJvqK5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c72-gdqYw864OrbQafHZg+nwNVZyKfc\"",
		"mtime": "2026-11-05T19:44:59.122Z",
		"size": 7282,
		"path": "../public/assets/account.notifications-FhlJvqK5.js"
	},
	"/assets/account.volunteering-BmIyDW-l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"89ff-X2AQX9atYA+9d6ZwjrxkX0+HdLA\"",
		"mtime": "2026-11-05T19:44:59.289Z",
		"size": 35327,
		"path": "../public/assets/account.volunteering-BmIyDW-l.js"
	},
	"/assets/account.teams._id-BnB5Prhs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"478c-Z9S4INZNtquai8LZx6n2b4X6+xA\"",
		"mtime": "2026-11-05T19:44:59.221Z",
		"size": 18316,
		"path": "../public/assets/account.teams._id-BnB5Prhs.js"
	},
	"/assets/account.saved-DmXiTyzJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a09-P9z5XSIdkx6AbmOoYdP9yl6XCho\"",
		"mtime": "2026-11-05T19:44:59.218Z",
		"size": 2569,
		"path": "../public/assets/account.saved-DmXiTyzJ.js"
	},
	"/assets/arrow-left-Cn35R30f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-fHHGjPfQghc9Y05OOJn5YNICcbI\"",
		"mtime": "2026-11-05T19:45:00.714Z",
		"size": 165,
		"path": "../public/assets/arrow-left-Cn35R30f.js"
	},
	"/assets/arrow-right-9365r-9g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-hhlyt+kr497RBKWcFhoG+2G5feE\"",
		"mtime": "2026-11-05T19:45:00.714Z",
		"size": 165,
		"path": "../public/assets/arrow-right-9365r-9g.js"
	},
	"/assets/button-DjeUFmju.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7d0f-wt/fO/0IvjAYZph156JC7D7Yu7Y\"",
		"mtime": "2026-11-05T19:45:00.720Z",
		"size": 32015,
		"path": "../public/assets/button-DjeUFmju.js"
	},
	"/assets/building-2-Gno0EeuG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f-UE8PMAE1oSTdx+GjzGx6qyc6t/8\"",
		"mtime": "2026-11-05T19:45:00.717Z",
		"size": 383,
		"path": "../public/assets/building-2-Gno0EeuG.js"
	},
	"/assets/calendar-days-COCaFO9t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-w8hJ3pF5TB6pQBBFU4wnQSrx+4E\"",
		"mtime": "2026-11-05T19:45:00.745Z",
		"size": 494,
		"path": "../public/assets/calendar-days-COCaFO9t.js"
	},
	"/assets/Badges-CyXxWflG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4357-6/XcakgSHlWd1jmc9s29ojJuKE0\"",
		"mtime": "2026-11-05T19:44:59.021Z",
		"size": 17239,
		"path": "../public/assets/Badges-CyXxWflG.js"
	},
	"/assets/calendar-clock-CikP_mja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a-H73AH9SfpBdltWuAiuk2olDzRBA\"",
		"mtime": "2026-11-05T19:45:00.744Z",
		"size": 378,
		"path": "../public/assets/calendar-clock-CikP_mja.js"
	},
	"/assets/camera-sXkE3ezY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150-SDHYRHhr85CMgXOa4rELBe304Nk\"",
		"mtime": "2026-11-05T19:45:00.747Z",
		"size": 336,
		"path": "../public/assets/camera-sXkE3ezY.js"
	},
	"/assets/Cards-QJc0Enk-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f48-PnVK1TVGurDxh2UQpyH7721Cy3k\"",
		"mtime": "2026-11-05T19:44:59.032Z",
		"size": 8008,
		"path": "../public/assets/Cards-QJc0Enk-.js"
	},
	"/assets/building-By_ktPzf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"233-HPtO4zswtuuAdCHfR8jMzBpk8aI\"",
		"mtime": "2026-11-05T19:45:00.717Z",
		"size": 563,
		"path": "../public/assets/building-By_ktPzf.js"
	},
	"/assets/admin-C-CCaMn8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d100e-2mFGQGW5jpXp28TzR38bjAcm+O4\"",
		"mtime": "2026-11-05T19:44:59.346Z",
		"size": 856078,
		"path": "../public/assets/admin-C-CCaMn8.js"
	},
	"/assets/circle-check-5cuBJeB_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-oiMDoirKcYfVWjnfoazKKVloRSQ\"",
		"mtime": "2026-11-05T19:45:00.751Z",
		"size": 178,
		"path": "../public/assets/circle-check-5cuBJeB_.js"
	},
	"/assets/circle-alert-EgReQ1sN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-XFazBAwAKEi7i6ETEZmn+OMh/Yk\"",
		"mtime": "2026-11-05T19:45:00.750Z",
		"size": 250,
		"path": "../public/assets/circle-alert-EgReQ1sN.js"
	},
	"/assets/clock-p_AiHkzW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-6MC5dkGHTGmFY7ZgHheQUDMKwqw\"",
		"mtime": "2026-11-05T19:45:00.759Z",
		"size": 169,
		"path": "../public/assets/clock-p_AiHkzW.js"
	},
	"/assets/circle-plus-BYUzjQB3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-8Vo4c88LsQx482gMmGMZepgWjr0\"",
		"mtime": "2026-11-05T19:45:00.751Z",
		"size": 207,
		"path": "../public/assets/circle-plus-BYUzjQB3.js"
	},
	"/assets/chevron-left-C3mH1W_F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-549aWPjGD86BgBcBBZvHcet7EBM\"",
		"mtime": "2026-11-05T19:45:00.748Z",
		"size": 130,
		"path": "../public/assets/chevron-left-C3mH1W_F.js"
	},
	"/assets/circle-x-R--PF3qu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-XlBtP4sJQu+D47LonQoOnwHBd6s\"",
		"mtime": "2026-11-05T19:45:00.752Z",
		"size": 207,
		"path": "../public/assets/circle-x-R--PF3qu.js"
	},
	"/assets/copy-fO1J6XPu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec-0+MqWsJZibbfwA+T8QDfZg2QWAU\"",
		"mtime": "2026-11-05T19:45:00.760Z",
		"size": 236,
		"path": "../public/assets/copy-fO1J6XPu.js"
	},
	"/assets/client-DWEVv1Vr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1390-tVM5IKPBRDJ7HsrPzlp6yOoLeqw\"",
		"mtime": "2026-11-05T19:45:00.753Z",
		"size": 5008,
		"path": "../public/assets/client-DWEVv1Vr.js"
	},
	"/assets/createLucideIcon-CDejS5Oc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c7-yAgGPif2cjUWcneWMzimZwjBY+k\"",
		"mtime": "2026-11-05T19:45:00.761Z",
		"size": 1223,
		"path": "../public/assets/createLucideIcon-CDejS5Oc.js"
	},
	"/assets/credit-card-BPXoqkDo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-6ORJhD4GbIKN0+E10U6z4ZDsv1g\"",
		"mtime": "2026-11-05T19:45:00.764Z",
		"size": 207,
		"path": "../public/assets/credit-card-BPXoqkDo.js"
	},
	"/assets/dist-D0eaq8Ck.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30f8-hOq8nDn7wOPEsuk84U0svUMBIX4\"",
		"mtime": "2026-11-05T19:45:00.770Z",
		"size": 12536,
		"path": "../public/assets/dist-D0eaq8Ck.js"
	},
	"/assets/crown-Nnv_B18B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a-IHqAtSTDvdoLDYPNsOkI0tkWtRM\"",
		"mtime": "2026-11-05T19:45:00.765Z",
		"size": 362,
		"path": "../public/assets/crown-Nnv_B18B.js"
	},
	"/assets/dialog-BL-Vkc_Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"858-95gzgFPyB8Le2GigYILp12XXa2w\"",
		"mtime": "2026-11-05T19:45:00.767Z",
		"size": 2136,
		"path": "../public/assets/dialog-BL-Vkc_Y.js"
	},
	"/assets/events._slug-Biff2DtE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-zHi+PWWhrbx/TTxLYz6CnMS1tCE\"",
		"mtime": "2026-11-05T19:45:00.780Z",
		"size": 242,
		"path": "../public/assets/events._slug-Biff2DtE.js"
	},
	"/assets/external-link-wFKOkDeg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-MXWtdEdHBZff9pvCahlUaZ+n1VA\"",
		"mtime": "2026-11-05T19:45:00.924Z",
		"size": 251,
		"path": "../public/assets/external-link-wFKOkDeg.js"
	},
	"/assets/dist-CdyWhH9E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2dc-GyaWsPM5G+rwI52rEBExYmS4gzE\"",
		"mtime": "2026-11-05T19:45:00.768Z",
		"size": 732,
		"path": "../public/assets/dist-CdyWhH9E.js"
	},
	"/assets/explore-Bn4vuDHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8147-u3Ps057mwYcTKQ1X7KEltcMtCaE\"",
		"mtime": "2026-11-05T19:45:00.873Z",
		"size": 33095,
		"path": "../public/assets/explore-Bn4vuDHz.js"
	},
	"/assets/events._slug-DjsL6pAT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"246-iWhk4GGNMOTOJMxBFOlJQ48hUqQ\"",
		"mtime": "2026-11-05T19:45:00.872Z",
		"size": 582,
		"path": "../public/assets/events._slug-DjsL6pAT.js"
	},
	"/assets/events._slug-Cz_576aK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef15-d8ww4IWYkPrwSSXufD3Whcr2ZLY\"",
		"mtime": "2026-11-05T19:45:00.782Z",
		"size": 61205,
		"path": "../public/assets/events._slug-Cz_576aK.js"
	},
	"/assets/eye-R07em-7B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-dq1C7Tkry0R51YnOvJT6Hv0lU7I\"",
		"mtime": "2026-11-05T19:45:00.925Z",
		"size": 256,
		"path": "../public/assets/eye-R07em-7B.js"
	},
	"/assets/file-text-LXoYrko_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-9s8a0eF17dzMa2e6fLUXenLFO44\"",
		"mtime": "2026-11-05T19:45:00.926Z",
		"size": 385,
		"path": "../public/assets/file-text-LXoYrko_.js"
	},
	"/assets/file-check-corner-DXG94qwG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13b-ynaSwQIMicDztgmQHiLp0H4Xxxs\"",
		"mtime": "2026-11-05T19:45:00.926Z",
		"size": 315,
		"path": "../public/assets/file-check-corner-DXG94qwG.js"
	},
	"/assets/flag-V2uFFGLA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-Ma86P99TpTYkfW6/f59WC8Nj6Gs\"",
		"mtime": "2026-11-05T19:45:00.976Z",
		"size": 254,
		"path": "../public/assets/flag-V2uFFGLA.js"
	},
	"/assets/flame-ByYjqGpF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-R66ejQSqV9TS/8Qh5m/s6+s6kJ0\"",
		"mtime": "2026-11-05T19:45:00.977Z",
		"size": 199,
		"path": "../public/assets/flame-ByYjqGpF.js"
	},
	"/assets/funnel-le33cvgv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"262-AjzRB9gJlVuyuq1mVC2Nmr8yLu4\"",
		"mtime": "2026-11-05T19:45:00.998Z",
		"size": 610,
		"path": "../public/assets/funnel-le33cvgv.js"
	},
	"/assets/forgot-password-BfOqqk3v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84d-VJYsT25QD9C9skmaP2qM/VGWZRY\"",
		"mtime": "2026-11-05T19:45:00.982Z",
		"size": 2125,
		"path": "../public/assets/forgot-password-BfOqqk3v.js"
	},
	"/assets/format-BaXmbSta.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51a7-9ndyxZgZ7uj20SWz83uYm6xXt70\"",
		"mtime": "2026-11-05T19:45:00.984Z",
		"size": 20903,
		"path": "../public/assets/format-BaXmbSta.js"
	},
	"/assets/firebase-th7KgIGU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dfca-lO+PQiNBN5UO1lCsY6IbK7cm6gw\"",
		"mtime": "2026-11-05T19:45:00.928Z",
		"size": 122826,
		"path": "../public/assets/firebase-th7KgIGU.js"
	},
	"/assets/index-DwsePsvy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a043-twfCNtUGweVNBkVGr3tjhhmrguI\"",
		"mtime": "2026-11-05T19:44:58.449Z",
		"size": 499779,
		"path": "../public/assets/index-DwsePsvy.js"
	},
	"/assets/info-DzcUtpTS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc-usvA1mh2mSHF2QGcMcJsuXV7lsY\"",
		"mtime": "2026-11-05T19:45:01.002Z",
		"size": 204,
		"path": "../public/assets/info-DzcUtpTS.js"
	},
	"/assets/label-Dce292dB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ca-47IoMPqhLF5wwhLcFm4MzGd6QBU\"",
		"mtime": "2026-11-05T19:45:01.006Z",
		"size": 714,
		"path": "../public/assets/label-Dce292dB.js"
	},
	"/assets/heart-handshake-C2_W7lYm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca-iWHYiAaD/LNk/YyjfYPhKQLV0D4\"",
		"mtime": "2026-11-05T19:45:01.001Z",
		"size": 458,
		"path": "../public/assets/heart-handshake-C2_W7lYm.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-11-05T19:45:01.003Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/layout-grid--Oj5ka9k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-wIBOkFRGOJJ0RI2tuBfgRFm/zqw\"",
		"mtime": "2026-11-05T19:45:01.007Z",
		"size": 346,
		"path": "../public/assets/layout-grid--Oj5ka9k.js"
	},
	"/assets/loader-circle-DZCiHoMl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-+vUu3i3Ej64tgT1EMLuoH6MCQ2w\"",
		"mtime": "2026-11-05T19:45:01.020Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DZCiHoMl.js"
	},
	"/assets/list-CIarGKSk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e-45sWST1R6NNt6YDScqBbWSoT/XU\"",
		"mtime": "2026-11-05T19:45:01.017Z",
		"size": 302,
		"path": "../public/assets/list-CIarGKSk.js"
	},
	"/assets/link-8IvxqKxT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb0-nHN8rX+bp+I7QJo6eTAS/jhIN2Y\"",
		"mtime": "2026-11-05T19:45:01.009Z",
		"size": 7856,
		"path": "../public/assets/link-8IvxqKxT.js"
	},
	"/assets/lock-goqiNfRw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-s/+f7eIPrh1xv7r/aispZVtkiDY\"",
		"mtime": "2026-11-05T19:45:01.022Z",
		"size": 206,
		"path": "../public/assets/lock-goqiNfRw.js"
	},
	"/assets/mail-i2nzM4Ez.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-1duQJnjpemIZXu7G2amxpE5irz4\"",
		"mtime": "2026-11-05T19:45:01.034Z",
		"size": 213,
		"path": "../public/assets/mail-i2nzM4Ez.js"
	},
	"/assets/login-psRtgw8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dea-adtTGO7TKpjUfx0uPKNYPKsXi+0\"",
		"mtime": "2026-11-05T19:45:01.023Z",
		"size": 7658,
		"path": "../public/assets/login-psRtgw8g.js"
	},
	"/assets/matchContext-CSvjJIwF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b8-685sA1DDdyCD4pN3PTwSBA+uBts\"",
		"mtime": "2026-11-05T19:45:01.036Z",
		"size": 696,
		"path": "../public/assets/matchContext-CSvjJIwF.js"
	},
	"/assets/megaphone-CAjUj6tU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a-+XVslkloEy5JMTNvwHd/6b7QwUo\"",
		"mtime": "2026-11-05T19:45:01.038Z",
		"size": 346,
		"path": "../public/assets/megaphone-CAjUj6tU.js"
	},
	"/assets/message-square-Cvv6RE-x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-uIkPHukAfyZazk0Nk49uXsVi1IM\"",
		"mtime": "2026-11-05T19:45:01.038Z",
		"size": 233,
		"path": "../public/assets/message-square-Cvv6RE-x.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-11-05T19:45:01.115Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/mock-data-BAcZU0we.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab6b-+CBY/ReSv22yFBeKFqQKKX+gP+0\"",
		"mtime": "2026-11-05T19:45:01.040Z",
		"size": 43883,
		"path": "../public/assets/mock-data-BAcZU0we.js"
	},
	"/assets/OpportunityCard-D6wCEFa9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"346e-T9E5Y9v9xDko4/Rfy8oNFdaXIxM\"",
		"mtime": "2026-11-05T19:44:59.035Z",
		"size": 13422,
		"path": "../public/assets/OpportunityCard-D6wCEFa9.js"
	},
	"/assets/organizations._slug-BqALUvpd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-2H5z/6EnBsS4qqkjhZ0zG3cmG8g\"",
		"mtime": "2026-11-05T19:45:01.116Z",
		"size": 262,
		"path": "../public/assets/organizations._slug-BqALUvpd.js"
	},
	"/assets/organizations._slug-QRnbZZ7c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cc7-pJLUGBcsTe1+uOBkN56wJxRuh2I\"",
		"mtime": "2026-11-05T19:45:01.118Z",
		"size": 15559,
		"path": "../public/assets/organizations._slug-QRnbZZ7c.js"
	},
	"/assets/participation-DxdJx29x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"767-13yXS7figJ1W7/5V63DTuYi9Vdc\"",
		"mtime": "2026-11-05T19:45:01.280Z",
		"size": 1895,
		"path": "../public/assets/participation-DxdJx29x.js"
	},
	"/assets/pencil-_8XKOB0M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-2CDdFFVCfdjlIEqjEvDbeApiAVI\"",
		"mtime": "2026-11-05T19:45:01.283Z",
		"size": 276,
		"path": "../public/assets/pencil-_8XKOB0M.js"
	},
	"/assets/plus-RpWfmYTu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-MLL2IzwqOuFwe2tnuiuFdu+tQcI\"",
		"mtime": "2026-11-05T19:45:01.284Z",
		"size": 153,
		"path": "../public/assets/plus-RpWfmYTu.js"
	},
	"/assets/printer-DmGzeLyy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f-IfbhLfaOSb4ZY9gHTNI1lTaIF/k\"",
		"mtime": "2026-11-05T19:45:01.287Z",
		"size": 319,
		"path": "../public/assets/printer-DmGzeLyy.js"
	},
	"/assets/QueryClientProvider-B_q_HvNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"198-Qg+BnnX5Mj3WBNut0ARJKrlYdBE\"",
		"mtime": "2026-11-05T19:44:59.054Z",
		"size": 408,
		"path": "../public/assets/QueryClientProvider-B_q_HvNW.js"
	},
	"/assets/qr-code-BPt2JbHO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28a-e33ukvPBkyYtZ6MqWuWUeSjj+tg\"",
		"mtime": "2026-11-05T19:45:01.290Z",
		"size": 650,
		"path": "../public/assets/qr-code-BPt2JbHO.js"
	},
	"/assets/QrCode-FDgPdQki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66e-xn0OWp7TODm15i4vqgneeBWb56g\"",
		"mtime": "2026-11-05T19:44:59.052Z",
		"size": 1646,
		"path": "../public/assets/QrCode-FDgPdQki.js"
	},
	"/assets/RequireRole-D_lYMl9u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdb-2eUwszhBCt5Pi9Pb+HmB6yKw/V8\"",
		"mtime": "2026-11-05T19:44:59.056Z",
		"size": 3035,
		"path": "../public/assets/RequireRole-D_lYMl9u.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-11-05T19:45:01.291Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/organizer-BaxCjh8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61790-yXUlNGVu9Yx7E+FmJJgPLgLf9CE\"",
		"mtime": "2026-11-05T19:45:01.143Z",
		"size": 399248,
		"path": "../public/assets/organizer-BaxCjh8g.js"
	},
	"/assets/reset-password-C-tMTidT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1533-rg6VTAg+qPWlwv0yycRAwpp7H94\"",
		"mtime": "2026-11-05T19:45:01.316Z",
		"size": 5427,
		"path": "../public/assets/reset-password-C-tMTidT.js"
	},
	"/assets/register--3MwxHi4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33cc-rCle60To/JzqBsmfXJ9AUObQRZY\"",
		"mtime": "2026-11-05T19:45:01.295Z",
		"size": 13260,
		"path": "../public/assets/register--3MwxHi4.js"
	},
	"/assets/routes-Btx4QPfb.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"7c2-hz/5L4nu9O/T4Up6iT1jaKfm93E\"",
		"mtime": "2026-11-05T19:45:01.454Z",
		"size": 1986,
		"path": "../public/assets/routes-Btx4QPfb.css"
	},
	"/assets/rotate-ccw-CA50tnlf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b7-lQEgr4+qvDL08m1Mu5PjSZLw9ew\"",
		"mtime": "2026-11-05T19:45:01.320Z",
		"size": 439,
		"path": "../public/assets/rotate-ccw-CA50tnlf.js"
	},
	"/assets/Section-Cd_ilmMK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"796-O50SCpspM8oUW2TPV7r9RDfzIJM\"",
		"mtime": "2026-11-05T19:44:59.059Z",
		"size": 1942,
		"path": "../public/assets/Section-Cd_ilmMK.js"
	},
	"/assets/send-DkwE6sOK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-zvLts4UJ/9io4Wz4Gn+HxIuP/Zc\"",
		"mtime": "2026-11-05T19:45:01.387Z",
		"size": 290,
		"path": "../public/assets/send-DkwE6sOK.js"
	},
	"/assets/routes-Ck80F1Rj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"92fb-TGgrQkFqTPeIKc8z7SAKZbWXJL0\"",
		"mtime": "2026-11-05T19:45:01.322Z",
		"size": 37627,
		"path": "../public/assets/routes-Ck80F1Rj.js"
	},
	"/assets/settings-BV4tMIG_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-6j+5eovN5FttHCxq1LzW2ssPw3o\"",
		"mtime": "2026-11-05T19:45:01.389Z",
		"size": 487,
		"path": "../public/assets/settings-BV4tMIG_.js"
	},
	"/assets/shield-check-beeGHqlD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-G4vQLXlKu1/lQB/3mJnhdrUW08Y\"",
		"mtime": "2026-11-05T19:45:01.390Z",
		"size": 320,
		"path": "../public/assets/shield-check-beeGHqlD.js"
	},
	"/assets/skeleton-BCyUJz6L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5-5/fQcKOzavVxiKK2Natax7FefZs\"",
		"mtime": "2026-11-05T19:45:01.391Z",
		"size": 229,
		"path": "../public/assets/skeleton-BCyUJz6L.js"
	},
	"/assets/sliders-horizontal-ByrN-yCz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-VBcCivOMZN2LmchUy89Fg4F3KjM\"",
		"mtime": "2026-11-05T19:45:01.393Z",
		"size": 424,
		"path": "../public/assets/sliders-horizontal-ByrN-yCz.js"
	},
	"/assets/sparkles-B0vJG2Lc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38f-mNwYB173BxyHLA6aK2g7CzXVBL4\"",
		"mtime": "2026-11-05T19:45:01.394Z",
		"size": 911,
		"path": "../public/assets/sparkles-B0vJG2Lc.js"
	},
	"/assets/States-CIWk_8Xg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1191-UmXjzL7DihPd9oHKTXW+UFV+P/c\"",
		"mtime": "2026-11-05T19:44:59.061Z",
		"size": 4497,
		"path": "../public/assets/States-CIWk_8Xg.js"
	},
	"/assets/styles-DD9HwC0b.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2e6a7-PevWMw8T/TVXKLsPnNqOfoO6Dok\"",
		"mtime": "2026-11-05T19:45:01.455Z",
		"size": 190119,
		"path": "../public/assets/styles-DD9HwC0b.css"
	},
	"/assets/SubmitPaymentClaimDialog-G3C715QZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bf5-kZwyuP5RonpBmlm/5sAs1wiHUOk\"",
		"mtime": "2026-11-05T19:44:59.066Z",
		"size": 19445,
		"path": "../public/assets/SubmitPaymentClaimDialog-G3C715QZ.js"
	},
	"/assets/tabs-B8EKYcs1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfe-VGgwe1FmaWZWLPJwmF3nMXdSR5I\"",
		"mtime": "2026-11-05T19:45:01.401Z",
		"size": 3582,
		"path": "../public/assets/tabs-B8EKYcs1.js"
	},
	"/assets/switch-Cqg4qbbe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ed-G3GIIAuEN8Hs8D3ia1HwXrS3mTI\"",
		"mtime": "2026-11-05T19:45:01.397Z",
		"size": 4333,
		"path": "../public/assets/switch-Cqg4qbbe.js"
	},
	"/assets/textarea-B6Gq6H9X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"224-K1vGkuM1OZcTm9TP2AyNX8bG7jE\"",
		"mtime": "2026-11-05T19:45:01.404Z",
		"size": 548,
		"path": "../public/assets/textarea-B6Gq6H9X.js"
	},
	"/assets/trash-2-13LZ2AWC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-gY9uMQXZfXl0LA5Qg9JyWuhtBt8\"",
		"mtime": "2026-11-05T19:45:01.405Z",
		"size": 328,
		"path": "../public/assets/trash-2-13LZ2AWC.js"
	},
	"/assets/undo-2-Bt4Kxl6K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-EJjlf5y7gFQaZnKPQYDdMMfnFx4\"",
		"mtime": "2026-11-05T19:45:01.405Z",
		"size": 208,
		"path": "../public/assets/undo-2-Bt4Kxl6K.js"
	},
	"/assets/universities-DBf_86rS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-6Po5vULp3SCsD+GfEreo5eNnxOE\"",
		"mtime": "2026-11-05T19:45:01.407Z",
		"size": 142,
		"path": "../public/assets/universities-DBf_86rS.js"
	},
	"/assets/universities.index-BmsY_BHT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59a-YgcpIGuSpGtrS1zFroE/vGjx9fI\"",
		"mtime": "2026-11-05T19:45:01.415Z",
		"size": 1434,
		"path": "../public/assets/universities.index-BmsY_BHT.js"
	},
	"/assets/universities._slug-CNrJ5UK2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19d-jwpiQOqGGJo3DNO9LYQ0I8R5mrc\"",
		"mtime": "2026-11-05T19:45:01.408Z",
		"size": 413,
		"path": "../public/assets/universities._slug-CNrJ5UK2.js"
	},
	"/assets/upload-D4SYcfAI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-Vaw8c63v4lQX4SQX2BKlzRKhd2Y\"",
		"mtime": "2026-11-05T19:45:01.418Z",
		"size": 230,
		"path": "../public/assets/upload-D4SYcfAI.js"
	},
	"/assets/universities._slug-DYiyJsJI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18a6-eivsg96XFtjjB0+aZwq9Kpq4M6A\"",
		"mtime": "2026-11-05T19:45:01.409Z",
		"size": 6310,
		"path": "../public/assets/universities._slug-DYiyJsJI.js"
	},
	"/assets/user-check-CfQiGqGI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-wOlveSXagZ5J0NcKd0N40dB4adI\"",
		"mtime": "2026-11-05T19:45:01.449Z",
		"size": 243,
		"path": "../public/assets/user-check-CfQiGqGI.js"
	},
	"/assets/useMutation-BDYBIAlQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"974-5W62X44xPxIpcatz1x16nXN1WMY\"",
		"mtime": "2026-11-05T19:45:01.419Z",
		"size": 2420,
		"path": "../public/assets/useMutation-BDYBIAlQ.js"
	},
	"/assets/UserProfileModal-DpK1-c9a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f43-p65sEfi2fAV1xelKPvy4k8MnTKM\"",
		"mtime": "2026-11-05T19:44:59.094Z",
		"size": 8003,
		"path": "../public/assets/UserProfileModal-DpK1-c9a.js"
	},
	"/assets/useStore-BO6fe4Dm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b11-KFKRJxFPxUan+0gZnoj/HuO11ys\"",
		"mtime": "2026-11-05T19:45:01.427Z",
		"size": 19217,
		"path": "../public/assets/useStore-BO6fe4Dm.js"
	},
	"/assets/volunteering-wWg7sWNG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1901-GYFTKG2gCHAcXC5CFt62dem9psE\"",
		"mtime": "2026-11-05T19:45:01.451Z",
		"size": 6401,
		"path": "../public/assets/volunteering-wWg7sWNG.js"
	},
	"/institutions/bikku.jpg": {
		"type": "image/jpeg",
		"etag": "\"5cb2-/X7Eb9iAfsluy8iiZeoipmGNeIQ\"",
		"mtime": "2026-11-04T21:05:30.606Z",
		"size": 23730,
		"path": "../public/institutions/bikku.jpg"
	},
	"/institutions/bpu.jpg": {
		"type": "image/jpeg",
		"etag": "\"49c0-XFNtqvJNrJY7emyEGZDIIjpwfdI\"",
		"mtime": "2026-11-04T21:06:03.243Z",
		"size": 18880,
		"path": "../public/institutions/bpu.jpg"
	},
	"/institutions/cinec.jpg": {
		"type": "image/jpeg",
		"etag": "\"d1ff-Z1Mw6EVF37NpaSBhMNlcRLV8i0s\"",
		"mtime": "2026-11-04T21:06:57.597Z",
		"size": 53759,
		"path": "../public/institutions/cinec.jpg"
	},
	"/institutions/eusl.jpg": {
		"type": "image/jpeg",
		"etag": "\"5fd2-wx/7nx1h9f1NVCy76Wyotc0EN7c\"",
		"mtime": "2026-11-04T21:08:34.548Z",
		"size": 24530,
		"path": "../public/institutions/eusl.jpg"
	},
	"/institutions/gwu.jpg": {
		"type": "image/jpeg",
		"etag": "\"5aaa2-/FnvnzXLp/IcetiMPq/kkvxxNyQ\"",
		"mtime": "2026-11-04T21:10:07.470Z",
		"size": 371362,
		"path": "../public/institutions/gwu.jpg"
	},
	"/institutions/IIT.jpg": {
		"type": "image/jpeg",
		"etag": "\"1a76-eXElaNW0QcGerwv0+yvvP2LGV+s\"",
		"mtime": "2026-11-05T06:09:06.173Z",
		"size": 6774,
		"path": "../public/institutions/IIT.jpg"
	},
	"/institutions/kdu.jpg": {
		"type": "image/jpeg",
		"etag": "\"599a-wbfYuZwzXNBzDlmblCEthyAkz7Q\"",
		"mtime": "2026-11-04T21:10:40.070Z",
		"size": 22938,
		"path": "../public/institutions/kdu.jpg"
	},
	"/institutions/nsbm.jpg": {
		"type": "image/jpeg",
		"etag": "\"77b3-+QkYwXVggtW2eOZWe+VD2T1c5s4\"",
		"mtime": "2026-11-05T06:47:56.171Z",
		"size": 30643,
		"path": "../public/institutions/nsbm.jpg"
	},
	"/institutions/ocean.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f243-jBeoXhtcQBE23DoZp248qrnn/JQ\"",
		"mtime": "2026-11-05T06:10:19.335Z",
		"size": 127555,
		"path": "../public/institutions/ocean.jpg"
	},
	"/institutions/ousl.jpg": {
		"type": "image/jpeg",
		"etag": "\"135fc-WkK0NGMiYdb/VoZy6rAsGULcS8g\"",
		"mtime": "2026-11-04T21:03:18.269Z",
		"size": 79356,
		"path": "../public/institutions/ousl.jpg"
	},
	"/institutions/sliit.jpg": {
		"type": "image/jpeg",
		"etag": "\"2392-aY7NczM4cZDorZANDZoWuRAu684\"",
		"mtime": "2026-11-04T21:03:40.023Z",
		"size": 9106,
		"path": "../public/institutions/sliit.jpg"
	},
	"/institutions/slit.jpg": {
		"type": "image/jpeg",
		"etag": "\"2392-aY7NczM4cZDorZANDZoWuRAu684\"",
		"mtime": "2026-11-04T21:03:40.023Z",
		"size": 9106,
		"path": "../public/institutions/slit.jpg"
	},
	"/institutions/rusl.jpg": {
		"type": "image/jpeg",
		"etag": "\"617cb-WFkXB3t7fVKYXHho2/VYJdIoAUU\"",
		"mtime": "2026-11-04T21:02:26.004Z",
		"size": 399307,
		"path": "../public/institutions/rusl.jpg"
	},
	"/institutions/sltc.jpg": {
		"type": "image/jpeg",
		"etag": "\"f7be-HU6bYEXVP/cr2GmUV3iNhv+Wt8I\"",
		"mtime": "2026-11-05T06:15:20.763Z",
		"size": 63422,
		"path": "../public/institutions/sltc.jpg"
	},
	"/institutions/univo.jpg": {
		"type": "image/jpeg",
		"etag": "\"43a3-SeVWDGGTzgiFy+3G1ODF3yuSIxY\"",
		"mtime": "2026-11-05T06:12:41.862Z",
		"size": 17315,
		"path": "../public/institutions/univo.jpg"
	},
	"/institutions/southers.jpg": {
		"type": "image/jpeg",
		"etag": "\"6028-aAGOuu3vu9MieaIaqQ90ZN/GFBk\"",
		"mtime": "2026-11-05T06:10:52.916Z",
		"size": 24616,
		"path": "../public/institutions/southers.jpg"
	},
	"/institutions/uoc.jpg": {
		"type": "image/jpeg",
		"etag": "\"1bf5e-vC4fOiElbhOJV8xg59HPVSirPjU\"",
		"mtime": "2026-11-04T20:58:08.507Z",
		"size": 114526,
		"path": "../public/institutions/uoc.jpg"
	},
	"/institutions/uoj.jpg": {
		"type": "image/jpeg",
		"etag": "\"ac98-FSNfFibuNjZ135O7W7Yyj4CuAgg\"",
		"mtime": "2026-11-04T20:59:42.644Z",
		"size": 44184,
		"path": "../public/institutions/uoj.jpg"
	},
	"/institutions/uom.jpg": {
		"type": "image/jpeg",
		"etag": "\"a88c-TJ+6pG1xOoWiCZuCV8Eriy2t5b8\"",
		"mtime": "2026-11-04T20:56:17.629Z",
		"size": 43148,
		"path": "../public/institutions/uom.jpg"
	},
	"/institutions/uop.jpg": {
		"type": "image/jpeg",
		"etag": "\"8a4e-MDnFWEeF97BExCzkNs0lVgbpx8c\"",
		"mtime": "2026-11-05T06:11:51.263Z",
		"size": 35406,
		"path": "../public/institutions/uop.jpg"
	},
	"/institutions/uok.jpg": {
		"type": "image/jpeg",
		"etag": "\"1010b-/uBKEJzNvd3rl+9SMU2G2llAs7I\"",
		"mtime": "2026-11-04T20:57:14.914Z",
		"size": 65803,
		"path": "../public/institutions/uok.jpg"
	},
	"/institutions/uos.jpg": {
		"type": "image/jpeg",
		"etag": "\"9606-KNIdx7B8h8ZOFsf3FKhHOKhH3m0\"",
		"mtime": "2026-11-04T21:00:59.210Z",
		"size": 38406,
		"path": "../public/institutions/uos.jpg"
	},
	"/institutions/uov.jpg": {
		"type": "image/jpeg",
		"etag": "\"13ed9-PBm5l157uw6Txwqk16FPMT8Th8s\"",
		"mtime": "2026-11-04T21:12:06.693Z",
		"size": 81625,
		"path": "../public/institutions/uov.jpg"
	},
	"/institutions/uor.jpg": {
		"type": "image/jpeg",
		"etag": "\"4af2-0H9ekxK9FRSv+UuQoUXuXJuDGTo\"",
		"mtime": "2026-11-04T21:00:15.573Z",
		"size": 19186,
		"path": "../public/institutions/uor.jpg"
	},
	"/institutions/uwa.jpg": {
		"type": "image/jpeg",
		"etag": "\"1f78-btcAZhikpeGtvqRBq+wHSIYfP1M\"",
		"mtime": "2026-11-05T06:14:24.289Z",
		"size": 8056,
		"path": "../public/institutions/uwa.jpg"
	},
	"/institutions/uow.jpg": {
		"type": "image/jpeg",
		"etag": "\"301dd-ATxsTzDPeGPbff/1iFe2HADThGU\"",
		"mtime": "2026-11-04T21:01:26.449Z",
		"size": 197085,
		"path": "../public/institutions/uow.jpg"
	},
	"/institutions/usj.jpg": {
		"type": "image/jpeg",
		"etag": "\"986c-VLuycMSwpt5ywYWebhILoEbCcFU\"",
		"mtime": "2026-11-04T20:59:04.063Z",
		"size": 39020,
		"path": "../public/institutions/usj.jpg"
	},
	"/institutions/visual.jpg": {
		"type": "image/jpeg",
		"etag": "\"3d84-Y8NeLbg7eMzP8CFMrZ+OCsenkYY\"",
		"mtime": "2026-11-05T06:13:47.498Z",
		"size": 15748,
		"path": "../public/institutions/visual.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_jKtkp2 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_jKtkp2
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
