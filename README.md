# 🎰 Lotofácil Checker (JavaScript)

Este projeto é um simulador de conferência de apostas da **Lotofácil** desenvolvido em **Node.js**.  
Ele compara os números sorteados em um concurso com as apostas cadastradas em um arquivo de texto (`lotofacilmesal.txt`) e exibe os resultados organizados por quantidade de acertos.

---

## 📌 Funcionalidades
- Leitura automática dos bilhetes e apostas a partir do arquivo `lotofacilmesal.txt`.
- Entrada interativa para digitar os **15 números sorteados** do concurso.
- Conferência de todos os bilhetes/apostas.
- Exibição dos acertos agrupados (de **11 a 15 acertos**).
- Caso não haja apostas premiadas, exibe a mensagem:


---

## 📂 Estrutura do Projeto

- 📦 Loteria-lotof-cil
  - ┣ 📜 lotofacil.js # Código principal em Node.js
  -  ┣ 📜 lotofacilmesal.txt # Base de bilhetes e apostas
  -  ┗ 📜 README.md # Documentação

---

## ▶️ Como Executar

1. Certifique-se de ter o **Node.js** instalado ([Download Node.js](https://nodejs.org/)).
2. Clone o repositório:
   ```bash
   git clone git@github.com:Sotouke/Loteria-lotof-cil.git
   cd Loteria-lotof-cil
   color 0a   <<<< ((Opcional) No Windows, para deixar o terminal com letras verdes).
   
   node lotofacil.js


##  📊 Exemplo de Saída
<img width="802" height="948" alt="image" src="https://github.com/user-attachments/assets/2f336476-7f3d-4afd-9d27-38d0ecdaae23" />


## 🛠 Tecnologias Utilizadas

- Node.js (JavaScript)
- Regex para processamento de texto
- Readline para entrada de dados no terminal

## 📌 Observação

- O arquivo lotofacilmesal.txt deve estar no mesmo diretório do lotofacil.js.
- Para cada sorteio, basta executar o programa e inserir os 15 números do concurso.


