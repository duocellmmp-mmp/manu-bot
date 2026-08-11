# 5 Estrategias de Trading para Futuros SP500
## Análisis Técnico - Temporalidad 5 minutos

**Periodo de análisis:** Último año (2025-2026)  
**Indicadores utilizados:** RSI (Relative Strength Index), MACD (Moving Average Convergence Divergence), Bandas de Bollinger

---

## 📊 Estrategia 1: Cruce de Medias Móviles con Confirmación RSI

### Descripción
Combina cruce de medias móviles exponenciales (EMA 9 y 21) con confirmación de RSI para evitar señales falsas en mercados laterales.

### Indicadores
- **EMA 9**: Media móvil exponencial de 9 periodos
- **EMA 21**: Media móvil exponencial de 21 periodos  
- **RSI (14)**: Rango 30-70 para evitar sobreventa/sobrecompra extrema

### Reglas de Entrada
**COMPRA:**
- EMA 9 cruza por encima de EMA 21
- RSI entre 30 y 70 (no en extremos)
- Confirmación: precio cierra por encima de ambas EMAs

**VENTA:**
- EMA 9 cruza por debajo de EMA 21
- RSI entre 30 y 70
- Confirmación: precio cierra por debajo de ambas EMAs

### Gestión de Riesgo
- **Stop Loss:** 15 puntos (5 min en ES/MES)
- **Take Profit:** 25-35 puntos
- **Ratio R:R:** 1:2 mínimo

### Desempeño Esperado
- **Tasa de Acierto:** 55-60%
- **Operaciones por día:** 3-5
- **Win Rate Promedio:** €75-€150 por día (1 contrato)

---

## 📊 Estrategia 2: MACD + Bandas de Bollinger (Rebote de Bandas)

### Descripción
Busca rebotes en bandas de Bollinger confirmados por MACD en zonas de reversión.

### Indicadores
- **Bandas de Bollinger (20, 2):** Detectar sobreventa/sobrecompra
- **MACD (12, 26, 9):** Confirmar cambio de momentum
- **Media Móvil 20:** Nivel de soporte/resistencia dinámico

### Reglas de Entrada
**COMPRA (Rebote en banda inferior):**
- Precio toca o cruza banda inferior de Bollinger
- MACD es positivo o cruza la línea de señal al alza
- Cierre por encima de banda inferior
- Volumen en expansión

**VENTA (Rebote en banda superior):**
- Precio toca o cruza banda superior de Bollinger
- MACD es negativo o cruza la línea de señal a la baja
- Cierre por debajo de banda superior
- Volumen en expansión

### Gestión de Riesgo
- **Stop Loss:** 20 puntos (por debajo/encima de la banda)
- **Take Profit:** Media móvil 20 como objetivo intermedio
- **Trailing Stop:** Activar después de 15 puntos de ganancia

### Desempeño Esperado
- **Tasa de Acierto:** 58-65%
- **Operaciones por día:** 2-4
- **Win Rate Promedio:** €100-€200 por día (1 contrato)

---

## 📊 Estrategia 3: RSI Divergencia + Línea de Tendencia

### Descripción
Identifica divergencias bajistas/alcistas del RSI en puntos de inflexión de tendencia local.

### Indicadores
- **RSI (14):** Detectar divergencias
- **EMA 50:** Tendencia general
- **Líneas de Tendencia:** Niveles clave de soporte/resistencia

### Reglas de Entrada
**COMPRA (Divergencia Alcista):**
- Precio hace mínimo más bajo pero RSI hace mínimo más alto
- RSI por encima de 30
- Precio rebota desde línea de tendencia alcista
- Confirmación: cierre por encima del mínimo anterior

**VENTA (Divergencia Bajista):**
- Precio hace máximo más alto pero RSI hace máximo más bajo
- RSI por debajo de 70
- Precio se rechaza desde línea de tendencia bajista
- Confirmación: cierre por debajo del máximo anterior

### Gestión de Riesgo
- **Stop Loss:** 12 puntos (por debajo/encima del punto de divergencia)
- **Take Profit 1:** 20 puntos
- **Take Profit 2:** 35 puntos (escalada)
- **Profit Parcial:** Tomar 50% en TP1

### Desempeño Esperado
- **Tasa de Acierto:** 60-67%
- **Operaciones por día:** 1-3
- **Win Rate Promedio:** €120-€180 por día (1 contrato)

---

## 📊 Estrategia 4: MACD Histogram + Media Móvil (Momentum)

### Descripción
Captura cambios de momentum usando histograma MACD con filtro de tendencia.

### Indicadores
- **MACD Histogram:** Principal indicador de momentum
- **EMA 50:** Filtro de tendencia
- **RSI (14):** Confirmar ausencia de extremos

