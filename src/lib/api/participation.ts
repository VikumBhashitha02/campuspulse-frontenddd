import { API_ENABLED, apiGet, apiSend, apiUpload, mock } from "./client";
import type {
  InitiateRegistrationDto,
  RegistrationResultDto,
  RegistrationRecord,
  EventTicketRecord,
  TicketValidationResultDto,
  CheckInTicketResultDto,
  PaymentRecord,
  PaymentClaimItem,
} from "../types";

export const participationApi = {
  /**
   * Initiate personal or group event registration (Free or Paid).
   * Free registrations instantly generate tickets & QRs.
   * Paid registrations return a payment session with gateway checkout details.
   */
  async initiateRegistration(dto: InitiateRegistrationDto): Promise<RegistrationResultDto> {
    if (API_ENABLED) {
      return apiSend<RegistrationResultDto>("POST", "/registrations", dto);
    }

    // Mock fallback
    const isPaid = false;
    return mock({
      success: true,
      requiresPayment: isPaid,
      message: isPaid ? "Payment required" : "Registration confirmed! Ticket issued.",
      tickets: [
        {
          id: "tkt_mock_1",
          ticketNumber: "TKT-2026-MOCK99",
          qrToken: "cptok_tkt_mock_preview_token",
          registrationId: "reg_mock_1",
          eventId: dto.eventId,
          userId: "user_mock",
          status: "ISSUED",
          issuedAt: new Date().toISOString(),
        },
      ],
    });
  },

  /**
   * Fetch all event registrations for the authenticated user, including linked tickets & payments.
   */
  async getMyRegistrations(): Promise<RegistrationRecord[]> {
    if (API_ENABLED) {
      return apiGet<RegistrationRecord[]>("/registrations/my");
    }
    return mock([]);
  },

  /**
   * Cancel an event registration. If paid, triggers automated refund processing.
   */
  async cancelRegistration(registrationId: string): Promise<{ success: boolean; refundProcessed?: boolean; refundedAmount?: number; message?: string }> {
    if (API_ENABLED) {
      return apiSend("DELETE", `/registrations/${encodeURIComponent(registrationId)}`);
    }
    return mock({ success: true, refundProcessed: false });
  },

  /**
   * Get all admission tickets / digital passes for the current user.
   */
  async getMyTickets(): Promise<EventTicketRecord[]> {
    if (API_ENABLED) {
      return apiGet<EventTicketRecord[]>("/tickets/my");
    }
    return mock([]);
  },

  /**
   * Get a specific ticket by ticket ID.
   */
  async getTicket(ticketId: string): Promise<EventTicketRecord> {
    if (API_ENABLED) {
      return apiGet<EventTicketRecord>(`/tickets/${encodeURIComponent(ticketId)}`);
    }
    return mock({
      id: ticketId,
      ticketNumber: "TKT-2026-SAMPLE",
      qrToken: "cptok_tkt_sample",
      registrationId: "reg_sample",
      eventId: "evt_sample",
      userId: "usr_sample",
      status: "ISSUED",
      issuedAt: new Date().toISOString(),
    });
  },

  /**
   * Get ticket by registration ID.
   */
  async getTicketByRegistrationId(registrationId: string): Promise<EventTicketRecord> {
    if (API_ENABLED) {
      return apiGet<EventTicketRecord>(`/tickets/registration/${encodeURIComponent(registrationId)}`);
    }
    return mock({
      id: "tkt_sample",
      ticketNumber: "TKT-2026-SAMPLE",
      qrToken: "cptok_tkt_sample",
      registrationId,
      eventId: "evt_sample",
      userId: "usr_sample",
      status: "ISSUED",
      issuedAt: new Date().toISOString(),
    });
  },

  /**
   * Inspect status of a payment session (server-side verification).
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentRecord> {
    if (API_ENABLED) {
      return apiGet<PaymentRecord>(`/payments/${encodeURIComponent(paymentId)}`);
    }
    return mock({
      id: paymentId,
      eventId: "evt_sample",
      payerId: "usr_sample",
      amount: 1500,
      currency: "LKR",
      status: "PAID",
      provider: "GATEWAY_SANDBOX",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },

  /**
   * Fetch all payment records for current authenticated student.
   */
  async getMyPayments(): Promise<PaymentRecord[]> {
    if (API_ENABLED) {
      return apiGet<PaymentRecord[]>("/payments/my-payments");
    }
    return mock([]);
  },

  /**
   * Get digital receipt for a payment record.
   */
  async getPaymentReceipt(paymentId: string): Promise<any> {
    if (API_ENABLED) {
      return apiGet(`/payments/${encodeURIComponent(paymentId)}/receipt`);
    }
    return mock({
      receiptNumber: "CP-RCP-2026-000001",
      paymentId,
      amount: 1500,
      currency: "LKR",
      issuedAt: new Date().toISOString(),
    });
  },

  /**
   * Request refund for a paid transaction.
   */
  async refundPayment(paymentId: string, reason?: string): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/refund`, { reason });
    }
    return mock({ success: true, status: "REFUNDED" });
  },

  /**
   * Organizer Door Scanner: Independently validate attendee QR token.
   */
  async validateTicketQr(qrToken: string): Promise<TicketValidationResultDto> {
    if (API_ENABLED) {
      return apiSend<TicketValidationResultDto>("POST", "/tickets/validate-qr", { qrToken });
    }
    return mock({
      isValid: true,
      ticket: {
        id: "tkt_sample",
        ticketNumber: "TKT-2026-SAMPLE",
        qrToken,
        registrationId: "reg_sample",
        eventId: "evt_sample",
        userId: "usr_sample",
        status: "ISSUED",
        issuedAt: new Date().toISOString(),
      },
    });
  },

  /**
   * Organizer Door Check-In: Record attendee entry at the venue.
   */
  async checkInTicket(qrToken: string, notes?: string): Promise<CheckInTicketResultDto> {
    if (API_ENABLED) {
      return apiSend<CheckInTicketResultDto>("POST", "/tickets/check-in", { qrToken, notes });
    }
    return mock({
      success: true,
      message: "Checked in successfully",
      ticket: {
        id: "tkt_sample",
        ticketNumber: "TKT-2026-SAMPLE",
        qrToken,
        registrationId: "reg_sample",
        eventId: "evt_sample",
        userId: "usr_sample",
        status: "USED",
        issuedAt: new Date().toISOString(),
      },
      attendance: {
        id: "att_sample",
        ticketId: "tkt_sample",
        eventId: "evt_sample",
        userId: "usr_sample",
        checkedInById: "org_sample",
        status: "CHECKED_IN",
        checkInTime: new Date().toISOString(),
      },
    });
  },

  /**
   * Organizer Door Check-Out: Record attendee exit.
   */
  async checkOutTicket(qrToken: string): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", "/tickets/check-out", { qrToken });
    }
    return mock({ success: true });
  },

  /**
   * Development / Sandbox Helper: Simulate gateway webhook verification callback server-side.
   */
  async simulateSandboxPayment(paymentId: string): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", "/payments/webhook", {
        eventType: "payment_intent.succeeded",
        eventId: `evt_dev_sandbox_${Date.now()}`,
        paymentId,
      });
    }
    return mock({ received: true, status: "PAID" });
  },

  /**
   * Upload payment proof receipt (image or PDF, max 5MB).
   */
  async uploadPaymentProof(file: File): Promise<{ url: string; filename: string }> {
    if (API_ENABLED) {
      return apiUpload<{ url: string; filename: string }>("/uploads/payment-proof", file);
    }
    return mock({ url: URL.createObjectURL(file), filename: file.name });
  },

  /**
   * Submit direct-to-club bank transfer payment claim with transfer proof.
   */
  async submitDirectPaymentClaim(
    paymentId: string,
    data: {
      paymentProofUrl: string;
      referenceNumber: string;
      transferDate?: string | undefined;
      payerNotes?: string | undefined;
    },
  ): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/claim-direct`, data);
    }
    return mock({ success: true, status: "PROCESSING" });
  },

  /**
   * Fetch payment claims for financial verification (by authorized committee officer or admin).
   */
  async getEventPaymentClaims(params?: {
    eventId?: string | undefined;
    orgId?: string | undefined;
    status?: string | undefined;
  }): Promise<PaymentClaimItem[]> {
    if (API_ENABLED) {
      const queryParts: string[] = [];
      if (params?.eventId) queryParts.push(`eventId=${encodeURIComponent(params.eventId)}`);
      if (params?.orgId) queryParts.push(`orgId=${encodeURIComponent(params.orgId)}`);
      if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);
      const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      return apiGet<PaymentClaimItem[]>(`/payments/claims${qs}`);
    }
    return mock([]);
  },

  /**
   * Verify and confirm direct bank transfer payment (Financial Officer only).
   */
  async verifyPaymentClaim(paymentId: string, notes?: string | undefined): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/verify-direct`, { notes });
    }
    return mock({ success: true, status: "PAID", receiptNumber: "CP-RCP-MOCK" });
  },

  /**
   * Reject direct bank transfer payment claim with mandatory reason (Financial Officer only).
   */
  async rejectPaymentClaim(paymentId: string, reason: string): Promise<any> {
    if (API_ENABLED) {
      return apiSend("POST", `/payments/${encodeURIComponent(paymentId)}/reject-direct`, { reason });
    }
    return mock({ success: true, status: "FAILED", rejectionReason: reason });
  },
};
