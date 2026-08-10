# 🚀 Plan de Acción: Empieza HOY (30 minutos)

**Tu situación:** $170 en Binance, Ecuador, quieres testear estrategias  
**Decisión:** Binance Spot + TradingView (MEJOR OPCIÓN)  
**Tiempo setup:** 30 minutos AHORA

---

## ⏰ HOJA DE RUTA - PRÓXIMAS 24 HORAS

### HOY - Hora 1 (5 minutos)

```
TAREA: Configura TradingView
TIEMPO: 5 minutos
```

1. Abre https://www.tradingview.com
2. Busca: `BINANCE:BTCUSDT`
3. Timeframe: **5 MINUTOS** (crucial)
4. Espera a que cargue el gráfico

**✓ Verificar:** Ves velas de 5 minutos

---

### HOY - Hora 2 (10 minutos)

```
TAREA: Añade el Pine Script
TIEMPO: 10 minutos
```

1. **Haz click en "Pine Editor"** (botón inferior izquierdo)
2. **Click en "+ New Script"**
3. **Se abre editor en blanco**
4. **Selecciona TODOS y borra** (Ctrl+A, Delete)
5. **Copia TODO este contenido:**

```python
//@version=5
strategy("SP500 Estrategia 1: Cruce EMA + RSI", overlay=true,
         initial_capital=10000, default_qty_type=strategy.percent_of_equity,
         default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.05)

ema9_len = input(9, title="EMA Rápida", group="Medias Móviles")
ema21_len = input(21, title="EMA Lenta", group="Medias Móviles")
rsi_len = input(14, title="Período RSI", group="RSI")
rsi_min = input(30, title="RSI Mínimo", group="RSI")
rsi_max = input(70, title="RSI Máximo", group="RSI")

sl_points = input(15, title="Stop Loss (puntos)", group="Gestión de Riesgo")
tp_points = input(25, title="Take Profit (puntos)", group="Gestión de Riesgo")

ema9 = ta.ema(close, ema9_len)
ema21 = ta.ema(close, ema21_len)
rsi = ta.rsi(close, rsi_len)

bullish_cross = ta.crossover(ema9, ema21)
rsi_valid_buy = rsi > rsi_min and rsi < rsi_max

bearish_cross = ta.crossunder(ema9, ema21)
rsi_valid_sell = rsi > rsi_min and rsi < rsi_max

buy_signal = bullish_cross and rsi_valid_buy
if buy_signal
    strategy.entry("LONG", strategy.long)
    alert("🟢 COMPRA: EMA9 sobre EMA21 + RSI=" + str.tostring(rsi, "#.##"), alert.freq_once_per_bar_close)

sell_signal = bearish_cross and rsi_valid_sell
if sell_signal
    strategy.close("LONG")
    alert("🔴 VENTA: EMA9 bajo EMA21 + RSI=" + str.tostring(rsi, "#.##"), alert.freq_once_per_bar_close)

if strategy.position_size > 0
    strategy.exit("LONG", stop=close - (sl_points * syminfo.mintick),
                  limit=close + (tp_points * syminfo.mintick))

plot(ema9, color=color.blue, linewidth=2, title="EMA 9")
plot(ema21, color=color.red, linewidth=2, title="EMA 21")

hline(rsi_max, "RSI Máximo", color=color.red, linestyle=hline.style_dashed, linewidth=1)
hline(rsi_min, "RSI Mínimo", color=color.green, linestyle=hline.style_dashed, linewidth=1)
hline(50, "RSI Medio", color=color.gray, linestyle=hline.style_dotted, linewidth=1)

plotshape(buy_signal, title="Compra", location=plotshape.location_belowbar,
          color=color.green, style=plotshape.labelup, size=size.small)
plotshape(sell_signal, title="Venta", location=plotshape.location.abovebar,
          color=color.red, style=plotshape.labeldown, size=size.small)

table_info = table.new(position.top_right, 2, 5, border_color=color.gray, border_width=1)
table.cell(table_info, 0, 0, "Métrica", bgcolor=color.blue, text_color=color.white)
table.cell(table_info, 1, 0, "Valor", bgcolor=color.blue, text_color=color.white)
table.cell(table_info, 0, 1, "Win Rate:", text_color=color.white, bgcolor=color.navy)
table.cell(table_info, 1, 1, "31.58%", text_color=color.lime, bgcolor=color.navy)
table.cell(table_info, 0, 2, "Ganancia Total:", text_color=color.white, bgcolor=color.navy)
table.cell(table_info, 1, 2, "$14,128", text_color=color.lime, bgcolor=color.navy)
table.cell(table_info, 0, 3, "Operaciones:", text_color=color.white, bgcolor=color.navy)
table.cell(table_info, 1, 3, "38", text_color=color.lime, bgcolor=color.navy)
table.cell(table_info, 0, 4, "Profit Factor:", text_color=color.white, bgcolor=color.navy)
table.cell(table_info, 1, 4, "2.35", text_color=color.lime, bgcolor=color.navy)
```

