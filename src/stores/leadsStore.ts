import { create } from 'zustand';
import { Lead, Partner } from '@/types';
import { supabase } from '@/lib/supabase';

interface LeadsState {
  leads: Lead[];
  partners: Partner[];
  isAuthenticated: boolean;
  isLoading: boolean;
  syncError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loadData: () => Promise<void>;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  moveLead: (id: string, newStatus: string) => void;
  addPartner: (partner: Partner) => void;
  updatePartner: (id: string, updates: Partial<Partner>) => void;
}

type SupabaseLead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  state: string | null;
  preferred_contact_time: string | null;
  consent_contact: boolean | null;

  source: string | null;
  partner_id: string | null;
  epsa_lead_id: string | null;

  status: string | null;
  temperature: string | null;
  assigned_to: string | null;

  main_profile: string | null;
  secondary_profile: string | null;
  recommended_product: string | null;

  property_value_range: string | null;
  income_range: string | null;
  down_payment_range: string | null;
  urgency: string | null;
  objective: string | null;

  score_financing: number | null;
  score_consortium: number | null;
  score_hybrid: number | null;
  score_reorganization: number | null;
  score_investor: number | null;
  score_risk: number | null;

  tags: string[] | null;
  notes: string | null;
  next_action_date: string | null;
  potential_value: number | null;
  estimated_commission: number | null;
  loss_reason: string | null;

  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  created_at: string;
  updated_at: string | null;
};

type SupabaseQuizAnswer = {
  id: string;
  lead_id: string;
  question_id: string | null;
  question_text: string | null;
  answer_value: string | null;
  answer_label: string | null;
  scores_added: Record<string, unknown> | null;
  created_at: string;
};

