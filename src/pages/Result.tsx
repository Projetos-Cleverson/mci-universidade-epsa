import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { PROFILES } from '@/constants/profiles';
import { ProfileType, QuizAnswer } from '@/types';
import { APP_CONFIG } from '@/constants/config';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  Building2,
  Calculator,
  Landmark,
  PiggyBank,
} from 'lucide-react';
import {
  calculatePurchaseSimulation,
  formatCurrency,
  getCompatibilityClass,
  getCompatibilityLabel,
} from '@/lib/simulation';

function getStoredAnswers(): QuizAnswer[] {
  try {
    const saved = localStorage.getItem('quiz_answers');
    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

export default function Result() {
  const navigate = useNavigate();
  const { perfilPrincipal, perfilSecundario, answers, reset } = useQuizStore();

  useEffect(() => {
    if (!perfilPrincipal) {
      const saved = localStorage.getItem('quiz_principal');
      if (!saved) navigate('/diagnostico');
    }
  }, [perfilPrincipal, navigate]);

  const profileId = perfilPrincipal || (localStorage.getItem('quiz_principal') as ProfileType);
  const secondaryId =
    perfilSecundario || (localStorage.getItem('quiz_secundario') as ProfileType | null);

  const profile = PROFILES.find((p) => p.id === profileId);
  const secondary = secondaryId ? PROFILES.find((p) => p.id === secondaryId) : null;

  const simulationAnswers = answers.length > 0 ? answers : getStoredAnswers();

  if (!profile) return null;

  const simulation = calculatePurchaseSimulation(simulationAnswers, profileId);

  const whatsappMessage = `${profile.ctaMensagem}

Resumo da minha estimativa orientativa:
- Valor do imóvel: ${formatCurrency(simulation.propertyValue)}
- Entrada estimada: ${formatCurrency(simulation.downPayment)}
- Valor aproximado a financiar: ${formatCurrency(simulation.financing.financedAmount)}
- Parcela orientativa do financiamento: ${formatCurrency(simulation.financing.estimatedPayment)}
- Parcela orientativa do consórcio: ${formatCurrency(simulation.consortium.estimatedPaymentMin)} a ${formatCurrency(simulation.consortium.estimatedPaymentMax)}
- Limite conservador pela renda: ${formatCurrency(simulation.affordablePayment)}`;

  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleRestart = () => {
    reset();
    localStorage.removeItem('quiz_scores');
    localStorage.removeItem('quiz_principal');
    localStorage.removeItem('quiz_secundario');
    localStorage.removeItem('quiz_answers');
    navigate('/diagnostico');
  };

  const profileColors: Record<string, string> = {
    financiamento: 'from-blue-600 to-blue-800',
    consorcio: 'from-purple-600 to-purple-800',
    hibrida: 'from-amber-600 to-amber-800',
    reorganizacao: 'from-orange-600 to-orange-800',
    investidor: 'from-emerald-600 to-emerald-800',
    emocional: 'from-red-600 to-red-800',
  };

  return (
    <div className="min-h-screen bg-[var(--light-gray)]">
      {/* Header */}
      <header className="border-b border-[var(--medium-gray)] bg-white px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--deep-blue)]">
              <Building2 className="size-4 text-white" />
            </div>
            <span className="font-sans text-sm font-semibold text-[var(--deep-blue)]">
              Seu Resultado
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--graphite)]"
          >
            <RotateCcw className="size-3.5" />
            Refazer
          </button>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl bg-gradient-to-br ${profileColors[profileId]} p-6 text-white sm:p-8`}
          >
            <p className="text-sm font-medium uppercase tracking-wide text-white/70">
              Seu perfil
            </p>

            <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              {profile.nome}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              {profile.fraseIdentificacao}
            </p>

            {secondary && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
                <span className="text-xs text-white/70">
                  Tendência secundária:
                </span>
                <span className="text-xs font-semibold text-white">
                  {secondary.nome}
                </span>
              </div>
            )}
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 rounded-xl border border-[var(--medium-gray)] bg-white p-6"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--deep-blue)]">
              Entenda seu perfil
            </h2>

            <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--graphite)]">
              {profile.explicacao}
            </p>
          </motion.div>

          {/* Favorable Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 rounded-xl border border-[var(--medium-gray)] bg-white p-6"
          >
            <h3 className="flex items-center gap-2 font-sans font-semibold text-[var(--deep-blue)]">
              <CheckCircle2 className="size-5 text-[var(--green-accent)]" />
              Pontos favoráveis
            </h3>

            <ul className="mt-3 space-y-2">
              {profile.pontosFavoraveis.map((ponto, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--graphite)]"
                >
                  <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-[var(--green-accent)]" />
                  {ponto}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Attention Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 rounded-xl border border-[var(--medium-gray)] bg-white p-6"
          >
            <h3 className="flex items-center gap-2 font-sans font-semibold text-[var(--deep-blue)]">
              <AlertTriangle className="size-5 text-amber-500" />
              Pontos de atenção
            </h3>

            <ul className="mt-3 space-y-2">
              {profile.pontosAtencao.map((ponto, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--graphite)]"
                >
                  <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                  {ponto}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="bg-slate-950 p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20">
                  <Calculator className="size-5 text-emerald-300" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Estimativa orientativa
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold">
                    Estimativa inicial de compra
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Com base nas informações fornecidas, montamos uma visão aproximada para comparar financiamento e consórcio.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              {/* Financing */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100">
                    <Landmark className="size-5 text-blue-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Financiamento imobiliário
                    </h3>
                    <p className="text-xs text-slate-500">
                      Estimativa por parcela aproximada
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Valor do imóvel</span>
                    <strong className="text-right text-slate-950">
                      {formatCurrency(simulation.propertyValue)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Entrada estimada</span>
                    <strong className="text-right text-slate-950">
                      {formatCurrency(simulation.downPayment)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Valor a financiar</span>
                    <strong className="text-right text-slate-950">
                      {formatCurrency(simulation.financing.financedAmount)}
                    </strong>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Parcela orientativa
                    </span>
                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {formatCurrency(simulation.financing.estimatedPayment)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Prazo usado: {simulation.financing.termMonths} meses
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Limite conservador pela renda
                    </span>
                    <p className="mt-1 text-xl font-bold text-slate-950">
                      {formatCurrency(simulation.affordablePayment)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Considerando até 30% da renda declarada.
                    </p>
                  </div>

                  <div
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${getCompatibilityClass(
                      simulation.financing.compatibility
                    )}`}
                  >
                    {getCompatibilityLabel(simulation.financing.compatibility)}
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600">
                    {simulation.financing.reading}
                  </p>
                </div>
              </div>

              {/* Consortium */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100">
                    <PiggyBank className="size-5 text-purple-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Consórcio imobiliário
                    </h3>
                    <p className="text-xs text-slate-500">
                      Estimativa por carta de crédito
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Carta estimada</span>
                    <strong className="text-right text-slate-950">
                      {formatCurrency(simulation.consortium.creditAmount)}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Prazo usado</span>
                    <strong className="text-right text-slate-950">
                      {simulation.consortium.termMonths} meses
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Taxa adm. referencial</span>
                    <strong className="text-right text-slate-950">
                      {(simulation.consortium.adminFeeRate * 100).toFixed(0)}%
                    </strong>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Fundo referencial</span>
                    <strong className="text-right text-slate-950">
                      {(simulation.consortium.reserveFundRate * 100).toFixed(0)}%
                    </strong>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Parcela orientativa
                    </span>
                    <p className="mt-1 text-2xl font-bold text-slate-950">
                      {formatCurrency(simulation.consortium.estimatedPaymentMin)} a{' '}
                      {formatCurrency(simulation.consortium.estimatedPaymentMax)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Pode variar conforme administradora, grupo, prazo, seguro e regras do plano.
                    </p>
                  </div>

                  <p className="rounded-xl bg-white p-4 text-xs leading-relaxed text-slate-600">
                    {simulation.consortium.reading}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-amber-50 px-5 py-4">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                <p className="text-xs leading-relaxed text-amber-700">
                  {simulation.warning}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Next Step */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-4 rounded-xl bg-[var(--deep-blue)] p-6 text-white"
          >
            <h3 className="flex items-center gap-2 font-sans font-semibold">
              <ArrowRight className="size-5 text-[var(--green-light)]" />
              Próximo passo recomendado
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-white/80">
              {profile.proximoPasso}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--green-accent)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--green-light)] active:scale-95"
            >
              <MessageCircle className="size-4" />
              {profile.cta}
            </a>
          </motion.div>

          {/* Ethics Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5"
          >
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-4 flex-shrink-0 text-amber-600" />
              <p className="text-xs leading-relaxed text-amber-700">
                Este diagnóstico é uma orientação inicial. Ele não garante aprovação de financiamento, contemplação em consórcio, liberação de crédito ou compra do imóvel. A melhor decisão depende de análise documental, renda, entrada, prazo, regras da instituição financeira e capacidade real de pagamento.
              </p>
            </div>
          </motion.div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--deep-blue)]"
            >
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}