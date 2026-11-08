// Malaysian mobile number helpers, shared by the apply form and server validation.

/** Strip formatting, a leading +60/60 and a leading 0 → local part, e.g. "123456789". */
export function myMobileDigits(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("60")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return d;
}

/** "123456789" → "12-345 6789"; "1123456789" → "11-2345 6789". Works on partial input too. */
export function formatMyMobile(local: string) {
  const d = local.slice(0, local.startsWith("11") || local.startsWith("15") ? 10 : 9);
  const mid = d.length === 10 ? 4 : 3;
  if (d.length <= 2) return d;
  if (d.length <= 2 + mid) return `${d.slice(0, 2)}-${d.slice(2)}`;
  return `${d.slice(0, 2)}-${d.slice(2, 2 + mid)} ${d.slice(2 + mid)}`;
}
