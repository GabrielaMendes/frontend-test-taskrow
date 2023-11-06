function verificaTamanhoNumero(
  numero: number,
  quantidadeDigitos: number
): boolean {
  if (numero < 0) return false;
  if (numero.toString().length !== quantidadeDigitos) return false;

  return true;
}

function calculaDV(numero: number): number {
  if (!verificaTamanhoNumero(numero, 4)) return -1;

  const strNumero = numero.toString();

  const somaDosProdutos = strNumero.split("").reduce((soma, digito, idx) => {
    const fator = idx + 4;
    return soma + parseInt(digito) * fator;
  }, 0);

  const dv = ((somaDosProdutos % 20) + 7) % 10;

  return dv;
}

export function validaNumeroXpto(numero: number): boolean {
  if (!verificaTamanhoNumero(numero, 5)) return false;

  const dvRecebido = numero % 10;
  const dvCalculado = calculaDV(Math.floor(numero / 10));

  return dvRecebido === dvCalculado;
}
