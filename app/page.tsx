"use client";

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const canonicalLinks = {
  results: 'https://alphamaverick.io/results-transparency',
  riskProfile: 'https://alphamaverick.io/risk-profile',
  tutorials: 'https://alphamaverick.io/for-investors#how-it-works',
  membership: 'https://alphamaverick.io/membership#membership-card',
  vtActivation: 'https://social.vtacademy.net/portal/registration/subscription/95738/AlphaMaverick',
  equitiActivation: 'https://copy.equiti.com/portal/registration/subscription/82079/AlphaMaverick',
  vtManage: 'https://social.vtacademy.net/portal/login',
  equitiManage: 'https://copy.equiti.com/portal/login',
};

const whatIsCards = [
  {
    title: "It's not what you might think",
    text: "Alpha Maverick isn't a fund, a managed account, or financial advice. No one invests on your behalf, you own the account, and the final decision is always yours.",
    icon: 'lock',
  },
  {
    title: 'Built on a track record you can check',
    text: 'Made in-house, the system trades one market only, gold, with a full results archive you can review since day one.',
    icon: 'chart',
  },
  {
    title: 'We never touch your money',
    text: 'Your capital stays in your own account, in your name. You set your risk, and you can withdraw or stop whenever you want.',
    icon: 'wallet',
  },
];

const resultsStats = [
  { value: '+259.24%', label: 'Total return since inception', strong: true },
  { value: '35/39', label: 'Reporting weeks in profit' },
  { value: '160+', label: 'Countries available' },
];

