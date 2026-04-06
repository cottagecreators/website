import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to Cottage Creators for updates, offers, and Muskoka inspiration.",
};

export default function Subscribe() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-4xl font-bold text-stone-900 mb-4">Subscribe</h1>
      <p className="text-stone-600 mb-8">
        Stay in the loop with Cottage Creators. Get updates on availability,
        seasonal specials, and new property features delivered to your inbox.
      </p>

      {/*
        Replace this form with your Mailchimp embedded form.
        Go to Mailchimp → Audience → Signup forms → Embedded forms,
        then paste the HTML here using dangerouslySetInnerHTML or
        use Mailchimp's API with a form action.

        Example:
        <form action="https://cottagecreators.us21.list-manage.com/subscribe/post?u=XXXX&id=XXXX" method="post">
      */}

      <form className="space-y-4 max-w-md mx-auto text-left">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border border-stone-300 rounded px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-stone-800 text-white px-6 py-3 rounded font-medium hover:bg-stone-700 transition-colors"
        >
          Subscribe
        </button>
      </form>

      <p className="text-xs text-stone-400 mt-4">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
