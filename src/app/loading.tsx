import WebsiteLoader from "@/components/ui/WebsiteLoader";

export default function Loading() {
  return (
    <div className="flex min-h-[55vh] items-center justify-center px-6 py-16">
      <WebsiteLoader />
    </div>
  );
}
