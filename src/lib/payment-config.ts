/**
 * CampusPulse v2.5.0 Central Payment Configuration Policy.
 *
 * For the current release:
 * - Direct Club Bank Transfer: ONLY available payment method for paid events.
 * - Online Payment Gateways (Stripe, PayHere, OnePay, WebXPay, Sandbox): DISABLED.
 * - Free Event Registration: ENABLED and unchanged.
 */

export const PAYMENT_POLICY = {
  ONLINE_GATEWAYS_ENABLED: false,
  DIRECT_CLUB_TRANSFER_ENABLED: true,
  FREE_REGISTRATION_ENABLED: true,
} as const;

export function isOnlineGatewayEnabled(): boolean {
  return PAYMENT_POLICY.ONLINE_GATEWAYS_ENABLED;
}

export function isDirectClubTransferEnabled(): boolean {
  return PAYMENT_POLICY.DIRECT_CLUB_TRANSFER_ENABLED;
}

export function isFreeRegistrationEnabled(): boolean {
  return PAYMENT_POLICY.FREE_REGISTRATION_ENABLED;
}
