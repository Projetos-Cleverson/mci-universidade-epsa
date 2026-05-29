import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '@/stores/quizStore';
import { useLeadsStore } from '@/stores/leadsStore';
import { useToast } from '@/hooks/use-toast';
import { LeadData, Lead } from '@/types';
import { generateId } from '@/lib/utils';
import { ESTADOS_BR } from '@/constants/config';
import { classifyTemperature, generateLeadTags, getDownPaymentRange, getIncomeRange, getObjective, getPropertyRange, getRecommendedProduct, getUrgency } from '@/lib/leadUtils';
import { Building2, ShieldCheck } from 'lucide-react';

export default function LeadCapture() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { scores, perfilPrincipal, perfilSecundario, answers } = useQuizStore();
  const { addLead } = useLeadsStore();

  const [form, setForm] = useState<LeadData>({
    nome: '',
    whatsapp: '',
    cidade: '',
    estado: '',
    email: '',
    horarioContato: '',
    aceiteContato: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    else if (form.whatsapp.replace(/\D/g, '').length < 10) newErrors.whatsapp = 'WhatsApp inválido';
    if (!form.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!form.estado) newErrors.estado = 'Estado é obrigatório';
    if (!form.aceiteContato) newErrors.aceiteContato = 'Aceite é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({ variant: 'destructive', title: 'Campos obrigatórios', description: 'Preencha todos os campos obrigatórios.' });
      return;
    }
    if (!perfilPrincipal) {
      navigate('/diagnostico');
      return;
    }

    const temperatura = classifyTemperature(perfilPrincipal, answers);
    const tags = generateLeadTags(perfilPrincipal, temperatura, answers);
    const faixaImovel = getPropertyRange(answers);
    const faixaRenda = getIncomeRange(answers);
    const entradaDisponivel = getDownPaymentRange(answers);
    const urgencia = getUrgency(answers);
    const objetivo = getObjective(answers);

    const lead: Lead = {
      id: generateId(),
      dados: form,
      respostas: answers,
      scores,
      perfilPrincipal,
      perfilSecundario: perfilSecundario || undefined,
      origem: new URLSearchParams(window.location.search).get('origem') || 'Orgânico',
      temperatura,
      status: 'Novo diagnóstico',
      tags,
      observacoes: '',
      historico: [{ data: new Date().toISOString().split('T')[0], acao: `Lead criado via diagnóstico (${temperatura})` }],
      dataEntrada: new Date().toISOString().split('T')[0],
      faixaImovel,
      faixaRenda,
      entradaDisponivel,
      urgencia,
      objetivo,
      produtoRecomendado: getRecommendedProduct(perfilPrincipal),
    };

    addLead(lead);
    localStorage.setItem('lead_data', JSON.stringify(form));
    navigate('/resultado');
  };

  const updateField = (field: keyof LeadData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen bg-[var(--light-gray)] flex flex-col">
      <header className="bg-white border-b border-[var(--medium-gray)] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <div className="size-8 rounded-lg bg-[var(--deep-blue)] flex items-center justify-center">
            <Building2 className="size-4 text-white" />
          </div>
          <span className="font-sans font-semibold text-[var(--deep-blue)] text-sm">
            Quase lá!
          </span>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-2xl font-bold text-[var(--deep-blue)] text-balance">
            Seu diagnóstico está pronto
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Para liberar seu resultado e permitir que um especialista entenda melhor seu perfil, informe seus dados abaixo.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--graphite)] mb-1">Nome completo *</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => updateField('nome', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.nome ? 'border-red-400' : 'border-[var(--medium-gray)]'} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]`}
                placeholder="Seu nome"
              />
              {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--graphite)] mb-1">WhatsApp *</label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => updateField('whatsapp', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${errors.whatsapp ? 'border-red-400' : 'border-[var(--medium-gray)]'} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]`}
                placeholder="(00) 00000-0000"
              />
              {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-[var(--graphite)] mb-1">Cidade *</label>
                <input
                  type="text"
                  value={form.cidade}
                  onChange={(e) => updateField('cidade', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.cidade ? 'border-red-400' : 'border-[var(--medium-gray)]'} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]`}
                  placeholder="Sua cidade"
                />
                {errors.cidade && <p className="text-xs text-red-500 mt-1">{errors.cidade}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--graphite)] mb-1">Estado *</label>
                <select
                  value={form.estado}
                  onChange={(e) => updateField('estado', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.estado ? 'border-red-400' : 'border-[var(--medium-gray)]'} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]`}
                >
                  <option value="">UF</option>
                  {ESTADOS_BR.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                {errors.estado && <p className="text-xs text-red-500 mt-1">{errors.estado}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--graphite)] mb-1">E-mail <span className="text-[var(--text-muted)]">(opcional)</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[var(--medium-gray)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--graphite)] mb-1">Melhor horário para contato <span className="text-[var(--text-muted)]">(opcional)</span></label>
              <select
                value={form.horarioContato}
                onChange={(e) => updateField('horarioContato', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[var(--medium-gray)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50 focus:border-[var(--green-accent)]"
              >
                <option value="">Selecione</option>
                <option value="manha">Manhã (8h-12h)</option>
                <option value="tarde">Tarde (12h-18h)</option>
                <option value="noite">Noite (18h-21h)</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.aceiteContato}
                  onChange={(e) => updateField('aceiteContato', e.target.checked)}
                  className="mt-1 size-4 rounded border-gray-300 text-[var(--green-accent)] focus:ring-[var(--green-accent)]"
                />
                <span className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Ao continuar, você autoriza o contato para receber sua análise e orientações 
                  relacionadas à compra imobiliária. Seus dados serão usados apenas para atendimento, 
                  diagnóstico e acompanhamento comercial.
                </span>
              </label>
              {errors.aceiteContato && <p className="text-xs text-red-500 mt-1">{errors.aceiteContato}</p>}
            </div>

            <div className="flex items-center gap-2 p-3 bg-[var(--green-accent)]/5 rounded-lg mt-4">
              <ShieldCheck className="size-4 text-[var(--green-accent)]" />
              <span className="text-xs text-[var(--graphite)]">Seus dados estão protegidos conforme a LGPD.</span>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-4 rounded-xl bg-[var(--green-accent)] text-white font-semibold hover:bg-[var(--green-light)] transition-colors active:scale-[0.98]"
            >
              Ver meu resultado
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
