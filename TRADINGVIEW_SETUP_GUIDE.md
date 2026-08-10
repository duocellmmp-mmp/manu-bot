# Guía de Configuración - Pine Scripts en TradingView

## 📊 Estrategias Disponibles

Tenemos 3 estrategias listas para usar en TradingView:

1. **Estrategia 1: Cruce EMA + RSI** (Mejor para principiantes)
   - Win Rate: 31.58%
   - Ganancia: $14,128
   - Archivo: `tradingview_strategy_ema_rsi.pine`

2. **Estrategia 3: RSI Divergencia** (Mejor Win Rate: 51.72%)
   - Win Rate: 51.72%
   - Ganancia: $2,701
   - Archivo: `tradingview_strategy_rsi_divergence.pine`

3. **Estrategia 4: MACD Histogram** (Mayor ganancia)
   - Win Rate: 38.78%
   - Ganancia: $4,230
   - Operaciones: 49 (más señales)
   - Archivo: `tradingview_strategy_macd_histogram.pine`

---

## 🔧 Paso 1: Copiar el Código

### Opción A: Copiar desde los archivos .pine

Los archivos están listos:
- `tradingview_strategy_ema_rsi.pine`
- `tradingview_strategy_rsi_divergence.pine`
- `tradingview_strategy_macd_histogram.pine`

### Opción B: Copiar directamente

Toma el contenido de cualquier archivo `.pine` y prepárate para pegarlo.

---

## ⚙️ Paso 2: Crear Script en TradingView

1. **Abre TradingView** (www.tradingview.com)
2. **Ve a una gráfica de SP500 Futures (ES o MES)** con temporalidad **5 minutos**
3. **Haz click en "Pine Editor"** (botón inferior izquierdo)
4. **Click en "+ New Script"**
5. **Copia el código** del archivo .pine que elegiste
6. **Pega el código** en el editor Pine
7. **Presiona "Add to Chart"**

---

## 📈 Paso 3: Configurar el Gráfico

### Configuración Recomendada

**Símbolo:** ES (ES1! para futuros continuos)  
**Temporalidad:** 5 minutos  
**Horas:** RTH (regular trading hours) o 24h según prefieras

### Indicadores que se cargarán automáticamente:

**Estrategia EMA + RSI:**
- EMA 9 (azul)
- EMA 21 (rojo)
- RSI (panel inferior)

**Estrategia RSI Divergencia:**
- EMA 50 (naranja)
- RSI con zonas de divergencia

**Estrategia MACD Histogram:**
- MACD (panel inferior)
- Señal
- Histograma

---

## 🎯 Paso 4: Interpretar Señales

### Símbolos en el Gráfico

**🟢 Señal de COMPRA:**
- Flecha verde hacia arriba
- Mensaje: "🟢 COMPRA"
- **Acción:** Esperar confirmación del candle anterior

**🔴 Señal de VENTA:**
- Flecha roja hacia abajo
- Mensaje: "🔴 VENTA"
- **Acción:** Cerrar posición o pasar a short

### Notificaciones

Para recibir alertas en tiempo real:

1. **Haz click en el nombre del script** (en la esquina superior izquierda)
2. **Selecciona "Alert"**
3. **Configura:**
   - Nombre: "SP500 Trading Alert"
   - Condición: "Whenever the study alerts"
   - Tipo: "Notification" (o SMS)
   - Frecuencia: "Once per bar close"
4. **Click en "Create"**

---

## 💰 Paso 5: Configurar Órdenes Automáticas

### Opción Manual (Recomendado para principiantes)

1. Espera la señal en TradingView
2. Abre tu plataforma de trading (Interactive Brokers, TD Ameritrade, etc.)
3. Ejecuta la orden manualmente

**Parámetros de Orden:**
```
COMPRA:
- Cantidad: 1 contrato (ES/MES)
- Stop Loss: 15-20 puntos por debajo de entrada
- Take Profit: 25-35 puntos por encima

VENTA:
- Cerrar posición o abrir corta
```

### Opción Automática (Para usuarios avanzados)

Si tu broker soporta conexión API:
- Usa TradingView's "Webhook" alerts
- Conecta con tu bot de trading
- Las órdenes se ejecutarán automáticamente

---

## 📊 Monitoreo de Rentabilidad

### En TradingView:

1. El script muestra una **tabla en la esquina superior derecha** con:
   - Win Rate (%)
   - Ganancia Total ($)
   - Número de Operaciones
   - Profit Factor

2. En el **panel de "Performance"** (si está disponible):
   - Ganancias totales
   - Drawdown máximo
   - Ratio Sharpe

### Registro Manual:

Usa el **template de journal:**
`trading_journal_template.csv`

