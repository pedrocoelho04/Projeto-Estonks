import React, { useEffect, useMemo, useState } from "react";
import { deleteProduto, getProdutos } from "../../services/api";
import type { Produto } from "../../types";
import { Edit, Plus, Trash2 } from 'lucide-react';
import { usePage } from "../../store/page";

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [search, setSearch] = useState("");
  const { setPage } = usePage();

  useEffect(() => {
    (async () => setProdutos(await getProdutos()))();
  }, []);

  async function remover(id: number) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    await deleteProduto(id);
    setProdutos(await getProdutos());
  }

  const filtered = useMemo(() => {
    if (!search) return produtos;
    return produtos.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()));
  }, [produtos, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <h2 className="text-xl font-semibold">Produtos</h2>
        <div className="ml-auto flex gap-2">
          <input
            className="input"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={() => setPage({ name: "produto-new" })}>
            <Plus size={16} /> Novo
          </button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Qtd</th>
              <th className="px-4 py-2 text-left">Valor Unitário</th>
              <th className="px-4 py-2 text-left">Dimensões (CxLxA)</th>
              <th className="px-4 py-2 text-left">Peso</th>
              <th className="px-4 py-2 text-left">Categorias</th>
              <th className="px-4 py-2 text-left">Criado</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <Row key={p.id} p={p} onDelete={() => remover(p.id)} onEdit={() => setPage({ name: "produto-edit", id: p.id })} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatMoney(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Row({ p, onDelete, onEdit }: { p: Produto; onDelete: () => void; onEdit: () => void }) {
  return (
    <tr className="border-t border-border">
      <td className="px-4 py-2">{p.nome}</td>
      <td className="px-4 py-2">
        <span className="badge">{p.digital ? "Digital" : "Físico"}</span>
      </td>
      <td className="px-4 py-2">{p.quantidade}</td>
      <td className="px-4 py-2">{formatMoney(p.valor_Unitario)}</td>
      <td className="px-4 py-2">
        {(p.comprimento ?? 0)}/{(p.largura ?? 0)}/{(p.altura ?? 0)}
      </td>
      <td className="px-4 py-2">{p.peso ?? "-"}</td>
      <td className="px-4 py-2">{p.categorias?.map(c => c.nome).join(", ") || "-"}</td>
      <td className="px-4 py-2">{p.data_criacao ? new Date(p.data_criacao).toLocaleDateString("pt-BR") : "-"}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={onEdit}>
            <Edit size={16} /> Editar
          </button>
          <button className="btn btn-outline text-red-600" onClick={onDelete}>
            <Trash2 size={16} /> Excluir
          </button>
        </div>
      </td>
    </tr>
  );
}