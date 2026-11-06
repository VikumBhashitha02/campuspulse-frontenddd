import { n as format, r as differenceInCalendarDays, t as isPast } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-Cdcdxizs.js
function formatDate(iso) {
	if (!iso) return "—";
	try {
		const d = new Date(iso);
		if (isNaN(d.getTime())) return "—";
		return format(d, "d MMM yyyy");
	} catch {
		return "—";
	}
}
function formatDateTime(iso) {
	if (!iso) return "—";
	try {
		const d = new Date(iso);
		if (isNaN(d.getTime())) return "—";
		return format(d, "d MMM yyyy, h:mm a");
	} catch {
		return "—";
	}
}
function formatRange(start, end) {
	if (!start && !end) return "—";
	if (!start) return formatDate(end);
	if (!end) return formatDate(start);
	try {
		const s = new Date(start);
		const e = new Date(end);
		if (isNaN(s.getTime()) || isNaN(e.getTime())) return "—";
		if (format(s, "yyyy-MM-dd") === format(e, "yyyy-MM-dd")) return format(s, "d MMM yyyy");
		if (format(s, "MMM yyyy") === format(e, "MMM yyyy")) return `${format(s, "d")}–${format(e, "d MMM yyyy")}`;
		return `${format(s, "d MMM")} – ${format(e, "d MMM yyyy")}`;
	} catch {
		return "—";
	}
}
function deadlineInfo(iso, now = /* @__PURE__ */ new Date()) {
	const date = new Date(iso);
	const days = differenceInCalendarDays(date, now);
	if (isPast(date)) return {
		tone: "closed",
		label: "Registration closed",
		days
	};
	if (days === 0) return {
		tone: "urgent",
		label: "Closes today",
		days
	};
	if (days === 1) return {
		tone: "urgent",
		label: "Deadline tomorrow",
		days
	};
	if (days <= 7) return {
		tone: "urgent",
		label: `${days} days left`,
		days
	};
	if (days <= 21) return {
		tone: "soon",
		label: `${days} days left`,
		days
	};
	return {
		tone: "open",
		label: `Registration closes ${format(date, "MMM d")}`,
		days
	};
}
function compactNumber(n) {
	return new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(n);
}
function relativeTime(iso, now = /* @__PURE__ */ new Date()) {
	const diff = (now.getTime() - new Date(iso).getTime()) / 1e3;
	if (diff < 60) return "just now";
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
	return formatDate(iso);
}
function conversionRate(clicks, views) {
	if (!views) return 0;
	return clicks / views * 100;
}
function formatMoney(amount, currency = "LKR") {
	if (amount === void 0 || amount === null) return "Free";
	const num = typeof amount === "string" ? parseFloat(amount) : amount;
	if (isNaN(num) || num === 0) return "Free";
	return `LKR ${num.toLocaleString("en-LK", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	})}`;
}
//#endregion
export { formatDateTime as a, relativeTime as c, formatDate as i, conversionRate as n, formatMoney as o, deadlineInfo as r, formatRange as s, compactNumber as t };
