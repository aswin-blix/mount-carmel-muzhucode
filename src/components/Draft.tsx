/**
 * Marks copy that was written for the website and still needs the school's
 * confirmation. Remove by setting `draft: false` in the content file.
 */
export function DraftMark({ show = true, className = "" }: { show?: boolean; className?: string }) {
  if (!show) return null;
  return (
    <span
      title="Draft text: to be confirmed by the school"
      className={`ml-3 inline-flex translate-y-[-0.2em] items-center rounded-full border border-dashed border-carmel/60 bg-gold-soft/60 px-2.5 py-0.5 align-middle font-sans text-xs font-semibold tracking-normal text-carmel ${className}`}
    >
      Draft
      <span className="sr-only">: text to be confirmed by the school</span>
    </span>
  );
}