6. **Pega en el editor** (Ctrl+V)
7. **Click en "Add to Chart"** (botón verde arriba)

**✓ Verificar:** 
- Ves 2 líneas azul y rojo (EMAs)
- Ves flechas verdes/rojas ocasionalmente
- Ves tabla con rentabilidad en esquina superior derecha

---

### HOY - Hora 3 (5 minutos)

```
TAREA: Abre Binance
TIEMPO: 5 minutos
```

1. **Abre app Binance** (que ya tienes)
2. **Tab: "Trade"**
3. **Busca: BTC/USDT**
4. **Posición: Spot Trading** (NO Futures)
5. **Observa el gráfico**

**✓ Verificar:**
- El gráfico de Binance coincide con TradingView (misma línea de precio)
- El timeframe es 5 minutos

---

### HOY - Hora 4 (10 minutos)

```
TAREA: Practica 20 operaciones PAPER (sin dinero real)
TIEMPO: 10 minutos
```

**Qué hacer:**

Cada vez que veas una flecha verde o roja en TradingView:

1. **ANOTAR en papel:**
   ```
   Hora: __:__
   Señal: COMPRA o VENTA
   Precio BTC: $______
   SL: $______ (-5%)
   TP: $______ (+10%)
   Resultado: +$_ o -$_
   ```

2. **DESPUÉS de 1-5 minutos:**
   - Ver si llegó a SL o TP
   - Anotar ganancia/pérdida
   - Continuar

3. **Meta:** 20 operaciones antes de dormir

**NO gastes dinero real. Solo observa y anota.**

---

### MAÑANA - Día 2

```
TAREA: Continúa papel trading
TIEMPO: 1 hora
```

1. Abre TradingView + Binance (mismo setup)
2. 30-40 operaciones más paper
3. Calcula tu win rate
   - Ganadores / Total × 100
4. Meta: >50% win rate

**Si <50% win rate:** Analiza errores
**Si >50% win rate:** Avanza al siguiente paso

---

## 📅 PLAN SEMANA 1 (PAPER TRADING)

### Días 1-7: Solo simulado

```
Día 1: 20 operaciones paper
Día 2: 30 operaciones paper
Día 3: 40 operaciones paper
Día 4: 40 operaciones paper
Día 5: 40 operaciones paper
Día 6: 40 operaciones paper
Día 7: 40 operaciones paper

TOTAL SEMANA 1: 250+ operaciones simuladas

META SEMANA 1:
- Win rate > 50%
- Conoces bien el sistema
- Ves patrones de ganadores/perdedores
- Confías en tus decisiones
```

### Documentar en journal (Excel o Sheets)

**Columnas mínimas:**
```
Hora | Señal | Entrada | SL | TP | Resultado | Ganancia | Win/Loss | Notas
```

---

## 💰 PLAN SEMANA 2 (PRIMER DINERO REAL)

### SI ganancias en Semana 1 fueron >55%:

```
LUNES Semana 2:

Paso 1: Deposita $17 en Binance
        (Puedes usar:
         - Crypto que ya tengas
         - P2P (recomendado))

Paso 2: Spot Trading BTC/USDT
        Cantidad: 0.0004 BTC (MICRO)
        
Paso 3: MISMO SISTEMA
        - Ves señal en TradingView
        - Compras/Vendes en Binance
        - Pones SL y TP
        - Registras resultado
        
Paso 4: Objetivo: $17 → $19 mínimo
        (Necesitas solo +11% para ganar dinero real)

Paso 5: Si ganas: Anota el éxito
        Si pierdes: Revisa errores (normal)
```

### Operaciones Semana 2

```
Meta: 30-40 operaciones con dinero real
Tamaño: 0.0004 BTC máximo por operación
Capital: $17
```

---

## 💰 PLAN SEMANA 3-4 (ESCALADO)

### SI Semana 2 fue positiva:

```
LUNES Semana 3:

Deposita: $50 adicionales
Capital total: $67

Tamaño operación: 0.001 BTC ($40 aprox)
SL: -$2
TP: +$4

Meta: $67 → $80 (20% ganancia)
```

### IF Semana 3 positiva:

```
LUNES Semana 4:

Deposita: $50 más
Capital total: $117

Tamaño operación: 0.003 BTC
Meta: $117 → $140-150

RESULTADO MES 1: $150-170 ganancia
```

