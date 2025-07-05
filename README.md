1. Запуск сервисов
```bash
  docker-compose up --build -d
```

2. Настройка PKCE в Keycloak

<img src="./img/01-keycloak-pkce.png" width="640">


3. В запросе на токен теперь передается `code-verifier`

<img src="./img/02-frontend-pkce-code-verifier.png" width="640">


4. Пользователь с ролью `prothetic_user` может получить данные от эндпоинта `/reports`

<img src="./img/04-api-report-user.png" width="640">


5. Пользователь без роли `prothetic_user` получает от эндпоинта `/reports` ошибку

<img src="./img/04-api-report-admin.png" width="640">


6. Так же проверка роли пользователя осуществляется на `frontend`. Если прав на доступ к отчету нет - кнопка выгрузки отчета получает аттрибут `disabled`

<img src="./img/05-frontend-disabled-button.png" width="320">