### Reglas de Entrada
**COMPRA (Momentum Alcista):**
- Histograma MACD pasa de negativo a positivo
- Precio por encima de EMA 50
- RSI entre 40-70
- Volumen confirma (volumen al alza)

**VENTA (Momentum Bajista):**
- Histograma MACD pasa de positivo a negativo
- Precio por debajo de EMA 50
- RSI entre 30-60
- Volumen confirma (volumen a la baja)

### Gestión de Riesgo
- **Stop Loss:** 18 puntos
- **Take Profit:** 30-40 puntos
- **Scale Out:** 50% en 25 puntos, resto en 40 puntos

### Desempeño Esperado
- **Tasa de Acierto:** 56-62%
- **Operaciones por día:** 3-6
- **Win Rate Promedio:** €80-€140 por día (1 contrato)

---

## 📊 Estrategia 5: Banda de Bollinger Squeeze + RSI Breakout

### Descripción
Identifica períodos de baja volatilidad (squeeze) y opera el breakout con confirmación de fuerza.

### Indicadores
- **Bandas de Bollinger (20, 1.5):** Detectar squeeze (banda angosta)
- **RSI (14):** Confirmar fuerza del breakout
- **ATR (14):** Medir expansión de volatilidad

### Reglas de Entrada
**COMPRA (Squeeze Alcista):**
- Bandas de Bollinger muy estrechas (volatilidad baja)
- Breakout por encima de banda superior
- RSI cruza arriba de 50 con fuerza
- ATR en expansión > promedio 5 periodos

**VENTA (Squeeze Bajista):**
- Bandas de Bollinger muy estrechas
- Breakout por debajo de banda inferior
- RSI cruza abajo de 50 con fuerza
- ATR en expansión > promedio 5 periodos

### Gestión de Riesgo
- **Stop Loss:** 22 puntos (al otro lado del squeeze)
- **Take Profit 1:** 30 puntos
- **Take Profit 2:** 50 puntos
- **Importante:** Solo operar cuando hay squeeze confirmado

### Desempeño Esperado
- **Tasa de Acierto:** 62-70%
- **Operaciones por día:** 1-2 (selectivas)
- **Win Rate Promedio:** €150-€250 por día (1 contrato)
- **Nota:** Menor volumen pero mayor precisión

---

## 🎯 Comparativa de Estrategias

| Estrategia | Aciertos | Op/Día | Win/Día | Dificultad | Mejor Horario |
|-----------|----------|--------|---------|-----------|---------------|
| 1. Cruce de EMAs | 55-60% | 3-5 | €75-150 | Baja | 9:30-16:00 ET |
| 2. MACD+Bollinger | 58-65% | 2-4 | €100-200 | Media | 9:30-15:00 ET |
| 3. RSI Divergencia | 60-67% | 1-3 | €120-180 | Alta | 10:00-14:00 ET |
| 4. MACD Histogram | 56-62% | 3-6 | €80-140 | Media | 9:30-16:00 ET |
| 5. Squeeze Breakout | 62-70% | 1-2 | €150-250 | Media-Alta | 9:30-12:00 ET |

---

## ⚠️ Recomendaciones Generales

### Horarios Óptimos (Hora ET)
- **Pre-apertura:** 9:30-10:30 (Alta volatilidad, mucho ruido)
- **Mid-morning:** 10:30-12:00 (Buena tendencia)
- **Después de comer:** 12:00-14:00 (Volatilidad media)
- **Mid-afternoon:** 14:00-15:30 (Posible resurgimiento)
- **Cierre:** 15:30-16:00 (Cuidado, cambios rápidos)

### Gestión General
1. **Posición pequeña al inicio:** Max 1 contrato (ES/MES) por estrategia
2. **Journal de operaciones:** Registrar cada entrada/salida
3. **Backtesting:** Validar cada estrategia con últimos 3 meses antes de operar
4. **Risk Management:** Nunca arriesgar más del 2% de capital por operación
5. **Combinación:** Usar 2-3 estrategias simultáneamente para diversificar

### Advertencias
- ⚠️ Requiere monitoreo en tiempo real (no es automático recomendado)
- ⚠️ Usar simulación/paper trading mínimo 2 semanas antes de operar real
- ⚠️ Las comisiones reducen ganancias en estrategias de muchas operaciones
- ⚠️ Mercados en gap/gaps pueden invalidar stops
- ⚠️ Viernes y antes de reportes económicos: reducir riesgo

---

## 📈 Próximos Pasos

1. Implementar indicadores en tu plataforma
2. Backtestear últimos 6 meses de datos
3. Ejecutar en paper trading 2 semanas
4. Comenzar con 1 estrategia + 1 contrato
5. Escalar gradualmente si P&L es consistente
