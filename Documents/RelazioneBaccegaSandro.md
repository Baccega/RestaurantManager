# Relazione Tecnologie e Applicazioni Web

## Baccega Sandro, 865024

Progetto realizzato in gruppo con: Scodeller Giovanni



## Architettura di Sistema

Il progetto é stato sviluppato seguendo lo stack di sviluppo **MEAN** con qualche aggiunta:

- Un database realizzato con **MongoDB** per la persistenza dei dati, hostato sul servizio **Atlas**, che é un cloud service gratuito (fino ad una certa soglia) offerto direttamente da *MongoDB, Inc.*, l'azienda che mantiene MongoDB.
- Un front-end realizzato con una *web application*, construita con **Angular**, ed accessibile tramite 3 piattaforme diverse:
  - Un qualunque browser
  - Un applicazione nativa Desktop, realizzato con **Electron**
  - Un applicazione nativa mobile, realizzato con **Apache Cordova**

- Un webserver per il back-end realizzato con **NodeJS** per l'interazione tra il front-end e il database. É realizzato utilizzando il middleware **Express.js**, per una semplice struttura, **MongooseJS** per una semplice interazione con il database e **Socket.io** per la gestione dei websockets.

Come packet-manager è stato scelto **Yarn**, per la sua semplicità d'uso.

### Backend

I compiti principali del server sono:

- Fornire i dati richiesti dal client provenienti dal database.
- Aggiornare i dati provenienti dal front-end sul database e su tutti gli altri client collegati.
- Fornire un API per l'autenticazione tramite JWT di tutti gli utenti.
- Verificare che ogni richiesta di dati sia legittima, controllando il ruolo dell'utente nel JWT usato per la richiesta.

Il server Node interagisce con il front-end in due modalità:

- Tramite richieste **HTTP**

  Infatti il server utilizza un architettura **REST**, in modo da gestire facilmente ogni tipo di richiesta.

- Tramite websockets

  Il server utilizza la libreria **Socket.io** per una facile e veloce comunicazione in tempo reale con il client, in modo da poterlo notificare di aggiornamenti dello stato di alcune risorse, come per esempio l'aggiornamento dello stato di un ordine.


### Autenticazione con JWT (JSON Web Token)

Per verificare che le richieste HTTP siano provenienti da utenti legittimi, ad ogni richiesta HTTP (a parte per l'autenticazione) è necessario fornire un JWT tramite il campo `auth-token` dentro l'header della richiesta.

Questo è un esempio di richiesta HTTP:

```sequence
Client->Server: GET -> /richiesta\n {auth-token: AccessToken}
Note right of Server: Il Server verifica il token
Server->Client: {Dati richiesti}
```

Durante la verifica del token, il server controlla anche se il ruolo dell'utente coincide con i dati che ha richiesto (Un cuoco non può creare un utente nuovo). 

Tuttavia dato che i JWT hanno una data di scadenza, abbiamo utilizzato la tecnica dei **Refresh Token** per un veloce rimpiazzo, ovvero un token extra fornito durante l'autenticazione che permette il rinnovo automatico dell'access token.

Questo è un esempio di autenticazione:

```sequence
Client->Server: POST -> /users/login
Note right of Server: Il Server verifica le credenziali 
Server->Client: {AccessToken, RefreshToken}
Note left of Client: ...
Client->Server: GET -> /altraRichiesta\n {auth-token: AccessToken}
```

Se la sessione dura a lungo, è possibile che scada quando invece è ancora necessario.

A quel punto il client, prima di fare un altra richiesta, richiederà un nuovo token:

```sequence
Client->Server: POST -> /users/refresh\n {RefreshToken}
Note right of Server: Il Server verifica il Token
Server->Client: {AccessToken, RefreshToken}
Note left of Client: ...
Client->Server: GET -> /altraRichiesta\n {auth-token: AccessToken}
```

### Modelli Dati

Per la realizzazione dell'applicazione sono stati scelti i seguenti modelli: 

```typescript
Dish {
  dishId: number;
  name: string;
  price: number;
  quantity: number;
  preparation: string;
  status: DishStatus;
  category: string;
}

Course {
  courseId: number;
  category: string;
  dishes: Dish[];
}

Order {
  orderId: number;
  dishes: Dish[];
  foodStatus: OrderStatus;
  drinkStatus: OrderStatus;
  table: number;							
  waiter: string;           	
}

Table {
  number: String;
  seats: number;
  free: boolean;
  waiter: String;            
}

Bill {
  billId: number;
  total: number;
  date: Date;
  dishes: Object[];
  table: string;			 
  customerNumber: Number;
  waiter: string;       
}

User {
  userId: number;
  name: string;
  email: string;
  role: Role;
  dailyPlate: number;
  totalPlate: number;
}

--- STATUSES & ROLES ---

DishStatus {
  Waiting = 0,
  Started = 1,
  Finished = 2
}

OrderStatus {
  Waiting = 0,
  Preparing = 1,
  Ready = 2,
  Delivered = 3
}

Role {
  Waiter = 0,
  Chef = 2,
  Bartender = 3
  Cashier = 4
}
```

### Endpoints

#### /users

| Method | Body | Query Params    | Description                                                  | Users |
| ------ | ---- | --------------- | ------------------------------------------------------------ | ----- |
| GET    |      | {role : String} | Ricevi tutti i dipendenti con ruolo _role_, altrimenti tutti | Cassa |

#### /users/login

| Method | Body                            | Query Params | Description                         | Users |
| ------ | ------------------------------- | ------------ | ----------------------------------- | ----- |
| POST   | {email:String, password:String} |              | Utilizzato per il login dell'utente |       |

#### /users/register

| Method | Body                                          | Query Params | Description                         | Users |
| ------ | --------------------------------------------- | ------------ | ----------------------------------- | ----- |
| POST   | {email:String, password:String, role: String} |              | Utilizzato per registrare un utente |       |

#### /users/:id

| Method | Body | Query Params | Description                | Users |
| ------ | ---- | ------------ | -------------------------- | ----- |
| GET    |      | {id: Number} | Ricevi il dipendente :id   | Cassa |
| DELETE |      | {id: Number} | Cancella il dipendente :id | Cassa |

#### /users/refresh

| Method | Body                  | Query Params | Description              | Users                                      |
| ------ | --------------------- | ------------ | ------------------------ | ------------------------------------------ |
| POST   | {AccessToken: String} |              | Ricevi il dipendente :id | Cassa<br />Cameriere<br />Barman<br />Chef |

#### /bills

| Method | Body                               | Query Params | Description                                                  | Users     |
| ------ | ---------------------------------- | ------------ | ------------------------------------------------------------ | --------- |
| GET    |                                    |              | Ricevi tutti i conti                                         | Cassa     |
| POST   | { table: Number, customer: Number} |              | Crea un nuovo conto vuoto per il tavolo Tablenumber, occupandolo | Cameriere |

#### /bills/:tableId

| Method | Body                            | Query Params      | Description                    | Users |
| ------ | ------------------------------- | ----------------- | ------------------------------ | ----- |
| POST   | {total: Number, dishes: Dish[]} | {tableId: Number} | Ricevi il conto del tavolo :id | Cassa |

#### /orders

| Method | Body                             | Query Params | Description                                  | Users                            |
| ------ | -------------------------------- | ------------ | -------------------------------------------- | -------------------------------- |
| GET    |                                  |              | Ricevi tutti gli ordini in base al ruolo     | Barman<br />Cuoco<br />Cameriere |
| POST   | {table: Number, dishes: Dish[] } |              | Invia un nuovo ordine nel tavolo specificato | Cameriere                        |

#### /orders/:id

| Method | Body                                       | Query Params | Description                 | Users |
| ------ | ------------------------------------------ | ------------ | --------------------------- | ----- |
| GET    |                                            | {id: Number} | Ricevi l'ordine :id         | Tutti |
| POST   | { food*: FoodStatus, drink*: DrinkStatus } |              | Cambia lo stato dell'ordine | Tutti |

#### /orders/tables/:id

| Method | Body | Query Params    | Description                         | Users |
| ------ | ---- | --------------- | ----------------------------------- | ----- |
| GET    |      | {table: Number} | Ricevi gli ordini del tavolo :table | Tutti |

#### /orders/:id/:dish

| Method | Body                | Query Params | Description                                      | Users            |
| ------ | ------------------- | ------------ | ------------------------------------------------ | ---------------- |
| GET    |                     |              | Ricevi il piatto :dish dell'ordine :id           | Tutti            |
| POST   | {status:DishStatus} |              | Cambia lo stato del piatto :dish dell'ordine :id | Barman<br/>Cuoco |

#### /courses

| Method | Body | Query Params | Description             | Users |
| ------ | ---- | ------------ | ----------------------- | ----- |
| GET    |      |              | Ricevi la lista di menù | Tutti |

#### /courses/createCourse

| Method | Body              | Query Params | Description                          | Users |
| ------ | ----------------- | ------------ | ------------------------------------ | ----- |
| POST   | {category:String} |              | Crea una nuova categoria per il menù |       |

#### /courses/newPlate

| Method | Body   | Query Params | Description                      | Users |
| ------ | ------ | ------------ | -------------------------------- | ----- |
| POST   | {Dish} |              | Crea un nuovo piatto per il menù |       |

#### /tables

| Method | Body      | Query Params | Description                | Users                |
| ------ | --------- | ------------ | -------------------------- | -------------------- |
| GET    |           |              | Ricevi tutti i miei tavoli | Cameriere<br />Cassa |
| POST   | { Table } |              | Crea un nuovo tavolo       | Cassa                |

#### /tables/:id

| Method | Body | Query Params | Description          | Users |
| ------ | ---- | ------------ | -------------------- | ----- |
| GET    |      |              | Ricevi il tavolo :id | Tutti |

#### /tables/freeTables

| Method | Body | Query Params | Description                   | Users                |
| ------ | ---- | ------------ | ----------------------------- | -------------------- |
| GET    |      |              | Ritorna tutti i tavoli liberi | Cameriere<br />Cassa |

#### /tables/myTables

| Method | Body | Query Params | Description                                           | Users     |
| ------ | ---- | ------------ | ----------------------------------------------------- | --------- |
| GET    |      |              | Ricevi i tavoli che sono impegnati dal quel cameriere | Cameriere |

#### /statistics/daily

| Method | Body | Query Params | Description                          | Users |
| ------ | ---- | ------------ | ------------------------------------ | ----- |
| GET    |      |              | Ricevi le statistiche della giornata | Cassa |

#### /statistics/user/:id

| Method | Body | Query Params | Description                           | Users |
| ------ | ---- | ------------ | ------------------------------------- | ----- |
| GET    |      | {id: String} | Ricevi le statistiche dell'utente :id | Cassa |

### Componenti di Angular

### Servizi di Angular

### Routes  di Angular

### Esempio di Workflow dell'applicazione