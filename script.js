let result = document.getElementById("resultado");

let botoes = document.querySelectorAll(".number, .op, .ponto");

let clear = document.getElementById("limpar");

let replace = document.getElementById("trocar");

let equal = document.querySelector(".equal");

let porcentagem = document.getElementById("porcentagem");

function ehOperador(char) {
  return ["+", "-", "*", "/"].includes(char);
}

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    let valor = botao.innerText;
    let ultimoChar = result.value.slice(-1);

    if (ehOperador(ultimoChar) && ehOperador(valor)) {
      return;
    }
    result.value += valor;
  });
});

clear.addEventListener("click", () => {
  result.value = "";
});

equal.addEventListener("click", () => {
  let op = ["+", "-", "*", "/"];
  try {
    // Verifica se o último caractere NÃO é um operador
    let ultimoChar = result.value.slice(-1);

    if (!op.includes(ultimoChar) && result.value !== "") {
      result.value = eval(result.value);
    } else {
      result.value = "Erro";
    }
  } catch (error) {
    result.value = "Erro";
  }
});

function calcularPorcentagem() {
  let expressao = result.value;

  // 1. Divide a expressão por operadores para encontrar os números
  let partes = expressao.split(/([+\-*/])/); // mantém os operadores!

  // 2. Exemplo: 1000 + 20 → partes = ["1000", "+", "20"]
  let ultimoNumero = partes[partes.length - 1]; // "20"
  let operador = partes[partes.length - 2]; // "+"
  let base = Number(partes[partes.length - 3]); // "1000"

  // 3. Converte e calcula a porcentagem
  let porcentagem = (base * Number(ultimoNumero)) / 100;

  // 4. Substitui o último número pela porcentagem
  partes[partes.length - 1] = porcentagem.toString();

  // 5. Junta tudo de volta e mostra no visor
  result.value = partes.join("");
}

porcentagem.addEventListener("click", calcularPorcentagem);