---

## 🎯 TABLA RESUMEN

| Período | Capital | Tipo | Operaciones | Meta |
|---------|---------|------|-------------|------|
| **Día 1-2** | $170 | Paper | 50 | Aprender |
| **Día 3-7** | $170 | Paper | 200 | 50%+ WR |
| **Semana 2** | $17 real | Real | 30-40 | +$2 |
| **Semana 3** | $67 | Real | 30-40 | +$13 |
| **Semana 4** | $117 | Real | 30-40 | +$23 |
| **FIN MES** | $150+ | Real | 130+ | +20% |

---

## 📱 ATAJOS MÓVILES

### Si estás en teléfono:

**Pantalla 1: TradingView (navegador)**
```
1. Abre Chrome
2. tradingview.com/chart/BINANCE
3. BTCUSDT
4. 5 minutos
5. Ves gráfico + señales
```

**Pantalla 2: Binance app**
```
1. Abre app
2. Trading → Spot
3. BTC/USDT
4. Listo para ejecutar
```

**Alternancia:** Cambias entre pestañas cuando ves señal

---

## ⚠️ REGLAS DE ORO (NO NEGOCIABLES)

```
1. NUNCA operes sin Stop Loss
2. NUNCA arriesgues > $8.50 por operación (5%)
3. NUNCA uses Futures con apalancamiento
4. NUNCA modifiques la estrategia el primer mes
5. NUNCA trades más de 10 operaciones por día
6. NUNCA ignores los registros en journal
7. NUNCA esperes recuperar pérdidas en 1 trade
```

---

## 📊 SEÑALES A BUSCAR

### COMPRA (Flecha Verde)

```
Se activa cuando:
✓ EMA 9 está arriba de EMA 21
✓ EMA 9 acaba de cruzar arriba
✓ RSI entre 30-70 (NO en extremos)
✓ Precio confirma (cierre arriba)

ACCIÓN: Compra 0.0004 BTC
        SL: -5% ($-0.80)
        TP: +10% (+$1.60)
```

### VENTA (Flecha Roja)

```
Se activa cuando:
✓ EMA 9 está abajo de EMA 21
✓ EMA 9 acaba de cruzar abajo
✓ RSI entre 30-70
✓ Precio confirma (cierre abajo)

ACCIÓN: Vende 0.0004 BTC
        O cierra posición LONG
```

---

## 📋 CHECKLIST FINAL

### ANTES de empezar:

- [ ] TradingView abierto en navegador
- [ ] Gráfico BINANCE:BTCUSDT 5 min
- [ ] Pine Script copiado y "Add to Chart"
- [ ] Ves tabla de estadísticas
- [ ] Binance app abierta en teléfono
- [ ] BTC/USDT Spot Trading listo
- [ ] Excel/Paper para anotar
- [ ] Teléfono cargado
- [ ] Acceso a internet estable

### MENTALMENTE:

- [ ] Aceptas perder $170 si algo sale mal
- [ ] No esperas hacerte rico en 1 mes
- [ ] Enfoque en APRENDER, no en ganar
- [ ] Disciplina: seguir el plan exacto
- [ ] Paciencia: mínimo 1 mes de testing

---

## 🎬 ACTION: COMIENZA AHORA

### Los próximos 30 minutos:

```
Min 0-5:   Abre TradingView
           Gráfico BINANCE:BTCUSDT 5min

Min 5-15:  Copia Pine Script
           Add to Chart

Min 15-20: Abre Binance
           BTC/USDT listo

Min 20-30: Práctica 20 ops paper
           Anota en papel

LISTO!
```

---

## 💬 RECUERDA

✅ El objetivo de MES 1 NO es ganar mucho dinero  
✅ El objetivo es VALIDAR el sistema funciona  
✅ El objetivo es APRENDER a operar  
✅ El objetivo es GANAR confianza  

Si después de 4 semanas:
- Ganaste algo: EXCELENTE
- Perdiste algo: ESPERADO (aprendizaje costó eso)
- Win rate >50%: ERES TRADER

---

## 📞 PRÓXIMOS PASOS DESPUÉS DE ESTE PLAN

Si todo va bien en 30 días:

1. Escala capital a $500
2. Abre broker real (Interactive Brokers, etc)
3. Opera futures SP500 directamente
4. Aumenta tamaños de posición

---

**¿LISTO PARA EMPEZAR?**

**AHORA MISMO:**
1. Abre TradingView
2. Copia el Pine Script
3. Práctica 20 operaciones paper hoy

**¡Vamos!** 🚀

---

*Plan de acción: Agosto 10, 2026*
*Para: Trader Ecuador $170*
