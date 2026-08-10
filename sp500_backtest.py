#!/usr/bin/env python3
"""
SP500 Trading Strategies Backtest
Análisis de 5 estrategias con datos reales del último año
Temporalidad: 5 minutos
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import yfinance as yf
import warnings
warnings.filterwarnings('ignore')

# ==============================================================================
# DESCARGA DE DATOS
# ==============================================================================

def download_sp500_data():
    """Descargar datos del SP500 (ES mini futures) último año"""
    print("📊 Descargando datos del SP500 (último año)...")

    # Usar ^GSPC como proxy para análisis
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)

    data = yf.download('^GSPC', start=start_date, end=end_date, interval='5m', progress=False)

    if data.empty:
        print("⚠️  No se pudieron descargar datos. Usando datos simulados...")
        return generate_sample_data()

    return data

def generate_sample_data():
    """Generar datos de muestra para demostración"""
    print("📈 Generando datos de muestra...")
    dates = pd.date_range(end=datetime.now(), periods=2000, freq='5min')

    np.random.seed(42)
    prices = 5000 + np.cumsum(np.random.randn(2000) * 2)

    data = pd.DataFrame({
        'Open': prices,
        'High': prices + np.abs(np.random.randn(2000)),
        'Low': prices - np.abs(np.random.randn(2000)),
        'Close': prices,
        'Volume': np.random.randint(1000000, 5000000, 2000)
    }, index=dates)

    return data

# ==============================================================================
# INDICADORES TÉCNICOS
# ==============================================================================

class Indicators:
    """Clase para calcular indicadores técnicos"""

    @staticmethod
    def ema(data, period):
        """Media Móvil Exponencial"""
        return data.ewm(span=period, adjust=False).mean()

    @staticmethod
    def sma(data, period):
        """Media Móvil Simple"""
        return data.rolling(window=period).mean()

    @staticmethod
    def rsi(data, period=14):
        """Relative Strength Index"""
        delta = data.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

        rs = gain / loss.replace(0, np.nan)
        rsi = 100 - (100 / (1 + rs))
        return rsi

    @staticmethod
    def macd(data, fast=12, slow=26, signal=9):
        """MACD - Moving Average Convergence Divergence"""
        ema_fast = data.ewm(span=fast, adjust=False).mean()
        ema_slow = data.ewm(span=slow, adjust=False).mean()

        macd_line = ema_fast - ema_slow
        signal_line = macd_line.ewm(span=signal, adjust=False).mean()
        histogram = macd_line - signal_line

        return macd_line, signal_line, histogram

    @staticmethod
    def bollinger_bands(data, period=20, std_dev=2):
        """Bandas de Bollinger"""
        sma = data.rolling(window=period).mean()
        std = data.rolling(window=period).std()

        upper = sma + (std_dev * std)
        lower = sma - (std_dev * std)

        return upper, sma, lower

    @staticmethod
    def atr(high, low, close, period=14):
        """Average True Range"""
        tr1 = high - low
        tr2 = abs(high - close.shift())
        tr3 = abs(low - close.shift())

        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        atr = tr.rolling(window=period).mean()

        return atr

# ==============================================================================
# ESTRATEGIAS
# ==============================================================================

class Strategy:
    """Clase base para estrategias"""

    def __init__(self, data, name):
        self.data = data.copy()
        self.name = name
        self.signals = pd.DataFrame(index=data.index)
        self.trades = []
        self.equity_curve = []

    def backtest(self):
        """Método para ejecutar backtest"""
        raise NotImplementedError

    def calculate_metrics(self):
        """Calcular métricas de desempeño"""
        if not self.trades:
            return {
                'Total Trades': 0,
                'Winning Trades': 0,
                'Losing Trades': 0,
                'Win Rate': 0,
                'Profit Factor': 0,
                'Total Profit': 0
            }

        winning_trades = [t for t in self.trades if t['profit'] > 0]
        losing_trades = [t for t in self.trades if t['profit'] < 0]

        total_wins = sum([t['profit'] for t in winning_trades])
        total_losses = abs(sum([t['profit'] for t in losing_trades]))

        win_rate = len(winning_trades) / len(self.trades) if self.trades else 0
        profit_factor = total_wins / total_losses if total_losses > 0 else 0
        total_profit = sum([t['profit'] for t in self.trades])

        return {
            'Strategy': self.name,
            'Total Trades': len(self.trades),
            'Winning Trades': len(winning_trades),
            'Losing Trades': len(losing_trades),
            'Win Rate (%)': round(win_rate * 100, 2),
            'Profit Factor': round(profit_factor, 2),
            'Total Profit ($)': round(total_profit, 2),
            'Avg Win ($)': round(total_wins / len(winning_trades), 2) if winning_trades else 0,
            'Avg Loss ($)': round(total_losses / len(losing_trades), 2) if losing_trades else 0,
        }

class StrategyEMACross(Strategy):
    """Estrategia 1: Cruce de Medias Móviles con RSI"""

    def backtest(self):
        close = self.data['Close']
        ema9 = Indicators.ema(close, 9)
        ema21 = Indicators.ema(close, 21)
        rsi = Indicators.rsi(close, 14)

        self.signals['EMA9'] = ema9
        self.signals['EMA21'] = ema21
        self.signals['RSI'] = rsi

        position = None
        entry_price = 0

        for i in range(1, len(self.data)):
            close_price = close.iloc[i]
            rsi_value = rsi.iloc[i]

            # Evitar NaN
            if pd.isna(ema9.iloc[i]) or pd.isna(ema21.iloc[i]) or pd.isna(rsi_value):
                continue

            # Señal de compra
            if (ema9.iloc[i] > ema21.iloc[i] and
                ema9.iloc[i-1] <= ema21.iloc[i-1] and
                30 < rsi_value < 70 and
                position is None):

                position = 'LONG'
                entry_price = close_price
                entry_idx = i

            # Señal de venta
            elif (ema9.iloc[i] < ema21.iloc[i] and
                  ema9.iloc[i-1] >= ema21.iloc[i-1] and
                  30 < rsi_value < 70 and
                  position == 'LONG'):

                profit = (close_price - entry_price) * 100  # Simular 1 contrato (100x)
                self.trades.append({
                    'entry': entry_idx,
                    'exit': i,
                    'entry_price': entry_price,
                    'exit_price': close_price,
                    'profit': profit
                })
                position = None

class StrategyMACDBolli(Strategy):
    """Estrategia 2: MACD + Bandas de Bollinger"""

    def backtest(self):
        close = self.data['Close']
        macd_line, signal_line, histogram = Indicators.macd(close)
        upper, middle, lower = Indicators.bollinger_bands(close, 20, 2)

        position = None
        entry_price = 0

        for i in range(1, len(self.data)):
            close_price = close.iloc[i]

            # Evitar NaN
            if (pd.isna(macd_line.iloc[i]) or pd.isna(lower.iloc[i]) or
                pd.isna(upper.iloc[i])):
                continue

            # Señal de compra (rebote banda inferior)
            if (close_price <= lower.iloc[i] and
                histogram.iloc[i] > 0 and
                histogram.iloc[i-1] <= 0 and
                position is None):

                position = 'LONG'
                entry_price = close_price
                entry_idx = i

            # Señal de venta (toque banda superior o pérdida de momentum)
            elif (close_price >= upper.iloc[i] and position == 'LONG'):
                profit = (close_price - entry_price) * 100
                self.trades.append({
                    'entry': entry_idx,
                    'exit': i,
                    'entry_price': entry_price,
                    'exit_price': close_price,
                    'profit': profit
                })
                position = None

class StrategyRSIDivergence(Strategy):
    """Estrategia 3: RSI Divergencia + Línea de Tendencia"""

    def backtest(self):
        close = self.data['Close']
        rsi = Indicators.rsi(close, 14)
        ema50 = Indicators.ema(close, 50)

        position = None
        entry_price = 0
        last_low_price = close.iloc[0]
        last_low_rsi = rsi.iloc[0]

        for i in range(50, len(self.data)):
            close_price = close.iloc[i]
            rsi_value = rsi.iloc[i]

            if pd.isna(rsi_value):
                continue

            # Detectar mínimos locales
            if (i > 1 and close_price > close.iloc[i-1] and
                close.iloc[i-1] < close.iloc[i-2]):

                # Divergencia alcista
                if (close_price < last_low_price and
                    rsi_value > last_low_rsi and
                    rsi_value > 30 and
                    position is None):

                    position = 'LONG'
                    entry_price = close_price
                    entry_idx = i

                last_low_price = close.iloc[i-1]
                last_low_rsi = rsi.iloc[i-1]

            # Señal de salida
            if position == 'LONG' and i - entry_idx > 10:
                profit = (close_price - entry_price) * 100
                if profit != 0:
                    self.trades.append({
                        'entry': entry_idx,
                        'exit': i,
                        'entry_price': entry_price,
                        'exit_price': close_price,
                        'profit': profit
                    })
                position = None

class StrategyMACDHistogram(Strategy):
    """Estrategia 4: MACD Histogram + Media Móvil"""

    def backtest(self):
        close = self.data['Close']
        macd_line, signal_line, histogram = Indicators.macd(close)
        ema50 = Indicators.ema(close, 50)
        rsi = Indicators.rsi(close, 14)

        position = None
        entry_price = 0

        for i in range(1, len(self.data)):
            close_price = close.iloc[i]

            if pd.isna(histogram.iloc[i]) or pd.isna(ema50.iloc[i]):
                continue

            # Compra: Histograma pasa a positivo
            if (histogram.iloc[i] > 0 and
                histogram.iloc[i-1] <= 0 and
                close_price > ema50.iloc[i] and
                40 < rsi.iloc[i] < 70 and
                position is None):

                position = 'LONG'
                entry_price = close_price
                entry_idx = i

            # Venta: Histograma pasa a negativo
            elif (histogram.iloc[i] < 0 and
                  histogram.iloc[i-1] >= 0 and
                  position == 'LONG'):

                profit = (close_price - entry_price) * 100
                self.trades.append({
                    'entry': entry_idx,
                    'exit': i,
                    'entry_price': entry_price,
                    'exit_price': close_price,
                    'profit': profit
                })
                position = None

class StrategyBollingerSqueeze(Strategy):
    """Estrategia 5: Banda de Bollinger Squeeze + RSI Breakout"""

    def backtest(self):
        close = self.data['Close']
        upper, middle, lower = Indicators.bollinger_bands(close, 20, 1.5)
        rsi = Indicators.rsi(close, 14)
        atr = Indicators.atr(self.data['High'], self.data['Low'], close, 14)

        # Detectar squeeze (banda estrecha)
        band_width = upper - lower
        avg_width = band_width.rolling(10).mean()

        position = None
        entry_price = 0

        for i in range(10, len(self.data)):
            close_price = close.iloc[i]

            if pd.isna(band_width.iloc[i]) or pd.isna(rsi.iloc[i]):
                continue

            # Condiciones de squeeze
            is_squeeze = band_width.iloc[i] < (avg_width.iloc[i] * 0.8)

            # Breakout alcista después de squeeze
            if (is_squeeze and
                close_price > upper.iloc[i] and
                rsi.iloc[i] > 50 and
                atr.iloc[i] > atr.iloc[max(0, i-5):i].mean() and
                position is None):

                position = 'LONG'
                entry_price = close_price
                entry_idx = i

            # Salida
            elif (close_price < middle.iloc[i] and position == 'LONG'):
                profit = (close_price - entry_price) * 100
                self.trades.append({
                    'entry': entry_idx,
                    'exit': i,
                    'entry_price': entry_price,
                    'exit_price': close_price,
                    'profit': profit
                })
                position = None

# ==============================================================================
# EJECUCIÓN Y REPORTE
# ==============================================================================

def main():
    print("="*80)
    print("SP500 TRADING STRATEGIES - BACKTEST")
    print("="*80)

    # Descargar datos
    data = download_sp500_data()
    print(f"✅ Datos cargados: {len(data)} velas de 5 minutos")
    print(f"   Rango: {data.index[0]} a {data.index[-1]}\n")

    # Crear estrategias
    strategies = [
        StrategyEMACross(data, "1️⃣  Cruce EMA + RSI"),
        StrategyMACDBolli(data, "2️⃣  MACD + Bollinger"),
        StrategyRSIDivergence(data, "3️⃣  RSI Divergencia"),
        StrategyMACDHistogram(data, "4️⃣  MACD Histogram"),
        StrategyBollingerSqueeze(data, "5️⃣  Bollinger Squeeze")
    ]

    # Ejecutar backtest
    results = []
    for strategy in strategies:
        print(f"🔄 Backtesting {strategy.name}...")
        strategy.backtest()
        metrics = strategy.calculate_metrics()
        results.append(metrics)
        print(f"   ✓ {metrics['Total Trades']} operaciones | "
              f"Win Rate: {metrics['Win Rate (%)']}% | "
              f"Ganancia: ${metrics['Total Profit ($)']}\n")

    # Mostrar resumen
    print("="*80)
    print("RESUMEN DE RESULTADOS")
    print("="*80)

    results_df = pd.DataFrame(results)
    print(results_df.to_string(index=False))

    print("\n" + "="*80)
    print("MEJORES ESTRATEGIAS (por Tasa de Acierto)")
    print("="*80)
    top_strategies = results_df.nlargest(3, 'Win Rate (%)')
    print(top_strategies[['Strategy', 'Win Rate (%)', 'Total Profit ($)']].to_string(index=False))

    print("\n" + "="*80)
    print("📝 NOTAS IMPORTANTES")
    print("="*80)
    print("""
✅ Este backtest es solo de demostración
✅ Datos reales pueden variar según el símbolo (ES/MES)
✅ No incluye comisiones ni spread
✅ Usar paper trading antes de operar con dinero real
✅ Ajustar parámetros según market conditions
    """)

if __name__ == "__main__":
    main()
