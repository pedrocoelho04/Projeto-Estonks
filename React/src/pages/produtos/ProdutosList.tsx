import React, { useEffect, useMemo, useState } from "react";
import { deleteProduto, getCategoriasByProdutoId, getProdutos } from "../../services/api";
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
    return produtos.filter((p) => p.Nome.toLowerCase().includes(search.toLowerCase()));
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
              <Row key={p.Id} p={p} onDelete={() => remover(p.Id)} onEdit={() => setPage({ name: "produto-edit", id: p.Id })} />
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
  const [catNames, setCatNames] = useState<string>("");

  useEffect(() => {
    (async () => {
      const cats = await getCategoriasByProdutoId(p.Id);
      setCatNames(cats.map((c) => c.Nome).join(", "));
    })();
  }, [p.Id]);

  return (
    <tr className="border-t border-border">
      <td className="px-4 py-2">{p.Nome}</td>
      <td className="px-4 py-2">
        <span className="badge">{p.Digital ? "Digital" : "Físico"}</span>
      </td>
      <td className="px-4 py-2">{p.Quantidade}</td>
      <td className="px-4 py-2">{formatMoney(p.Valor_Unitario)}</td>
      <td className="px-4 py-2">
        {(p.Comprimento ?? 0)}/{(p.Largura ?? 0)}/{(p.Altura ?? 0)}
      </td>
      <td className="px-4 py-2">{p.Peso ?? "-"}</td>
      <td className="px-4 py-2">{catNames || "-"}</td>
      <td className="px-4 py-2">{new Date(p.Data_Criacao).toLocaleDateString("pt-BR")}</td>
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