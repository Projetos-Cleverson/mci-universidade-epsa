import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useLeadsStore } from '@/stores/leadsStore';
import { useToast } from '@/hooks/use-toast';
import { Partner } from '@/types';
import { generateId } from '@/lib/utils';
import { ESTADOS_BR } from '@/constants/config';
import { Plus, X } from 'lucide-react';

export default function AdminPartners() {
  const { partners, addPartner, updatePartner } = useLeadsStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Partner>>({
    nome: '', tipo: 'Corretor', responsavel: '', whatsapp: '', email: '',
    cidade: '', estado: '', comissaoPadrao: 30, codigoOrigem: '', status: 'ativo', observacoes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.responsavel || !form.whatsapp) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Preencha os campos obrigatórios.' });
      return;
    }
    addPartner({ ...form, id: generateId() } as Partner);
    toast({ title: 'Parceiro adicionado', description: `${form.nome} foi cadastrado com sucesso.` });
    setShowForm(false);
    setForm({ nome: '', tipo: 'Corretor', responsavel: '', whatsapp: '', email: '', cidade: '', estado: '', comissaoPadrao: 30, codigoOrigem: '', status: 'ativo', observacoes: '' });
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    updatePartner(id, { status: currentStatus === 'ativo' ? 'inativo' : 'ativo' });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--deep-blue)] font-sans">Parceiros</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{partners.length} parceiro{partners.length !== 1 ? 's' : ''} cadastrado{partners.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--deep-blue)] text-white text-sm font-medium hover:bg-[var(--navy)]"
        >
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? 'Fechar' : 'Novo parceiro'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 border border-[var(--medium-gray)] mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Nome *</label>
              <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Tipo</label>
              <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm">
                <option>Corretor</option>
                <option>Imobiliária</option>
                <option>Construtora</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Responsável *</label>
              <input type="text" value={form.responsavel} onChange={(e) => setForm({ ...form, responsavel: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">WhatsApp *</label>
              <input type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">E-mail</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Cidade</label>
              <input type="text" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Estado</label>
              <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm">
                <option value="">Selecione</option>
                {ESTADOS_BR.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Comissão (%)</label>
              <input type="number" value={form.comissaoPadrao} onChange={(e) => setForm({ ...form, comissaoPadrao: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Código de origem</label>
              <input type="text" value={form.codigoOrigem} onChange={(e) => setForm({ ...form, codigoOrigem: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-[var(--graphite)] mb-1">Observações</label>
            <textarea value={form.observacoes} onChange={(e) => setForm({ ...form, observacoes: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-[var(--medium-gray)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-accent)]/50" />
          </div>
          <button type="submit" className="mt-4 px-5 py-2 rounded-lg bg-[var(--green-accent)] text-white text-sm font-medium hover:bg-[var(--green-light)]">
            Cadastrar parceiro
          </button>
        </form>
      )}

      {/* Partners List */}
      <div className="bg-white rounded-xl border border-[var(--medium-gray)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-[var(--medium-gray)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[var(--graphite)]">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--graphite)] hidden sm:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--graphite)] hidden md:table-cell">Cidade</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--graphite)] hidden lg:table-cell">Comissão</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--graphite)]">Status</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--graphite)]">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--medium-gray)]">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--graphite)]">{partner.nome}</p>
                    <p className="text-xs text-[var(--text-muted)]">{partner.responsavel}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[var(--text-muted)]">{partner.tipo}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[var(--text-muted)]">{partner.cidade}/{partner.estado}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[var(--graphite)] font-medium">{partner.comissaoPadrao}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${partner.status === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleStatus(partner.id, partner.status)}
                      className="text-xs text-[var(--deep-blue)] hover:text-[var(--green-accent)] font-medium"
                    >
                      {partner.status === 'ativo' ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
