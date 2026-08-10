# Guía de Indicadores Técnicos para SP500 Trading

## 📊 RSI (Relative Strength Index)

### Fórmula
```
RSI = 100 - (100 / (1 + RS))
RS = Media móvil de Ganancias / Media móvil de Pérdidas
```

### Configuración Recomendada
- **Período:** 14 (es el estándar)
- **Overbought:** > 70
- **Oversold:** < 30

### Interpretación
| Valor | Significado |
|-------|-------------|
| 70-100 | Sobrecomprado (posible venta) |
| 50-70 | Tendencia alcista fuerte |
| 30-50 | Tendencia bajista fuerte |
| 0-30 | Sobrevendido (posible compra) |

### Uso en Estrategias
- **Confirmación de señales:** Evitar compras cuando RSI > 70 o ventas cuando < 30
- **Divergencias:** Máximos más altos en precio pero RSI más bajo = reversión bajista
- **Puntos de entrada:** RSI cruzando 30 al alza (compra) o 70 a la baja (venta)

### Ventajas
✅ Simple y efectivo  
✅ Identifica extremos  
✅ Bueno para detectar divergencias  

### Desventajas
❌ Puede quedarse en extremos en tendencias fuertes  
❌ Muchas falsas señales en mercados laterales  

---

## 📊 MACD (Moving Average Convergence Divergence)

### Componentes
1. **MACD Line:** EMA(12) - EMA(26)
2. **Signal Line:** EMA(9) del MACD Line
3. **Histogram:** MACD Line - Signal Line

### Interpretación
| Condición | Señal |
|-----------|-------|
| MACD cruza arriba Signal | Alcista (COMPRA) |
| MACD cruza abajo Signal | Bajista (VENTA) |
| Histogram positivo/creciente | Momentum alcista |
| Histogram negativo/decreciente | Momentum bajista |

### Configuración
- **EMA Rápida:** 12 periodos
- **EMA Lenta:** 26 periodos
- **Signal:** 9 periodos

### Uso en Estrategias
- **Confirmación de tendencia:** MACD por encima de línea cero = tendencia alcista
- **Cambios de momentum:** Cruce del histograma confirma cambios
- **Divergencias:** Precio hace máximo nuevo pero MACD no = posible reversión

### Ventajas
✅ Excelente para identificar cambios de tendencia  
✅ Combina medias móviles y momentum  
✅ Multiusos (tendencia, momentum, divergencias)  

### Desventajas
❌ Indicador lagging (retrasado)  
❌ Puede generar falsas señales en mercados planos  

---

## 📊 Bandas de Bollinger

### Fórmula
```
Banda Superior = SMA(20) + (2 × Desv. Estándar)
Banda Central = SMA(20)
Banda Inferior = SMA(20) - (2 × Desv. Estándar)
```

### Configuración Estándar
- **Período:** 20 (media móvil simple)
- **Desviaciones Estándar:** 2

### Interpretación
| Evento | Significado |
|--------|-------------|
| Precio toca banda superior | Posible sobreventa / Resistencia dinámica |
| Precio toca banda inferior | Posible sobrecompra / Soporte dinámico |
| Bandas muy estrechas (squeeze) | Baja volatilidad, breakout inminente |
| Bandas muy anchas | Alta volatilidad en mercado |

### Patrones Comunes
1. **Squeeze:** Bandas estrechas → Expansión de volatilidad
2. **Walk:** Precio sigue banda superior/inferior en tendencia
3. **Reversión de media:** Precio extremo tiende a retornar a media

### Uso en Estrategias
- **Rebotes:** Comprar en banda inferior, vender en media
- **Breakout:** Confirmar con volumen al romper banda
- **Squeeze:** Prepararse para expansión de volatilidad

### Ventajas
✅ Dinámicas (se adaptan a volatilidad)  
✅ Soporte/Resistencia automático  
✅ Identifica períodos de baja volatilidad  

### Desventajas
❌ Se ajustan lentamente a cambios rápidos  
❌ Pueden ser penetradas en mercados trending fuertes  

---

## 📊 Media Móvil Exponencial (EMA) vs Simple (SMA)

### EMA (Exponential Moving Average)
- Da más peso a precios recientes
- Reacciona más rápido a cambios
- Mejor para trading a corto plazo (5min, 15min)

