import { LeadTemperature, ProfileScores, ProfileType, QuizAnswer } from '@/types';
import { QUESTIONS } from '@/constants/questions';

export function getAnswerText(answers: QuizAnswer[], questionIndex: number): string {
  const answer = answers.find((item) => item.questionIndex === questionIndex);
  if (!answer) return '';
  return QUESTIONS[questionIndex]?.opcoes[answer.answerIndex]?.text || '';
}

export function getPropertyRange(answers: QuizAnswer[]): string {
  return getAnswerText(answers, 2);
}

export function getDownPaymentRange(answers: QuizAnswer[]): string {
  return getAnswerText(answers, 3);
}

export function getUrgency(answers: QuizAnswer[]): string {
  return getAnswerText(answers, 1);
}

export function getObjective(answers: QuizAnswer[]): string {
  return getAnswerText(answers, 0);
}

export function getIncomeRange(answers: QuizAnswer[]): string {
  return getAnswerText(answers, 15);
}

function propertyTags(propertyRange: string): string[] {
  if (propertyRange.includes('Até R$ 250')) return ['imovel_baixa_renda', 'faixa_ate_250k'];
  if (propertyRange.includes('250 mil a R$ 400')) return ['imovel_popular_medio', 'faixa_250k_400k'];
  if (propertyRange.includes('400 mil a R$ 700')) return ['imovel_medio_padrao', 'faixa_400k_700k'];
  if (propertyRange.includes('700 mil a R$ 1 milhão')) return ['imovel_alto_padrao', 'faixa_700k_1m'];
  if (propertyRange.includes('Acima de R$ 1 milhão')) return ['imovel_luxo', 'faixa_acima_1m'];
  return ['valor_indefinido', 'precisa_consultoria_inicial'];
}

function incomeTags(incomeRange: string): string[] {
  if (incomeRange.includes('Até R$ 3')) return ['renda_ate_3k'];
  if (incomeRange.includes('3 mil a R$ 6')) return ['renda_3k_6k'];
  if (incomeRange.includes('6 mil a R$ 10')) return ['renda_6k_10k'];
  if (incomeRange.includes('10 mil a R$ 20')) return ['renda_10k_20k'];
  if (incomeRange.includes('Acima de R$ 20')) return ['renda_acima_20k'];
  return ['renda_nao_informada', 'precisa_qualificacao_manual'];
}

const profileTagMap: Record<ProfileType, string> = {
  financiamento: 'perfil_financiamento_imediato',
  consorcio: 'perfil_consorcio_planejado',
  hibrida: 'perfil_estrategia_hibrida',
  reorganizacao: 'perfil_reorganizacao_financeira',
  investidor: 'perfil_investidor_patrimonial',
  emocional: 'perfil_compra_emocional_risco',
};

export function classifyTemperature(profile: ProfileType, answers: QuizAnswer[]): LeadTemperature {
  const propertyRange = getPropertyRange(answers);
  const downPayment = getDownPaymentRange(answers);
  const incomeRange = getIncomeRange(answers);
  const urgency = getUrgency(answers);
  const debt = getAnswerText(answers, 6);
  const fear = getAnswerText(answers, 12);
  const financialSelf = getAnswerText(answers, 13);
  const hasIncome = incomeRange && !incomeRange.includes('Prefiro informar');
  const propertyDefined = propertyRange && !propertyRange.includes('Ainda não sei');
  const hasEntry = downPayment.includes('20%') || downPayment.includes('10%') || downPayment.includes('menos de 10%') || downPayment.includes('FGTS');
  const clearTime = urgency && !urgency.includes('Não tenho pressa');
  const highTicket = propertyRange.includes('Acima de R$ 1 milhão') || propertyRange.includes('700 mil a R$ 1 milhão');
  const highIncome = incomeRange.includes('Acima de R$ 20');
  const unstableIncome = getAnswerText(answers, 4).includes('Renda instável');
  const noEntry = downPayment.includes('Ainda não tenho entrada') || downPayment.includes('não sei calcular');
  const relevantDebts = debt.includes('pesam') || debt.includes('restrição') || debt.includes('Não sei exatamente');
  const lowClarity = financialSelf.includes('Não tenho controle') || getAnswerText(answers, 16).includes('não sei calcular');
  const urgent = urgency.includes('O quanto antes') || urgency.includes('até 6 meses');
  const fearOpportunity = fear.includes('Perder uma oportunidade');

  if (profile === 'emocional' || (urgent && noEntry && unstableIncome) || (fearOpportunity && lowClarity)) return 'risco';
  if (highIncome || propertyRange.includes('Acima de R$ 1 milhão') || (profile === 'investidor' && highTicket)) return 'premium';
  if (profile === 'reorganizacao' || unstableIncome || noEntry || !propertyDefined || relevantDebts) return 'nutricao';
  if (hasIncome && propertyDefined && hasEntry && clearTime && ['financiamento', 'hibrida', 'consorcio', 'investidor'].includes(profile)) return 'quente';
  return 'morno';
}

export function generateLeadTags(profile: ProfileType, temperature: LeadTemperature, answers: QuizAnswer[]): string[] {
  const propertyRange = getPropertyRange(answers);
  const incomeRange = getIncomeRange(answers);
  const downPayment = getDownPaymentRange(answers);
  const urgency = getUrgency(answers);
  const tags = new Set<string>([profileTagMap[profile], `lead_${temperature}`, ...propertyTags(propertyRange), ...incomeTags(incomeRange)]);

  if (downPayment.includes('FGTS')) tags.add('possui_fgts');
  if (downPayment.includes('Ainda não tenho entrada')) tags.add('sem_entrada');
  if (urgency.includes('O quanto antes') || urgency.includes('até 6 meses')) tags.add('urgencia_alta');
  if (urgency.includes('Entre 1 e 3 anos') || urgency.includes('Não tenho pressa')) tags.add('urgencia_baixa');

  return Array.from(tags);
}

export function getRecommendedProduct(profile: ProfileType): string {
  const map: Record<ProfileType, string> = {
    financiamento: 'Financiamento imobiliário',
    consorcio: 'Consórcio imobiliário',
    hibrida: 'Estratégia híbrida',
    reorganizacao: 'Preparação financeira',
    investidor: 'Estratégia patrimonial',
    emocional: 'Análise segura antes da decisão',
  };
  return map[profile];
}
