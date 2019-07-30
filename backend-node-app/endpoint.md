Tutti gli endpoint, raggruppare il più possibile



Cominica da Table



| endpoint               | Invio | Ritorno | descrizione |
| ---------------------- | ----- | ------- | ----------- |
| waiter/getFreeTable    |       |         |             |
| wai/getMyTables        |       |         |             |
| wai/getTableOrders     |       |         |             |
| wai/postTableOrder     |       |         |             |
| wai/postFreeTable      |       |         |             |
| wai/**notifiche lmao** |       |         |             |
| wai/getMenu            |       |         |             |
| chef/getOrders         |       |         |             |
| chef/getOrder          |       |         |             |
| chef/postDish          |       |         |             |
| chef/**notifiche**     |       |         |             |
| barteder/getOrder      |       |         |             |
| bar/getOrders          |       |         |             |
| bar/**notifiche**      |       |         |             |
| casshier/getFreeTable  |       |         |             |
| cass/getBusyTable      |       |         |             |
| cass/closeTable        |       |         |             |
| cass/getTableOrders    |       |         |             |
| cass/**statistiche**   |       |         |             |



| endpoint                                 | descr                                              |
| ---------------------------------------- | -------------------------------------------------- |
| **POST** users/newUser                   | Crea un nuovo utente                               |
| **POST** users/login                     | Login, ritorna un JWT                              |
| **GET** tables/                          | Ritorna tutti i tavoli                             |
| **POST** tables/                         | Inserisce un nuovo tavolo                          |
| **GET** tables/freeTables **PL** {seats} | Ritorna i tavoli liberi che hanno X posti a sedere |
| **GET** orders/all                       | Ritorna tutti gli ordini                           |
| **POST** /newOrder/:table                | Crea un nuovo ordine per il tavolo                 |
| **GET** orders/                          | Ritorna gli ordini a seconda del ruolo del JWT     |
|                                          |                                                    |
|                                          |                                                    |
|                                          |                                                    |
|                                          |                                                    |
|                                          |                                                    |
|                                          |                                                    |

