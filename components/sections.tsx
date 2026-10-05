import {
  ArrowRight, Boxes, CalendarCheck, ChartColumn, CircleCheck, CircleX, Clock, Cloud, Copy, HardHat, Hammer, Hash, KeyRound, LayoutDashboard, LifeBuoy,
  Mail, MessagesSquare, PencilRuler, Plug, Plus, Puzzle, Rocket, Search, Sheet, ShoppingBag, Target, Unplug, UserCheck, UserRoundCheck, Users, Wallet, Workflow, Wrench, Zap,
  type LucideIcon
} from "lucide-react";
import {
  SiAirtable, SiAsana, SiBrevo, SiCalendly, SiClickup, SiDropbox, SiFacebook, SiGmail, SiGoogleads, SiGoogleanalytics, SiGooglecalendar, SiGoogledrive,
  SiGoogledocs, SiGoogleforms, SiGooglemeet, SiGooglesheets, SiHubspot, SiInstagram, SiIntercom, SiJira, SiMailchimp, SiMessenger, SiNotion, SiOdoo,
  SiPaypal, SiQuickbooks, SiShopee, SiShopify, SiStripe, SiTelegram, SiTiktok, SiTrello, SiViber, SiWhatsapp, SiWise, SiWoocommerce, SiWordpress,
  SiXendit, SiXero, SiZapier, SiZendesk, SiZoho, SiZoom
} from "@icons-pack/react-simple-icons";
import type { ComponentType } from "react";
import { site } from "@/lib/site";
import { wrap } from "@/lib/ui";
import { Scene } from "@/components/scene";
import { JobsScene, ConceptScene, ProcessScene, ToolsScene, JOBS_FRAMES, CONCEPT_FRAMES, PROCESS_FRAMES, TOOLS_FRAMES, jobsPos } from "@/components/scenes";
import { ContactForm, CopyEmail } from "@/components/contact-form";

function Head({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[1.3fr_.7fr] lg:gap-12">
      <h2 className="h2 max-w-[14em]">{title}</h2>
      {children && <p className="max-w-md text-base leading-7 text-body">{children}</p>}
    </div>
  );
}

function Check({ yes }: { yes: boolean }) {
  const Icon = yes ? CircleCheck : CircleX;
  return <Icon size={18} strokeWidth={1.75} aria-hidden="true" className={`mt-0.5 shrink-0 ${yes ? "text-brand" : "text-quiet"}`} />;
}

function Badge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-secondary text-ink">
      <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

const heroFacts: [LucideIcon, string][] = [
  [Clock, "A first version in two to four weeks when the scope allows"],
  [KeyRound, "You own the system after full payment"],
  [UserCheck, "The founder leads discovery, planning, and review"]
];

export function Hero() {
  return (
    <section id="top" className="relative isolate pb-14 pt-12 sm:pt-14 lg:pb-16 lg:pt-16">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className={wrap}>
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
          <h1 className="display rise text-balance text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[1.02]">We build custom software around your business.</h1>
          <div className="rise rise-2">
            <p className="max-w-md text-base leading-7 text-body">
              AcquisiFlow is a software studio in the Philippines. We study how your team works, then build one system to replace your spreadsheets and disconnected tools.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="btn">Start a project<ArrowRight size={16} aria-hidden="true" className="btn-arrow" /></a>
              <a href="#lab" className="btn btn-line">See the concept systems</a>
            </div>
          </div>
        </div>

        <div className="rise rise-3 mx-auto mt-10 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-line bg-card p-1.5 shadow-[0_40px_80px_-56px_rgba(0,0,0,.45)] sm:p-2.5">
            <div className="overflow-hidden rounded-xl">
              <Scene component={JobsScene} posAt={jobsPos} width={960} height={480} frames={JOBS_FRAMES} still={140} label="Animation: a spreadsheet of jobs turns into a jobs system" />
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-quiet">Example data. Drag the divider to compare the spreadsheet with the jobs system.</p>
        </div>

        <div className="rise rise-3 mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 border-t border-line pt-6 text-sm text-body sm:grid-cols-3 sm:gap-8">
          {heroFacts.map(([Icon, f]) => (
            <p key={f} className="flex items-start gap-3"><Icon size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />{f}</p>
          ))}
        </div>
      </div>
      <Marquee />
    </section>
  );
}

