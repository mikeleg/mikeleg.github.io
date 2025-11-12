---
title: "Dspy: orchestrare LLM come in un episodio di Devs"
description: "Guida pop-tech a Dspy, la libreria di Stanford per costruire pipeline di LLM modulari e trasparenti, con un esempio pratico di estrazione di PBI e automazione su GitHub."
pubDate: "2025-11-12"
tags: ["python","llm","dspy","ai engineering","react agents","github automation","machine learning"]
---

Hai presente quando in una serie come *Mr. Robot* qualcuno apre il terminale e inizia a digitare codice che sembra magia quantistica?  
Ecco, lavorare con **dspy** dà un po’ quella sensazione: puoi orchestrare modelli linguistici con precisione chirurgica, togliendo il caos dei prompt scritti “a sentimento”.

## 🚀 Cos’è dspy in parole semplici

**dspy** è una libreria Python sviluppata da Stanford per costruire pipeline di LLM in modo modulare, leggibile e controllabile.  
Definisci *Signature*, crei *Module*, visualizzi il prompt e — se vuoi — colleghi agenti ReAct a tool esterni come GitHub.

### Cosa è una Signature
Una *Signature* è una dichiarazione tipizzata della "firma" di un modulo: definisce chiaramente i campi di input e output (con descrizioni e vincoli). Serve a trasformare prompt informali in contratti ripetibili e verificabili, migliorando la validazione e la tracciabilità dei dati scambiati con il modello.

Esempio sintetico:
```python
class EstrattorePBI(dspy.Signature):
    sommario = dspy.InputField(desc="Riassunto della discussione")
    pbi = dspy.OutputField(desc="Lista di PBI estratti")
```

### Cosa è un Module
Un *Module* è l'istanza eseguibile che realizza una Signature: incapsula la logica (es. pattern ChainOfThought, ReAct) e l'esecuzione verso il modello o i tool esterni. Il Module prende i dati in input conformi alla Signature, li elabora usando LLM e tool, e restituisce output strutturati secondo la Signature stessa.

Esempio:
```python
# il Module che esegue la Signature sopra
estrattore_pbi_mod = dspy.ChainOfThought(EstrattorePBI)
```

> Se LangChain è Iron Man (grande e rumoroso), dspy è Vision: elegante, trasparente e logico.

## 🧩 Estrarre PBI da un sommario di discussione

Hai un sommario di una riunione o un thread Slack e vuoi estrarre i PBI (Product Backlog Item)? Con dspy puoi definirlo chiaramente:

```python
import dspy

class EstrattorePBI(dspy.Signature):
    """Dato un sommario, estrai i PBI principali.
    Se un PBI è troppo complesso, suddividilo in sotto-PBI."""
    sommario = dspy.InputField(desc="Riassunto della discussione")
    pbi = dspy.OutputField(desc="Lista di PBI o sotto-PBI estratti")

estrattore_pbi_mod = dspy.ChainOfThought(EstrattorePBI)
```

E lo applichi così:

```python
sommario = """
Durante la riunione si è discusso della lentezza dell’app mobile.
Marco ha proposto di introdurre un sistema di caching.
Sara ha evidenziato problemi di compatibilità su Android.
Si è deciso di testare una build con cache limitata per un gruppo di utenti.
"""

output = estrattore_pbi_mod(sommario=sommario)
print(output.pbi)
```

Risultato possibile:

```text
[
  "PBI-1: Analisi lentezza app mobile",
  "PBI-2: Implementazione caching (suddivisa in sotto-PBI)",
  "PBI-3: Verifica compatibilità Android",
  "PBI-4: Test build con cache limitata"
]
```

## 🧠 Spezzare i PBI troppo complessi

Se il modello rileva un PBI troppo generico (es. “Implementazione caching”), lo divide automaticamente:

```text
[
  "PBI-2a: Progettare architettura caching",
  "PBI-2b: Implementare modulo caching",
  "PBI-2c: Integrare modulo caching nell’app"
]
```

## ⚙️ Usare ReAct per creare issue su GitHub

A questo punto puoi collegare un **ReAct module** per usare un tool esterno (es. API di GitHub) e trasformare ogni PBI in un’*issue* reale:

```python
class GitHubInserterPBI(dspy.Signature):
    """Inserisce un PBI su GitHub come issue."""
    pbi = dspy.InputField()
    risultato = dspy.OutputField(desc="Esito inserimento")

def create_github_issue(pbi):
    return f"Issue creata: {pbi}"

tools = {"create_github_issue": create_github_issue}
agent_pbi = dspy.ReAct(GitHubInserterPBI, tools=tools)

for p in output.pbi:
    res = agent_pbi(pbi=p)
    print(res.risultato)
```

Risultato: il tuo LLM diventa un assistente tecnico che aggiorna automaticamente il backlog.  
Praticamente Jarvis, ma in Python.

## 🧭 Conclusione

**dspy** non è solo una libreria, è un modo di pensare: scrivi prompt come codice, analizzi come un ingegnere, agisci come un agente. 

---
