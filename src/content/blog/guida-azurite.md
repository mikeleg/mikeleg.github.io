---
title: "Guida ad Azurite"
description: "Scopri come usare Azurite in Docker per testare Azure Storage in locale — con esempi"
pubDate: "2025-10-08"
tags: ["Azure", "Docker", "Storage", "DevOps", "Locale"]
layout: "../../layouts/BlogPost.astro"
---

# ☁️ Guida **Azurite** in Docker

Oggi impariamo come usare **Azurite**, l’emulatore locale di Azure Storage. Perfetto per testare **Blob**, **Queue** e **Table Storage** senza connettersi al cloud.

---

## 🐳 1. Avviare Azurite con Docker

Aggiungi questo snippet nel tuo file `docker-compose.yml`:

```yaml
version: '3.8'
services:
  azurite:
    image: mcr.microsoft.com/azure-storage/azurite
    container_name: azurite
    ports:
      - "10000:10000" # Blob
      - "10001:10001" # Queue
      - "10002:10002" # Table
    volumes:
      - ./data/azurite:/data
    command: "azurite --loose --location /data --debug /data/debug.log"
```

Poi avvia tutto con:

```bash
docker compose up -d
```

👉 Ora Azurite è disponibile su `http://127.0.0.1:10000`  
Username: `devstoreaccount1`  
Password: `Eby8vdM02xNOcqFeq...==`

---

## ⚙️ 2. Stringa di connessione per i tuoi progetti

Nel tuo file di configurazione (es. `appsettings.Development.json` o `.env`), aggiungi questa stringa:

```json
"ConnectionStrings": {
  "AzureStorage": "UseDevelopmentStorage=true"
}
```

Oppure, se preferisci una stringa esplicita:

```text
DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFeq...==;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;
```

---

## 💻 3. Esempio in .NET

Nel tuo `Program.cs` o dove configuri i servizi, aggiungi:

```csharp
builder.Services.AddSingleton(x =>
{
    var connectionString = builder.Configuration.GetConnectionString("AzureStorage");
    return new BlobServiceClient(connectionString);
});
```

Ora puoi testare tutto in locale, creare container e caricare file senza toccare Azure! 🚀

---

## ❤️ Conclusione

Azurite è il modo perfetto per lavorare in locale con Azure Storage.  
Zero costi, zero attese, solo puro divertimento da developer 💪✨

