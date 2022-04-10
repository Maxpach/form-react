import { hasFormSubmit } from "@testing-library/user-event/dist/utils"
import { cpf } from "cpf-cnpj-validator"
import React from "react"

// ESTE SERIA O CÓDIGO PEGO EM UM FORUM, AQUI FOI PEGO O CALCULO CORRETO E ATUAL 
// QUE PODE SER PASSADO PARA O cpf, CONSIGO PASSAR, MAS A RESPOSTA É VIA APENAS NO console.log
// NÃO CONSEGUI CHAMAR ELE E DAR UM Window. CASO O ERRO APARECESSE. PERDI UM TEMPO AQUI, MAS VALEU APENA 
// PELO MENOS ESTOU APRENDENDO MAIS SOBRE O React.

// TENTEI DEIXAR O COD O MAIS SIMPLISTA POSSIVEL.

function validarCPF(cpf) {
    let erro = { valido: true, texto: "" };
    if (cpf.length !== 11) {
      return { valido: false, texto: "CPF deve ter 11 dígitos." };
    } else {
      let cpfv = cpf;
      let i, x, y = "";
  
      if (cpfv.length === 14 || cpfv.length === 11) {
        cpfv = cpfv.replace(".", "");
        cpfv = cpfv.replace(".", "");
        cpfv = cpfv.replace("-", "");
        var nonNumbers = /\D/;
        if (nonNumbers.test(cpfv)) {
          erro = {
            valido: false,
            texto: "O CPF é composto apenas por números!",
          };
        } else {
          if (
            cpfv === "00000000000" ||
            cpfv === "11111111111" ||
            cpfv === "22222222222" ||
            cpfv === "33333333333" ||
            cpfv === "44444444444" ||
            cpfv === "55555555555" ||
            cpfv === "66666666666" ||
            cpfv === "77777777777" ||
            cpfv === "88888888888" ||
            cpfv === "99999999999"
          ) {
            erro = { valido: false, texto: "Número de CPF inválido." };
          }
          let a = [];
          let b = '';
          let c = 11;
          for (i = 0; i < 11; i++) {
            a[i] = cpfv.charAt(i);
            if (i < 9) b += a[i] * --c;
          }
          if ((x = b % 11) < 2) {
            a[9] = 0;
          } else {
            a[9] = 11 - x;
          }
          b = 0;
          c = 11;
          for (y = 0; y < 10; y++) b += a[y] * c--;
          if ((x = b % 11) < 2) {
            a[10] = 0;
          } else {
            a[10] = 11 - x;
          }
          if (cpfv.charAt(9) !== a[9] || cpfv.charAt(10) !== a[10]) {
            erro = { valido: false, texto: "Número de CPF inválido." };
          }
        }
      } else {
        if (cpfv.length === 0) {
          erro = { valido: false, texto: "Informe o CPF." };
        } else {
          erro = { valido: false, texto: "Número de CPF inválido." };
        }
      }
    }
    return erro;
  }
