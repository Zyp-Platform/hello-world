import { useState } from 'react';
import type { DashboardProps } from '../types/props';

/**
 * Calculator Page
 *
 * A basic calculator component with standard arithmetic operations.
 */
export default function Calculator(props: DashboardProps) {
  const { theme } = props;
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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
      default:
        return current;
    }
  };

  const handleEquals = () => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = performCalculation(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const buttonStyle = {
    padding: '1rem',
    fontSize: '1.25rem',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#333' : '#e0e0e0',
    color: theme === 'dark' ? '#fff' : '#000',
    transition: 'background-color 0.2s',
  };

  const operationButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3B82F6',
    color: '#fff',
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
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Calculator</h1>

      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
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
          }}
        >
          {display}
        </div>

        {/* Buttons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
          }}
        >
          {/* Row 1 */}
          <button
            onClick={handleClear}
            style={{ ...clearButtonStyle, gridColumn: 'span 2' }}
          >
            Clear
          </button>
          <button onClick={() => handleOperation('/')} style={operationButtonStyle}>
            ÷
          </button>
          <button onClick={() => handleOperation('*')} style={operationButtonStyle}>
            ×
          </button>

          {/* Row 2 */}
          <button onClick={() => handleNumberClick('7')} style={buttonStyle}>
            7
          </button>
          <button onClick={() => handleNumberClick('8')} style={buttonStyle}>
            8
          </button>
          <button onClick={() => handleNumberClick('9')} style={buttonStyle}>
            9
          </button>
          <button onClick={() => handleOperation('-')} style={operationButtonStyle}>
            −
          </button>

          {/* Row 3 */}
          <button onClick={() => handleNumberClick('4')} style={buttonStyle}>
            4
          </button>
          <button onClick={() => handleNumberClick('5')} style={buttonStyle}>
            5
          </button>
          <button onClick={() => handleNumberClick('6')} style={buttonStyle}>
            6
          </button>
          <button onClick={() => handleOperation('+')} style={operationButtonStyle}>
            +
          </button>

          {/* Row 4 */}
          <button onClick={() => handleNumberClick('1')} style={buttonStyle}>
            1
          </button>
          <button onClick={() => handleNumberClick('2')} style={buttonStyle}>
            2
          </button>
          <button onClick={() => handleNumberClick('3')} style={buttonStyle}>
            3
          </button>
          <button
            onClick={handleEquals}
            style={{ ...equalsButtonStyle, gridRow: 'span 2' }}
          >
            =
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleNumberClick('0')}
            style={{ ...buttonStyle, gridColumn: 'span 2' }}
          >
            0
          </button>
          <button onClick={handleDecimal} style={buttonStyle}>
            .
          </button>
        </div>
      </div>
    </div>
  );
}
