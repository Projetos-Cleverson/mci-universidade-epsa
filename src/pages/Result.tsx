import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { PROFILES } from '@/constants/profiles';
import { ProfileType } from '@/types';
import { APP_CONFIG } from '@/constants/config';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  Building2,
} from 'lucide-react';

export default function Result() {
  const navigate = useNavigate();
  const { perfilPrincipal, perfilSecundario, scores, reset } = useQuizStore();

  useEffect(() => {
    if (!perfilPrincipal) {
      const saved = localStorage.getItem('quiz_principal');
      if (!saved) navigate('/diagnostico');
    }
  }, [perfilPrincipal, navigate]);

  const profileId = perfilPrincipal || (localStorage.getItem('quiz_principal') as ProfileType);
  const secondaryId = perfilSecundario || (localStorage.getItem('quiz_secundario') as ProfileType | null);
  const profile = PROFILES.find((p) => p.id === profileId);
  const secondary = secondaryId ? PROFILES.find((p) => p.id === secondaryId) : null;

  if (!profile) return null;

  const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encodeURIComponent(profile.ctaMensagem)}`;

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
      <header className="bg-white border-b border-[var(--medium-gray)] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[var(--deep-blue)] flex items-center justify-center">
              <Building2 className="size-4 text-white" />
            </div>
            <span className="font-sans font-semibold text-[var(--deep-blue)] text-sm">
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
        <div className="max-w-3xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl bg-gradient-to-br ${profileColors[profileId]} p-6 sm:p-8 text-white`}
          >
            <p className="text-sm text-white/70 font-medium uppercase tracking-wide">Seu perfil</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mt-2">{profile.nome}</h1>
            <p className="mt-3 text-white/90 text-sm sm:text-base leading-relaxed">
              {profile.fraseIdentificacao}
            </p>
            {secondary && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="text-xs text-white/70">Tendência secundária:</span>
                <span className="text-xs font-semibold text-white">{secondary.nome}</span>
              </div>
            )}
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 bg-white rounded-xl p-6 border border-[var(--medium-gray)]"
          >
            <h2 className="font-display text-lg font-semibold text-[var(--deep-blue)]">Entenda seu perfil</h2>
            <p className="mt-3 text-sm text-[var(--graphite)] leading-relaxed text-pretty">
              {profile.explicacao}
            </p>
          </motion.div>

          {/* Favorable Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 bg-white rounded-xl p-6 border border-[var(--medium-gray)]"
          >
            <h3 className="font-semibold text-[var(--deep-blue)] font-sans flex items-center gap-2">
              <CheckCircle2 className="size-5 text-[var(--green-accent)]" />
              Pontos favoráveis
            </h3>
            <ul className="mt-3 space-y-2">
              {profile.pontosFavoraveis.map((ponto, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--graphite)]">
                  <span className="size-1.5 rounded-full bg-[var(--green-accent)] mt-2 flex-shrink-0" />
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
            className="mt-4 bg-white rounded-xl p-6 border border-[var(--medium-gray)]"
          >
            <h3 className="font-semibold text-[var(--deep-blue)] font-sans flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" />
              Pontos de atenção
            </h3>
            <ul className="mt-3 space-y-2">
              {profile.pontosAtencao.map((ponto, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--graphite)]">
                  <span className="size-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  {ponto}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Next Step */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 bg-[var(--deep-blue)] rounded-xl p-6 text-white"
          >
            <h3 className="font-semibold font-sans flex items-center gap-2">
              <ArrowRight className="size-5 text-[var(--green-light)]" />
              Próximo passo recomendado
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              {profile.proximoPasso}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg bg-[var(--green-accent)] text-white font-semibold text-sm hover:bg-[var(--green-light)] transition-colors active:scale-95"
            >
              <MessageCircle className="size-4" />
              {profile.cta}
            </a>
          </motion.div>

          {/* Ethics Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5"
          >
            <div className="flex gap-3">
              <AlertTriangle className="size-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Este diagnóstico é uma orientação inicial. Ele não garante aprovação de financiamento, contemplação em consórcio, liberação de crédito ou compra do imóvel. A melhor decisão depende de análise documental, renda, entrada, prazo, regras da instituição financeira e capacidade real de pagamento.
              </p>
            </div>
          </motion.div>

          {/* Back to home */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--deep-blue)] transition-colors">
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
