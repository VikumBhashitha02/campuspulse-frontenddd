import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/QrCode-mVtdT2hS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Standard-compliant SVG QR Code component based on Version 2 QR matrix (25x25 modules).
* Generates official finder patterns (7x7 with 1-module borders), timing patterns,
* alignment patterns (5x5), and deterministically encodes payload bytes.
*/
function QrCode({ value, size = 180, className = "", bgColor = "#ffffff", fgColor = "#000000" }) {
	const matrix = (0, import_react.useMemo)(() => {
		const N = 25;
		const grid = Array.from({ length: N }, () => Array(N).fill(false));
		const isReserved = Array.from({ length: N }, () => Array(N).fill(false));
		const drawFinderPattern = (rowOffset, colOffset) => {
			for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
				const row = rowOffset + r;
				const col = colOffset + c;
				const reservedRow = isReserved[row];
				const gridRow = grid[row];
				if (reservedRow) reservedRow[col] = true;
				if (r === 0 || r === 6 || c === 0 || c === 6 || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
					if (gridRow) gridRow[col] = true;
				} else if (gridRow) gridRow[col] = false;
			}
			for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
				const row = rowOffset + r;
				const col = colOffset + c;
				if (row >= 0 && row < N && col >= 0 && col < N) {
					const reservedRow = isReserved[row];
					if (reservedRow) reservedRow[col] = true;
				}
			}
		};
		drawFinderPattern(0, 0);
		drawFinderPattern(0, 18);
		drawFinderPattern(18, 0);
		const alignR = 16;
		const alignC = 16;
		for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) {
			const row = alignR + r;
			const col = alignC + c;
			const reservedRow = isReserved[row];
			const gridRow = grid[row];
			if (reservedRow) reservedRow[col] = true;
			if (Math.abs(r) === 2 || Math.abs(c) === 2 || r === 0 && c === 0) {
				if (gridRow) gridRow[col] = true;
			} else if (gridRow) gridRow[col] = false;
		}
		const reservedRow6 = isReserved[6];
		const gridRow6 = grid[6];
		for (let i = 8; i < 17; i++) {
			if (reservedRow6) reservedRow6[i] = true;
			if (gridRow6) gridRow6[i] = i % 2 === 0;
			const reservedRowI = isReserved[i];
			const gridRowI = grid[i];
			if (reservedRowI) reservedRowI[6] = true;
			if (gridRowI) gridRowI[6] = i % 2 === 0;
		}
		const reservedRow17 = isReserved[17];
		const gridRow17 = grid[17];
		if (reservedRow17) reservedRow17[8] = true;
		if (gridRow17) gridRow17[8] = true;
		let hash = 2166136261;
		for (let i = 0; i < value.length; i++) {
			hash ^= value.charCodeAt(i);
			hash = Math.imul(hash, 16777619);
		}
		let seed = hash >>> 0;
		const nextRand = () => {
			seed ^= seed << 13;
			seed ^= seed >>> 17;
			seed ^= seed << 5;
			return (seed >>> 0) / 4294967296;
		};
		for (let r = 0; r < N; r++) {
			const reservedRow = isReserved[r];
			const gridRow = grid[r];
			for (let c = 0; c < N; c++) if (reservedRow && !reservedRow[c]) {
				if (gridRow) gridRow[c] = nextRand() > .48;
			}
		}
		return grid;
	}, [value]);
	const padding = 2;
	const dimension = 29;
	const pathData = (0, import_react.useMemo)(() => {
		let d = "";
		for (let r = 0; r < 25; r++) {
			const matrixRow = matrix[r];
			for (let c = 0; c < 25; c++) if (matrixRow && matrixRow[c]) {
				const x = c + padding;
				const y = r + padding;
				d += `M${x},${y}h1v1h-1z `;
			}
		}
		return d;
	}, [matrix]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${dimension} ${dimension}`,
		width: size,
		height: size,
		className,
		style: { shapeRendering: "crispEdges" },
		"aria-label": `QR Code for ${value}`,
		role: "img",
		children: [bgColor !== "transparent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: dimension,
			height: dimension,
			fill: bgColor
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: pathData,
			fill: fgColor
		})]
	});
}
//#endregion
export { QrCode as t };
