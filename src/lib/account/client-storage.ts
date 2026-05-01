import type { UserRole } from "@/generated/prisma/enums";

export const accountStorageEvents = {
  profileUpdated: "agriace:profile-updated",
  productsUpdated: "agriace:products-updated",
} as const;

export type AccountBaseUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
};

export type StoredAccountProfile = {
  fullName: string;
  avatarUrl: string;
  phone: string;
  companyName: string;
  country: string;
  city: string;
  farmSize: string;
  cropFocus: string;
  bio: string;
};

const productStoragePrefix = "agriace:my-products:";
const profileStoragePrefix = "agriace:profile:";

function getProfileStorageKey(userId: string): string {
  return `${profileStoragePrefix}${userId}`;
}

function getProductStorageKey(userId: string): string {
  return `${productStoragePrefix}${userId}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallback;
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function readStoredProfile(user: AccountBaseUser): StoredAccountProfile {
  const stored = readJson<Partial<StoredAccountProfile>>(getProfileStorageKey(user.id), {});

  return {
    fullName: stored.fullName ?? user.fullName,
    avatarUrl: stored.avatarUrl ?? "",
    phone: stored.phone ?? "",
    companyName: stored.companyName ?? "",
    country: stored.country ?? "",
    city: stored.city ?? "",
    farmSize: stored.farmSize ?? "",
    cropFocus: stored.cropFocus ?? "",
    bio: stored.bio ?? "",
  };
}

export function saveStoredProfile(userId: string, profile: StoredAccountProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getProfileStorageKey(userId), JSON.stringify(profile));
  window.dispatchEvent(new Event(accountStorageEvents.profileUpdated));
}

export function readStoredProductSlugs(userId: string): string[] {
  const parsed = readJson<unknown>(getProductStorageKey(userId), []);
  return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
}

export function saveStoredProductSlugs(userId: string, productSlugs: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getProductStorageKey(userId), JSON.stringify(productSlugs));
  window.dispatchEvent(new Event(accountStorageEvents.productsUpdated));
}

export function addStoredProductSlug(userId: string, productSlug: string): string[] {
  const current = readStoredProductSlugs(userId);
  const next = current.includes(productSlug) ? current : [...current, productSlug];
  saveStoredProductSlugs(userId, next);
  return next;
}

export function removeStoredProductSlug(userId: string, productSlug: string): string[] {
  const next = readStoredProductSlugs(userId).filter((value) => value !== productSlug);
  saveStoredProductSlugs(userId, next);
  return next;
}
