import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Counter } from "@/components/Counter";
import { Timeline } from "@/components/Timeline";
import { Stages } from "@/components/Stages";
import { Facilities } from "@/components/Facilities";
import { AdmissionsBand } from "@/components/AdmissionsBand";
import { Visit } from "@/components/Visit";
import { milestones, school, stats, udise } from "@/content/school";
import { principalMessage } from "@/content/about";
import { NewsList } from "@/components/NewsList";
import { DraftMark } from "@/components/Draft";
import { getAllNews } from "@/lib/news";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section aria-labelledby="intro-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="intro-title" className="sr-only">
              About the school
            </h2>
            <p className="t-lede max-w-[30ch] text-balance">
              Since {school.founded}, families in {school.place} have sent their children up the same road to Mount
              Carmel. Today they learn in English from their first day in LKG to their Class 12 board exams.
            </p>
            <Link href="/about" className="link-underline mt-8 inline-block font-semibold">
              Read the school&apos;s story
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 self-end lg:col-span-5">
            {stats.map((s) => (
              <div key={s.label} className="border-t-2 border-forest pt-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-serif text-[clamp(2.8rem,5vw,4rem)] leading-none text-leaf">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-2 block text-ink-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Timeline items={milestones} heading="From a primary school to Class 12, one step at a time" />

      <section aria-labelledby="stages-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="stages-title" className="t-h2 max-w-xl">
            Fourteen years, one campus
          </h2>
          <p className="max-w-md text-ink-muted">
            English medium throughout, following the {school.board}. Tamil is taught as a language from the start.
          </p>
        </div>
        <Stages />
        <Link href="/academics" className="link-underline mt-10 inline-block font-semibold">
          See how each stage is taught
        </Link>
      </section>

      <section aria-labelledby="campus-title" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-12 grid gap-6 lg:grid-cols-12">
            <h2 id="campus-title" className="t-h2 lg:col-span-6">
              Labs, books and open ground
            </h2>
            <p className="text-ink-muted lg:col-span-5 lg:col-start-8 lg:self-end">
              {udise.blocks} blocks, {udise.classrooms} classrooms, an Atal Tinkering Lab for young makers, and a
              campus that runs partly on the sun and saves the monsoon rain.
            </p>
          </div>
          <Facilities limit={6} />
          <Link href="/campus" className="link-underline mt-10 inline-block font-semibold">
            Everything on campus
          </Link>
        </div>
      </section>

      <section aria-labelledby="principal-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="principal-title" className="font-serif text-2xl text-leaf lg:col-span-3">
            From the principal
            <DraftMark show={principalMessage.draft} />
          </h2>
          <div className="lg:col-span-8 lg:col-start-5">
            <blockquote className="t-lede text-balance">{principalMessage.paragraphs[1]}</blockquote>
            <Link href="/about/principal" className="link-underline mt-8 inline-block font-semibold">
              Read the principal&apos;s message
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="news-title" className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 id="news-title" className="t-h2">
              News and events
            </h2>
            <Link href="/news" className="btn btn-forest">
              All news
            </Link>
          </div>
          <NewsList posts={getAllNews().slice(0, 3)} />
        </div>
      </section>

      <div className="py-24 lg:py-32">
        <AdmissionsBand />
      </div>

      <section aria-label="Location" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-10">
        <Visit />
      </section>
    </>
  );
}
