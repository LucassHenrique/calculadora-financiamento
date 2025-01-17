function calcular() {
  const total = parseFloat(document.getElementById("total").value);
  const entrada = parseFloat(document.getElementById("entrada").value);
  const jurosAnual = parseFloat(document.getElementById("juros").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);

  if (isNaN(total) || isNaN(entrada) || isNaN(jurosAnual) || isNaN(parcelas)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const valorFinanciado = total - entrada;
  const jurosMensal = jurosAnual / 100 / 12;
  const parcelaMensal =
    (valorFinanciado * (jurosMensal * Math.pow(1 + jurosMensal, parcelas))) /
    (Math.pow(1 + jurosMensal, parcelas) - 1);

  document.getElementById(
    "resultado"
  ).innerText = `Parcela Mensal: R$ ${parcelaMensal.toFixed(2)}`;
  document.querySelector(".total").innerHTML = `Total: R$ ${(
    parcelas * parcelaMensal +
    entrada
  ).toFixed(2)}`;
}

async function tax() {
  const tabelaDeJuros = document.getElementsByClassName("tabelaDeJuros")[0];

  fetch("./jurostax.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })

    .then((data) => {
      tabelaDeJuros.innerHTML = ""; // Clear existing content
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const li = document.createElement("li");
        li.addEventListener("click", () => {
          document.getElementById("juros").value = parseFloat(
            element.TaxaJurosAoAno.replace(",", ".")
          );
          li.style.backgroundColor = "#34dbb170";
          setTimeout(() => {
            li.style.backgroundColor = ""; // Volta ao padrão
          }, 100);
        });
        li.innerHTML = `${element.InstituicaoFinanceira} | Mensal ${element.TaxaJurosAoMes}% | Anual ${element.TaxaJurosAoAno}% |`;
        tabelaDeJuros.appendChild(li);
      }
    })
    .catch((error) => console.error("Erro:", error));
}

tax();
