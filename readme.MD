## Система парсинга сайта объявлений на node js

### Установка

```
npm install
```

### Запуск

```
npm start index.mjs
```

### Запуск поиска данных в graphql
```
post: http://localhost:3000/api/target

body: 
{
"target":"realter",
"url":"https://www.olx.ua/uk/nedvizhimost/kvartiry/kharkov/?currency=UAH"
}
```
где target - название, url - url сайта


### Просмотр полученных данных
```
get: http://localhost:3000/api/realter/10
```
в конце ставим номер файла

### Формат полученных данных

```json
[ 
    { 
        "title": "________", 
        "room": "1", 
        "floor": "1", 
        "etajnost": "9", 
        "area": "28", 
        "price": "13 600 $", 
        "type": "Приватна", 
        "description": "Продам свою 1км. Квартиру після капітального ремонта, готова під ваші обої та ламінат. Усі комунікації замінено на сучасні. Квартира суха поверх перший високий", 
        "time_": "25 квітня 2024 р.",
        "location": "Харків, Немишлянський" 
        }
    ]
```