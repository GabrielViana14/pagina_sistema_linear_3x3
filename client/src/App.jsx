import React, { useState, useEffect } from "react";
import axios from 'axios';
import EntradaValor from "./entrada_valor";
import "./App.css"


function App() {
  const [valor_11, setValor11] = useState("")
  const [valor_12, setValor12] = useState("")
  const [valor_13, setValor13] = useState("")
  const [valor_21, setValor21] = useState("")
  const [valor_22, setValor22] = useState("")
  const [valor_23, setValor23] = useState("")
  const [valor_31, setValor31] = useState("")
  const [valor_32, setValor32] = useState("")
  const [valor_33, setValor33] = useState("")
  const [resultado_1, setResultado1] = useState("")
  const [resultado_2, setResultado2] = useState("")
  const [resultado_3, setResultado3] = useState("")
  const [error, setError] = useState(false)
  const [matriz, setMatriz] = useState("")
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);
    if (valor_11.length == 0 || valor_12.length == 0 || valor_13.length == 0 || valor_21.length == 0 || valor_22.length == 0 || valor_23.length == 0 || valor_31.length == 0 || valor_32.length == 0 || valor_33.length == 0 || resultado_1.length == 0 || resultado_2.length == 0 || resultado_3.length == 0) {
      setError(true)
    } else {
      setError(false)
      console.log(
        "valor 11 = ", valor_11, "\n",
        "Valor 12 = ", valor_12, "\n",
        "Valor 13 = ", valor_13, "\n",
        "valor 21 = ", valor_21, "\n",
        "Valor 22 = ", valor_22, "\n",
        "Valor 23 = ", valor_23, "\n",
        "valor 31 = ", valor_31, "\n",
        "Valor 32 = ", valor_32, "\n",
        "Valor 33 = ", valor_33, "\n",
        "Resultado 1 = ", resultado_1, "\n",
        "Resultado 2 = ", resultado_2, "\n",
        "Resultado 3 = ", resultado_3, "\n")
      try {
        let classificacao = ""
        let response = await axios.post('https://gabrielalter14.pythonanywhere.com/calcular_determinante',
          {
            matriz_coeficientes: [
              [valor_11, valor_12, valor_13],
              [valor_21, valor_22, valor_23],
              [valor_31, valor_32, valor_33]
            ]
          });
          let resultMatrizA = response.data.determinante;

        let responsex = await axios.post('https://gabrielalter14.pythonanywhere.com/calcular_determinante',
          {
            matriz_coeficientes: [
              [resultado_1, valor_12, valor_13],
              [resultado_2, valor_22, valor_23],
              [resultado_3, valor_32, valor_33]
            ]
          });
        let resultMatrizX = responsex.data.determinante;

        let responsey = await axios.post('https://gabrielalter14.pythonanywhere.com/calcular_determinante',
          {
            matriz_coeficientes: [
              [valor_11, resultado_1, valor_13],
              [valor_21, resultado_2, valor_23],
              [valor_31, resultado_3, valor_33]
            ]
          });
          let resultMatrizY = responsey.data.determinante;

        let responsez = await axios.post('https://gabrielalter14.pythonanywhere.com/calcular_determinante',
          {
            matriz_coeficientes: [
              [valor_11, valor_12, resultado_1],
              [valor_21, valor_22, resultado_2],
              [valor_31, valor_32, resultado_3]
            ]
          });
          let resultMatrizZ = responsez.data.determinante;
          console.log(resultMatrizA)
        if (resultMatrizA != 0 ) {
          classificacao = "Sistema possivel determinado"
          console.log("Classificacao="+classificacao)
        }
        else if (resultMatrizA == 0 && resultMatrizX == 0 && resultMatrizY == 0 && resultMatrizZ == 0) {
          classificacao = "Sistema possivel Indeterminado"
          console.log("Classificacao="+classificacao)
        }
        else if (resultMatrizA == 0 && (resultMatrizX > 0 || resultMatrizX < 0 || resultMatrizY > 0 || resultMatrizY < 0 ||resultMatrizZ > 0 || resultMatrizZ < 0 )) {
          classificacao = "Sistema impossivel"
          console.log("Classificacao= "+classificacao)
        }
        console.log("Classificacao= "+classificacao)
        setMatriz(
          <div dangerouslySetInnerHTML={{
            __html: `Matrix dos coeficientes:<br />
              <div class="container">
              <table class="matrix">
              <tr>
              <td>${valor_11}</td> <td>${valor_12}</td> <td>${valor_13}</td>
              </tr>
              <tr>
              <td>${valor_21} </td> <td>${valor_22}</td> <td> ${valor_23}</td>
              </tr>
              <tr>
              <td>${valor_31} </td> <td>${valor_32} </td> <td>${valor_33}</td>
              </tr>
              </table>
              </div>
              
              Matrix resultado:
              <table class="matrix">
              <tr>
              <td>${resultado_1}</td>
              </tr>
              <tr>
              <td>${resultado_2}</td>
              </tr>
              <tr>
              <td>${resultado_3}</td>
              </tr>
              </table>
              Determinantes:<br />
              Determinante A: ${resultMatrizA}<br />
              Determinante X: ${resultMatrizX}<br />
              Determinante Y: ${resultMatrizY}<br />
              Determinante Z: ${resultMatrizZ}<br />
              Resultado:<br />
              Classificação do sistema: ${classificacao}<br />
              X: ${resultMatrizX / resultMatrizA}<br />
              Y: ${resultMatrizY / resultMatrizA}<br />
              Z: ${resultMatrizZ / resultMatrizA}<br />
              `
          }} />
        )

        
        setIsLoading(false);




      } catch (error) {
        console.error('Erro:', error);
        setIsLoading(false);
      };
    }
  }

  return (
    <div>
      Por favor entre com os valores<br></br>
      <form onSubmit={handleSubmit}>
        <EntradaValor name="valor_11" id="valor_11" onChange={e => setValor11(e.target.value)} />X + &nbsp;
        <EntradaValor name="valor_12" id="valor_12" onChange={e => setValor12(e.target.value)} />Y + &nbsp;
        <EntradaValor name="valor_13" id="valor_13" onChange={e => setValor13(e.target.value)} />Z = &nbsp;
        <EntradaValor name="resultado_1" id="resultado_1" onChange={e => setResultado1(e.target.value)} /><br></br>
        <EntradaValor name="valor_21" id="valor_21" onChange={e => setValor21(e.target.value)} />X + &nbsp;
        <EntradaValor name="valor_22" id="valor_22" onChange={e => setValor22(e.target.value)} />Y + &nbsp;
        <EntradaValor name="valor_23" id="valor_23" onChange={e => setValor23(e.target.value)} />Z = &nbsp;
        <EntradaValor name="resultado_2" id="resultado_2" onChange={e => setResultado2(e.target.value)} /><br></br>
        <EntradaValor name="valor_31" id="valor_31" onChange={e => setValor31(e.target.value)} />X + &nbsp;
        <EntradaValor name="valor_32" id="valor_32" onChange={e => setValor32(e.target.value)} />Y + &nbsp;
        <EntradaValor name="valor_33" id="valor_33" onChange={e => setValor33(e.target.value)} />Z = &nbsp;
        <EntradaValor name="resultado_2" id="resultado_3" onChange={e => setResultado3(e.target.value)} /><br></br>
        {error ? <label className="atencao" style={{ visibilty: error ? "visible" : "hidden" }}>Preencha todos os espaços</label> : ""}<br></br>
        <button type="submit">Ver resultado</button>
      </form>
      <section>
        Passos:
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            {matriz}
          </div>
        )}
      </section>
    </div>
  )
}

export default App