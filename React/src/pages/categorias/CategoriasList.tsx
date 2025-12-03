import React, { useEffect, useMemo, useState } from "react";
import { deleteCategoria, getCategorias } from "../../services/api";
import type { Categoria } from "../../types";
import { Edit, Plus, Trash2 } from 'lucide-react';
import { usePage } from "../../store/page";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  const { setPage } = usePage();

  async function refetch() {
    setCategorias(await getCategorias());
  }

  useEffect(() => {
    refetch();
  }, []);

  async function remover(id: number) {
    if (!confirm("Excluir esta categoria? Os vínculos com produtos serão removidos.")) return;
    await deleteCategoria(id);
    refetch();
  }

  const filtered = useMemo(() => {
    if (!search) return categorias;
    return categorias.filter((c) => c.nome.toLowerCase().includes(search.toLowerCase()));
  }, [categorias, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <div className="ml-auto flex gap-2">
          <input className="input" placeholder="Buscar por nome..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn btn-primary" onClick={() => setPage({ name: "categoria-new" })}>
            <Plus size={16} /> Nova
          </button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="px-4 py-2">{c.nome}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-end">
                    <button className="btn btn-outline" onClick={() => setPage({ name: "categoria-edit", id: c.id })}>
                      <Edit size={16} /> Editar
                    </button>
                    <button className="btn btn-outline text-red-600" onClick={() => remover(c.id)}>
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-gray-500">Nenhuma categoria encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}