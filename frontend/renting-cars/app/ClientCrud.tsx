"use client";
interface Client {
  id?: number;
  rg: string;
  cpf: string;
  name: string;
  occupation: string;
  address: string;
  income: number[];
  company: string[];
}
import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  User,
  Building,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react";

const ClientCRUD = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client>({
    rg: "",
    cpf: "",
    name: "",
    occupation: "",
    address: "",
    income: [],
    company: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "http://localhost:8080/";

  // Buscar todos os clientes
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/clients");
      if (!response.ok) throw new Error("Erro ao buscar clientes");
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError("Erro ao carregar clientes: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  // Criar cliente
  const createClient = async (clientData: Client) => {
    try {
      const response = await fetch(API_BASE_URL + 'clients', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) throw new Error("Erro ao criar cliente");
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao criar cliente: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  // Atualizar cliente
  const updateClient = async (id: number | undefined, clientData: Client) => {
    try {
      const response = await fetch(`${API_BASE_URL}clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) throw new Error("Erro ao atualizar cliente");
      return await response.json();
    } catch (err) {
      throw new Error("Erro ao atualizar cliente: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  // Deletar cliente
  const deleteClient = async (id: number | undefined) => {
    try {
      const response = await fetch(`${API_BASE_URL}clients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar cliente");
    } catch (err) {
      throw new Error("Erro ao deletar cliente: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // Processar income e company (converter strings em arrays)
      const processedClient = {
        ...currentClient,
        income: currentClient.income.filter((income) => typeof income === 'number' && !isNaN(income)),
        company: currentClient.company.filter((company) => company.trim() !== ""),
      };

      if (isEditing) {
        await updateClient(currentClient.id, processedClient);
      } else {
        await createClient(processedClient);
      }

      await fetchClients();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client: Client) => {
    setCurrentClient(client);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number | undefined) => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      try {
        setLoading(true);
        await deleteClient(id);
        await fetchClients();
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setCurrentClient({
      rg: "",
      cpf: "",
      name: "",
      occupation: "",
      address: "",
      income: [],
      company: [],
    });
    setIsEditing(false);
    setIsModalOpen(false);
    setError("");
  };

  const addIncomeField = () => {
    setCurrentClient((prev) => ({
      ...prev,
      income: [...prev.income, 0],
    }));
  };

  const removeIncomeField = (index: number) => {
    setCurrentClient((prev) => ({
      ...prev,
      income: prev.income.filter((_, i) => i !== index),
    }));
  };

  const updateIncomeField = (index: number, value: string) => {
    setCurrentClient((prev) => ({
      ...prev,
      income: prev.income.map((income, i) =>
        i === index ? parseFloat(value) || 0 : income
      ),
    }));
  };

  const addCompanyField = () => {
    setCurrentClient((prev) => ({
      ...prev,
      company: [...prev.company, ""],
    }));
  };

  const removeCompanyField = (index: number) => {
    setCurrentClient((prev) => ({
      ...prev,
      company: prev.company.filter((_, i) => i !== index),
    }));
  };

  const updateCompanyField = (index: number, value: string) => {
    setCurrentClient((prev) => ({
      ...prev,
      company: prev.company.map((company, i) =>
        i === index ? value : company
      ),
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="card">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gerenciamento de Clientes
              </h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os seus clientes de forma eficiente
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Novo Cliente
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="mx-6 mt-4 alert-error">{error}</div>}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <span className="loading-spinner"></span>
            </div>
          )}

          {/* Clients Table */}
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-header">RG</th>
                  <th className="table-header">CPF</th>
                  <th className="table-header">Nome</th>
                  <th className="table-header">Ocupação</th>
                  <th className="table-header">Endereço</th>
                  <th className="table-header">Rendas</th>
                  <th className="table-header">Empresas</th>
                  <th className="table-header text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="table-cell">{client.rg}</td>
                    <td className="table-cell">{client.cpf}</td>
                    <td className="table-cell">{client.name}</td>
                    <td className="table-cell">{client.occupation}</td>
                    <td className="table-cell max-w-xs truncate">
                      {client.address}
                    </td>
                    <td className="table-cell">
                      {client.income && client.income.length > 0
                        ? client.income
                            .map((inc) => `R$ ${inc.toLocaleString("pt-BR")}`)
                            .join(", ")
                        : "Nenhuma"}
                    </td>
                    <td className="table-cell">
                      {client.company && client.company.length > 0
                        ? client.company.join(", ")
                        : "Nenhuma"}
                    </td>
                    <td className="table-cell text-right">
                      <button
                        onClick={() => handleEdit(client)}
                        className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {clients.length === 0 && !loading && (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Nenhum cliente
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Comece criando um novo cliente.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {isEditing ? "Editar Cliente" : "Novo Cliente"}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FileText className="inline w-4 h-4 mr-1" />
                      RG *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentClient.rg}
                      onChange={(e) =>
                        setCurrentClient((prev) => ({
                          ...prev,
                          rg: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="Digite o RG"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="inline w-4 h-4 mr-1" />
                      CPF *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentClient.cpf}
                      onChange={(e) =>
                        setCurrentClient((prev) => ({
                          ...prev,
                          cpf: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="Digite o CPF"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="inline w-4 h-4 mr-1" />
                      Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentClient.name}
                      onChange={(e) =>
                        setCurrentClient((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="Digite o nome"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Building className="inline w-4 h-4 mr-1" />
                    Ocupação *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentClient.occupation}
                    onChange={(e) =>
                      setCurrentClient((prev) => ({
                        ...prev,
                        occupation: e.target.value,
                      }))
                    }
                    className="form-input"
                    placeholder="Digite a ocupação"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Endereço *
                  </label>
                  <textarea
                    required
                    value={currentClient.address}
                    onChange={(e) =>
                      setCurrentClient((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="form-textarea"
                    rows={2}
                    placeholder="Digite o endereço completo"
                  />
                </div>

                {/* Income Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Rendas
                  </label>
                  {currentClient.income.map((income, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="number"
                        step="0.01"
                        value={income}
                        onChange={(e) =>
                          updateIncomeField(index, e.target.value)
                        }
                        className="form-input flex-1"
                        placeholder="Digite a renda"
                      />
                      <button
                        type="button"
                        onClick={() => removeIncomeField(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIncomeField}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Adicionar Renda
                  </button>
                </div>

                {/* Company Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="inline w-4 h-4 mr-1" />
                    Empresas
                  </label>
                  {currentClient.company.map((company, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={company}
                        onChange={(e) =>
                          updateCompanyField(index, e.target.value)
                        }
                        className="form-input flex-1"
                        placeholder="Digite o nome da empresa"
                      />
                      <button
                        type="button"
                        onClick={() => removeCompanyField(index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCompanyField}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Adicionar Empresa
                  </button>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {loading
                      ? "Salvando..."
                      : isEditing
                      ? "Atualizar"
                      : "Criar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCRUD;