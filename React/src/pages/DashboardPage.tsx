import React, { useEffect, useState } from "react";
import { getCategorias, getProdutos } from "../services/api";
import type { Produto, Categoria } from "../types";
import { Package, Tag } from 'lucide-react';
import { usePage } from "../store/page";

export default function DashboardPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { setPage } = usePage();

  useEffect(() => {
    (async () => {
      setProdutos(await getProdutos());
      setCategorias(await getCategorias());
    })();
  }, []);

  const totalItens = produtos.reduce((acc, p) => acc + (p.quantidade ?? 0), 0);
  const totalSku = produtos.length;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Visão Geral</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Produtos (SKU)</div>
          <div className="mt-2 text-2xl font-bold">{totalSku}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Itens em estoque</div>
          <div className="mt-2 text-2xl font-bold">{totalItens}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Categorias</div>
          <div className="mt-2 text-2xl font-bold">{categorias.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="card p-4 hover:bg-gray-50 transition text-left"
          onClick={() => setPage({ name: "produtos" })}
        >
          <div className="flex items-center gap-2">
            <Package className="text-primary" />
            <div>
              <div className="font-medium">Gerenciar Produtos</div>
              <div className="text-sm text-gray-500">Listar, criar e editar produtos</div>
            </div>
          </div>
        </button>

        <button
          className="card p-4 hover:bg-gray-50 transition text-left"
          onClick={() => setPage({ name: "categorias" })}
        >
          <div className="flex items-center gap-2">
            <Tag className="text-primary" />
            <div>
              <div className="font-medium">Gerenciar Categorias</div>
              <div className="text-sm text-gray-500">Listar, criar e editar categorias</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}