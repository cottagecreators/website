import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Book",
  description: "Everything you need to know for your stay at Cottage Creators.",
};

export default function WelcomeBook() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-8">Welcome Book</h1>

      {/*
        The original Squarespace site embedded a Canva design here.
        Replace the placeholder below with your Canva embed or PDF.

        Example Canva embed:
        <div
          style={{ position: "relative", width: "100%", height: 0, paddingTop: "141.4%", overflow: "hidden" }}
          dangerouslySetInnerHTML={{
            __html: `<iframe loading="lazy" style="position:absolute;width:100%;height:100%;top:0;left:0;border:none;"
              src="https://www.canva.com/design/YOUR_DESIGN_ID/view?embed"
              allowfullscreen="allowfullscreen" allow="fullscreen"></iframe>`,
          }}
        />
      */}

      <div className="bg-stone-100 rounded-lg p-12 text-center text-stone-500">
        <p className="text-lg mb-2">Welcome Book</p>
        <p className="text-sm">
          Replace this placeholder with your Canva welcome book embed or upload
          a PDF version.
        </p>
      </div>
    </div>
  );
}
