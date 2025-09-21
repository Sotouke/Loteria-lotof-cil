const fs = require("fs");
const readline = require("readline");

// Função para processar o arquivo txt
function processarLotofacil(arquivo) {
    const conteudo = fs.readFileSync(arquivo, "utf-8");
    const bilhetesRaw = conteudo.split(/Bilhete\s+\d+:\n/).slice(1);

    const bilhetes = bilhetesRaw.map(bilheteRaw => {
        const apostasRaw = bilheteRaw.trim().split(/\n\t/);
        return apostasRaw
            .filter(a => a.trim() !== "")
            .map(apostaRaw => apostaRaw.match(/\d+/g).map(Number));
    });

    return bilhetes;
}

// Função para verificar acertos
function verificarAcertos(bilhetes, numerosSorteados) {
    const resultados = {};

    bilhetes.forEach((bilhete, bilheteIndex) => {
        bilhete.forEach((aposta, apostaIndex) => {
            const acertos = aposta.filter(n => numerosSorteados.includes(n)).length;
            if (acertos >= 11) {
                if (!resultados[acertos]) resultados[acertos] = [];
                resultados[acertos].push({
                    bilheteId: bilheteIndex + 1,
                    apostaId: apostaIndex + 1,
                    aposta
                });
            }
        });
    });

    return resultados;
}

// Função para exibir resultados
function exibirResultados(resultados) {
    if (Object.keys(resultados).length === 0) {
        console.log("Infelizmente você NÃO acertou esse mês.");
        return;
    }

    console.log("----------------------------------------------------");
    Object.keys(resultados)
        .map(Number)
        .sort((a, b) => b - a)
        .forEach(acertos => {
            console.log(`${acertos} acerto: ${resultados[acertos].length} aposta:`);
            resultados[acertos].forEach(r => {
                console.log(`\tBilhete ${r.bilheteId}:`);
                console.log(`\t\tAposta ${r.apostaId}: ${r.aposta}`);
            });
        });
    console.log("----------------------------------------------------");
}

// Main
async function main() {
    const arquivo = "lotofacilmesal.txt";
    const bilhetes = processarLotofacil(arquivo);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const numerosSorteados = [];
    while (numerosSorteados.length < 15) {
        const numero = await new Promise(resolve => {
            rl.question(`Digite o ${numerosSorteados.length + 1}º número sorteado (entre 1 e 25): `, resolve);
        });

        const n = parseInt(numero);
        if (!isNaN(n) && n >= 1 && n <= 25 && !numerosSorteados.includes(n)) {
            numerosSorteados.push(n);
        } else {
            console.log("Número inválido. Digite um número entre 1 e 25 que ainda não foi sorteado.");
        }
    }

    rl.close();

    const resultados = verificarAcertos(bilhetes, numerosSorteados);
    exibirResultados(resultados);
}

main();
