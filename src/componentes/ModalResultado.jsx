import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const ModalResultados = ({ closeModal, resultados, kcalPorDia, condicaoMensagem, voltarModalCondicoes }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between items-center">
        <FaArrowAltCircleLeft onClick={voltarModalCondicoes} className="" />
        <IoIosCloseCircle onClick={closeModal} className="text-2xl text-red-800 absolute ml-[26rem]" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Resultado do Cálculo </h2>

        <div className="mb-6 text-center">
          <p className="text-lg font-medium">O seu pet deve consumir:</p>
          <p className="text-xl font-semibold">{kcalPorDia} kcal/dia</p>
        </div>

        {/* Mensagem da condição física */}
        <div className="mb-6">
          <p className="font-semibold text-red-600">{condicaoMensagem}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {resultados && resultados.length > 0 ? (
              resultados.map((resultado, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
              <CardContent className="bg-orange-200">
                <Typography variant="h6" className="font-semibold text-center">{resultado.nome}</Typography>
                <Typography variant="body2" className="text-center">
                 <span>Quantidade: {resultado.quantidadeDois}</span><span className="inline">g</span></Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center">Nenhum resultado disponível</p>
        )}
        </div>

        <div className="text-center mt-6">
          <Button variant="contained" color="success" href="https://wa.me/message/O7OXIRLLBCPLM1" target="_blank">
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalResultados;
