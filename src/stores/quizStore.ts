import { create } from 'zustand';
import { QuizAnswer, ProfileScores, ProfileType } from '@/types';
import { QUESTIONS } from '@/constants/questions';

interface QuizState {
  currentStep: number;
  answers: QuizAnswer[];
  scores: ProfileScores;
  perfilPrincipal: ProfileType | null;
  perfilSecundario: ProfileType | null;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculateResult: () => void;
  reset: () => void;
}

const initialScores: ProfileScores = {
  financiamento: 0,
  consorcio: 0,
  hibrida: 0,
  reorganizacao: 0,
  investidor: 0,
  emocional: 0,
};

function answerIndex(answers: QuizAnswer[], questionIndex: number): number | undefined {
  return answers.find((item) => item.questionIndex === questionIndex)?.answerIndex;
}

function hasAnswer(answers: QuizAnswer[], questionIndex: number, indexes: number[]): boolean {
  const selected = answerIndex(answers, questionIndex);
  return selected !== undefined && indexes.includes(selected);
}

function topProfile(scores: ProfileScores): ProfileType {
  return (Object.entries(scores) as [ProfileType, number][]).sort((a, b) => b[1] - a[1])[0][0];
}

function scoreOf(scores: ProfileScores, profile: ProfileType): number {
  return scores[profile] || 0;
}

function adjustedScoresWithSignals(scores: ProfileScores, answers: QuizAnswer[]): ProfileScores {
  const adjusted: ProfileScores = { ...scores };

  const urgent = hasAnswer(answers, 1, [0, 1]);
  const canWait = hasAnswer(answers, 1, [3, 4]);
  const noEntry = hasAnswer(answers, 3, [3]);
  const noOrUnclearEntry = hasAnswer(answers, 3, [3, 5]);
  const entryAvailable = hasAnswer(answers, 3, [0, 1, 2, 4]);
  const partialEntryOrFgts = hasAnswer(answers, 3, [1, 2, 4, 5]);
  const formalOrProvableIncome = hasAnswer(answers, 4, [0, 1, 2]);
  const unstableIncome = hasAnswer(answers, 4, [4]);
  const heavyDebtOrRestriction = hasAnswer(answers, 6, [2, 3]);
  const unknownDebt = hasAnswer(answers, 6, [4]);
  const highCommitment = hasAnswer(answers, 5, [3]);
  const noCommitmentClarity = hasAnswer(answers, 5, [4]);
  const valueAboveReality = hasAnswer(answers, 16, [2]);
  const valueUnclear = hasAnswer(answers, 16, [1, 3, 4]);
  const fearOpportunity = hasAnswer(answers, 12, [3]);
  const fearInstallment = hasAnswer(answers, 12, [2]);
  const lowFinancialClarity = hasAnswer(answers, 13, [3, 4]) || valueAboveReality || hasAnswer(answers, 16, [3]);
  const investmentGoal = hasAnswer(answers, 0, [3, 4]) || hasAnswer(answers, 11, [4]) || hasAnswer(answers, 17, [4]);
  const highTicket = hasAnswer(answers, 2, [3, 4]);
  const highIncome = hasAnswer(answers, 15, [4]);
  const hatesInterest = hasAnswer(answers, 8, [0]) || hasAnswer(answers, 12, [0]);
  const acceptsPlanning = hasAnswer(answers, 10, [1]) || hasAnswer(answers, 14, [0, 1]) || hasAnswer(answers, 9, [3, 4]);
  const wantsComparison = hasAnswer(answers, 10, [2]) || hasAnswer(answers, 17, [2]) || valueUnclear;

  const fragilitySignals = [unstableIncome, heavyDebtOrRestriction, noEntry, highCommitment, noCommitmentClarity, lowFinancialClarity, unknownDebt].filter(Boolean).length;

  // Financiamento não deve vencer por padrão; ele recebe força só quando há prontidão real.
  if (urgent && formalOrProvableIncome && entryAvailable && !heavyDebtOrRestriction && !unstableIncome && !highCommitment) {
    adjusted.financiamento += 6;
  }

  // Consórcio precisa aparecer quando há prazo, rejeição a juros e abertura a planejamento.
  if ((canWait || acceptsPlanning) && (hatesInterest || acceptsPlanning)) {
    adjusted.consorcio += 6;
  }

  // Estratégia híbrida é o perfil natural de quem tem dúvidas, entrada parcial, FGTS ou precisa comparar cenários.
  if (wantsComparison || partialEntryOrFgts) {
    adjusted.hibrida += 5;
  }

  // Reorganização aparece quando há duas ou mais fragilidades reais, não por apenas uma resposta isolada.
  if (fragilitySignals >= 2) {
    adjusted.reorganizacao += 7;
  }

  // Investidor precisa prevalecer quando o objetivo patrimonial/investimento está claro.
  if (investmentGoal) {
    adjusted.investidor += highTicket || highIncome ? 7 : 5;
  }

  // Compra emocional de risco exige urgência/pressão + fragilidade. Sem isso vira reorganização ou híbrida.
  if ((urgent && noOrUnclearEntry && (fearOpportunity || fearInstallment || lowFinancialClarity)) || (fearOpportunity && fragilitySignals >= 2)) {
    adjusted.emocional += 8;
  }

  return adjusted;
}

