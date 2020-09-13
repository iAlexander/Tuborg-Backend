Изменения в респонсах - вообще одно, если ты пытаешься запросить nextQuestion у категории, в которой закончились вопросы - ты получаешь null

токены есть в файле конфиг, но лучше продублиюрую

токен для фронта

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9udCI6dHJ1ZX0.PGvYqU8t5D1iyOnMNmbGq2sisKtHez1arXLN5eXl4NU

токен для коризоида

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Jpem9pZCI6dHJ1ZX0.ak3lllvOsDJIndsNzRIAtCCN_mPoS8p8xvcfZ_u40Fk

-----

запускается все через докер

docker-compose build —no-cache

потом

docker-compose up —force-recreate