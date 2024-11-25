import React, { useState } from "react";
import ModalIdade from "../componentes/IdadeModal";
import ModalCondicoes from "../componentes/ModalCond";
import ModalResultados from "../componentes/ModalResultado";
import ModalFilhote from "../componentes/ModalFilhote";
import { Button } from "@mui/material";
import Carousel from "../componentes/carroselpc";

const Calculo = () => {
  const [isModalIdadeOpen, setIsModalIdadeOpen] = useState(false);
  const [isModalCondicoesOpen, setIsModalCondicoesOpen] = useState(false);
  const [isModalResultadosOpen, setIsModalResultadosOpen] = useState(false);
  const [isModalFilhoteOpen, setIsModalFilhoteOpen] = useState(false);
  const [idadeEscolhida, setIdadeEscolhida] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [kcalPorDia, setKcalPorDia] = useState(null);
  const [condicaoSelecionada, setCondicaoSelecionada] = useState("");

  // Funções para abrir e fechar os modais
  const openModalIdade = () => setIsModalIdadeOpen(true);
  const closeModalIdade = () => setIsModalIdadeOpen(false);
  const openModalCondicoes = () => setIsModalCondicoesOpen(true);
  const closeModalCondicoes = () => setIsModalCondicoesOpen(false);
  const openModalResultados = () => setIsModalResultadosOpen(true);
  const closeModalResultados = () => setIsModalResultadosOpen(false);
 
  const openModalFilhote = () => {
    setIsModalFilhoteOpen(true);
    setIsModalCondicoesOpen(false); 
  };

  const calcularFilhote = (pesoAtual, pesoIdeal) => {
    const pp1 = -0.87 * (pesoAtual / pesoIdeal);
    const p2pr = Math.exp(pp1) - 0.1;
    const p3pr = Math.pow(pp1, 0.75) * 130 * 3.2;
    const necessidadeEnergetica = p2pr * p3pr;

    const dietas = [
      { nome: "Frango Filhote Tradicional", parametro: 138.6 },
      { nome: "Bovino Filhote Tradicional", parametro: 147.6 },
      { nome: "Suino Filhote Tradicional", parametro: 130.4 },
      { nome: "Peixe Filhote Tradicional", parametro: 128.6 },
      { nome: "Frango Filhote Grain Free", parametro: 131.2 },
      { nome: "Bovino Filhote Grain Free", parametro: 138.8 },
    ];

    const resultadosDietas = dietas.map(dieta => {
      const quantidade = (necessidadeEnergetica / dieta.parametro) * 100;
      return { nome: dieta.nome, quantidade: quantidade.toFixed(2) };
    });

    setResultados(resultadosDietas);
    setKcalPorDia(necessidadeEnergetica.toFixed(2));
    openModalResultados();
  };

  const calcularQuantidade = (peso, condicoes) => {
    if (!peso || isNaN(peso) || peso <= 0) { // Adiciona verificação para evitar erro
      alert('peso invalido');
      return;
    }  

     // Verificar qual multiplicador aplicar com base na dieta
    let kcalCalculado;
    if (condicoes.obesidade || condicoes.oncológico || condicoes.sarcopênico || condicoes.disfuncaoCognitiva) {
      kcalCalculado = Math.pow(peso, 0.75) * 80; // Dietas específicas com 80
    } else {
      kcalCalculado = Math.pow(peso, 0.75) * 90; // Dietas gerais com 90
    }

    if (isNaN(kcalCalculado)) {
      alert('Erro no cálculo de calorias!');
      return;
    }

    setKcalPorDia(kcalCalculado.toFixed(0));
    let dietas = [];
    let condicaoMensagem = "";

    // Lógica para dietas baseadas em condições físicas
    if (idadeEscolhida === "adulto" || idadeEscolhida === "senior") {
      if (condicoes.renal) {
        condicaoMensagem = "DIETAS COM BAIXO FÓSFORO";
        dietas = [
          { nome: "Frango Baixo Fósforo", parametro: 111.2},
          { nome: "Bovino Baixo Fósforo", parametro: 130.2 },
          { nome: "Peixe Baixo Fósforo", parametro: 123.7 },
          { nome: "Bovino Baixo Fósforo Grain Free", parametro: 135 },
          { nome: "Suíno Baixo Fósforo Grain Free", parametro: 139.4 },
          { nome: "Peixe Baixo Fósforo Grain Free", parametro: 113.8 }
        ];
      } else if (condicoes.gastrointestinais || condicoes.hepatopatia || condicoes.pancreatite || condicoes.hiperlipidemia || condicoes.cushing) {
        condicaoMensagem = "DIETAS LOW FAT";
        dietas = [
          { nome: "Frango Low Fat", parametro: 103 },
          { nome: "Peixe Low Fat", parametro: 83.2 },
          { nome: "Frango Low Fat Grain Free", parametro: 90 }
        ];
      } else if (condicoes.saudavel) {
        condicaoMensagem = "DIETAS DE MANUTENÇÃO";
        dietas = [
          { nome: "Frango Adulto Tradicional", parametro: 130.4 },
          { nome: "Bovino Adulto Tradicional", parametro: 141.2 },
          { nome: "Suíno Adulto Tradicional", parametro: 136 },
          { nome: "Peixe Adulto Tradicional", parametro: 114.8 },

          { nome: "Frango Adulto Grain Free", parametro: 127.8 },
          { nome: "Bovino Adulto Grain Free", parametro: 123 },
          { nome: "Suíno Adulto Grain Free", parametro: 124 },
          { nome: "Peixe Adulto Grain Free", parametro: 100.2 },

          { nome: "Frango Essencial", parametro: 138 },
          { nome: "Bovino Essencial", parametro: 151.5 },
          { nome: "Suíno Essencial", parametro: 153 },

          { nome: "Frango Essencial Grain Free", parametro: 128 },
          { nome: "Bovino Essencial Grain Free", parametro: 138.5 },
          { nome: "Suíno Essencial Grain Free", parametro: 143 },

          { nome: "Dieta Crua - Bovina", parametro: 100 },
          { nome: "Dieta Crua - Frango", parametro: 101 },

          { nome: "Frango Sênior Tradicional", parametro: 111.2 },
          { nome: "Bovino Sênior Tradicional", parametro: 130.2 },
          { nome: "Peixe Sênior Tradicional", parametro: 104 },

          { nome: "Frango Sênior Grain Free", parametro: 100.8 },
          { nome: "Bovino Sênior Grain Free", parametro: 135 },
          { nome: "Peixe Sênior Grain Free", parametro: 103.5 }
        ];
      } else if (condicoes.peleSensivel) {
        condicaoMensagem = "DIETA PELES SENSIVEIS";
        dietas = [
          { nome: "Avestruz Peles Sensíveis", parametro: 124.8 },
          { nome: "Peixe Peles Sensíveis", parametro: 127.5 },
          { nome: "Peru Peles Sensíveis", parametro: 126.7 },
          { nome: "Suíno Peles Sensíveis", parametro: 147.4 }
        ];
      } else if (condicoes.obesidade || condicoes.diabetico || condicoes.oncológico || condicoes.sarcopênico || condicoes.disfuncaoCognitiva) {
        condicaoMensagem = "DIETAS ULTRA LOW CARB";
        dietas = [
          { nome: "Frango Ultra Low Carb", parametro: 124.8 },
          { nome: "Bovino Ultra Low Carb", parametro: 124.6 },
          { nome: "Suíno Ultra Low Carb", parametro: 124.6 },
          { nome: "Frango Ultra Low Carb Grain Free", parametro: 111.8 },
          { nome: "Bovino Ultra Low Carb Grain Free", parametro: 112.4 },
          { nome: "Frango Low Carb", parametro: 114.8 },
          { nome: "Bovino Low Carb", parametro: 136.54},
          { nome: "Suíno Low Carb", parametro: 138.4},
          { nome: "Peixe Low Carb", parametro: 104.2},
          { nome: "Frango Low Carb Grain Free", parametro: 136},
          { nome: "Bovino Low Carb Grain Free", parametro: 159.2},
          { nome: "Peixe Low Carb Grain Free", parametro: 114.4},
        ];
      }
    } else {
      condicaoMensagem = "DIETAS PARA FILHOTES"; 
    }

    const resultadosDietasSegundo = dietas.map(dieta => {
      const quantidadeDois = (kcalCalculado / dieta.parametro) * 100;
      return { nome: dieta.nome, quantidadeDois: quantidadeDois.toFixed(0) };
    });

    setResultados(resultadosDietasSegundo);
    closeModalCondicoes();
    openModalResultados();  // Exibe o modal de resultados
  };

  const voltarModalCondicoes = () => {
    closeModalResultados(); // Fecha o Modal de Resultados
    openModalCondicoes();   // Abre o Modal de Condições
  };

  return (

      <div className="relative bg-blue-100 min-h-screen">
      {/* Componente Carousel como fundo */}
      <div className="absolute inset-0 z-0">
        <Carousel />
      </div>

    <div className="bg-blue-100 h-96 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10 relative text-white space-x-2 text-shadow font-poppins">
        Saiba qual é a quantidade ideal de alimento que seu pet deve ingerir por dia.
      </h1>
      <div className="flex justify-center calcbtn">
        <Button variant="contained" onClick={openModalIdade}>
          Calcular a quantidade de comida diária
        </Button>
      </div>

      {/* Modal de Idade */}
      {isModalIdadeOpen && (
        <ModalIdade
          closeModal={closeModalIdade}
          setIdadeEscolhida={setIdadeEscolhida}
          abrirModalCondicoes={openModalCondicoes} 
          abrirModalFilhote={openModalFilhote}
        />
      )}

      {/* Modal de Condições Físicas e Peso */}
      {isModalCondicoesOpen && (
        <ModalCondicoes
          closeModal={closeModalCondicoes}
          calcular={calcularQuantidade}
          setCondicaoSelecionada={setCondicaoSelecionada}
          idadeEscolhida={idadeEscolhida}
          voltarModalCondicoes={voltarModalCondicoes} // Passa a função para voltar
        />
      )}

      {/* Modal de Resultados */}
      {isModalResultadosOpen && (
        <ModalResultados 
          resultados={resultados} 
          kcalPorDia={kcalPorDia} 
          condicaoMensagem={`Condição Física: ${condicaoSelecionada}`}
          closeModal={closeModalResultados}
          voltarModalCondicoes={voltarModalCondicoes} // Passa a função para voltar
        />
      )}

      {/* Modal de Filhote (Apenas será exibido se 'Filhote' for selecionado) */}
      {isModalFilhoteOpen && (
        <ModalFilhote
          closeModal={() => setIsModalFilhoteOpen(false)}
          calcularFilhote={calcularFilhote}
        />
      )}
      
      </div>
    </div>
  );
};

export default Calculo;