**Fórmula:**
```
EMA = Precio × (2/(N+1)) + EMA_anterior × (1 - 2/(N+1))
```

### SMA (Simple Moving Average)
- Promedio simple de los últimos N precios
- Más lento pero menos falsas señales
- Mejor para soporte/resistencia

**Fórmula:**
```
SMA = Suma de últimos N precios / N
```

### Períodos Comunes para 5 minutos
| Período | Uso |
|---------|-----|
| EMA 9 | Tendencia muy corta / Señal rápida |
| EMA 21 | Tendencia corta / Cruce primario |
| SMA 20 | Banda central / Soporte/Resistencia |
| EMA 50 | Filtro de tendencia general |
| EMA 200 | Tendencia de largo plazo |

---

## 🎯 Indicadores Secundarios (Bonus)

### ATR (Average True Range)
- **Uso:** Medir volatilidad
- **Fórmula:** Promedio del rango verdadero
- **Aplicación:** Ajustar stop loss según volatilidad

```python
ATR = Promedio(High - Low, High - Close_anterior, Close_anterior - Low)
```

### Volume
- **Uso:** Confirmar movimientos
- **Señal:** Volumen alto en breakout = confianza
- **Advertencia:** Volumen bajo = posible falsedad

### Support & Resistance
- **Horizontal:** Niveles históricos repetidos
- **Dinámico:** Medias móviles, bandas Bollinger
- **Inclinado:** Líneas de tendencia

---

## 📈 Ejemplo Práctico: Estrategia Combinada

### Setup: Cruce EMA + RSI + Bandas Bollinger

```
Condiciones de COMPRA:
1. EMA 9 cruza arriba de EMA 21
2. RSI > 30 y < 70 (no en extremo)
3. Precio por encima de banda inferior de Bollinger
4. Volumen en expansión

Condiciones de VENTA:
1. EMA 9 cruza abajo de EMA 21
2. RSI < 70 y > 30
3. Precio por debajo de banda superior de Bollinger
4. Volumen en expansión

Gestión de Riesgo:
- Stop Loss: 15 puntos
- Take Profit: 25 puntos
- Ratio R:R: 1:1.67
```

---

## ⚠️ Errores Comunes

1. **Indicador lagging:** Usar indicadores rezagados en timeframes cortos
   - ❌ No usar SMA 200 en 5 minutos
   - ✅ Usar EMA 50 máximo

2. **Over-trading:** Demasiados indicadores causando confusión
   - ❌ No usar 10+ indicadores
   - ✅ Máximo 3 indicadores confirmantes

3. **Ignorar tendencia:** Comprar en tendencia bajista sin confirmación
   - ❌ No ir contra la tendencia principal
   - ✅ Usar filtro de tendencia (EMA 50)

4. **Señales sin confirmación:** Actuar solo con un indicador
   - ❌ No entrar solo porque RSI < 30
   - ✅ Esperar confirmación de 2-3 indicadores

5. **Comisiones ignoradas:** Las comisiones erosionan ganancias
   - ❌ Operar demasiadas veces sin margen adecuado
   - ✅ Apuntar a mínimo 20-30 puntos por operación

---

## 🎓 Resumen Rápido

| Indicador | Mejor Uso | Período | Confiabilidad |
|-----------|-----------|---------|----------------|
| RSI | Extremos / Divergencias | 14 | ⭐⭐⭐⭐ |
| MACD | Cambios de tendencia | 12,26,9 | ⭐⭐⭐⭐ |
| Bollinger | Rebotes / Volatilidad | 20,2 | ⭐⭐⭐⭐ |
| EMA | Tendencia corto plazo | 9, 21 | ⭐⭐⭐⭐⭐ |
| SMA | Soporte/Resistencia | 50, 200 | ⭐⭐⭐⭐ |
| ATR | Volatilidad / Stops | 14 | ⭐⭐⭐⭐ |

---

## 📖 Recursos Recomendados

- Investopedia: Explicaciones detalladas de indicadores
- TradingView: Gráficos interactivos para practicar
- YouTube: Canales como "The Trading Channel" o "Ross Cameron"
- Paper Trading: Practicar con dinero simulado antes de operar real

**Recuerda:** Los indicadores son herramientas de CONFIRMACIÓN, no generadores de señales garantizadas.
