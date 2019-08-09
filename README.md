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
  total: number;
  date: Date;
  dishes: Object[];
  table: string;			  // Table ID
  customerNumber: Number;
  waiter: string;       // Employee ID
}

Employee {
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
| GET    |              | role* = (role in String) | Ricevi tutti i dipendenti con ruolo *role*, altrimenti tutti | Cassa |
| POST   | { Employee } |                      | Crea un nuovo dipendente                                     | Cassa |

### /users/:id

| Method | Body | Query Params | Description                | Users |
| ------ | ---- | ------------ | -------------------------- | ----- |
| GET    |      |              | Ricevi il dipendente :id   | Cassa |
| DELETE |      |              | Cancella il dipendente :id | Cassa |

### /bills

| Method | Body            | Query Params   | Description                                                  | Users |
| ------ | --------------- | -------------- | ------------------------------------------------------------ | ----- |
| GET    |                 |  | Ricevi tutti i conti| Cassa |
| POST   | { TableNumber, CustomersNumber } |         | Crea un nuovo conto vuoto per il tavolo Tablenumber, occupandolo | Cameriere |

### /bills/:id

| Method | Body | Query Params | Description         | Users |
| ------ | ---- | ------------ | ------------------- | ----- |
| GET    |      |              | Ricevi il conto :id | Cassa |

### /orders

| Method | Body | Query Params | Description                                              | Users                            |
| ------ | ---- | ------------ | -------------------------------------------------------- | -------------------------------- |
| GET    |      |              | Ricevi tutti gli ordini in base al tuo ruolo e a chi sei | Barman<br />Cuoco<br />Cameriere |

### /orders/:id

| Method | Body                                       | Query Params | Description                 | Users |
| ------ | ------------------------------------------ | ------------ | --------------------------- | ----- |
| GET    |                                            |              | Ricevi l'ordine :id         | Tutti |
| POST   | { food*: FoodStatus, drink*: DrinkStatus } |              | Cambia lo stato dell'ordine | Tutti |

### /orders/:id/:dish

| Method | Body         | Query Params | Description                                      | Users            |
| ------ | ------------ | ------------ | ------------------------------------------------ | ---------------- |
| GET    |              |              | Ricevi il piatto :dish dell'ordine :id           | Tutti            |
| POST   | {status:DishStatus} |              | Cambia lo stato del piatto :dish dell'ordine :id | Barman<br/>Cuoco |

### /courses

| Method | Body         | Query Params | Description                                      | Users            |
| ------ | ------------ | ------------ | ------------------------------------------------ | ---------------- |
| GET    |              |              | Ricevi la lista di menù                          | Tutti            |

### /tables

| Method | Body      | Query Params | Description           | Users |
| ------ | --------- | ------------ | --------------------- | ----- |
| GET    |           |              | Ricevi tutti i miei tavoli | Cameriere<br />Cassa |
| POST#  | { Table } |              | Crea un nuovo tavolo  | Cassa |

### /tables/:id

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi il tavolo :id                               | Tutti                |
| POST    | { boolean } |              | Cambia lo stato del tavolo :id (free: true\|false) | Cassa<br />Cameriere |
| DELETE# |             |              | Cancella il tavolo :id                             | Cassa                |

### /tables/:id/bill

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| POST     | Object |              | Chiudi il conto del tavolo :id                    | Cassa                |

### /statistics

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche della giornata               | Cassa                |


### /statistics/:id

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche dell'utente :id              | Cassa                |
