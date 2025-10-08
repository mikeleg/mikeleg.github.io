---
title: "Deploy di una Next.js App in Monorepo Nx su Azure Web App"
description: "Scopri come usare Azurite in Docker per testare Azure Storage in locale — con esempi"
pubDate: "2025-10-08"
tags: ["Azure", "Docker", "Storage", "DevOps", "Locale"]
layout: "../../layouts/BlogPost.astro"
draft: true
---

In questo articolo vediamo come pubblicare un’applicazione **Next.js** che vive dentro un **monorepo Nx** su **Azure Web App**.  

---

  

## 📦 1. Preparare la build

In un monorepo Nx non usiamo `next build`, ma il comando Nx dedicato:
  

``` bash

npx nx build <nome-app>

```
