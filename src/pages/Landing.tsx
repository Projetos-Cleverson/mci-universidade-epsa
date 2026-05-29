import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Compass,
  BarChart3,
  Home as HomeIcon,
  Landmark,
  PiggyBank,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';

const heroImage = '/images/mci-hero.jpg';

const perfis = [
  {
    icon: Landmark,
    title: 'Financiamento Imediato',
    text: 'Para quem pode ter renda comprovável, entrada disponível e necessidade de comprar em curto prazo.',
  },
  {
    icon: PiggyBank,
    title: 'Consórcio Planejado',
    text: 'Para quem pode planejar melhor, aceita prazo e busca menor exposição a juros bancários.',
  },
  {
    icon: RefreshCw,
    title: 'Estratégia Híbrida',
    text: 'Para quem precisa comparar alternativas, combinar recursos e encontrar um caminho intermediário.',
  },
  {
    icon: ShieldCheck,
    title: 'Reorganização Financeira',
    text: 'Para quem deseja comprar, mas talvez precise preparar melhor renda, entrada, crédito ou orçamento.',
  },
  {
    icon: TrendingUp,
    title: 'Investidor Patrimonial',
    text: 'Para quem enxerga o imóvel como construção, proteção ou expansão de patrimônio.',
  },
  {
    icon: AlertTriangle,
    title: 'Compra Emocional de Risco',
    text: 'Para quem tem urgência ou pressão emocional, mas precisa analisar melhor antes de assumir compromisso.',
  },
];

const beneficios = [
  {
    title: 'Clareza sobre seu perfil',
    text: 'Entenda se seu momento favorece financiamento, consórcio, estratégia híbrida ou preparação financeira.',
  },
  {
    title: 'Melhor direcionamento',
    text: 'Evite falar com o profissional errado ou receber uma oferta que não combina com sua realidade.',
  },
  {
    title: 'Menos risco de decisão impulsiva',
    text: 'Identifique sinais de urgência emocional, falta de entrada ou incompatibilidade financeira.',
  },
  {
    title: 'Visão mais estratégica',
    text: 'Avalie sua compra considerando renda, prazo, objetivo, entrada e perfil patrimonial.',
  },
];