**Columnas:**
- Fecha, Hora, Estrategia
- Precio entrada/salida
- Ganancia/Pérdida
- Win/Loss
- Notas

---

## 🔄 Cómo Cambiar de Estrategia

### Si quieres probar otra estrategia:

1. **Click derecho en el script** en el gráfico
2. **Selecciona "Remove"**
3. **Abre Pine Editor** nuevamente
4. **Crea un nuevo script** con otra estrategia
5. **Add to Chart**

### Ejecutar múltiples estrategias simultáneamente:

1. Repite los pasos anteriores para cada estrategia
2. Cada una tendrá su propia sección en el gráfico
3. Monitorea las señales de cada una independientemente

---

## ⚙️ Ajustar Parámetros

Si quieres modificar los valores:

1. **Click en el nombre del script** (esquina superior izquierda)
2. **Selecciona "Settings"**
3. **Modifica los valores:**

### Parámetros principales por estrategia:

**Estrategia 1 (EMA + RSI):**
```
EMA Rápida: 9 (intenta 8-12)
EMA Lenta: 21 (intenta 18-25)
RSI Período: 14 (estándar)
Stop Loss: 15 puntos (intenta 10-20)
Take Profit: 25 puntos (intenta 20-35)
```

**Estrategia 3 (RSI Divergencia):**
```
RSI Período: 14
EMA Filtro: 50 (intenta 40-60)
Stop Loss: 12 puntos
TP 1: 20 puntos
TP 2: 35 puntos
```

**Estrategia 4 (MACD):**
```
MACD Rápida: 12 (intenta 10-14)
MACD Lenta: 26 (intenta 24-30)
Señal: 9 (intenta 8-11)
Stop Loss: 18 puntos
Take Profit: 30 puntos
```

---

## ⚠️ Advertencias Importantes

1. **Paper Trading First:**
   - Práctica mínimo 2 semanas en paper trading
   - Valida que los resultados sean consistentes

2. **Comisiones:**
   - TradingView NO incluye comisiones en el backtest
   - Los scripts incluyen 0.05% de comisión
   - Ajusta según tu broker (Interactive Brokers: 0.02-0.05%)

3. **Slippage:**
   - El backtest asume ejecución perfecta
   - En realidad, hay variación de 1-2 puntos
   - Ajusta stops/TP en consecuencia

4. **Gaps:**
   - Al abrir el mercado pueden haber gaps
   - Los stops pueden no ejecutarse
   - Evita entradas 30 minutos antes de apertura

5. **Horarios:**
   - Mejor: 10:00 - 15:00 ET
   - Evitar: últimos 30 minutos antes de cierre
   - Viernes: volatilidad impredecible

---

## 🐛 Solucionar Problemas

### Problema: No veo señales

**Solución:**
1. Verifica que uses temporalidad 5 minutos
2. Asegúrate de usar ES (SP500 Futures)
3. Recarga la página (F5)
4. Abre un candle nuevo (espera 5 minutos)

### Problema: Las alertas no funcionan

**Solución:**
1. Verifica permisos de notificación del navegador
2. Reconfigura la alerta:
   - Editar script → Settings
   - Guarda cambios
3. Intenta con Webhook en lugar de notificación

### Problema: Resultados diferentes a backtest

**Solución:**
1. Comisiones pueden variar
2. El slippage varía
3. Los horarios de mercado afectan
4. Ajusta TP/SL según tus resultados reales

---

## 📱 Móvil y Desktop

### TradingView Web:
- ✅ Funciona perfectamente
- ✅ Acceso a Pine Scripts
- ✅ Alertas en tiempo real

### TradingView Móvil (App):
- ✅ Funciona pero sin Pine Editor
- ✅ Sí muestra scripts
- ⚠️ Alertas limitadas en versión gratuita

### Recomendación:
- Usar **web** para configuración
- Usar **móvil** solo para monitoreo

---

## ✅ Checklist de Configuración

- [ ] Abierta gráfica ES/MES en 5 minutos
- [ ] Copiado código Pine Script
- [ ] Script añadido al gráfico
- [ ] Tabla de estadísticas visible
- [ ] Configuradas alertas
- [ ] 1-2 semanas de paper trading completadas
- [ ] Validados resultados en paper trading
- [ ] Capital suficiente ($2,000+ para ES)
- [ ] Risk Management establecido
- [ ] Journal de operaciones listo

---

## 📞 Soporte

**Si necesitas ayuda:**

1. Revisa el archivo `.pine` directamente - está comentado
2. Consulta TradingView's Pine Script Documentation
3. Prueba en paper trading antes de operar real

---

**Última actualización:** Agosto 2026  
**Versión:** 1.0

¡Éxito en tu trading! 📈
