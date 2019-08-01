# Progetto TAW 2019

### Baccega Sandro, Scodeller Giovanni



# Frontend Data Models

```
Dish {
  id: string;
  name: string;
  price: number;
  quantity: number;
  preparation: string;
  status: DishStatus;
  category: string;       		// Category ID
  handler: string	      		// Employee ID
}

Course {
  id: string
  name: string;
  dishes: string[];       		// Dish ID []       --- Volendo si può fare a meno
}

Order {
  id: String;
  dishes: Dish[];
  foodStatus: FoodStatus;
  drinkStatus: DrinkStatus;
  table: string;			// Table ID
  waiter: string;           		// Employee ID
}

Table {
  id: String;
  seats: number;
  free: boolean;
}

Bill {
  date: Date;
  orders: string[];			// Order ID []
  table: string;			// Table ID
  waiter: string;           		// Employee ID
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

### /employees

| Method | Body         | Query Params       | Description                                                  |
| ------ | ------------ | ------------------ | ------------------------------------------------------------ |
| GET    |              | role*=(1\|2\|3\|4) | Ricevi tutti i dipendenti con ruolo *role*, altrimenti tutti |
| POST#  | { Employee } |                    | Crea un nuovo dipendente                                     |

### /employee/:id

| Method  | Body | Query Params | Description                |
| ------- | ---- | ------------ | -------------------------- |
| GET     |      |              | Ricevi il dipendente :id   |
| DELETE# |      |              | Cancella il dipendente :id |

### /bills

| Method | Body     | Query Params                           | Description                                                  |
| ------ | -------- | -------------------------------------- | ------------------------------------------------------------ |
| GET    |          | waiter*=string<br />all*=(true\|false) | Ricevi tutti i conti aperti<br />*all*: Anche i conti chiusi del giorno<br />*waiter*: Solo i conti di un cameriere |
| POST   | { Bill } |                                        | Crea un nuovo conto                                          |

### /bills/:id

| Method | Body      | Query Params | Description                            |
| ------ | --------- | ------------ | -------------------------------------- |
| GET    |           |              | Ricevi il conto :id                    |
| POST   | { Order } |              | Inserisci un nuovo ordine al conto :id |

### /orders/:id

| Method | Body            | Query Params | Description                 |
| ------ | --------------- | ------------ | --------------------------- |
| GET    |                 |              | Ricevi l'ordine :id         |
| POST   | { OrderStatus } |              | Cambia lo stato dell'ordine |

### /orders/:id/:dish

| Method | Body           | Query Params | Description                                      |
| ------ | -------------- | ------------ | ------------------------------------------------ |
| GET    |                |              | Ricevi il piatto :dish dell'ordine :id           |
| POST   | { DishStatus } |              | Cambia lo stato del piatto :dish dell'ordine :id |

### /tables

| Method | Body      | Query Params | Description           |
| ------ | --------- | ------------ | --------------------- |
| GET    |           |              | Ricevi tutti i tavoli |
| POST#  | { Table } |              | Crea un nuovo tavolo  |

### /tables/:id

| Method  | Body        | Query Params | Description                                        |
| ------- | ----------- | ------------ | -------------------------------------------------- |
| GET     |             |              | Ricevi il tavolo :id                               |
| POST    | { boolean } |              | Cambia lo stato del tavolo :id (free: true\|false) |
| DELETE# |             |              | Cancella il tavolo :id                             |
