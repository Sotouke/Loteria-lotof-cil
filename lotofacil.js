const fs = require("fs");
const readline = require("readline");

// Função para processar o arquivo txt
function processarLotofacil(arquivo) {
    const conteudo = fs.readFileSync(arquivo, "utf-8");

    // Divide em bilhetes
    const bilhetesRaw = conteudo.split(/Bilhete\s+\d+:\r?\n/).slice(1);

    const bilhetes = bilhetesRaw.map(bilheteRaw => {
        // Divide em apostas (aceita \n, \r\n e tabs)
        const apostasRaw = bilheteRaw.trim().split(/\r?\n\s*/);
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

    const premiosFixos = {
        11: 7,
        12: 14,
        13: 35
    };

    let totalReais = 0;
    let totalSalarios = 0;
    let ganhouMaximo = false;

    console.log("----------------------------------------------------");
    Object.keys(resultados)
        .map(Number)
        .sort((a, b) => b - a)
        .forEach(acertos => {
            const qtdApostas = resultados[acertos].length;
            let msg = `${acertos} acertos: ${qtdApostas} ${qtdApostas === 1 ? "aposta" : "apostas"}`;

            if (premiosFixos[acertos]) {
                const valor = premiosFixos[acertos] * qtdApostas;
                totalReais += valor;
                // msg += ` - (R$ ${premiosFixos[acertos]},00 x ${qtdApostas} ${qtdApostas === 1 ? "aposta" : "apostas"}) = R$ ${valor},00.`;
                msg += ` = R$ ${valor},00.`;
            } else if (acertos === 14) {
                totalSalarios += qtdApostas;
                msg += ` - (você ganhou ${qtdApostas} ${qtdApostas === 1 ? "salário" : "salários"})`;
            } else if (acertos === 15) {
                ganhouMaximo = true;
                msg = ">>> Parabéns!!! ganhou premio máximo. <<<";
            }

            console.log(msg);

             // Detalhe dos bilhetes
            resultados[acertos].forEach(r => {
                console.log(`\tBilhete ${r.bilheteId}:`);
                console.log(`\t\tAposta ${r.apostaId}: ${r.aposta}`);
            });
        });
    console.log("----------------------------------------------------");

     // Resumão final
    if (ganhouMaximo) console.log("Você tem um bilhete premiado <<<<<<<<<<<<<<");
    if (totalSalarios > 0) console.log(`${totalSalarios} ${totalSalarios === 1 ? "salário" : "salários"}.`);
    if (totalReais > 0) console.log(`R$ ${totalReais},00.`);
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
