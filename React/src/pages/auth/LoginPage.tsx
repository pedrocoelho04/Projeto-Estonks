import React, { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { KeyRound } from 'lucide-react';
import { usePage } from "../../store/page";

export default function LoginPage() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);
  const { setPage } = usePage();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const ok = await login(nome, senha);
    if (ok) setPage({ name: "dashboard" });
    else setError("Credenciais inválidas");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="text-primary" />
          <h1 className="text-lg font-semibold">Login</h1>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="label" htmlFor="nome">Usuário</label>
            <input id="nome" className="input" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="senha">Senha</label>
            <input id="senha" type="password" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="btn btn-primary w-full">Entrar</button>
          <p className="text-xs text-gray-500">
            Dica: usuário admin / senha admin (apenas no seed local).
          </p>
        </form>
      </div>
    </div>
  );
}