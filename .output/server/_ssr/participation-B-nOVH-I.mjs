import { n as apiSend, r as apiUpload, t as apiGet } from "./client-DCT7i2UG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/participation-B-nOVH-I.js
var participationApi = {
	/**
	* Initiate personal or group event registration (Free or Paid).
	* Free registrations instantly generate tickets & QRs.
	* Paid registrations return a payment session with gateway checkout details.
	*/
	async initiateRegistration(dto) {
		return apiSend("POST", "/registrations", dto);
	},
	/**
	* Fetch all event registrations for the authenticated user, including linked tickets & payments.
	*/
	async getMyRegistrations() {
		return apiGet("/registrations/my");
	},
	/**
	* Cancel an event registration. If paid, triggers automated refund processing.
	*/
	async cancelRegistration(registrationId) {
		return apiSend("DELETE", `/registrations/${encodeURIComponent(registrationId)}`);
	},
	/**
	* Get all admission tickets / digital passes for the current user.
	*/
	async getMyTickets() {
		return apiGet("/tickets/my");
	},
	/**
	* Get a specific ticket by ticket ID.
	*/
	async getTicket(ticketId) {
		return apiGet(`/tickets/${encodeURIComponent(ticketId)}`);
	},
	/**
	* Get ticket by registration ID.
	*/
	async getTicketByRegistrationId(registrationId) {
		return apiGet(`/tickets/registration/${encodeURIComponent(registrationId)}`);
	},
	/**
	* Inspect status of a payment session (server-side verification).
	*/
	async getPaymentStatus(paymentId) {
		return apiGet(`/payments/${encodeURIComponent(paymentId)}`);
	},
	/**
	* Fetch all payment records for current authenticated student.
	*/
	async getMyPayments() {
		return apiGet("/payments/my-payments");
	},
	/**
	* Get digital receipt for a payment record.
	*/
	async getPaymentReceipt(paymentId) {
		return apiGet(`/payments/${encodeURIComponent(paymentId)}/receipt`);
	},
	/**
	* Request refund for a paid transaction.
	*/
	async refundPayment(paymentId, reason) {
		return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/refund`, { reason });
	},
	/**
	* Organizer Door Scanner: Independently validate attendee QR token.
	*/
	async validateTicketQr(qrToken) {
		return apiSend("POST", "/tickets/validate-qr", { qrToken });
	},
	/**
	* Organizer Door Check-In: Record attendee entry at the venue.
	*/
	async checkInTicket(qrToken, notes) {
		return apiSend("POST", "/tickets/check-in", {
			qrToken,
			notes
		});
	},
	/**
	* Organizer Door Check-Out: Record attendee exit.
	*/
	async checkOutTicket(qrToken) {
		return apiSend("POST", "/tickets/check-out", { qrToken });
	},
	/**
	* Development / Sandbox Helper: Simulate gateway webhook verification callback server-side.
	*/
	async simulateSandboxPayment(paymentId) {
		return apiSend("POST", "/payments/webhook", {
			eventType: "payment_intent.succeeded",
			eventId: `evt_dev_sandbox_${Date.now()}`,
			paymentId
		});
	},
	/**
	* Upload payment proof receipt (image or PDF, max 5MB).
	*/
	async uploadPaymentProof(file) {
		return apiUpload("/uploads/payment-proof", file);
	},
	/**
	* Submit direct-to-club bank transfer payment claim with transfer proof.
	*/
	async submitDirectPaymentClaim(paymentId, data) {
		return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/claim-direct`, data);
	},
	/**
	* Fetch payment claims for financial verification (by authorized committee officer or admin).
	*/
	async getEventPaymentClaims(params) {
		{
			const queryParts = [];
			if (params?.eventId) queryParts.push(`eventId=${encodeURIComponent(params.eventId)}`);
			if (params?.orgId) queryParts.push(`orgId=${encodeURIComponent(params.orgId)}`);
			if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);
			const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
			return apiGet(`/payments/claims${qs}`);
		}
	},
	/**
	* Verify and confirm direct bank transfer payment (Financial Officer only).
	*/
	async verifyPaymentClaim(paymentId, notes) {
		return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/verify-direct`, { notes });
	},
	/**
	* Reject direct bank transfer payment claim with mandatory reason (Financial Officer only).
	*/
	async rejectPaymentClaim(paymentId, reason) {
		return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/reject-direct`, { reason });
	}
};
//#endregion
export { participationApi as t };