const steps = [
  {
    number: '01',
    title: 'Define your risk profile',
    text: 'Answer a few simple questions to set your capital allocation and define your risk profile. Standard setup uses 0.01 lots per $1,000, typically resulting in a 15% maximum weekly swing. For a more conservative ~5% swing, we recommend starting with $3,000.',
    cta: 'Define Risk Profile now',
    href: canonicalLinks.riskProfile,
    note: 'This process is free and non-binding; it simply calibrates the system to your needs.',
  },
  {
    number: '02',
    title: 'Subscribe · 7 days free · cancel anytime',
    text: 'Start your free trial today. Cancel anytime. Membership includes full access to our execution system and complete performance archive. No long-term commitments or hidden fees.',
    cta: "View what's included",
    href: canonicalLinks.membership,
    note: '',
  },
  {
    number: '03',
    title: 'Open and fund your broker account',
    text: 'A broker is a regulated company that holds your money in your own account, in your name, just like a bank. Alpha Maverick connects to your account through a free program called MetaTrader 5 (MT5). Watch a short tutorial here. No financial background is needed. VT Markets: MT5 Raw ECN | from $500 | Multi-Currency. Equiti: MT5 Premium | from $1,000.',
    cta: 'Watch tutorial here',
    href: canonicalLinks.tutorials,
    note: (
      <>
        Investing more than $10,000? Use the VT Markets{' '}
        <a href={canonicalLinks.vtActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          priority registration link
        </a>
        . VT Markets and Equiti may offer deposit incentives, set and governed entirely by the broker. Terms, eligibility and availability depend on your jurisdiction, check directly with the broker.
      </>
    ),
  },
  {
    number: '04',
    title: 'Connect and activate',
    text: (
      <>
        Once your account is funded and MT5 is installed, simply click your broker's activation link ({' '}
        <a href={canonicalLinks.vtActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          VT Markets1
        </a>{' '}
        or{' '}
        <a href={canonicalLinks.equitiActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          Equiti1
        </a>
        ). The system connects automatically and starts trading gold. You can watch it work from then on, with a step-by-step{' '}
        <a href={canonicalLinks.tutorials} target="_blank" rel="noreferrer" className="link-emphasis">
          tutorial
        </a>{' '}
        available if you need it.
      </>
    ),
    cta: 'Step-by-step tutorial',
    href: canonicalLinks.tutorials,
    note: (
      <>
        Manage risk or pause the system anytime using your broker links:{' '}
        <a href={canonicalLinks.vtManage} target="_blank" rel="noreferrer" className="link-emphasis">
          VT Markets2
        </a>{' '}
        or{' '}
        <a href={canonicalLinks.equitiManage} target="_blank" rel="noreferrer" className="link-emphasis">
          Equiti2
        </a>
        . Because your capital stays in your own account, all withdrawals are handled directly through your broker.
      </>
    ),
  },
];

const faqs = [
  {
    q: '1. What exactly is a broker? Do I need to know anything about trading?',
    a: 'A broker is a regulated platform that holds your capital and executes trades. Think of it as the account where your investment lives, like a bank account. Alpha Maverick connects to that account, but your money stays in your name, under your control. You do not need to know how to trade. The Expert Advisor does that.',
  },
  {
    q: '2. Which broker, VT Markets or Equiti?',
    a: (
      <>
        Either one works, and both come with full video tutorials. If you are not sure, VT Markets is the simpler place to start, it is more self-service to set up, it supports multiple currencies, and you can begin from $500. Choose Equiti if you would prefer a USD-only account; it starts from $1,000. Investing more than $10,000? Use the VT Markets{' '}
        <a href={canonicalLinks.vtActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          priority registration link
        </a>
      </>
    ),
  },
  {
    q: '3. Do I need to install anything technical?',
    a: (
      <>
        Only MetaTrader 5, the free app mentioned above. Once it is installed, you click the activation link we provide ({' '}
        <a href={canonicalLinks.vtActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          VT Markets1
        </a>
        ,{' '}
        <a href={canonicalLinks.equitiActivation} target="_blank" rel="noreferrer" className="link-emphasis">
          Equiti1
        </a>
        ) to connect the system. It takes under a minute. No coding, nothing to configure yourself, no technical knowledge required.
      </>
    ),
  },
  {
    q: '4. What is the minimum to start?',
    a: '$500 USD with VT Markets. For a more conservative risk exposure, around 5% weekly, we recommend starting with $3,000. The Risk Profile calculator tells you exactly what makes sense for your capital before you open anything.',
  },
  {
    q: '5. Can I lose money?',
    a: 'Yes. This is real market participation, not a guarantee. Some weeks the system loses. That is exactly why we point you to the Risk Profile and the full archive before you activate: so you see the downside as clearly as the upside, and decide with your eyes open.',
  },
  {
    q: '6. Can I get my money out whenever I want?',
    a: 'Yes, whenever you want. It is your money, in your broker account, and you request the withdrawal directly through the broker. No approval from us, no lock-up, no delay on our side. One practical tip: during the trading week, some of your balance may be tied up in open positions, so it might not all be available at that exact moment. That is why we suggest requesting withdrawals over the weekend. The market is closed, there are no open trades, and your full balance is settled and ready.',
  },
  {
    q: '7. What do I actually need to do after activation?',
    a: 'Almost nothing, with one exception. The EA trades automatically, so day to day there is nothing to do. The one thing to keep an eye on: as your account grows, you nudge your lot size up to keep your risk proportional: 0.01 lots for every $1,000. It takes seconds, your dashboard shows you when, and the weekly review reminds you. Everything else runs without you.',
  },
  {
    q: '8. What happened during the 4 losing weeks?',
    a: 'Each one was documented fully in that week\'s review: what market conditions caused it, how the system responded, and what it meant going forward. We do not hide the bad weeks. We explain them. The full archive, including every losing week, is available to all members from day one.',
  },
];

function SectionLabel({
  children,
  tone = 'dark',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <span className={`badge-pill ${tone === 'light' ? 'badge-pill-gold' : ''} ${className}`}>
      {children}
    </span>
  );
}

function SectionShell({
  id,
  dark = true,
  children,
  className = '',
}: {
  id: string;
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldReduceMotion = mounted ? reduceMotion : false;

  return (
    <motion.section
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${dark ? 'surface-dark text-white' : 'surface-light'} ${className}`}
    >
      {children}
    </motion.section>
  );
}

function IconMark({ kind }: { kind: string }) {
  const base = 'h-5 w-5 text-gold';
  if (kind === 'chart') {
    return <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V9m6 10V5m6 14V13" /></svg>;
  }
  if (kind === 'wallet') {
    return <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 13h.01" /></svg>;
  }
  return <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = mounted ? reduceMotion : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuLinks = useMemo(() => ([
    { label: 'What Is It', href: '#what-is' },
    { label: 'Results', href: '#results' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ]), []);

  return (
    <main className="relative overflow-x-hidden">
      <header className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-5">
          <a href="#hero" aria-label="Alpha Maverick home" className="flex items-center gap-3">
            <Image
              src="https://cdn.alphamaverick.io/files/public/email/alphamaverick-icon.png"
              alt="Alpha Maverick"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-md object-contain"
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {menuLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link-underline transition-colors hover:text-gold">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={canonicalLinks.membership}
              target="_blank"
              rel="noreferrer"
              className="cta-gold hidden rounded-xl px-4 py-2 text-sm font-semibold md:inline-flex"
            >
              Start Free
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded bg-white" />
                <span className="block h-0.5 w-5 rounded bg-white" />
                <span className="block h-0.5 w-5 rounded bg-white" />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-3 rounded-2xl border border-white/10 bg-[#0c0b08]/95 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.3)] md:hidden"
            >
              <div className="flex flex-col gap-3 text-sm text-slate-200">
                {menuLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-gold">
                    {link.label}
                  </a>
                ))}
                <a href={canonicalLinks.membership} target="_blank" rel="noreferrer" className="cta-gold rounded-xl px-4 py-3 text-center font-semibold">
                  Start Free
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <section id="hero" className="relative min-h-[100svh] overflow-hidden">
        <Image
          src="https://cdn.alphamaverick.io/files/public/email/assets/hero-alphamaverick.png"
          alt="Alpha Maverick investors, calm and in control"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,5,1,0.92)_0%,rgba(6,5,1,0.72)_50%,rgba(6,5,1,0.46)_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid-dark bg-[size:80px_80px] opacity-60" aria-hidden="true" />

        <div className="relative z-10 flex min-h-[100svh] w-full items-end px-4 pt-32 pb-16 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 lg:pt-44 lg:pb-24">
          <div className="w-full animate-fadeUp text-center lg:pb-8 lg:text-left">
            <SectionLabel>
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
              Live since September 2025
            </SectionLabel>
            <h1 className="mt-8 text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              You built your wealth with discipline.
              <br />
              <span className="text-gold-gradient font-semibold">Why invest any differently?</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-100 md:text-xl">
              An automated system that trades gold inside your own account.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-300 md:text-lg">
              Your money never leaves your hands. You stay in control, you can withdraw anytime, and you can check on it whenever you want.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300 lg:justify-start">
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Your broker, your capital
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Withdraw anytime
              </span>
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 flex-shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Weekly transparency reviews
              </span>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#how-it-works" className="cta-gold w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto">
                See How It Works
              </a>
              <a href={canonicalLinks.membership} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-center font-medium text-white transition hover:border-gold/50 hover:bg-white/10 sm:w-auto">
                Start for free
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionShell id="what-is" className="min-h-[78svh] flex items-center section-sep py-24 md:py-28" dark>
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <SectionLabel>What is Alpha Maverick</SectionLabel>
            <div className="max-w-2xl space-y-5 text-left">
              <p className="text-lg leading-relaxed text-slate-300 md:text-xl">
                Alpha Maverick is an automated system that trades gold inside your own broker account.
              </p>
              <p className="leading-relaxed text-slate-400 md:text-lg">
                You do not place trades, watch charts, or manage anything. The system does the trading, while you keep your money, your control, and a clear view of everything it does.
              </p>
              <p className="leading-relaxed text-slate-400 md:text-lg">
                <span className="font-medium text-white">The point:</span> your money trades gold, without you learning to trade, watching a single chart, or ever giving up control.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {whatIsCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="glass rounded-3xl p-6 transition duration-300 hover:border-gold/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10">
                    <IconMark kind={card.icon} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-medium text-white">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{card.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="identity" className="section-sep py-24 md:py-28" dark={false}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,74,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,74,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <SectionLabel tone="light">Built for a specific investor</SectionLabel>
          </div>

          <div className="space-y-6 text-slate-700 md:text-lg">
            <p className="leading-relaxed">
              The people who choose Alpha Maverick are not chasing shortcuts. They want something that fits how they already think about money; long-term, deliberate, always in control.
            </p>
            <p className="leading-relaxed">
              You've invested for years and trust no judgment but your own. You don't want someone managing your money, you want a system you can trust, and check whenever you choose.
            </p>
            <p className="leading-relaxed">
              You built everything yourself, and staying in control is how you stay confident. You need to know it's working, and to reach your money the moment life throws something unexpected.
            </p>
            <p className="leading-relaxed">
              Either way, it was built for the way you already operate. Let Alpha Maverick work for you.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              'Full visibility into every trade, every week.',
              'Long-term, deliberate. Not a get-rich-quick scheme.',
              'Your capital, your name, your account. Always.',
              'The system was built for the way you already operate.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <p className="text-sm leading-relaxed text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="results" className="section-sep py-24 md:py-28" dark>
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
                Live since September 2025
              </SectionLabel>
              <h2 className="mt-5 text-3xl font-light tracking-tight text-white md:text-4xl">Since September 2025, it hasn't stopped.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400 md:text-right">
              In 39 weeks of reporting, the account grew in 35 of them.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {resultsStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`stat-card glass rounded-3xl p-8 text-center ${item.strong ? 'shadow-glow' : ''}`}
              >
                <p className={`relative z-10 mb-2 font-mono text-5xl font-light ${item.strong ? 'text-gold-gradient' : 'text-white'}`}>{item.value}</p>
                <p className="relative z-10 text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            Global system, global investors - available in 160+ countries.
          </div>

          <div className="mt-6 text-center">
            <a
              data-link="results-archive"
              href="https://alphamaverick.io/results-transparency"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                window.open('https://alphamaverick.io/results-transparency', '_blank', 'noopener,noreferrer');
              }}
              className="relative z-20 inline-flex items-center gap-2 text-sm font-medium text-gold transition hover:text-[#f2c24f]"
            >
              See the full archive
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42s1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
            </a>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="how-it-works" className="section-sep py-24 md:py-28" dark={false}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,74,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,74,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-6">
          <div className="mb-8">
            <SectionLabel tone="light">Get started in just a few steps</SectionLabel>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`h-full rounded-3xl border bg-white p-6 shadow-[0_10px_32px_rgba(15,23,42,0.06)] md:p-8 ${index === 3 ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white' : 'border-slate-200'}`}
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 shadow-md">
                    <span className="font-mono text-sm font-bold text-white">{step.number}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mb-4 leading-relaxed text-slate-500">{step.text}</p>
                    {step.note ? <p className="mb-4 text-xs leading-relaxed text-slate-400">{step.note}</p> : null}
                    <a href={step.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 transition hover:text-amber-700">
                      {step.cta}
                      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42s1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41l-6.58-6.6a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/></svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={canonicalLinks.membership} target="_blank" rel="noreferrer" className="cta-gold w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto">
              Start Membership for free today
            </a>
            <a href={canonicalLinks.riskProfile} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-slate-300 bg-white px-8 py-4 text-center font-medium text-slate-700 transition hover:border-slate-400 sm:w-auto">
              Define Your Risk Profile now
            </a>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="membership" className="section-sep relative overflow-hidden py-24 md:py-28" dark>
        <div className="absolute inset-x-0 top-0 mx-auto h-[360px] w-[900px] rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl px-4">
          <div className="mb-6 text-center">
            <SectionLabel>One Membership. Everything Included. 48 EUR a month.</SectionLabel>
          </div>
          <div className="mb-10 text-center">
            <p className="text-sm text-slate-400">Get an automated system that trades gold for you and get results.</p>
            <p className="mt-4 text-4xl font-semibold text-white">
              48 <span className="text-xl text-slate-300">EUR</span>
              <span className="text-lg font-normal text-slate-400"> / month</span>
            </p>
          </div>

          <div className="glass rounded-3xl p-8 shadow-glow">
            <ul className="space-y-5" role="list">
              {[
                'Runs in your own broker account. Your money stays in your name and control.',
                'Includes risk setup, weekly updates, and full access to past results.',
                'Adjust your risk anytime and get setup support.',
                'Cancel anytime. No lock-in.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/15">
                    <svg className="h-3 w-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 h-px bg-gold/10" />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={canonicalLinks.membership} target="_blank" rel="noreferrer" className="cta-gold flex-1 rounded-xl px-6 py-4 text-center font-semibold">
                Start Membership · 48 EUR
              </a>
              <a href={canonicalLinks.riskProfile} target="_blank" rel="noreferrer" className="flex-1 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-center font-medium text-white transition hover:border-gold/50 hover:bg-white/10">
                Take the Risk Profile now
              </a>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="faq" className="section-sep py-24 md:py-28" dark={false}>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,74,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,74,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <SectionLabel tone="light">COMMON QUESTIONS · Answered Before They're Asked</SectionLabel>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-6 py-5 transition hover:bg-slate-50 md:px-7">
                  <span className="text-left font-medium text-slate-900">{faq.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-amber-600 transition duration-200 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </summary>
                <div className="px-6 pb-6 text-sm leading-relaxed text-slate-600 md:px-7">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="cta-final" className="section-sep relative overflow-hidden py-24 md:py-28" dark>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/10 to-transparent" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-4xl font-light leading-tight text-white md:text-5xl">
            Start your 7 day free trial<br />
            <span className="text-gold-gradient font-semibold">Secure your financial independence</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">Find your risk profile first, then start membership.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={canonicalLinks.riskProfile} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-center font-medium text-white transition hover:border-gold/50 hover:bg-white/10 sm:w-auto">
              Find Your Risk Profile First
            </a>
            <a href={canonicalLinks.membership} target="_blank" rel="noreferrer" className="cta-gold w-full rounded-xl px-8 py-4 text-center font-semibold sm:w-auto">
              Start Membership - 48 EUR/month
            </a>
          </div>
        </div>
      </SectionShell>

      <footer className="border-t border-white/10 bg-[#060501] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <Image src="https://cdn.alphamaverick.io/files/public/email/alphamaverick-white-logo.png" alt="Alpha Maverick" width={220} height={54} className="mb-4 h-auto w-52" />
              <p className="text-xs leading-relaxed text-slate-500">
                Alpha Maverick does not perform portfolio management, order execution, or regulated investment advice. Broker integration is optional. Past performance is not indicative of future results. Capital is at risk. All investment decisions remain the client's responsibility.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500" aria-label="Footer navigation">
              {menuLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-slate-300">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="h-px bg-white/10 mb-6" />
          <div className="flex flex-col gap-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>Past performance is not indicative of future results. Capital is at risk.</p>
            <p>© 2026 Alpha Maverick.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
