import { useState } from 'react';
import type { DashboardProps } from '../types/props';

/**
 * Scientific Calculator Page
 *
 * An advanced calculator component with scientific operations including:
 * - Trigonometric functions (sin, cos, tan)
 * - Logarithmic functions (log, ln)
 * - Power operations (x², x³, xʸ)
 * - Constants (π, e)
 * - And all standard arithmetic operations
 */
export default function Calculator(props: DashboardProps) {
  const { theme } = props;
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<string[]>([]);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const performCalculation = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '^':
        return Math.pow(prev, current);
      case 'mod':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      const resultStr = formatResult(result);
      setDisplay(resultStr);
      addToHistory(`${previousValue} ${operation} ${currentValue} = ${resultStr}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleScientificFunction = (func: string) => {
    const currentValue = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(angleMode === 'deg' ? (currentValue * Math.PI) / 180 : currentValue);
        break;
      case 'cos':
        result = Math.cos(angleMode === 'deg' ? (currentValue * Math.PI) / 180 : currentValue);
        break;
      case 'tan':
        result = Math.tan(angleMode === 'deg' ? (currentValue * Math.PI) / 180 : currentValue);
        break;
      case 'asin':
        result = angleMode === 'deg' ? (Math.asin(currentValue) * 180) / Math.PI : Math.asin(currentValue);
        break;
      case 'acos':
        result = angleMode === 'deg' ? (Math.acos(currentValue) * 180) / Math.PI : Math.acos(currentValue);
        break;
      case 'atan':
        result = angleMode === 'deg' ? (Math.atan(currentValue) * 180) / Math.PI : Math.atan(currentValue);
        break;
      case 'log':
        result = Math.log10(currentValue);
        break;
      case 'ln':
        result = Math.log(currentValue);
        break;
      case 'sqrt':
        result = Math.sqrt(currentValue);
        break;
      case 'cbrt':
        result = Math.cbrt(currentValue);
        break;
      case 'square':
        result = currentValue * currentValue;
        break;
      case 'cube':
        result = currentValue * currentValue * currentValue;
        break;
      case 'reciprocal':
        result = 1 / currentValue;
        break;
      case 'factorial':
        result = factorial(Math.floor(currentValue));
        break;
      case 'abs':
        result = Math.abs(currentValue);
        break;
      case 'negate':
        result = -currentValue;
        break;
      default:
        result = currentValue;
    }

    const resultStr = formatResult(result);
    setDisplay(resultStr);
    addToHistory(`${func}(${currentValue}) = ${resultStr}`);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  const handleConstant = (constant: string) => {
    let value: number;
    switch (constant) {
      case 'pi':
        value = Math.PI;
        break;
      case 'e':
        value = Math.E;
        break;
      default:
        value = 0;
    }
    setDisplay(String(value));
    setWaitingForNewValue(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const formatResult = (value: number): string => {
    if (!isFinite(value)) return 'Error';
    if (Number.isInteger(value)) return String(value);
    return parseFloat(value.toFixed(10)).toString();
  };

  const addToHistory = (entry: string) => {
    setHistory([...history, entry]);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const buttonStyle = {
    padding: '0.75rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#333' : '#e0e0e0',
    color: theme === 'dark' ? '#fff' : '#000',
    transition: 'background-color 0.2s',
    fontWeight: '500',
  };

  const operationButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3B82F6',
    color: '#fff',
  };

  const scientificButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#8B5CF6',
    color: '#fff',
    fontSize: '0.8rem',
  };

  const equalsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10B981',
    color: '#fff',
  };

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#EF4444',
    color: '#fff',
  };

  const constantButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#F59E0B',
    color: '#fff',
    fontSize: '0.8rem',
  };

  const modeButtonStyle = {
    ...buttonStyle,
    backgroundColor: theme === 'dark' ? '#444' : '#d0d0d0',
    color: theme === 'dark' ? '#fff' : '#000',
    fontSize: '0.75rem',
  };

  return (
    <div
      data-testid="calculator-container"
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Scientific Calculator</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Calculator */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Display */}
          <div
            style={{
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              textAlign: 'right',
              fontSize: '2rem',
              fontWeight: 'bold',
              wordWrap: 'break-word',
              wordBreak: 'break-all',
              minHeight: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              fontFamily: 'monospace',
            }}
          >
            {display}
          </div>

          {/* Angle Mode Toggle */}
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setAngleMode('deg')}
              style={{
                ...modeButtonStyle,
                backgroundColor: angleMode === 'deg' ? '#3B82F6' : (theme === 'dark' ? '#444' : '#d0d0d0'),
                color: angleMode === 'deg' ? '#fff' : (theme === 'dark' ? '#fff' : '#000'),
                flex: 1,
              }}
            >
              DEG
            </button>
            <button
              onClick={() => setAngleMode('rad')}
              style={{
                ...modeButtonStyle,
                backgroundColor: angleMode === 'rad' ? '#3B82F6' : (theme === 'dark' ? '#444' : '#d0d0d0'),
                color: angleMode === 'rad' ? '#fff' : (theme === 'dark' ? '#fff' : '#000'),
                flex: 1,
              }}
            >
              RAD
            </button>
          </div>

          {/* Buttons Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            {/* Row 1 - Trigonometric */}
            <button onClick={() => handleScientificFunction('sin')} style={scientificButtonStyle}>
              sin
            </button>
            <button onClick={() => handleScientificFunction('cos')} style={scientificButtonStyle}>
              cos
            </button>
            <button onClick={() => handleScientificFunction('tan')} style={scientificButtonStyle}>
              tan
            </button>
            <button onClick={() => handleConstant('pi')} style={constantButtonStyle}>
              π
            </button>
            <button
              onClick={handleClear}
              style={{ ...clearButtonStyle, gridColumn: 'span 1' }}
            >
              C
            </button>

            {/* Row 2 - Inverse Trig */}
            <button onClick={() => handleScientificFunction('asin')} style={scientificButtonStyle}>
              asin
            </button>
            <button onClick={() => handleScientificFunction('acos')} style={scientificButtonStyle}>
              acos
            </button>
            <button onClick={() => handleScientificFunction('atan')} style={scientificButtonStyle}>
              atan
            </button>
            <button onClick={() => handleConstant('e')} style={constantButtonStyle}>
              e
            </button>
            <button onClick={() => handleScientificFunction('negate')} style={operationButtonStyle}>
              ±
            </button>

            {/* Row 3 - Logarithmic */}
            <button onClick={() => handleScientificFunction('log')} style={scientificButtonStyle}>
              log
            </button>
            <button onClick={() => handleScientificFunction('ln')} style={scientificButtonStyle}>
              ln
            </button>
            <button onClick={() => handleScientificFunction('sqrt')} style={scientificButtonStyle}>
              √
            </button>
            <button onClick={() => handleScientificFunction('cbrt')} style={scientificButtonStyle}>
              ∛
            </button>
            <button onClick={() => handleOperation('/')} style={operationButtonStyle}>
              ÷
            </button>

            {/* Row 4 - Power Operations */}
            <button onClick={() => handleScientificFunction('square')} style={scientificButtonStyle}>
              x²
            </button>
            <button onClick={() => handleScientificFunction('cube')} style={scientificButtonStyle}>
              x³
            </button>
            <button onClick={() => handleOperation('^')} style={operationButtonStyle}>
              xʸ
            </button>
            <button onClick={() => handleScientificFunction('reciprocal')} style={scientificButtonStyle}>
              1/x
            </button>
            <button onClick={() => handleOperation('*')} style={operationButtonStyle}>
              ×
            </button>

            {/* Row 5 - Numbers and Operations */}
            <button onClick={() => handleNumberClick('7')} style={buttonStyle}>
              7
            </button>
            <button onClick={() => handleNumberClick('8')} style={buttonStyle}>
              8
            </button>
            <button onClick={() => handleNumberClick('9')} style={buttonStyle}>
              9
            </button>
            <button onClick={() => handleScientificFunction('factorial')} style={scientificButtonStyle}>
              n!
            </button>
            <button onClick={() => handleOperation('-')} style={operationButtonStyle}>
              −
            </button>

            {/* Row 6 */}
            <button onClick={() => handleNumberClick('4')} style={buttonStyle}>
              4
            </button>
            <button onClick={() => handleNumberClick('5')} style={buttonStyle}>
              5
            </button>
            <button onClick={() => handleNumberClick('6')} style={buttonStyle}>
              6
            </button>
            <button onClick={() => handleOperation('mod')} style={operationButtonStyle}>
              mod
            </button>
            <button onClick={() => handleOperation('+')} style={operationButtonStyle}>
              +
            </button>

            {/* Row 7 */}
            <button onClick={() => handleNumberClick('1')} style={buttonStyle}>
              1
            </button>
            <button onClick={() => handleNumberClick('2')} style={buttonStyle}>
              2
            </button>
            <button onClick={() => handleNumberClick('3')} style={buttonStyle}>
              3
            </button>
            <button onClick={handleDecimal} style={buttonStyle}>
              .
            </button>
            <button
              onClick={handleEquals}
              style={{ ...equalsButtonStyle, gridRow: 'span 2' }}
            >
              =
            </button>

            {/* Row 8 */}
            <button
              onClick={() => handleNumberClick('0')}
              style={{ ...buttonStyle, gridColumn: 'span 3' }}
            >
              0
            </button>
            <button onClick={() => handleScientificFunction('abs')} style={scientificButtonStyle}>
              |x|
            </button>
          </div>
        </div>

        {/* History Panel */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>History</h2>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                style={{
                  ...clearButtonStyle,
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                }}
              >
                Clear
              </button>
            )}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
              borderRadius: '0.5rem',
              padding: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}
          >
            {history.length === 0 ? (
              <p style={{ color: theme === 'dark' ? '#888' : '#999', textAlign: 'center' }}>
                No calculations yet
              </p>
            ) : (
              <div>
                {history.map((entry, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#eee'}`,
                      color: theme === 'dark' ? '#ccc' : '#333',
                    }}
                  >
                    {entry}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
