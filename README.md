# Algoritmos Fundamentais

Este repositório contém a implementação de 7 Algoritmos Fundamentais nas linguagens **Java** e **JavaScript**, além de uma **Interface Web (Frontend)** desenvolvida em Next.js para interagir e testar ambos os códigos.

## Algoritmos Implementados

1. Contagem
2. Fibonacci
3. Máximo Divisor Comum (MDC)
4. Número Primo
5. Quicksort
6. Somatório
7. Troca de Variáveis

---

## 🚀 Como baixar e instalar

Para clonar e executar o projeto na sua máquina local, você precisará ter o [Git](https://git-scm.com), o [Node.js](https://nodejs.org/en/) e o [Java (JDK)](https://www.oracle.com/java/technologies/downloads/) instalados.

### 1. Clonar o repositório
Abra seu terminal/prompt de comando e execute:
```bash
git clone https://github.com/Jafal/Algoritmos-Fundamentais.git
cd Algoritmos-Fundamentais
```

### 2. Executar a Interface Web

O projeto conta com uma pasta `web-app` que contém a aplicação Next.js. Ela serve como painel para acessar os algoritmos e testá-los interativamente.

1. **Acesse a pasta do web-app**:
   ```bash
   cd web-app
   ```
2. **Instale as dependências** do painel com npm:
   ```bash
   npm install
   ```
3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
4. **Acesse no navegador**:
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para utilizar a aplicação.

---

## 💻 Requisitos para o "Motor de Execução"

Pela interface Web, você pode escolher se deseja rodar o código utilizando Java ou JavaScript.

- **Para o Motor JavaScript**: Exige apenas o `Node.js` (que já foi utilizado para rodar a aplicação Web).
- **Para o Motor Java**: Requer o `Java Development Kit (JDK)` devidamente instalado na máquina e a variável `java` configurada no `PATH` do sistema. Caso o Java não seja detectado durante a execução pela web, um aviso será exibido.