const faqs = [
  {
    question: 'O diagnóstico é gratuito?',
    answer: 'Sim. O diagnóstico é gratuito e leva poucos minutos.',
  },
  {
    question: 'O diagnóstico garante aprovação no financiamento?',
    answer:
      'Não. O resultado é apenas uma orientação inicial. A aprovação depende de análise documental, renda, crédito, entrada, imóvel e critérios da instituição financeira.',
  },
  {
    question: 'O diagnóstico garante contemplação em consórcio?',
    answer:
      'Não. O MCI não promete contemplação. Ele apenas indica se o consórcio pode fazer sentido para seu perfil e seu prazo.',
  },
  {
    question: 'Preciso já ter escolhido um imóvel?',
    answer:
      'Não. Você pode fazer o diagnóstico mesmo que ainda esteja pesquisando ou começando a entender suas possibilidades.',
  },
  {
    question: 'Vou receber contato depois?',
    answer:
      'Você só receberá contato se informar seus dados e autorizar. O objetivo é oferecer orientação, não pressão comercial.',
  },
  {
    question: 'Esse diagnóstico substitui uma análise de crédito?',
    answer:
      'Não. Ele ajuda na orientação inicial, mas não substitui análise bancária, simulação formal, análise documental ou avaliação profissional.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">MCI</p>
              <p className="text-xs text-white/65">Mapa da Compra Imobiliária</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-emerald-300 md:flex">
        <a
       href="#como-funciona"
       className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] transition hover:text-white"
      >
       Como funciona
      </a>

       <a
      href="#perfis"
       className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] transition hover:text-white"
      >
       Perfis
      </a>

      <a
      href="#faq"
       className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] transition hover:text-white"
      >
       FAQ
      </a>
      </nav>

          <Link
            to="/diagnostico"
            className="hidden rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 md:inline-flex"
          >
            Iniciar diagnóstico
          </Link>

          <Link
            to="/diagnostico"
            className="inline-flex rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white md:hidden"
          >
            Iniciar
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-slate-950 pt-[72px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="absolute inset-0 bg-slate-950/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/92 to-slate-950/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-transparent to-slate-950/35" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-start px-5 pt-4 pb-6 lg:pt-5 lg:pb-8">
          <div className="grid w-full items-start gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            {/* Left column */}
            <div className="max-w-3xl lg:pt-1">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Universidade EPSA apresenta
              </div>

              <h1 className="max-w-3xl font-display text-[2.35rem] font-bold leading-[1.03] tracking-tight text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.7)] sm:text-5xl lg:text-[3.35rem] xl:text-[3.7rem]">
                Descubra o caminho mais seguro para conquistar seu{' '}
                <span className="text-emerald-400">imóvel.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-[0.92rem] font-medium leading-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-[0.98rem]">
                Faça gratuitamente o Diagnóstico Imobiliário Inteligente e entenda qual estratégia faz mais sentido para sua renda, entrada disponível, urgência, objetivo e momento financeiro.
              </p>

              <div className="mt-3 max-w-xl border-l-2 border-emerald-400/70 pl-4">
              <p className="text-sm font-medium leading-6 text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                Orientação inicial para decidir com mais clareza, sem promessa fácil e sem pressão comercial.
                </p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/diagnostico"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-2xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:text-base"
                >
                 Começar meu diagnóstico gratuito
                <ArrowRight className="h-5 w-5" />
                </Link>

                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-slate-950/25 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12 sm:text-base"
                >
                  Entender como funciona
                </a>
              </div>

              <div className="mt-3.5 flex flex-wrap gap-2 text-xs text-white/65 sm:text-sm">
                <span>Gratuito</span>
                <span>•</span>
                <span>Leva poucos minutos</span>
                <span>•</span>
                <span>Sem compromisso</span>
              </div>

              <div className="mt-4 hidden max-w-2xl grid-cols-1 gap-3 xl:grid xl:grid-cols-3">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2.5 backdrop-blur">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-xs font-semibold leading-4 text-white">
                    Diagnóstico consultivo
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2.5 backdrop-blur">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-xs font-semibold leading-4 text-white">
                    Sem promessa de aprovação
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2.5 backdrop-blur">
                  <Compass className="h-4 w-4 shrink-0 text-emerald-400" />
                  <p className="text-xs font-semibold leading-4 text-white">
                    Sem venda agressiva
                  </p>
                </div>
              </div>
            </div>

            {/* Right card */}
            <div className="hidden lg:block">
              <div className="ml-auto mt-10 max-w-[350px] rounded-[1.35rem] border border-white/12 bg-slate-950/35 p-3.5 shadow-2xl backdrop-blur-xl xl:mt-8">
                <div className="mb-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-white/75">
                      Seu diagnóstico pode indicar
                    </p>
                    <h2 className="mt-0.5 text-base font-bold text-white drop-shadow-sm">
                      6 caminhos possíveis
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20">
                    <BarChart3 className="h-5 w-5 text-emerald-300" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {perfis.slice(0, 4).map((perfil) => (
                    <div
                      key={perfil.title}
                      className="flex items-center gap-3 rounded-xl border border-white/15 bg-slate-950/35 px-3 py-2.5 shadow-sm backdrop-blur"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <perfil.icon className="h-4 w-4 text-emerald-300" />
                      </div>
                      <p className="text-xs font-semibold text-white drop-shadow-sm">
                        {perfil.title}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 rounded-xl border border-emerald-300/15 bg-emerald-950/45 px-3.5 py-2.5 text-[0.72rem] font-medium leading-5 text-emerald-50 backdrop-blur">
                  O resultado é uma orientação inicial, não uma promessa de aprovação.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autoridade silenciosa */}
      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl lg:pt-2">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Clareza antes da oferta
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Uma decisão imobiliária não deveria começar por uma oferta.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Muita gente começa perguntando quanto fica a parcela, qual banco aprova ou se o consórcio vale a pena. Mas essas perguntas vêm depois.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Antes de escolher um produto, é preciso entender se sua renda, entrada, urgência e objetivo combinam com o caminho desejado.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <Compass className="mb-5 h-8 w-8 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-950">
                Primeiro, entenda seu momento
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                O diagnóstico avalia sua realidade antes de sugerir qualquer caminho.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <BarChart3 className="mb-5 h-8 w-8 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-950">
                Depois, compare possibilidades
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Financiamento, consórcio e estratégias híbridas podem fazer sentido em contextos diferentes.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <ShieldCheck className="mb-5 h-8 w-8 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-950">
                Então, avance com segurança
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                O resultado indica um próximo passo mais coerente com seu perfil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section className="bg-slate-950 px-5 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              O erro comum
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              O problema não é escolher entre financiamento ou consórcio.
            </h2>

            <p className="mt-6 text-xl leading-8 text-white/70">
              O problema é escolher sem diagnóstico.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur">
            <div className="space-y-5 text-lg leading-8 text-white/75">
              <p>
                Financiamento pode ser uma boa solução para quem tem urgência, renda comprovável e entrada disponível.
              </p>
              <p>
                Consórcio pode fazer sentido para quem pode planejar melhor, deseja reduzir exposição a juros bancários e não precisa da posse imediata.
              </p>
              <p>
                Em alguns casos, o melhor caminho pode ser combinar alternativas. Em outros, talvez a decisão mais inteligente seja preparar melhor a vida financeira antes de comprar.
              </p>
            </div>

            <div className="mt-8 rounded-3xl bg-emerald-500 p-6 text-slate-950">
              <p className="text-2xl font-bold leading-tight">
                A compra de um imóvel não começa na parcela. Começa na estratégia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="bg-slate-50 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Como funciona
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Em poucos minutos, você entende melhor seu perfil de compra.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Você responde perguntas simples e recebe uma orientação inicial sobre o caminho que pode fazer mais sentido para seu momento.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              ['1', 'Responda ao diagnóstico', 'Informe objetivo, renda, entrada, prazo desejado, valor do imóvel e principais preocupações.'],
              ['2', 'O sistema analisa seu perfil', 'O MCI cruza suas respostas e identifica sinais de compatibilidade com diferentes caminhos.'],
              ['3', 'Receba seu resultado', 'Você descobre seu perfil principal e, quando houver, uma tendência secundária.'],
              ['4', 'Avance com orientação', 'Se fizer sentido, você pode falar com um especialista para entender melhor o próximo passo.'],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white">
                  {number}
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              Iniciar diagnóstico agora
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Perfis */}
      <section id="perfis" className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl lg:pt-2">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Perfis possíveis
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Cada cliente tem um caminho diferente.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              O MCI não parte da ideia de que existe uma resposta universal. Ele analisa sinais do seu momento para indicar uma orientação inicial.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {perfis.map((perfil) => (
              <div
                key={perfil.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <perfil.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-950">
                  {perfil.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {perfil.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-slate-50 p-6 text-center text-slate-600">
            O resultado não é uma sentença. É uma orientação inicial para ajudar você a decidir com mais clareza.
          </div>
        </div>
      </section>

      {/* Benefício emocional */}
      <section className="bg-slate-50 px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Decisão com clareza
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Comprar um imóvel exige mais do que vontade. Exige clareza.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Muitas pessoas deixam de comprar porque acreditam que não têm perfil. Outras avançam rápido demais e assumem compromissos que não combinam com sua realidade.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              O objetivo do MCI é ajudar você a enxergar o caminho com mais equilíbrio: sem pressa artificial, sem promessa fácil e sem pressão comercial.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-6 text-2xl font-bold text-slate-950 shadow-sm">
              Você não precisa decidir no escuro.
            </div>
          </div>

          <div className="grid gap-5">
            {beneficios.map((beneficio) => (
              <div key={beneficio.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <CheckCircle2 className="mb-4 h-6 w-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-950">
                  {beneficio.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {beneficio.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPSA */}
      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-slate-950 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                <HomeIcon className="h-8 w-8 text-emerald-400" />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Universidade EPSA
              </p>

              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Uma ferramenta para decisões imobiliárias mais inteligentes.
              </h2>
            </div>

            <div className="text-lg leading-8 text-white/75">
              <p>
                O MCI faz parte do ecossistema da Universidade EPSA, criado para desenvolver profissionais, organizar processos comerciais e ajudar clientes a tomarem decisões mais conscientes sobre crédito, consórcio, patrimônio e aquisição de bens.
              </p>

              <p className="mt-5">
                Aqui, o diagnóstico vem antes da oferta. A clareza vem antes da venda. E a estratégia vem antes da decisão.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  Ferramenta de diagnóstico
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  Orientação inicial
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
                  Sem compromisso
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 px-5 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Perguntas frequentes
            </span>

            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Antes de começar, tire suas dúvidas.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-slate-950">
                      {faq.question}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-slate-950 px-5 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Antes de escolher o caminho, entenda seu perfil.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Financiar, fazer consórcio, esperar, reorganizar ou combinar estratégias são decisões que dependem do seu momento.
          </p>

          <Link
            to="/diagnostico"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-emerald-500/25 transition hover:bg-emerald-400"
          >
            Começar meu diagnóstico gratuito
            <ArrowRight className="h-5 w-5" />
          </Link>

          <p className="mt-5 text-sm text-white/50">
            Gratuito • Leva poucos minutos • Sem compromisso
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-5 pb-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold">MCI</p>
                <p className="text-xs text-white/50">
                  Mapa da Compra Imobiliária
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-white/55">
              Uma ferramenta da Universidade EPSA para ajudar clientes a tomarem decisões imobiliárias com mais clareza.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Aviso legal</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Este diagnóstico não garante aprovação de financiamento, contemplação em consórcio, liberação de crédito ou compra do imóvel.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Privacidade</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Seus dados são utilizados apenas para atendimento, diagnóstico e acompanhamento comercial, conforme autorização fornecida no formulário.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Links</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/55">
              <Link to="/diagnostico" className="hover:text-white">
                Iniciar diagnóstico
              </Link>
              <a href="#como-funciona" className="hover:text-white">
                Como funciona
              </a>
              <a href="#faq" className="hover:text-white">
                Perguntas frequentes
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl text-sm text-white/35">
          © {new Date().getFullYear()} MCI — Mapa da Compra Imobiliária. Powered by Universidade EPSA.
        </div>
      </footer>
    </div>
  );
}
