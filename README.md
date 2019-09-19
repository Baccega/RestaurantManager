# Progetto TAW 2019

### Baccega Sandro, Scodeller Giovanni



# Frontend Data Models

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
  table: number;								// Table number
  waiter: string;           		// Employee ID
}

Table {
  number: String;
  seats: number;
  free: boolean;
  waiter: String;             // Employee ID
}

Bill {
  billId: number;
  total: number;
  date: Date;
  dishes: Object[];
  table: string;			  // Table ID
  customerNumber: Number;
  waiter: string;       // Employee ID
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

# Endpoints

'*' vuol dire che è opzionale (tipo un parametro opzionale, ma che bisogna implementare)

'#' vuol dire che non è necessario farlo

### /users

| Method | Body         | Query Params         | Description                                                  | Users |
| ------ | ------------ | -------------------- | ------------------------------------------------------------ | ----- |
| GET    |              | {*role : String} | Ricevi tutti i dipendenti con ruolo *role*, altrimenti tutti | Cassa |

### /users/login

| Method | Body                            | Query Params | Description                         | Users |
| ------ | ------------------------------- | ------------ | ----------------------------------- | ----- |
| POST   | {email:String, password:String} |              | Utilizzato per il login dell'utente |       |

### /users/register

| Method | Body                                          | Query Params | Description                         | Users |
| ------ | --------------------------------------------- | ------------ | ----------------------------------- | ----- |
| POST   | {email:String, password:String, role: String} |              | Utilizzato per registrare un utente |       |

### /users/:id

| Method | Body | Query Params | Description                | Users |
| ------ | ---- | ------------ | -------------------------- | ----- |
| GET    |      | {id: Number} | Ricevi il dipendente :id   | Cassa |
| DELETE |      | {id: Number} | Cancella il dipendente :id | Cassa |

### /users/refresh-token

| Method | Body                  | Query Params | Description              | Users                                      |
| ------ | --------------------- | ------------ | ------------------------ | ------------------------------------------ |
| POST   | {AccessToken: String} |              | Ricevi il dipendente :id | Cassa<br />Cameriere<br />Barman<br />Chef |



### /bills

| Method | Body            | Query Params   | Description                                                  | Users |
| ------ | --------------- | -------------- | ------------------------------------------------------------ | ----- |
| GET    |                 |  | Ricevi tutti i conti| Cassa |
| POST   | { table: Number, customer: Number} |         | Crea un nuovo conto vuoto per il tavolo Tablenumber, occupandolo | Cameriere |

### /bills/:id

| Method | Body | Query Params | Description         | Users |
| ------ | ---- | ------------ | ------------------- | ----- |
| GET    |      | {id: Number} | Ricevi il conto :id | Cassa |

### /bills/:tableId

| Method | Body                            | Query Params      | Description         | Users |
| ------ | ------------------------------- | ----------------- | ------------------- | ----- |
| POST   | {total: Number, dishes: Dish[]} | {tableId: Number} | Ricevi il conto :id | Cassa |



### /orders

| Method | Body                             | Query Params | Description                                        | Users                            |
| ------ | -------------------------------- | ------------ | -------------------------------------------------- | -------------------------------- |
| GET    |                                  |              | Ricevi tutti gli ordini in base al ruolo assegnato | Barman<br />Cuoco<br />Cameriere |
| POST   | {table: Number, dishes: Dish[] } |              | Posta un ordine di piatti nel tavolo specificato   | Cameriere                        |

### /orders/:id

| Method | Body                                       | Query Params | Description                 | Users  |
| ------ | ------------------------------------------ | ------------ | --------------------------- | ------ |
| GET    |                                            | {id: Number} | Ricevi l'ordine :id         | Tutti  |
| POST   | { food*: FoodStatus, drink*: DrinkStatus } |              | Cambia lo stato dell'ordine | Tutti? |

### /orders/tables/:id

| Method | Body | Query Params    | Description                       | Users |
| ------ | ---- | --------------- | --------------------------------- | ----- |
| GET    |      | {table: Number} | Ricevi l'ordine del tavolo :table | Tutti |

### /orders/:id/:dish

| Method | Body         | Query Params | Description                                      | Users            |
| ------ | ------------ | ------------ | ------------------------------------------------ | ---------------- |
| GET    |              |              | Ricevi il piatto :dish dell'ordine :id           | Tutti            |
| POST   | {status:DishStatus} |              | Cambia lo stato del piatto :dish dell'ordine :id | Barman<br/>Cuoco |



### /courses

| Method | Body         | Query Params | Description                                      | Users            |
| ------ | ------------ | ------------ | ------------------------------------------------ | ---------------- |
| GET    |              |              | Ricevi la lista di menù                          | Tutti            |

### /courses/createCourse

| Method | Body              | Query Params | Description                          | Users |
| ------ | ----------------- | ------------ | ------------------------------------ | ----- |
| POST   | {category:String} |              | Crea una nuova categoria per il menù |       |

### /courses/newPlate

| Method | Body   | Query Params | Description                      | Users |
| ------ | ------ | ------------ | -------------------------------- | ----- |
| POST   | {Dish} |              | Crea un nuovo piatto per il menù |       |

### 

### /tables

| Method | Body      | Query Params | Description           | Users |
| ------ | --------- | ------------ | --------------------- | ----- |
| GET    |           |              | Ricevi tutti i miei tavoli | Cameriere<br />Cassa |
| POST  | { Table } |              | Crea un nuovo tavolo  | Cassa |

### /tables/:id

| Method | Body | Query Params | Description          | Users |
| ------ | ---- | ------------ | -------------------- | ----- |
| GET    |      |              | Ricevi il tavolo :id | Tutti |

### /tables/freeTables

| Method | Body | Query Params | Description                   | Users                |
| ------ | ---- | ------------ | ----------------------------- | -------------------- |
| GET    |      |              | Ritorna tutti i tavoli liberi | Cameriere<br />Cassa |

### /tables/myTables

| Method | Body | Query Params | Description                                           | Users     |
| ------ | ---- | ------------ | ----------------------------------------------------- | --------- |
| GET    |      |              | Ricevi i tavoli che sono impegnati dal quel cameriere | Cameriere |



### /statistics

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche della giornata               | Cassa                |


### /statistics/:id

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche dell'utente :id              | Cassa                |
