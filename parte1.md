## Parte 1: Questões Teóricas

### 1. Fundamentos do Node.js

#### Event loop no Node.js

O event loop no Node.js é um mecanismo que permite a execução de operações não-bloqueantes, ou seja, aquelas que não impedem que o restante do programa continue executando enquanto a operação está em andamento, gerenciando a execução assíncrona de código. Ele funciona da seguinte maneira:

1. Executa o código síncrono
2. Processa operações assíncronas e seus callbacks
3. Gerencia timers, I/O e outros eventos
4. Repete o processo

#### Callbacks, Promises e async/await

1. **Callbacks**: Funções passadas como argumentos para serem executadas após uma operação assíncrona.

```javascript
// Exemplo de callback
fs.readFile('arquivo.txt', (erro, dados) => {
  if (erro) {
    console.error('Erro na leitura:', erro);
    return;
  }
  console.log('Conteúdo do arquivo:', dados.toString());
});
```

2. **Promises**: Objetos que representam a eventual conclusão ou falha de uma operação assíncrona.

```javascript
// Exemplo de Promise
function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    fs.readFile(caminho, (erro, dados) => {
      if (erro) reject(erro);
      else resolve(dados);
    });
  });
}

lerArquivo('arquivo.txt')
  .then(dados => console.log('Conteúdo do arquivo:', dados.toString()))
  .catch(erro => console.error('Erro na leitura:', erro));
```

3. **async/await**: Sintaxe que permite escrever código assíncrono de forma síncrona.

```javascript
// Exemplo de async/await
async function lerArquivo(caminho) {
  try {
    const dados = await fs.promises.readFile(caminho);
    console.log('Conteúdo do arquivo:', dados.toString());
  } catch (erro) {
    console.error('Erro na leitura:', erro);
  }
}

lerArquivo('arquivo.txt');
```
**Diferenças:**

- **Callbacks:** Podem levar ao "callback hell" devido ao aninhamento excessivo, dificultando a manutenção.
- **Promises:** Melhoram a legibilidade e o tratamento de erros, mas ainda podem ser encadeadas de forma complexa.
- **async/await:** Proporcionam um código mais limpo e fácil de entender, facilitando o gerenciamento de operações assíncronas.

#### Clustering no Node.js

Clustering no Node.js permite criar múltiplos processos (workers) para distribuir a carga de trabalho. É útil para:

- Aproveitar múltiplos núcleos do processador
- Melhorar a performance de aplicações com alta carga
- Aumentar a disponibilidade da aplicação

### 2. TypeScript Avançado

#### Generics em TypeScript

Generics permitem criar componentes reutilizáveis que funcionam com diversos tipos.

```typescript
// Exemplo de função genérica
function primeiroElemento<T>(array: T[]): T {
  return array[0];
}

// Uso da função
let numeros: number[] = [1, 2, 3];
let primeiroNumero: number = primeiroElemento<number>(numeros); // tipo inferido: number

let palavras: string[] = ["olá", "mundo"];
let primeiraPalavra: string = primeiroElemento<string>(palavras); // tipo inferido: string
```

#### Detecção de erros com TypeScript

TypeScript ajuda a detectar erros em tempo de compilação. Exemplos:

1. Erro de tipo:

```typescript
// Erro: Type 'string' is not assignable to type 'number'
let numero: number = "42";
```

2. Erro de propriedade inexistente:

```typescript
interface Usuario {
  nome: string;
  idade: number;
}

let usuario: Usuario = { nome: "João", idade: 30 };
// Erro: Property 'email' does not exist on type 'Usuario'
console.log(usuario.email);
```

#### Decorators em TypeScript

Decorators são funções especiais que podem modificar ou aumentar classes, métodos, propriedades ou parâmetros.

```typescript
// Exemplo de decorator de método
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Chamando método ${propertyKey}`);
    return metodoOriginal.apply(this, args);
  };
  return descriptor;
}

class Exemplo {
  @log
  saudacao(nome: string) {
    return `Olá, ${nome}!`;
  }
}

const ex = new Exemplo();
console.log(ex.saudacao("Maria")); // Logs: "Chamando método saudacao" e "Olá, Maria!"
```

### 3. Desempenho e Escalabilidade

#### Estratégias para melhorar o desempenho

1. Usar clustering para aproveitar múltiplos núcleos (multithreading)
2. Implementar cache para reduzir chamadas ao banco de dados como Redis ou Memcached
3. Otimizar consultas ao banco de dados como a criação de índices simples e compostos (MongoDB)
4. Usar compressão gzip para respostas HTTP
5. Implementar load balancing como Nginx ou HAProxy
6. Utilizar CDNs para conteúdo estático

#### Escalabilidade em produção

1. Implementar arquitetura de microserviços
2. Usar containerização (Docker) e orquestração (Kubernetes)
3. Implementar auto-scaling baseado em métricas de uso como o Kubernetes Horizontal Pod Autoscaler (HPA)
4. Utilizar bancos de dados distribuídos como Cassandra ou MongoDB entre outros
5. Implementar filas de mensagens para processamento assíncrono como RabbitMQ ou Kafka
6. Monitorar constantemente e otimizar baseado em métricas de performance como Prometheus ou Grafana

Estas estratégias ajudam a lidar com o aumento de carga e garantir que a aplicação permaneça responsiva e disponível conforme cresce.