const strip: [string, BrandIcon, string][] = [
  ["Google Sheets", SiGooglesheets, "default"], ["Gmail", SiGmail, "default"], ["Messenger", SiMessenger, "default"], ["Viber", SiViber, "default"],
  ["WhatsApp", SiWhatsapp, "default"], ["Notion", SiNotion, "currentColor"], ["Stripe", SiStripe, "default"], ["QuickBooks", SiQuickbooks, "default"],
  ["Shopify", SiShopify, "default"], ["HubSpot", SiHubspot, "default"], ["Airtable", SiAirtable, "default"], ["Zapier", SiZapier, "default"],
  ["Shopee", SiShopee, "default"], ["Telegram", SiTelegram, "default"]
];

function Marquee() {
  return (
    <div className="rise rise-3 mt-12">
      <p className="mb-5 text-center text-sm text-quiet">Connects with the tools your team already uses</p>
      <div data-anim className="marquee" role="group" aria-label="Tools we connect to your system">
        <div className="marquee-track">
          {[false, true].map((copy) => (
            <div key={String(copy)} className="marquee-group" aria-hidden={copy || undefined}>
              {strip.map(([name, Icon, color]) => (
                <span key={name} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-card px-4 py-2 text-sm text-ink">
                  <Icon size={16} color={color} aria-hidden="true" />{name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const signs: [LucideIcon, string, string][] = [
  [Sheet, "Spreadsheets run the business", "Your jobs, schedules, and customers live in spreadsheets and chat threads."],
  [Unplug, "Your tools disagree", "Your customer list and your schedule show different answers."],
  [Copy, "Your team types everything twice", "Staff re-enter data and build reports by hand."],
  [Puzzle, "The software almost fits", "Your team bends the workflow to match the tool."]
];

const goodFit = [
  "You already have customers and revenue.",
  "A real bottleneck slows your team or hides information from you.",
  "Spreadsheets, chat apps, paper, or several disconnected tools hold your data.",
  "One decision-maker can approve scope and budget."
];

const notFit = [
  "You want the cheapest developer.",
  "You have no budget yet, or you offer equity instead of payment.",
  "Your requirements change daily and nobody owns the scope.",
  "Your deadline ignores the scope."
];

const markets = ["Field service", "Construction", "Distribution", "Logistics", "Professional services"];

export function Problem() {
  return (
    <section className="py-14 lg:py-20">
      <div className={wrap}>
        <Head title="Signs you have outgrown your tools">
          Another subscription gives you one more tool to manage. A custom system replaces the patchwork with one place for your work.
        </Head>
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-line bg-card p-3 sm:p-4">
            <Scene component={ToolsScene} width={720} height={440} frames={TOOLS_FRAMES} still={150} label="Illustration: five disconnected tools merge into one system" />
          </div>
          <p className="mt-3 text-center text-sm text-quiet">Illustration. Five disconnected tools, then one system.</p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {signs.map(([Icon, t, d]) => (
            <li key={t} className="border-t border-ink pb-7 pt-5">
              <Badge icon={Icon} />
              <h3 className="display mt-4 text-lg leading-tight">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <h3 className="display text-xl leading-tight">We work best with teams where</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3.5 text-[15px] text-body">
              {goodFit.map((t) => (
                <li key={t} className="flex items-start gap-3"><Check yes />{t}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-line bg-secondary p-6 sm:p-8">
            <h3 className="display text-xl leading-tight">We may not be the right studio if</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3.5 text-[15px] text-body">
              {notFit.map((t) => (
                <li key={t} className="flex items-start gap-3"><Check yes={false} />{t}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <p className="mr-2 text-sm text-body">We build for</p>
          {markets.map((m) => (
            <span key={m} className="rounded-full border border-line-strong px-3.5 py-1 text-sm text-ink">{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const services: [LucideIcon, string, string][] = [
  [LayoutDashboard, "Operations systems", "Your team tracks jobs, orders, inventory, and approvals in one place."],
  [UserRoundCheck, "Customer portals", "Customers check job status, approve quotes, and pay invoices online."],
  [CalendarCheck, "Booking and scheduling", "Customers book online and the booking appears in your team's schedule."],
  [ChartColumn, "Dashboards and reporting", "You see jobs, stock, and revenue without building reports by hand."],
  [Workflow, "Automation and AI", "We automate repetitive steps and add AI where it saves your team time, such as sorting inquiries or reading documents."],
  [Plug, "Integrations and web platforms", "We connect the tools you already use and build the website or portal that feeds your system."]
];

type BrandIcon = ComponentType<{ color?: string; size?: number | string; className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
type Logo = [name: string, icon: BrandIcon, color: string];

const D = "default", K = "currentColor";

const integrations: { title: string; items: Logo[] }[] = [
  {
    title: "Messaging and calls",
    items: [["Gmail", SiGmail, D], ["Outlook", Mail, K], ["Messenger", SiMessenger, D], ["Viber", SiViber, D], ["WhatsApp", SiWhatsapp, D], ["Telegram", SiTelegram, D], ["Slack", Hash, K], ["Microsoft Teams", Users, K], ["Zoom", SiZoom, D], ["Google Meet", SiGooglemeet, D]]
  },
  {
    title: "Files, data, and calendars",
    items: [["Google Sheets", SiGooglesheets, D], ["Google Docs", SiGoogledocs, D], ["Google Forms", SiGoogleforms, D], ["Google Drive", SiGoogledrive, D], ["Google Calendar", SiGooglecalendar, D], ["Microsoft Excel", Sheet, K], ["Notion", SiNotion, K], ["Airtable", SiAirtable, D], ["Dropbox", SiDropbox, D]]
  },
  {
    title: "Payments and accounting",
    items: [["Stripe", SiStripe, D], ["PayPal", SiPaypal, D], ["QuickBooks", SiQuickbooks, D], ["Xero", SiXero, D], ["Wise", SiWise, D], ["Xendit", SiXendit, D], ["GCash", Wallet, K], ["Maya", Wallet, K], ["PayMongo", Wallet, K]]
  },
  {
    title: "Sales, marketing, and support",
    items: [["HubSpot", SiHubspot, D], ["Zoho", SiZoho, D], ["Salesforce", Cloud, K], ["Mailchimp", SiMailchimp, D], ["Brevo", SiBrevo, D], ["Facebook", SiFacebook, D], ["Instagram", SiInstagram, D], ["TikTok", SiTiktok, K], ["Google Ads", SiGoogleads, D], ["Google Analytics", SiGoogleanalytics, D], ["Calendly", SiCalendly, D], ["Intercom", SiIntercom, D], ["Zendesk", SiZendesk, K]]
  },
  {
    title: "Online stores and websites",
    items: [["Shopify", SiShopify, D], ["WooCommerce", SiWoocommerce, D], ["WordPress", SiWordpress, D], ["Shopee", SiShopee, D], ["Lazada", ShoppingBag, K]]
  },
  {
    title: "Projects and automation",
    items: [["Asana", SiAsana, D], ["Trello", SiTrello, D], ["Jira", SiJira, D], ["ClickUp", SiClickup, D], ["Odoo", SiOdoo, D], ["Zapier", SiZapier, D]]
  }
];

export function Services() {
  return (
    <section id="services" className="pb-14 lg:pb-20">
      <div className={wrap}>
        <Head title="We build the system your workflow needs">
          Custom business software is our main work. We add automation, AI, and web platforms when the system calls for them.
        </Head>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([Icon, t, d]) => (
            <article key={t} className="spot rounded-2xl border border-line bg-card p-6">
              <Badge icon={Icon} />
              <h3 className="display mt-5 text-xl leading-tight">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{d}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <div className="grid grid-cols-1 items-end gap-3 lg:grid-cols-[1.3fr_.7fr] lg:gap-12">
            <h3 className="display text-2xl leading-tight sm:text-3xl">The applications we connect to your system</h3>
            <p className="max-w-md text-sm leading-6 text-body">These are the business tools most teams already run. If your tool has an API or can export data, we can connect it.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map(({ title, items }) => (
              <div key={title} className="rounded-2xl border border-line bg-card p-5">
                <h4 className="display text-base leading-tight">{title}</h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map(([name, Icon, color]) => (
                    <li key={name} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-secondary px-3 py-1 text-[13px] text-ink">
                      <Icon size={15} color={color} aria-hidden="true" />{name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-quiet">Logos belong to their owners. Listing a tool does not imply affiliation or endorsement.</p>
        </div>
      </div>
    </section>
  );
}

const steps: [LucideIcon, string, string][] = [
  [Search, "Understand", "We study how your work runs today: who touches what, where data enters, and where it stalls."],
  [PencilRuler, "Design", "We map the workflow, roles, screens, and technical plan, then agree the scope with you."],
  [Hammer, "Build", "We build in short iterations. Each one gets tested and reviewed with you."],
  [Rocket, "Launch", "We deploy the system and introduce it to your team."],
  [LifeBuoy, "Support", "We stay available after launch. A monthly plan for support and improvements is optional."]
];

export function Process() {
  return (
    <section id="process" className="pb-14 lg:pb-20">
      <div className={wrap}>
        <Head title="A project in five steps">
          A first version takes two to four weeks when the scope allows. We ship it after it passes review and testing.
        </Head>
        <div className="mt-10 rounded-2xl border border-line bg-card p-3 sm:p-5">
          <div className="hidden lg:block">
            <Scene component={ProcessScene} width={1180} height={360} frames={PROCESS_FRAMES} still={170} label="Flowchart: understand, design, build, launch, support" />
          </div>
          <div className="mx-auto max-w-sm lg:hidden">
            <Scene component={ProcessScene} inputProps={{ vertical: true }} width={520} height={720} frames={PROCESS_FRAMES} still={170} label="Flowchart: understand, design, build, launch, support" />
          </div>
        </div>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map(([Icon, t, d], i) => (
            <li key={t} className="border-t border-line-strong pt-4">
              <div className="flex items-start justify-between">
                <span className="display text-4xl leading-none text-quiet">{String(i + 1).padStart(2, "0")}</span>
                <Badge icon={Icon} />
              </div>
              <h3 className="display mt-3 text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const concepts = [
  ["FieldOps", "Field service", "Requests, technician scheduling, jobs, customer updates, and billing.", [{ label: "Ben", value: 72 }, { label: "Ana", value: 58 }, { label: "Lim", value: 34 }], Wrench],
  ["BuildOps", "Construction", "Projects, site updates, materials, approvals, and progress billing.", [{ label: "Site prep", value: 92 }, { label: "Structure", value: 64 }, { label: "Finishing", value: 28 }], HardHat],
  ["FlowStock", "Inventory and orders", "Products, orders, stock movement, and purchasing.", [{ label: "Orders", value: 78 }, { label: "In stock", value: 56 }, { label: "Reorder", value: 40 }], Boxes]
] as const;

export function Lab() {
  return (
    <section id="lab" className="bg-secondary py-14 lg:py-20">
      <div className={wrap}>
        <Head title="Concept systems from the AcquisiFlow Lab">
          These are concepts with example data. They are not client work. They show how we approach common operations problems.
        </Head>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map(([name, type, text, rows, Icon]) => (
            <article key={name} className="spot flex flex-col rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <Badge icon={Icon} />
                <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-quiet">Example data</span>
              </div>
              <p className="mt-4 text-sm text-quiet">{type} concept</p>
              <h3 className="display mt-1 text-2xl">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-body">{text}</p>
              <div className="mt-auto pt-5">
                <Scene component={ConceptScene} inputProps={{ rows: [...rows] }} width={480} height={240} frames={CONCEPT_FRAMES} still={100} label={`Animated example data for the ${name} concept`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const principles: [LucideIcon, string, string][] = [
  [MessagesSquare, "Direct communication", "You talk to the person who plans your system, not an account manager."],
  [Zap, "Fast, with review", "We aim to ship a first version in weeks. Every release passes review and testing before it reaches you."],
  [KeyRound, "You own it", "After full payment, you own the system we build for your business and the data in it. We keep our reusable frameworks and components."],
  [Target, "Clear scope", "We define the problem the system must solve before we build. Features that do not serve it wait."]
];

export function About() {
  return (
    <section id="about" className="py-14 lg:py-20">
      <div className={wrap}>
        <Head title="The founder who scopes your system stays on it">
          AcquisiFlow is small by choice. The founder leads discovery, planning, and quality review, so your decisions reach the people building the system with no account manager in between.
        </Head>
        <dl className="mt-10 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          {principles.map(([Icon, t, d]) => (
            <div key={t} className="border-t border-ink pb-8 pt-5">
              <Badge icon={Icon} />
              <dt className="display mt-4 text-xl leading-tight">{t}</dt>
              <dd className="mt-2 text-[15px] leading-7 text-body">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const faqs = [
  ["How does a project start?", "With a conversation about your workflow. We learn the process, the bottlenecks, and the outcome you need before we propose anything."],
  ["Do we need custom software?", "An existing product may fit your process. If it does, we will tell you to buy it. Custom software pays off when your tools do not fit, you juggle too many of them, or manual work costs you real money."],
  ["What does it cost?", "We price each project by scope and value, not by the hour. Smaller projects split payment: 50% at the start and 50% before handover. Send us the tools you have outgrown, and we will describe the system and its cost."],
  ["How long does it take?", "Scope sets the timeline. A first version takes two to four weeks when the scope allows. For larger systems, we give you a date after discovery."],
  ["Can you connect the tools we already use?", "Yes. We integrate with the software you run today, so your existing tools feed one system."],
  ["Can we run it ourselves?", "Yes. We build software your team can maintain, train your team at launch, and offer optional monthly support."],
  ["Who will we work with?", "A small studio in the Philippines. The founder leads discovery, planning, and review. We serve clients here and in other countries."]
];

export function Faq() {
  return (
    <section id="faq" className="pb-14 lg:pb-20">
      <div className={`${wrap} grid grid-cols-1 gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14`}>
        <div>
          <h2 className="h2 max-w-[10em]">Questions before you write to us</h2>
          <p className="mt-5 max-w-sm text-base text-body">If yours is missing, send it with your inquiry.</p>
        </div>
        <div className="border-b">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0} className="border-t">
              <summary className="flex items-center justify-between gap-6 py-4 text-base font-medium">
                {q}<Plus aria-hidden="true" strokeWidth={1.75} className="plus size-5 shrink-0 transition-transform" />
              </summary>
              <p className="max-w-xl pb-5 text-[15px] leading-7 text-body">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative isolate py-14 lg:py-20">
      <div aria-hidden="true" className="grid-bg grid-bg-both pointer-events-none absolute inset-0 -z-10" />
      <div className={wrap}>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-[clamp(1.25rem,4vw,3rem)] shadow-[0_36px_80px_-60px_rgba(0,0,0,.4)]">
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <h2 className="h2">Tell us what your business has outgrown</h2>
              <a href={`mailto:${site.email}`} className="display my-6 block w-fit max-w-full break-all text-[clamp(1.1rem,2.6vw,1.6rem)] underline decoration-2 underline-offset-8">{site.email}</a>
              <p className="mb-6 max-w-md text-base leading-7 text-body">Send us the spreadsheets and disconnected tools you struggle to manage. We will describe what a better system could look like, or tell you if existing software already fits.</p>
              <CopyEmail email={site.email} />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}