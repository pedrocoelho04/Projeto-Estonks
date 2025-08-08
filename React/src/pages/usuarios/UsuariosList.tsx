import React, { useEffect, useState } from "react";
import { deleteUsuario, getUsuarios } from "../../services/api";
import type { Usuario } from "../../types";
import { Edit, Plus, Trash2 } from 'lucide-react';
import { usePage } from "../../store/page";

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { setPage } = usePage();

  async function refetch() {
    setUsuarios(await getUsuarios());
  }

  useEffect(() => {
    refetch();
  }, []);

  async function remover(id: number) {
    if (!confirm("Excluir este usuário?")) return;
    await deleteUsuario(id);
    refetch();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Usuários</h2>
        <div className="ml-auto">
          <button className="btn btn-primary" onClick={() => setPage({ name: "usuario-new" })}>
            <Plus size={16} /> Novo
          </button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.Id} className="border-t border-border">
                <td className="px-4 py-2">{u.Id}</td>
                <td className="px-4 py-2">{u.Nome}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-end">
                    <button className="btn btn-outline" onClick={() => setPage({ name: "usuario-edit", id: u.Id })}>
                      <Edit size={16} /> Editar
                    </button>
                    <button className="btn btn-outline text-red-600" onClick={() => remover(u.Id)}>
                      <Trash2 size={16} /> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}