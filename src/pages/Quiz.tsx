import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { QUESTIONS } from '@/constants/questions';
import ProgressBar from '@/components/features/ProgressBar';
import QuizQuestion from '@/components/features/QuizQuestion';
import { ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function Quiz() {
  const navigate = useNavigate();
  const { currentStep, answers, setAnswer, nextStep, prevStep, calculateResult } = useQuizStore();

  const currentAnswer = answers.find((a) => a.questionIndex === currentStep)?.answerIndex;
  const isLastStep = currentStep === QUESTIONS.length - 1;

  const handleSelect = (index: number) => {
    setAnswer(currentStep, index);
  };

  const handleNext = () => {
    if (currentAnswer === undefined) return;
    if (isLastStep) {
      calculateResult();
      navigate('/dados');
    } else {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (currentStep === 0) {
      navigate('/');
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--light-gray)] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[var(--medium-gray)] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[var(--deep-blue)] flex items-center justify-center">
            <Building2 className="size-4 text-white" />
          </div>
          <span className="font-sans font-semibold text-[var(--deep-blue)] text-sm">
            Diagnóstico Imobiliário
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-[var(--medium-gray)] px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <ProgressBar current={currentStep} total={QUESTIONS.length} />
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <QuizQuestion
              key={currentStep}
              pergunta={QUESTIONS[currentStep].pergunta}
              opcoes={QUESTIONS[currentStep].opcoes}
              selectedAnswer={currentAnswer}
              onSelect={handleSelect}
            />
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-white border-t border-[var(--medium-gray)] px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--graphite)] hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </button>
          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-[var(--green-accent)] text-white hover:bg-[var(--green-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Ver resultado' : 'Próxima'}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