function resolveProfileWithBusinessRules(scores: ProfileScores, answers: QuizAnswer[]): ProfileType {
  const adjusted = adjustedScoresWithSignals(scores, answers);
  const principal = topProfile(adjusted);

  const urgent = hasAnswer(answers, 1, [0, 1]);
  const entryAvailable = hasAnswer(answers, 3, [0, 1, 2, 4]);
  const formalOrProvableIncome = hasAnswer(answers, 4, [0, 1, 2]);
  const severeRestriction = hasAnswer(answers, 4, [4]) || hasAnswer(answers, 6, [2, 3]) || hasAnswer(answers, 5, [3]);

  // Regra de segurança: financiamento só pode ser resultado final se houver prontidão mínima.
  if (principal === 'financiamento' && !(urgent && entryAvailable && formalOrProvableIncome && !severeRestriction)) {
    const alternatives = (Object.entries(adjusted) as [ProfileType, number][])
      .filter(([profile]) => profile !== 'financiamento')
      .sort((a, b) => b[1] - a[1]);
    return alternatives[0]?.[0] || principal;
  }

  return principal;
}

function secondaryProfile(scores: ProfileScores, principal: ProfileType): ProfileType | null {
  const sorted = (Object.entries(scores) as [ProfileType, number][])
    .filter(([profile]) => profile !== principal)
    .sort((a, b) => b[1] - a[1]);

  const principalScore = scores[principal] || 0;
  const candidate = sorted[0];

  if (!candidate || principalScore === 0) return null;

  const secondaryScore = candidate[1];

  // Não exibe tendência secundária se ela não tiver pontuação real.
  if (secondaryScore <= 0) return null;

  /**
   * Regra mais consultiva:
   * Mostra perfil secundário quando:
   * 1. O secundário tem pelo menos 65% da pontuação do principal; ou
   * 2. A diferença entre os dois perfis é de até 7 pontos.
   *
   * Isso evita que o diagnóstico fique seco demais e ajuda a mostrar nuances reais.
   */
  const isRelevantSecondary =
    secondaryScore >= principalScore * 0.65 ||
    principalScore - secondaryScore <= 7;

  return isRelevantSecondary ? candidate[0] : null;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentStep: 0,
  answers: [],
  scores: { ...initialScores },
  perfilPrincipal: null,
  perfilSecundario: null,

  setAnswer: (questionIndex, answerIndex) => {
    set((state) => {
      const newAnswers = state.answers.filter((a) => a.questionIndex !== questionIndex);
      newAnswers.push({ questionIndex, answerIndex });
      return { answers: newAnswers };
    });
  },

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, QUESTIONS.length - 1) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  calculateResult: () => {
    const { answers } = get();
    const scores = { ...initialScores };

    answers.forEach(({ questionIndex, answerIndex }) => {
      const question = QUESTIONS[questionIndex];
      if (question && question.opcoes[answerIndex]) {
        const optionScores = question.opcoes[answerIndex].scores;
        (Object.keys(optionScores) as ProfileType[]).forEach((profile) => {
          scores[profile] += optionScores[profile] || 0;
        });
      }
    });

    const adjustedScores = adjustedScoresWithSignals(scores, answers);
    const principal = resolveProfileWithBusinessRules(scores, answers);
    const secundario = secondaryProfile(adjustedScores, principal);

    set({ scores: adjustedScores, perfilPrincipal: principal, perfilSecundario: secundario });

    localStorage.setItem('quiz_scores', JSON.stringify(adjustedScores));
    localStorage.setItem('quiz_principal', principal);
    if (secundario) localStorage.setItem('quiz_secundario', secundario);
    else localStorage.removeItem('quiz_secundario');
    localStorage.setItem('quiz_answers', JSON.stringify(answers));
  },

  reset: () => {
    localStorage.removeItem('quiz_scores');
    localStorage.removeItem('quiz_principal');
    localStorage.removeItem('quiz_secundario');
    localStorage.removeItem('quiz_answers');
    localStorage.removeItem('lead_data');
    set({ currentStep: 0, answers: [], scores: { ...initialScores }, perfilPrincipal: null, perfilSecundario: null });
  },
}));
