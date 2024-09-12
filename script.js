document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function handleNumber(number) {
        if (currentInput.length < 16) {
            currentInput += number;
            updateDisplay(currentInput);
        }
    }

    function handleOperator(op) {
        if (currentInput !== '') {
            operand1 = currentInput;
            operator = op;
            currentInput = '';
        }
    }

    function handleCalculate() {
        if (currentInput !== '' && operand1 !== '') {
            operand2 = currentInput;
            let result;
            switch (operator) {
                case '+':
                    result = parseFloat(operand1) + parseFloat(operand2);
                    break;
                case '-':
                    result = parseFloat(operand1) - parseFloat(operand2);
                    break;
                case '*':
                    result = parseFloat(operand1) * parseFloat(operand2);
                    break;
                case '/':
                    result = parseFloat(operand1) / parseFloat(operand2);
                    break;
                default:
                    return;
            }
            updateDisplay(result);
            currentInput = result;
            operand1 = '';
            operator = '';
        }
    }

    function handleClear() {
        currentInput = '';
        operand1 = '';
        operand2 = '';
        operator = '';
        updateDisplay('0');
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');

            if (action === 'clear') {
                handleClear();
            } else if (action === 'calculate') {
                handleCalculate();
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
                handleOperator({
                    add: '+',
                    subtract: '-',
                    multiply: '*',
                    divide: '/'
                }[action]);
            } else if (action === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay(currentInput);
                }
            } else {
                handleNumber(action);
            }
        });
    });
});