type SupabasePartner = {
  id: string;
  name: string;
  type: string | null;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  commission_percentage: number | null;
  source_code: string | null;
  status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved) as T;
  } catch (error) {
    console.warn(`Erro ao carregar ${key} do localStorage:`, error);
    localStorage.removeItem(key);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Erro ao salvar ${key} no localStorage:`, error);
  }
}

function isUuid(value: string | undefined) {
  if (!value) return false;

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function getSafeUuid(id?: string) {
  if (isUuid(id)) return id as string;
  return crypto.randomUUID();
}

function getRespostaValue(answer: unknown, key: string) {
  if (typeof answer !== 'object' || answer === null) return undefined;
  return (answer as Record<string, unknown>)[key];
}

function mapLeadToSupabase(lead: Lead): Partial<SupabaseLead> {
  return {
    id: getSafeUuid(lead.id),
    name: lead.dados?.nome || '',
    phone: lead.dados?.whatsapp || '',
    email: lead.dados?.email || null,
    city: lead.dados?.cidade || null,
    state: lead.dados?.estado || null,
    preferred_contact_time: null,
    consent_contact: Boolean(lead.dados?.aceiteContato),

    source: lead.origem || 'Orgânico',
    partner_id: null,
    epsa_lead_id: null,

    status: lead.status || 'Novo diagnóstico',
    temperature: lead.temperatura || 'morno',
    assigned_to: lead.responsavel || null,

    main_profile: lead.perfilPrincipal || null,
    secondary_profile: lead.perfilSecundario || null,
    recommended_product: null,

    property_value_range: lead.faixaImovel || null,
    income_range: lead.faixaRenda || null,
    down_payment_range: null,
    urgency: null,
    objective: null,

    score_financing: lead.scores?.financiamento || 0,
    score_consortium: lead.scores?.consorcio || 0,
    score_hybrid: lead.scores?.hibrida || 0,
    score_reorganization: lead.scores?.reorganizacao || 0,
    score_investor: lead.scores?.investidor || 0,
    score_risk: lead.scores?.emocional || 0,

    tags: lead.tags || [],
    notes: lead.observacoes || null,
    next_action_date: null,
    potential_value: null,
    estimated_commission: null,
    loss_reason: null,

    updated_at: new Date().toISOString(),
  };
}

function mapSupabaseToLead(
  dbLead: SupabaseLead,
  answers: SupabaseQuizAnswer[] = []
): Lead {
  return {
    id: dbLead.id,
    dados: {
      nome: dbLead.name,
      whatsapp: dbLead.phone,
      email: dbLead.email || undefined,
      cidade: dbLead.city || '',
      estado: dbLead.state || '',
      aceiteContato: Boolean(dbLead.consent_contact),
    },
    respostas: answers.map((answer) => ({
      questionIndex: Number(answer.question_id || 0),
      answerIndex: Number(answer.answer_value || 0),
    })),
    scores: {
      financiamento: dbLead.score_financing || 0,
      consorcio: dbLead.score_consortium || 0,
      hibrida: dbLead.score_hybrid || 0,
      reorganizacao: dbLead.score_reorganization || 0,
      investidor: dbLead.score_investor || 0,
      emocional: dbLead.score_risk || 0,
    },
    perfilPrincipal: dbLead.main_profile as Lead['perfilPrincipal'],
    perfilSecundario: dbLead.secondary_profile as Lead['perfilSecundario'],
    origem: dbLead.source || 'Orgânico',
    temperatura: (dbLead.temperature || 'morno') as Lead['temperatura'],
    status: dbLead.status || 'Novo diagnóstico',
    responsavel: dbLead.assigned_to || undefined,
    tags: dbLead.tags || [],
    observacoes: dbLead.notes || '',
    proximaAcao: undefined,
    historico: [],
    dataEntrada: dbLead.created_at,
    faixaImovel: dbLead.property_value_range || undefined,
    faixaRenda: dbLead.income_range || undefined,
  };
}

function mapPartnerToSupabase(partner: Partner): Partial<SupabasePartner> {
  return {
    id: getSafeUuid(partner.id),
    name: partner.nome,
    type: partner.tipo || null,
    contact_name: partner.responsavel || null,
    phone: partner.whatsapp || null,
    email: partner.email || null,
    city: partner.cidade || null,
    state: partner.estado || null,
    commission_percentage: partner.comissaoPadrao || 0,
    source_code: partner.codigoOrigem || null,
    status: partner.status || 'ativo',
    notes: partner.observacoes || null,
    updated_at: new Date().toISOString(),
  };
}

function mapSupabaseToPartner(dbPartner: SupabasePartner): Partner {
  return {
    id: dbPartner.id,
    nome: dbPartner.name,
    tipo: dbPartner.type || '',
    responsavel: dbPartner.contact_name || '',
    whatsapp: dbPartner.phone || '',
    email: dbPartner.email || '',
    cidade: dbPartner.city || '',
    estado: dbPartner.state || '',
    comissaoPadrao: dbPartner.commission_percentage || 0,
    codigoOrigem: dbPartner.source_code || '',
    status: (dbPartner.status || 'ativo') as Partner['status'],
    observacoes: dbPartner.notes || '',
  };
}

async function saveLeadAnswersToSupabase(lead: Lead, supabaseLeadId: string) {
  if (!lead.respostas || lead.respostas.length === 0) return;

  const rows = lead.respostas.map((answer, index) => {
    const questionIndex = getRespostaValue(answer, 'questionIndex');
    const answerIndex = getRespostaValue(answer, 'answerIndex');

    return {
      lead_id: supabaseLeadId,
      question_id: String(questionIndex ?? index),
      question_text: null,
      answer_value: String(answerIndex ?? ''),
      answer_label: null,
      scores_added: {},
    };
  });

  const { error } = await supabase.from('quiz_answers').insert(rows);

  if (error) {
    console.error('Erro ao salvar respostas do quiz no Supabase:', error);
  }
}

async function createLeadEvent(
  leadId: string,
  eventType: string,
  description: string,
  oldValue?: string,
  newValue?: string
) {
  const { error } = await supabase.from('lead_events').insert({
    lead_id: leadId,
    event_type: eventType,
    description,
    old_value: oldValue || null,
    new_value: newValue || null,
  });

  if (error) {
    console.warn('Erro ao registrar evento do lead:', error);
  }
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: loadFromStorage<Lead[]>('admin_leads', []),
  partners: loadFromStorage<Partner[]>('admin_partners', []),
  isAuthenticated: loadFromStorage<boolean>('admin_auth', false),
  isLoading: false,
  syncError: null,

  login: async (email, password) => {
  set({ isLoading: true, syncError: null });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error('Sessão não criada. Verifique o e-mail e a senha.');
    }

    set({ isAuthenticated: true, isLoading: false });
    saveToStorage('admin_auth', true);

    await get().loadData();

    return true;
  } catch (error) {
    console.error('Erro ao fazer login:', error);

    set({
      isAuthenticated: false,
      isLoading: false,
      syncError:
        error instanceof Error
          ? error.message
          : 'Erro ao fazer login.',
    });

    localStorage.removeItem('admin_auth');

    return false;
  }
},

logout: async () => {
  await supabase.auth.signOut();

  set({ isAuthenticated: false });
  localStorage.removeItem('admin_auth');
},

  loadData: async () => {
    set({ isLoading: true, syncError: null });

    try {
      const [{ data: leadsData, error: leadsError }, { data: partnersData, error: partnersError }] =
        await Promise.all([
          supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false }),
          supabase
            .from('partners')
            .select('*')
            .order('created_at', { ascending: false }),
        ]);

      if (leadsError) throw leadsError;
      if (partnersError) throw partnersError;

      const leadIds = (leadsData || []).map((lead) => lead.id);

      let answersData: SupabaseQuizAnswer[] = [];

      if (leadIds.length > 0) {
        const { data, error } = await supabase
          .from('quiz_answers')
          .select('*')
          .in('lead_id', leadIds);

        if (error) throw error;

        answersData = data || [];
      }

      const answersByLeadId = answersData.reduce<Record<string, SupabaseQuizAnswer[]>>(
        (acc, answer) => {
          if (!acc[answer.lead_id]) {
            acc[answer.lead_id] = [];
          }

          acc[answer.lead_id].push(answer);

          return acc;
        },
        {}
      );

      const mappedLeads = (leadsData || []).map((lead) =>
        mapSupabaseToLead(lead as SupabaseLead, answersByLeadId[lead.id] || [])
      );

      const mappedPartners = (partnersData || []).map((partner) =>
        mapSupabaseToPartner(partner as SupabasePartner)
      );

      saveToStorage('admin_leads', mappedLeads);
      saveToStorage('admin_partners', mappedPartners);

      set({
        leads: mappedLeads,
        partners: mappedPartners,
        isLoading: false,
        syncError: null,
      });
    } catch (error) {
      console.error('Erro ao carregar dados do Supabase:', error);

      set({
        isLoading: false,
        syncError:
          error instanceof Error
            ? error.message
            : 'Erro ao carregar dados do Supabase.',
      });
    }
  },

  addLead: (lead) => {
    const safeLead: Lead = {
      ...lead,
      id: getSafeUuid(lead.id),
    };

    set((state) => {
      const newLeads = [safeLead, ...state.leads];
      saveToStorage('admin_leads', newLeads);
      return { leads: newLeads };
    });

    void (async () => {
      try {
        const payload = mapLeadToSupabase(safeLead);

        const { error } = await supabase.from('leads').insert(payload);

        if (error) throw error;

        await saveLeadAnswersToSupabase(safeLead, safeLead.id);
        await createLeadEvent(
          safeLead.id,
          'lead_created',
          'Lead criado via diagnóstico.'
        );
      } catch (error) {
        console.error('Erro ao salvar lead no Supabase:', error);

        set({
          syncError:
            error instanceof Error
              ? error.message
              : 'Erro ao salvar lead no Supabase.',
        });
      }
    })();
  },

  updateLead: (id, updates) => {
    set((state) => {
      const newLeads = state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...updates } : lead
      );

      saveToStorage('admin_leads', newLeads);

      return { leads: newLeads };
    });

    void (async () => {
      try {
        const updatedLead = get().leads.find((lead) => lead.id === id);

        if (!updatedLead) return;

        const payload = mapLeadToSupabase(updatedLead);

        const { error } = await supabase
          .from('leads')
          .update(payload)
          .eq('id', id);

        if (error) throw error;

        await createLeadEvent(
          id,
          'lead_updated',
          'Lead atualizado no painel administrativo.'
        );
      } catch (error) {
        console.error('Erro ao atualizar lead no Supabase:', error);

        set({
          syncError:
            error instanceof Error
              ? error.message
              : 'Erro ao atualizar lead no Supabase.',
        });
      }
    })();
  },

  moveLead: (id, newStatus) => {
    const lead = get().leads.find((item) => item.id === id);
    const oldStatus = lead?.status;

    get().updateLead(id, { status: newStatus });

    void createLeadEvent(
      id,
      'status_changed',
      `Status alterado para ${newStatus}.`,
      oldStatus,
      newStatus
    );
  },

  addPartner: (partner) => {
    const safePartner: Partner = {
      ...partner,
      id: getSafeUuid(partner.id),
    };

    set((state) => {
      const newPartners = [...state.partners, safePartner];
      saveToStorage('admin_partners', newPartners);
      return { partners: newPartners };
    });

    void (async () => {
      try {
        const payload = mapPartnerToSupabase(safePartner);

        const { error } = await supabase.from('partners').insert(payload);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao salvar parceiro no Supabase:', error);

        set({
          syncError:
            error instanceof Error
              ? error.message
              : 'Erro ao salvar parceiro no Supabase.',
        });
      }
    })();
  },

  updatePartner: (id, updates) => {
    set((state) => {
      const newPartners = state.partners.map((partner) =>
        partner.id === id ? { ...partner, ...updates } : partner
      );

      saveToStorage('admin_partners', newPartners);

      return { partners: newPartners };
    });

    void (async () => {
      try {
        const updatedPartner = get().partners.find((partner) => partner.id === id);

        if (!updatedPartner) return;

        const payload = mapPartnerToSupabase(updatedPartner);

        const { error } = await supabase
          .from('partners')
          .update(payload)
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error('Erro ao atualizar parceiro no Supabase:', error);

        set({
          syncError:
            error instanceof Error
              ? error.message
              : 'Erro ao atualizar parceiro no Supabase.',
        });
      }
    })();
  },
}));

if (typeof window !== 'undefined') {
  window.setTimeout(() => {
    void useLeadsStore.getState().loadData();
  }, 0);
}