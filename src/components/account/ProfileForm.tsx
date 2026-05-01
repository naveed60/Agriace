"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";

import type { AccountBaseUser, StoredAccountProfile } from "@/lib/account/client-storage";
import { readStoredProfile, saveStoredProfile } from "@/lib/account/client-storage";

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "AA";
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read file"));
    };

    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ProfileForm({
  user,
}: {
  user: AccountBaseUser;
}) {
  const router = useRouter();
  const [values, setValues] = useState<StoredAccountProfile>(() => readStoredProfile(user));
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initials = useMemo(() => getInitials(values.fullName), [values.fullName]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file.");
      return;
    }

    if (file.size > 1_000_000) {
      setErrorMessage("Please upload an image smaller than 1 MB.");
      return;
    }

    try {
      const avatarUrl = await fileToDataUrl(file);
      setValues((current) => ({ ...current, avatarUrl }));
      setErrorMessage(null);
    } catch {
      setErrorMessage("Unable to process the selected image.");
    }
  };

  const handleRemoveImage = () => {
    setValues((current) => ({ ...current, avatarUrl: "" }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      saveStoredProfile(user.id, values);
      setSuccessMessage("Profile saved on this device.");
    } catch {
      setErrorMessage("Unable to save your profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-[2rem] border border-white/70 bg-white/88 p-8 shadow-[0_20px_60px_rgba(66,52,23,0.1)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7a6c57]">
              Profile Photo
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#243821]">
              Personal Identity
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#655f51]">
              Upload a profile image and complete your account details for a more
              personalized customer dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.6rem] border border-[#ddd6c5] bg-[linear-gradient(135deg,#f7f1e4_0%,#ebf1df_100%)] text-2xl font-semibold text-[#2f5d31] shadow-[0_12px_24px_rgba(66,52,23,0.08)]">
              {values.avatarUrl ? (
                <Image
                  src={values.avatarUrl}
                  alt={`${values.fullName} profile`}
                  fill
                  className="object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-full border border-[#d8d0bc] px-5 py-3 text-sm font-semibold text-[#6a6457] transition-colors hover:bg-[#f6f2e8]"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/70 bg-white/88 p-8 shadow-[0_20px_60px_rgba(66,52,23,0.1)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7a6c57]">
            Core Details
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-semibold text-[#243821]">Full Name</label>
              <input
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Email Address</label>
              <input
                value={user.email}
                disabled
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#f0ebe0] px-4 py-3 text-[#7a6c57]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Phone</label>
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                placeholder="+92 300 0000000"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Company or Farm Name</label>
              <input
                name="companyName"
                value={values.companyName}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                placeholder="Your business or farm identity"
              />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/88 p-8 shadow-[0_20px_60px_rgba(66,52,23,0.1)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7a6c57]">
            Agricultural Context
          </p>
          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#243821]">Country</label>
                <input
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#243821]">City</label>
                <input
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Farm Size</label>
              <input
                name="farmSize"
                value={values.farmSize}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                placeholder="Example: 45 acres"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Crop Focus</label>
              <input
                name="cropFocus"
                value={values.cropFocus}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                placeholder="Example: Wheat, rice, vegetables"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#243821]">Bio</label>
              <textarea
                name="bio"
                value={values.bio}
                onChange={handleChange}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-[#e5dcc9] bg-[#fbf8f1] px-4 py-3 text-[#243821] outline-none transition-all duration-300 focus:border-[#94a24a] focus:bg-white"
                placeholder="Share a short summary about your farm, business, or product interests."
              />
            </div>
          </div>
        </div>
      </div>

      {errorMessage ? <p className="text-sm font-medium text-red-700">{errorMessage}</p> : null}
      {successMessage ? (
        <p className="text-sm font-medium text-[#2f5d31]">{successMessage}</p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`rounded-full bg-[linear-gradient(135deg,#2f5d31_0%,#7e8d2f_100%)] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 ${
            isSaving ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {isSaving ? "Saving Profile..." : "Save Profile"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-full border border-[#d8d0bc] px-6 py-3.5 text-sm font-semibold text-[#6a6457] transition-colors hover:bg-[#f6f2e8]"
        >
          Back to Dashboard
        </button>
      </div>
    </form>
  );
}
