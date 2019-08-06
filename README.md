# Progetto TAW 2019

### Baccega Sandro, Scodeller Giovanni



# Frontend Data Models

```typescript
Dish {
  id: string;
  name: string;
  price: number;
  quantity: number;
  preparation: string;
  status: DishStatus;
  category: string;       		// Category ID
  handler: string	      			// Employee ID
}

Course {
  id: string
  name: string;
  dishes: Dish[];
}

Order {
  id: String;
  dishes: Dish[];
  foodStatus: FoodStatus;
  drinkStatus: DrinkStatus;
  table: string;								// Table ID
  waiter: string;           		// Employee ID
}

Table {
  id: String;
  seats: number;
  free: boolean;
}

Bill {
  total: number;
  date: Date;
  orders: string[];			// Order ID []
  table: string;			  // Table ID
  waiter: string;       // Employee ID
}

Employee {
  id: string;
  name: string;
  role: Role;
}

--- STATUSES & ROLES ---

DishStatus {
  Waiting = 0,
  Started = 1,
  Finished = 2
}

FoodStatus {
  Waiting = 0,
  Preparing = 1,
  Ready = 2,
  Delivered = 3
}

DrinkStatus {
  Waiting = 0,
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
| GET    |                 | waiter*=String ID | Ricevi tutti i conti<br />*waiter*: Solo i conti di un cameriere | Cassa |
| POST   | { TableNumber } |                | Crea un nuovo conto per il tavolo Tablenumber | Cameriere |

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
| GET    |           |              | Ricevi tutti i tavoli | Tutti |
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
| GET     |             |              | Ricevi il conto del tavolo :id                     | Cassa                |

### /statistics

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche della giornata               | Cassa                |


### /statistics/:id

| Method  | Body        | Query Params | Description                                        | Users                |
| ------- | ----------- | ------------ | -------------------------------------------------- | -------------------- |
| GET     |             |              | Ricevi le statistiche dell'utente :id              | Cassa                |
