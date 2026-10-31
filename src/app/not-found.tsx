import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-10">
      <h1 className="t-h1">This page isn&apos;t here</h1>
      <p className="mt-4 max-w-lg text-lg text-ink-muted">
        The link may be old or mistyped. Go back to the home page to find what you need.
      </p>
      <Link href="/" className="btn btn-forest mt-8">
        Go to the home page
      </Link>
    </section>
  );
}
