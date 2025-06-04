import React, { useState } from 'react';

export default function App() {
  const [area, setArea] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pergunta, setPergunta] = useState('');
  const [respostaIA, setRespostaIA] = useState('');
  const [zona, setZona] = useState('');
  const [parametros, setParametros] = useState(null);
  const [endereco, setEndereco] = useState('');
  const [zonaDetectada, setZonaDetectada] = useState('');

  const verificarFaixa = () => {
    const metros = parseFloat(area);
    let faixa = '';
    let acrescimo = '';

    if (metros <= 69.99) {
      faixa = 'até 69,99 m²';
      acrescimo = 'Isento de acréscimos no IPTU ou tributos, apenas paga-se os tributos normais da construção';
    } else if (metros <= 119.99) {
      faixa = 'de 70 a 119,99 m²';
      acrescimo = 'Acréscimo de 25% nos tributos e no IPTU';
    } else if (metros <= 179.99) {
      faixa = 'de 120 a 179,99 m²';
      acrescimo = 'Acréscimo de 50% nos tributos e no IPTU';
    } else if (metros <= 249.99) {
      faixa = 'de 180 a 249,99 m²';
      acrescimo = 'Acréscimo de 75% nos tributos e no IPTU';
    } else {
      faixa = 'acima de 250 m²';
      acrescimo = 'Acréscimo de 100% nos tributos e no IPTU';
    }

    setResultado({ faixa, acrescimo });
  };

  const responderPergunta = () => {
    let resposta = '';
    if (pergunta.toLowerCase().includes('edícula')) {
      resposta = 'Você pode regularizar uma edícula desde que respeite os recuos mínimos e a taxa de ocupação conforme a zona do imóvel. Será necessário apresentar projeto e declarar conformidade.';
    } else {
      resposta = 'Sua dúvida será analisada com base na Lei 12.927/2023, Código de Obras e Plano Diretor de Sorocaba. Em breve, respostas personalizadas serão adicionadas.';
    }
    setRespostaIA(resposta);
  };

  const consultarParametrosZona = () => {
    let dados = null;
    switch (zona.toUpperCase()) {
      case 'ZR1':
        dados = {
          ocupacao: '50%',
          aproveitamento: '1.0',
          altura: '9 metros (2 pavimentos)',
          recuos: '5m frente, 1,5m laterais e fundo'
        };
        break;
      case 'ZR2':
        dados = {
          ocupacao: '60%',
          aproveitamento: '1.5',
          altura: '12 metros (3 pavimentos)',
          recuos: '4m frente, 1,5m laterais e fundo'
        };
        break;
      case 'ZC':
        dados = {
          ocupacao: '70%',
          aproveitamento: '2.0',
          altura: 'Sem limite específico, conforme análise da Prefeitura',
          recuos: '3m frente, conforme uso nas laterais e fundo'
        };
        break;
      default:
        dados = { erro: 'Zona não reconhecida. Tente ZR1, ZR2 ou ZC.' };
    }
    setParametros(dados);
  };

  const detectarZonaPorEndereco = () => {
    if (endereco.toLowerCase().includes('joão alberto pivetta')) {
      setZonaDetectada('ZR2');
    } else {
      setZonaDetectada('Não localizado. Consulte manualmente ou utilize o mapa da prefeitura.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-blue-800">Regulariza Sorocaba</h1>
        <p className="text-center text-sm text-gray-600">O app mais completo para tirar dúvidas e regularizar sua obra em Sorocaba</p>

        {/* SIMULADOR */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Simulador da Lei 12.927/2023</h2>
          <input type="number" className="border p-2 rounded w-full mb-2" placeholder="Digite a área construída (m²)" value={area} onChange={(e) => setArea(e.target.value)} />
          <button onClick={verificarFaixa} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Verificar Faixa</button>
          {resultado && (
            <div className="mt-4 p-4 bg-blue-50 rounded shadow">
              <p><strong>Faixa:</strong> {resultado.faixa}</p>
              <p>{resultado.acrescimo}</p>
            </div>
          )}
        </section>

        {/* FAQ COM IA */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Dúvidas Frequentes</h2>
          <input type="text" className="border p-2 rounded w-full mb-2" placeholder="Digite sua pergunta" value={pergunta} onChange={(e) => setPergunta(e.target.value)} />
          <button onClick={responderPergunta} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Perguntar</button>
          {respostaIA && (
            <div className="mt-4 p-4 bg-green-100 rounded shadow">
              <p>{respostaIA}</p>
            </div>
          )}
        </section>

        {/* PARÂMETROS URBANÍSTICOS */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Consulta por Zona (Plano Diretor)</h2>
          <input type="text" className="border p-2 rounded w-full mb-2" placeholder="Digite a zona (ex: ZR1, ZR2, ZC)" value={zona} onChange={(e) => setZona(e.target.value)} />
          <button onClick={consultarParametrosZona} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">Consultar</button>
          {parametros && (
            <div className="mt-4 p-4 bg-purple-100 rounded shadow">
              {parametros.erro ? <p className="text-red-600">{parametros.erro}</p> : (
                <ul className="list-disc ml-6">
                  <li><strong>Taxa de Ocupação:</strong> {parametros.ocupacao}</li>
                  <li><strong>Coef. de Aproveitamento:</strong> {parametros.aproveitamento}</li>
                  <li><strong>Altura Máxima:</strong> {parametros.altura}</li>
                  <li><strong>Recuos:</strong> {parametros.recuos}</li>
                </ul>
              )}
            </div>
          )}
        </section>

        {/* DETECÇÃO DE ZONA POR ENDEREÇO */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Detectar Zona pelo Endereço</h2>
          <input type="text" className="border p-2 rounded w-full mb-2" placeholder="Digite o endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <button onClick={detectarZonaPorEndereco} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full">Detectar Zona</button>
          {zonaDetectada && (
            <div className="mt-4 p-4 bg-orange-100 rounded shadow">
              <p><strong>Resultado:</strong> {zonaDetectada}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
