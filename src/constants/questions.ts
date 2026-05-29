import { ProfileType } from '@/types';

export interface QuestionOption {
  text: string;
  scores: Partial<Record<ProfileType, number>>;
}

export interface Question {
  pergunta: string;
  opcoes: QuestionOption[];
}

// Pontuação calibrada para não favorecer financiamento por padrão.
// A pergunta de valor do imóvel (3) é usada quase só para roteamento, não para decidir o perfil.
export const QUESTIONS: Question[] = [
  {
    pergunta: 'Qual é o seu principal objetivo hoje?',
    opcoes: [
      { text: 'Comprar meu primeiro imóvel para morar', scores: { financiamento: 1, consorcio: 1 } },
      { text: 'Sair do aluguel', scores: { financiamento: 2, emocional: 1 } },
      { text: 'Trocar de imóvel', scores: { hibrida: 2 } },
      { text: 'Comprar para investir', scores: { investidor: 3 } },
      { text: 'Construir patrimônio para o futuro', scores: { consorcio: 2, investidor: 2 } },
      { text: 'Ainda estou entendendo minhas possibilidades', scores: { reorganizacao: 2, hibrida: 1 } },
    ],
  },
  {
    pergunta: 'Em quanto tempo você gostaria de estar com o imóvel?',
    opcoes: [
      { text: 'O quanto antes', scores: { financiamento: 3, emocional: 2 } },
      { text: 'Em até 6 meses', scores: { financiamento: 2, hibrida: 1 } },
      { text: 'Em até 1 ano', scores: { hibrida: 2 } },
      { text: 'Entre 1 e 3 anos', scores: { consorcio: 3, hibrida: 1 } },
      { text: 'Não tenho pressa, quero fazer com inteligência', scores: { consorcio: 3, investidor: 2 } },
    ],
  },
  {
    pergunta: 'Qual faixa de valor do imóvel você pretende comprar?',
    opcoes: [
      { text: 'Até R$ 250 mil', scores: {} },
      { text: 'De R$ 250 mil a R$ 400 mil', scores: {} },
      { text: 'De R$ 400 mil a R$ 700 mil', scores: {} },
      { text: 'De R$ 700 mil a R$ 1 milhão', scores: { investidor: 1 } },
      { text: 'Acima de R$ 1 milhão', scores: { investidor: 2 } },
      { text: 'Ainda não sei o valor exato', scores: { reorganizacao: 1, hibrida: 1 } },
    ],
  },
  {
    pergunta: 'Você já tem entrada disponível considerando essa faixa de imóvel?',
    opcoes: [
      { text: 'Sim, tenho 20% ou mais do valor do imóvel', scores: { financiamento: 3, investidor: 1 } },
      { text: 'Tenho entre 10% e 20%', scores: { financiamento: 2, hibrida: 2 } },
      { text: 'Tenho menos de 10%', scores: { hibrida: 2, consorcio: 1 } },
      { text: 'Ainda não tenho entrada', scores: { reorganizacao: 3, emocional: 1 } },
      { text: 'Tenho FGTS ou outro recurso que poderia usar', scores: { financiamento: 1, hibrida: 2 } },
      { text: 'Ainda não sei calcular minha entrada em relação ao valor do imóvel', scores: { reorganizacao: 1, hibrida: 2 } },
    ],
  },
  {
    pergunta: 'Como é sua renda hoje?',
    opcoes: [
      { text: 'CLT ou servidor público', scores: { financiamento: 3 } },
      { text: 'Empresário com renda comprovável', scores: { financiamento: 2, investidor: 1 } },
      { text: 'Autônomo com movimentação bancária', scores: { hibrida: 2, consorcio: 1 } },
      { text: 'Autônomo com renda difícil de comprovar', scores: { consorcio: 2, hibrida: 2 } },
      { text: 'Renda instável no momento', scores: { reorganizacao: 3, emocional: 1 } },
    ],
  },
  {
    pergunta: 'Qual percentual da sua renda você acredita que conseguiria comprometer mensalmente com segurança?',
    opcoes: [
      { text: 'Até 20%', scores: { consorcio: 2, reorganizacao: 1 } },
      { text: 'Entre 20% e 30%', scores: { financiamento: 2, consorcio: 2 } },
      { text: 'Entre 30% e 40%', scores: { financiamento: 1, emocional: 1 } },
      { text: 'Acima de 40%', scores: { emocional: 3, reorganizacao: 2 } },
      { text: 'Não sei responder', scores: { reorganizacao: 2 } },
    ],
  },
  {
    pergunta: 'Você possui dívidas ou restrições atualmente?',
    opcoes: [
      { text: 'Não possuo dívidas relevantes', scores: { financiamento: 2, investidor: 1 } },
      { text: 'Tenho dívidas controladas', scores: { hibrida: 1, consorcio: 1 } },
      { text: 'Tenho dívidas que pesam no orçamento', scores: { reorganizacao: 3 } },
      { text: 'Tenho restrição no nome', scores: { reorganizacao: 3, consorcio: 1 } },
      { text: 'Não sei exatamente minha situação', scores: { reorganizacao: 2, emocional: 1 } },
    ],
  },
  {
    pergunta: 'Você já tentou financiar um imóvel?',
    opcoes: [
      { text: 'Sim, fui aprovado', scores: { financiamento: 3 } },
      { text: 'Sim, mas fui recusado', scores: { consorcio: 2, hibrida: 2, reorganizacao: 1 } },
      { text: 'Sim, mas achei a parcela ou os juros muito altos', scores: { consorcio: 3, hibrida: 1 } },
      { text: 'Ainda não tentei', scores: { hibrida: 1 } },
      { text: 'Tenho medo de tentar e ser recusado', scores: { reorganizacao: 1, hibrida: 1 } },
    ],
  },
  {
    pergunta: 'O que mais te incomoda no financiamento?',
    opcoes: [
      { text: 'Juros altos', scores: { consorcio: 3 } },
      { text: 'Valor da entrada', scores: { hibrida: 2, reorganizacao: 1 } },
      { text: 'Medo de não ser aprovado', scores: { hibrida: 2, reorganizacao: 1 } },
      { text: 'Parcela alta', scores: { consorcio: 1, reorganizacao: 2 } },
      { text: 'Financiamento não me incomoda se resolver rápido', scores: { financiamento: 3 } },
    ],
  },
  {
    pergunta: 'O que mais te incomoda no consórcio?',
    opcoes: [
      { text: 'Não saber quando vou ser contemplado', scores: { financiamento: 2, hibrida: 1 } },
      { text: 'Medo de cair em golpe', scores: { reorganizacao: 1, hibrida: 1 } },
      { text: 'Não entender como funciona', scores: { consorcio: 1, hibrida: 1 } },
      { text: 'Acho interessante se for bem explicado', scores: { consorcio: 2 } },
      { text: 'Não tenho problema com prazo, se fizer sentido financeiramente', scores: { consorcio: 3, investidor: 1 } },
    ],
  },
  {
    pergunta: 'Qual frase mais combina com você?',
    opcoes: [
      { text: 'Prefiro resolver rápido, mesmo pagando mais', scores: { financiamento: 3 } },
      { text: 'Prefiro planejar melhor, mesmo que demore', scores: { consorcio: 3 } },
      { text: 'Quero equilíbrio entre velocidade e economia', scores: { hibrida: 3 } },
      { text: 'Preciso comprar, mas estou inseguro financeiramente', scores: { reorganizacao: 2, emocional: 2 } },
      { text: 'Penso no imóvel como construção de patrimônio', scores: { investidor: 3 } },
    ],
  },
  {
    pergunta: 'Hoje você já tem um imóvel específico em vista?',
    opcoes: [
      { text: 'Sim, já tenho imóvel escolhido', scores: { financiamento: 3, emocional: 1 } },
      { text: 'Tenho região e faixa de valor definidas', scores: { financiamento: 1, hibrida: 2 } },
      { text: 'Ainda estou pesquisando', scores: { hibrida: 2 } },
      { text: 'Quero comprar no futuro, mas sem imóvel definido', scores: { consorcio: 2 } },
      { text: 'Quero investir, não necessariamente morar', scores: { investidor: 3 } },
    ],
  },
  {
    pergunta: 'Qual é seu maior medo hoje?',
    opcoes: [
      { text: 'Pagar juros demais', scores: { consorcio: 3 } },
      { text: 'Não ser aprovado', scores: { hibrida: 2, reorganizacao: 1 } },
      { text: 'Assumir uma parcela que não consigo manter', scores: { reorganizacao: 3, emocional: 1 } },
      { text: 'Perder uma oportunidade', scores: { emocional: 3, financiamento: 1 } },
      { text: 'Continuar parado e não construir patrimônio', scores: { consorcio: 1, investidor: 2 } },
    ],
  },
  {
    pergunta: 'Como você se considera financeiramente?',
    opcoes: [
      { text: 'Organizado e disciplinado', scores: { consorcio: 2, investidor: 2, financiamento: 1 } },
      { text: 'Tenho boa renda, mas poderia organizar melhor', scores: { hibrida: 2 } },
      { text: 'Ganho bem, mas gasto muito', scores: { reorganizacao: 2, emocional: 1 } },
      { text: 'Estou tentando me reorganizar', scores: { reorganizacao: 3 } },
      { text: 'Não tenho controle claro das minhas finanças', scores: { reorganizacao: 3, emocional: 2 } },
    ],
  },
  {
    pergunta: 'Se uma estratégia pudesse economizar juros, mas exigisse mais planejamento, você consideraria?',
    opcoes: [
      { text: 'Sim, com certeza', scores: { consorcio: 3, investidor: 1 } },
      { text: 'Sim, se eu entendesse bem', scores: { consorcio: 2, hibrida: 1 } },
      { text: 'Talvez, dependendo do prazo', scores: { hibrida: 2 } },
      { text: 'Não, prefiro resolver rápido', scores: { financiamento: 3 } },
      { text: 'Não sei avaliar', scores: { reorganizacao: 1, hibrida: 1 } },
    ],
  },
  {
    pergunta: 'Qual é aproximadamente sua renda familiar mensal?',
    opcoes: [
      { text: 'Até R$ 3 mil', scores: { reorganizacao: 2, emocional: 1 } },
      { text: 'De R$ 3 mil a R$ 6 mil', scores: { financiamento: 1, consorcio: 1, hibrida: 1 } },
      { text: 'De R$ 6 mil a R$ 10 mil', scores: { financiamento: 2, consorcio: 2, hibrida: 2 } },
      { text: 'De R$ 10 mil a R$ 20 mil', scores: { financiamento: 2, consorcio: 2, investidor: 1 } },
      { text: 'Acima de R$ 20 mil', scores: { investidor: 2, financiamento: 2, consorcio: 2 } },
      { text: 'Prefiro informar depois', scores: { hibrida: 1 } },
    ],
  },
  {
    pergunta: 'O valor do imóvel desejado parece compatível com sua renda atual?',
    opcoes: [
      { text: 'Sim, acredito que está compatível', scores: { financiamento: 1, consorcio: 1, hibrida: 1 } },
      { text: 'Talvez, mas tenho dúvidas', scores: { hibrida: 2 } },
      { text: 'Acho que está acima da minha realidade atual', scores: { reorganizacao: 2, emocional: 1 } },
      { text: 'Ainda não sei calcular isso', scores: { reorganizacao: 2, hibrida: 1 } },
      { text: 'Quero que um especialista me ajude a avaliar', scores: { hibrida: 2 } },
    ],
  },
  {
    pergunta: 'Ao final deste diagnóstico, o que você gostaria de receber?',
    opcoes: [
      { text: 'Uma simulação de financiamento', scores: { financiamento: 3 } },
      { text: 'Uma estratégia de consórcio', scores: { consorcio: 3 } },
      { text: 'Uma comparação entre financiamento e consórcio', scores: { hibrida: 3 } },
      { text: 'Um plano para me preparar melhor', scores: { reorganizacao: 3 } },
      { text: 'Uma estratégia patrimonial para comprar com inteligência', scores: { investidor: 3 } },
    ],
  },
];
