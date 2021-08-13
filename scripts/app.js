window.onload = () => {

    // Variables a nivel gral
    const numberButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    

    class Calculator{
        constructor(previousOperandTextElement, currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement;
            this.currentOperandTextElement = currentOperandTextElement;
            this.clear();
        }

        clear(){ //funcion para borrar toda la operacion
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;

        }

        delete(){ //funcion para borrar un numero a la vez
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }

        appendNumber(number){ //funcion para agregar un numero a la operacion una vez que se hace click, uno atras del otro
            if (number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperation(operation){ //funcion para agregar la operacion a realizar (suma, resta, etc) una vez que se se hace click
            if (this.currentOperand === '') return;
            if (this.previousOperand !== '') {
                this.compute() //actualiza las variables (por ej: estoy sumando dos valores, y despues hago una resta, los dos valores se suman automaticamente para dar lugar al nuevo valor para la resta)
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }

        compute(){ //funcion para computar los valores agregados en uno solo = resultado
            let computation;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+':
                    computation = prev + current
                    break;
                case '-':
                    computation = prev - current
                    break;
                case '*':
                    computation = prev * current
                    break;
                case '÷':
                    computation = prev / current
                    break;
                default:
                    return     
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        getDisplayNumber(number){ //Si el numero crece, se le agregan comas ","
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay;
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

        updateDisplay(){ //funcion para actualizar los valores en pantalla
            this.currentOperandTextElement.innerText = 
                this.getDisplayNumber(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
            } else {
                this.previousOperandTextElement.innerText = '';
            }
        }
    }

    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

    //Agrego funcion para los botones de numeros
    numberButtons.forEach(button => { 
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay() //los valores de los numeros van a aparecer en pantalla
        })
    })

    //Agrego funcion para los botones de operaciones
    operationButtons.forEach(button => { 
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay() //los valores de los numeros van a aparecer en pantalla
        })
    })

    //Agrego funcion para el boton de resultado
    equalsButton.addEventListener('click', button => { 
        calculator.compute();
        calculator.updateDisplay();
    })

    //Agrego funcion para el boton de borrado gral
    allClearButton.addEventListener('click', button => { 
        calculator.clear();
        calculator.updateDisplay();
    })

    //Agrego funcion para el boton de borrado 
    deleteButton.addEventListener('click', button => { 
        calculator.delete();
        calculator.updateDisplay();
    })

    
    
    //DARKMODE
    const btnSwitch = document.getElementById('switch');

    btnSwitch.addEventListener('click', () =>{
        document.body.classList.toggle('darkmode');
        btnSwitch.classList.toggle('active');
    
    //Guardo en localStorage
    if(document.body.classList.contains('darkmode')) {
        localStorage.setItem('dark', 'true');
    } else {
        localStorage.setItem('dark', 'false');
    }
    });

    //Obtengo el Modo Actual
    if(localStorage.getItem('dark') === 'true'){
        document.body.classList.add('darkmode');
        btnSwitch.classList.add('active');
    } else {
        document.body.classList.remove('darkmode');
        btnSwitch.classList.remove('active');
    }




}